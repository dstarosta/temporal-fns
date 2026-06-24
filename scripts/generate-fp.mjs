// Generates src/fp/*.ts: curried, data-last "FP" variants of every plain-function export in src/,
// mirroring date-fns' own fp/ submodule (https://github.com/date-fns/date-fns). For each eligible
// export `name` with arity N (last param optionally named `options`):
//   - emits `src/fp/<kebab-name>.ts` exporting a curried `name` at arity N-1 (options omitted), if
//     the function takes an options param, otherwise at arity N.
//   - emits `src/fp/<kebab-name>-with-options.ts` exporting a curried `nameWithOptions` at arity N,
//     if the function takes an options param.
//
// Arity is read from each export's *compiled* call signature(s) in dist/<file>.d.ts via the
// TypeScript compiler API (not regex), so overload formatting differences (declare function vs.
// declare const {...}) don't matter — only the checker's resolved signature does. Every overload of
// a given export is asserted to share the same parameter count; this holds for every export except
// the 4 "dangerous" ones below, which are excluded and hand-written instead.
//
// Re-run after adding/changing a function in src/: `npm run build && node scripts/generate-fp.mjs`.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const repoRoot = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(repoRoot, 'src');
const distDir = path.join(repoRoot, 'dist');
const fpDir = path.join(srcDir, 'fp');

// Hand-written instead of generated: overloads differ in arity/meaning per-overload (not just
// Date-vs-DateLike or an optional trailing `options`), so a single mechanical curry arity would be
// wrong for at least one call shape.
const excluded = new Set(['parse.ts', 'parse-iso.ts', 'parse-json.ts', 'intl-format.ts']);

// Not a function at all.
const nonFunctionExports = new Set(['timezone-id.ts']);

// Hand-written fp modules (for the 4 files in `excluded` above) to include in the src/fp.ts barrel
// alongside the generated ones. Each hand-written file is expected to export exactly these names.
const handWrittenBarrelEntries = [
  { exportName: 'parse', modulePath: 'parse' },
  { exportName: 'parseWithOptions', modulePath: 'parse-with-options' },
  { exportName: 'parseISO', modulePath: 'parse-iso' },
  { exportName: 'parseISOWithOptions', modulePath: 'parse-iso-with-options' },
  { exportName: 'parseJSON', modulePath: 'parse-json' },
  { exportName: 'intlFormat', modulePath: 'intl-format' },
];

function kebabToCamel(kebab) {
  return kebab.replace(/-([\da-z])/g, (_, c) => c.toUpperCase());
}

function listCandidateFiles() {
  return fs
    .readdirSync(srcDir)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.test.ts'))
    .filter((f) => f !== 'index.ts' && f !== 'types.ts' && f !== 'fp.ts')
    .filter((f) => fs.statSync(path.join(srcDir, f)).isFile())
    .filter((f) => !excluded.has(f) && !nonFunctionExports.has(f));
}

// Given a `ts.TypeNode` (an AST node, e.g. a parameter's or return type's syntactic type
// annotation) and the source file it was read from, walks the node (recursing into
// union/intersection members, parenthesized types, array element types, and generic type
// arguments) and collects a `name -> import specifier` map for every distinct named type/interface
// it references that's declared in one of *our* dist .d.ts files (as opposed to a lib.d.ts global
// like `Date`/`string`/`Temporal.PlainDate`).
//
// This walks the *syntax* (type nodes) rather than the checker's resolved `ts.Type`, because the
// checker eagerly expands type aliases to unions (e.g. `DateLike = PlainDateTime | PlainDate |
// ZonedDateTime`) when resolving a parameter's type as a whole - by the time you have a `ts.Type`
// for `Date | DateLike`, it has already flattened into `Date | PlainDateTime | PlainDate |
// ZonedDateTime` with no trace of the `DateLike` alias boundary. Resolving each `TypeReferenceNode`
// individually via `checker.getTypeFromTypeNode` preserves `aliasSymbol`/`getSymbol()` for that
// specific reference instead.
//
// The import specifier is resolved relative to where the generated file will live (src/fp/<x>.ts):
// a type declared in dist/types.d.ts becomes '../types.js', one declared in
// dist/helpers/create-each-of-interval.d.ts becomes '../helpers/create-each-of-interval.js', etc.
// (dist/ is only used here for type-introspection; the generated files import sibling *source*
// modules under src/, which is why the .d.ts extension is swapped for .js pointing at src/'s own
// output-shape imports, not at dist/ itself.)
//
// Best-effort: anything that throws while being resolved is silently skipped rather than crashing
// the generator - a missing import is something `tsc` will catch afterward.
function resolveTypeImports(
  checker,
  typeNode,
  sourceFile,
  importsNeeded = new Map(),
  seen = new Set()
) {
  try {
    if (!typeNode || seen.has(typeNode)) {
      return importsNeeded;
    }
    seen.add(typeNode);

    // Recurse into union/intersection members instead of trying to resolve the combined type.
    if (ts.isUnionTypeNode(typeNode) || ts.isIntersectionTypeNode(typeNode)) {
      for (const member of typeNode.types) {
        resolveTypeImports(checker, member, sourceFile, importsNeeded, seen);
      }
      return importsNeeded;
    }

    if (ts.isParenthesizedTypeNode(typeNode)) {
      resolveTypeImports(checker, typeNode.type, sourceFile, importsNeeded, seen);
      return importsNeeded;
    }

    if (ts.isArrayTypeNode(typeNode)) {
      resolveTypeImports(checker, typeNode.elementType, sourceFile, importsNeeded, seen);
      return importsNeeded;
    }

    if (!ts.isTypeReferenceNode(typeNode)) {
      // Keyword types (string/number/boolean/undefined/...), literal types, etc. - nothing to import.
      return importsNeeded;
    }

    // Recurse into generic type arguments, e.g. `Interval<Date>` -> `Interval` and `Date`.
    if (typeNode.typeArguments) {
      for (const typeArgument of typeNode.typeArguments) {
        resolveTypeImports(checker, typeArgument, sourceFile, importsNeeded, seen);
      }
    }

    // A qualified name like `Temporal.PlainDate` resolves `typeName` to the `Temporal` namespace
    // symbol, not `PlainDate` - skip it. (It's also a lib.d.ts global, so it'd be filtered out
    // below regardless; this is just cheaper than computing the type for nothing.)
    if (!ts.isIdentifier(typeNode.typeName)) {
      return importsNeeded;
    }

    const resolvedType = checker.getTypeFromTypeNode(typeNode);
    const symbol = resolvedType.aliasSymbol ?? resolvedType.getSymbol?.();
    if (!symbol) {
      return importsNeeded;
    }

    const declarations = symbol.getDeclarations?.();
    const declaration = declarations?.[0];
    const declSourceFile = declaration?.getSourceFile?.();
    if (!declSourceFile) {
      return importsNeeded;
    }

    const declFileName = declSourceFile.fileName;
    // Skip globals (lib.d.ts, including lib.esnext.temporal.d.ts's `Temporal` namespace members).
    if (
      declFileName.includes('node_modules/typescript/lib/') ||
      declFileName.includes('node_modules\\typescript\\lib\\')
    ) {
      return importsNeeded;
    }
    const normalizedDeclFileName = declFileName.replace(/\\/g, '/');
    const normalizedDistDir = distDir.replace(/\\/g, '/');
    if (!normalizedDeclFileName.startsWith(normalizedDistDir)) {
      // Not one of our own dist .d.ts files (defensive; in practice everything else is lib.d.ts).
      return importsNeeded;
    }

    const name = symbol.getName();
    if (importsNeeded.has(name)) {
      return importsNeeded;
    }

    const dtsRelative = path.relative(distDir, declFileName); // e.g. "helpers/create-each-of-interval.d.ts"
    const withoutExt = dtsRelative.replace(/\.d\.ts$/, '');
    const importSpecifier = `../${withoutExt.split(path.sep).join('/')}.js`;
    importsNeeded.set(name, importSpecifier);

    return importsNeeded;
  } catch {
    // Best-effort: a single unresolvable type node shouldn't crash the whole generator.
    return importsNeeded;
  }
}

// `checker.typeToString` with `UseFullyQualifiedType` mostly prints alias names as-is (e.g.
// `EachOfIntervalOptions`), letting `resolveTypeImports` handle the import separately by walking
// the syntactic type node - but for a `keyof`/mapped/computed alias (e.g. `FormatDurationUnit =
// keyof Duration`), it instead EXPANDS the alias inline as `keyof import("./format-duration.js")
// .Duration`, embedding a dist-relative import path directly into the printed type text. That
// path is never visited by `resolveTypeImports` (it's not a separate `TypeReferenceNode` - it's
// baked into the string), so it stays relative to `dist/` (where the .d.ts files are siblings)
// instead of being adjusted for `src/fp/`, one directory deeper. Since every generated fp file
// lives at that fixed one-level-deeper location, the fix is a single mechanical rewrite: any
// `import("./...")` substring becomes `import("../...")`.
function rewriteInlineImportPaths(typeText) {
  return typeText.replace(/import\("\.\//g, 'import("../');
}

// Returns { name, arity, hasOptions, paramTypeTexts, returnTypeText, importsNeeded } for the main
// function export of `file`, or null if `file`'s dist .d.ts doesn't export a single
// function/callable-const matching `name`. Types are read off the *first* overload (the plain,
// non-`DateLike`-generic one, which the codebase-wide survey confirmed always exists and is always
// listed first) rather than a generic/`never` placeholder, matching date-fns' own fp/*.d.ts
// precedent of hardcoding the plain `Date`-based signature at the FP layer instead of preserving
// the `<T extends DateLike>` overload.
function readSignature(program, checker, distDtsPath, exportName) {
  const sourceFile = program.getSourceFile(distDtsPath);
  if (!sourceFile) {
    return null;
  }
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    return null;
  }
  const exports = checker.getExportsOfModule(moduleSymbol);
  const symbol = exports.find((s) => s.name === exportName);
  if (!symbol) {
    return null;
  }

  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration ?? sourceFile);
  const signatures = type.getCallSignatures();
  if (signatures.length === 0) {
    return null;
  }

  const arities = new Set(signatures.map((sig) => sig.getParameters().length));
  if (arities.size !== 1) {
    throw new Error(`${exportName}: overloads have differing arity (${[...arities].join(', ')})`);
  }
  const arity = [...arities][0];
  if (arity === 0) {
    return null;
  }

  const firstSig = signatures[0];
  const lastSig = signatures.at(-1);
  // The options-or-not check uses the last overload (matches every overload's trailing param name
  // in practice, since all share arity), but types are read from the first (plain) overload.
  const lastParam = lastSig.getParameters().at(-1);
  const hasOptions = lastParam.getName() === 'options';

  const typeFlags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType;
  // `firstSig.declaration` is the syntactic FunctionDeclaration/signature node backing the first
  // overload; its parameters'/return's *type nodes* are walked (rather than the checker's already-
  // resolved `ts.Type`) so that `resolveTypeImports` can see alias boundaries like `DateLike` that
  // the checker would otherwise expand away (see `resolveTypeImports` for why).
  const declParams = firstSig.declaration?.parameters ?? [];
  const declReturnTypeNode = firstSig.declaration?.type;

  // Imports are tracked per-parameter (rather than merged up front) so that callers can drop the
  // options param's imports entirely when generating the options-omitting variant - merging
  // everything unconditionally would emit an unused import for e.g. `FormatOptions` in
  // `src/fp/format.ts`, which only uses the options param in the `-with-options` variant.
  const paramImportsNeeded = [];
  const paramTypeTexts = firstSig.getParameters().map((param, index) => {
    const paramType = checker.getTypeOfSymbolAtLocation(param, sourceFile);
    const paramTypeNode = declParams[index]?.type;
    const paramImports = resolveTypeImports(checker, paramTypeNode, sourceFile);
    paramImportsNeeded.push(paramImports);
    return rewriteInlineImportPaths(checker.typeToString(paramType, sourceFile, typeFlags));
  });
  const returnType = checker.getReturnTypeOfSignature(firstSig);
  const returnImportsNeeded = resolveTypeImports(checker, declReturnTypeNode, sourceFile);
  const returnTypeText = rewriteInlineImportPaths(
    checker.typeToString(returnType, sourceFile, typeFlags)
  );

  return {
    name: exportName,
    arity,
    hasOptions,
    paramTypeTexts,
    returnTypeText,
    paramImportsNeeded,
    returnImportsNeeded,
  };
}

function toExportNameGuess(kebabFile) {
  // src/file-name.ts -> camelCase export, e.g. add-days -> addDays. Special-case names aren't
  // guessable this way (ISO/UTC casing), so the caller falls back to scanning all exports of the
  // *source* .ts file (cheap, via a regex over `export {` / `export function` / `export const`) and
  // intersecting with what dist actually exports, rather than guessing the camelCase spelling.
  return kebabToCamel(path.basename(kebabFile, '.ts'));
}

// For a pure re-export shim (`export { name } from './helpers/x.js';`, no `dist/<file>.d.ts` of its
// own since tsdown dedupes the declaration to its original definition site), resolves the dist
// .d.ts path of the helper module it re-exports from. Returns null if `file` isn't a pure shim.
function resolveReExportDtsPath(srcPath) {
  const text = fs.readFileSync(srcPath, 'utf8').trim();
  const match = text.match(/^export\s*{\s*\w+\s*}\s*from\s*'(\.\/[^']+)';?\s*$/);
  if (!match) {
    return null;
  }
  const relativeJsPath = match[1];
  const dtsRelative = relativeJsPath.replace(/\.js$/, '.d.ts');
  return path.join(distDir, dtsRelative);
}

function findRealExportNames(srcPath) {
  const text = fs.readFileSync(srcPath, 'utf8');
  const names = new Set();
  for (const m of text.matchAll(/export\s+function\s+(\w+)/g)) {
    names.add(m[1]);
  }
  for (const m of text.matchAll(/export\s+const\s+(\w+)/g)) {
    names.add(m[1]);
  }
  for (const m of text.matchAll(/export\s*{([^}]+)}/g)) {
    for (const part of m[1].split(',')) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith('type ')) {
        continue;
      }
      const asMatch = /\bas\b/.exec(trimmed);
      const localName = asMatch ? trimmed.slice(asMatch.index + 2).trim() : trimmed;
      names.add(localName);
    }
  }
  return names;
}

function fpFnTypeRef(arity) {
  if (arity === 0) {
    return null;
  }
  return `FPFn${arity}`;
}

// FPFnN's generic parameters are <Result, ArgN, ArgN-1, ..., Arg1> - REVERSED from positional
// order, since Arg1 (the function's first positional parameter) is curried in last. `paramTypeTexts`
// is in normal positional order (Arg1, Arg2, ..., ArgN), so it's reversed here to match.
function fpFnTypeArgs(returnTypeText, paramTypeTexts) {
  return [returnTypeText, ...[...paramTypeTexts].reverse()].join(', ');
}

// Renders one `import { type Name } from '...';` per distinct import path, EXCEPT types whose
// import path matches `fnImportPath` (the same module `fn` itself comes from) - those are folded
// into the caller's `import { name as fn, type Name } from '...';` line instead, to avoid
// `no-duplicate-imports` (two separate `import ... from` statements for the same module path).
function importLines(importsNeeded, fnImportPath) {
  return [...importsNeeded.entries()]
    .filter(([, importPath]) => importPath !== fnImportPath)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([typeName, importPath]) => `import { type ${typeName} } from '${importPath}';`);
}

function fnImportLine(name, importPath, importsNeeded) {
  const sameModuleTypes = [...importsNeeded.entries()]
    .filter(([, typeImportPath]) => typeImportPath === importPath)
    .map(([typeName]) => `type ${typeName}`)
    .sort();
  const specifiers = [`${name} as fn`, ...sameModuleTypes].join(', ');
  return `import { ${specifiers} } from '${importPath}';`;
}

// Merges a subset of per-parameter import maps (plus the return type's) into one
// `name -> import specifier` map, de-duplicating by name.
function mergeImports(returnImportsNeeded, paramImportsNeededList) {
  const merged = new Map(returnImportsNeeded);
  for (const paramImports of paramImportsNeededList) {
    for (const [typeName, importPath] of paramImports) {
      merged.set(typeName, importPath);
    }
  }
  return merged;
}

// Writes src/fp.ts, a barrel re-exporting every fp module by name (mirroring date-fns' own
// top-level `date-fns/fp` entry point), sorted alphabetically by module path - the same convention
// src/index.ts follows for the main library.
function writeBarrel(generatedEntries) {
  const entries = [...generatedEntries, ...handWrittenBarrelEntries].sort((a, b) =>
    a.modulePath.localeCompare(b.modulePath)
  );
  const lines = entries.map(
    (entry) => `export { ${entry.exportName} } from './fp/${entry.modulePath}.js';`
  );
  fs.writeFileSync(path.join(srcDir, 'fp.ts'), lines.join('\n') + '\n');
}

function writeFpFile(
  base,
  name,
  arity,
  paramTypeTexts,
  returnTypeText,
  paramImportsNeeded,
  returnImportsNeeded
) {
  if (arity === 0) {
    return;
  }
  const outPath = path.join(fpDir, base + '.ts');
  const importPath = `../${base}.js`;
  const fnType = fpFnTypeRef(arity);
  const usedParamTypeTexts = paramTypeTexts.slice(0, arity);
  const typeArgs = fpFnTypeArgs(returnTypeText, usedParamTypeTexts);
  const importsNeeded = mergeImports(returnImportsNeeded, paramImportsNeeded.slice(0, arity));
  const lines = [
    fnImportLine(name, importPath, importsNeeded),
    `import { convertToFP } from './helpers/convert-to-fp.js';`,
    `import { type ${fnType} } from './types.js';`,
    ...importLines(importsNeeded, importPath),
    ``,
    `/**`,
    ` * Curried, data-last variant of {@link ${name}}.`,
    ` */`,
    `export const ${name}: ${fnType}<${typeArgs}> = convertToFP(fn, ${arity}) as ${fnType}<`,
    `  ${typeArgs}`,
    `>;`,
    ``,
  ];
  fs.writeFileSync(outPath, lines.join('\n'));
}

function writeFpWithOptionsFile(
  base,
  name,
  arity,
  paramTypeTexts,
  returnTypeText,
  paramImportsNeeded,
  returnImportsNeeded
) {
  const withOptionsName = name + 'WithOptions';
  // Derived from `base` (the real source file's already-correct kebab name), not by re-deriving
  // kebab-case from `withOptionsName` itself: camelToKebab only inserts a hyphen at a lower-to-upper
  // transition, so an all-caps run directly followed by another capital (e.g. "ISOWith") never
  // splits, producing a glued-together "isowith-options" instead of "iso-with-options".
  const outPath = path.join(fpDir, base + '-with-options.ts');
  const importPath = `../${base}.js`;
  const fnType = fpFnTypeRef(arity);
  const typeArgs = fpFnTypeArgs(returnTypeText, paramTypeTexts);
  const importsNeeded = mergeImports(returnImportsNeeded, paramImportsNeeded);
  const lines = [
    fnImportLine(name, importPath, importsNeeded),
    `import { convertToFP } from './helpers/convert-to-fp.js';`,
    `import { type ${fnType} } from './types.js';`,
    ...importLines(importsNeeded, importPath),
    ``,
    `/**`,
    ` * Curried, data-last variant of {@link ${name}} that also accepts its options parameter (as`,
    ` * the first curried argument, i.e. the last positional argument).`,
    ` */`,
    `export const ${withOptionsName}: ${fnType}<${typeArgs}> = convertToFP(fn, ${arity}) as ${fnType}<`,
    `  ${typeArgs}`,
    `>;`,
    ``,
  ];
  fs.writeFileSync(outPath, lines.join('\n'));
}

function main() {
  const files = listCandidateFiles();
  const directDtsPaths = files
    .map((f) => path.join(distDir, path.basename(f, '.ts') + '.d.ts'))
    .filter((p) => fs.existsSync(p));
  const reExportDtsPaths = files
    .map((f) => resolveReExportDtsPath(path.join(srcDir, f)))
    .filter((p) => p && fs.existsSync(p));
  const dtsPaths = [...new Set([...directDtsPaths, ...reExportDtsPaths])];
  const program = ts.createProgram(dtsPaths, {
    allowJs: false,
    lib: ['lib.es2022.d.ts', 'lib.esnext.temporal.d.ts'],
  });
  const checker = program.getTypeChecker();

  // Delete and regenerate only the per-function .ts files in src/fp/ root - never src/fp/types.ts,
  // src/fp/helpers/convert-to-fp.ts, or any of the hand-written fp/ modules for the 4 excluded
  // functions (see handWrittenBarrelEntries) - none of those are regenerated by this script.
  const preserved = new Set([
    'helpers',
    'types.ts',
    ...handWrittenBarrelEntries.map((entry) => entry.modulePath + '.ts'),
  ]);
  fs.mkdirSync(fpDir, { recursive: true });
  fs.mkdirSync(path.join(fpDir, 'helpers'), { recursive: true });
  for (const entry of fs.readdirSync(fpDir)) {
    if (preserved.has(entry)) {
      continue;
    }
    fs.rmSync(path.join(fpDir, entry), { recursive: true, force: true });
  }

  const generated = [];
  const skipped = [];

  for (const file of files) {
    const base = path.basename(file, '.ts');
    let distDtsPath = path.join(distDir, base + '.d.ts');
    if (!fs.existsSync(distDtsPath)) {
      const reExportPath = resolveReExportDtsPath(path.join(srcDir, file));
      if (!reExportPath || !fs.existsSync(reExportPath)) {
        skipped.push([file, 'no dist .d.ts']);
        continue;
      }
      distDtsPath = reExportPath;
    }

    const realExportNames = findRealExportNames(path.join(srcDir, file));
    const guess = toExportNameGuess(file);
    const exportName = realExportNames.has(guess)
      ? guess
      : [...realExportNames].find((n) => n.toLowerCase() === guess.toLowerCase());

    if (!exportName) {
      skipped.push([file, `couldn't resolve export name (guessed "${guess}")`]);
      continue;
    }

    let sig;
    try {
      sig = readSignature(program, checker, distDtsPath, exportName);
    } catch (error) {
      skipped.push([file, error.message]);
      continue;
    }
    if (!sig) {
      skipped.push([file, `"${exportName}" has no call signature in dist`]);
      continue;
    }

    if (sig.arity > 4) {
      skipped.push([file, `arity ${sig.arity} exceeds highest defined FPFnN (FPFn4)`]);
      continue;
    }

    generated.push({ file, base, ...sig });
  }

  // { exportName, modulePath } for every generated fp module, used to write the src/fp.ts barrel
  // below. modulePath is relative to src/fp/ (no leading './', no '.ts' extension), e.g.
  // "add-days" or "format-with-options".
  const barrelEntries = [];

  for (const {
    base,
    name,
    arity,
    hasOptions,
    paramTypeTexts,
    returnTypeText,
    paramImportsNeeded,
    returnImportsNeeded,
  } of generated) {
    const baseArity = hasOptions ? arity - 1 : arity;
    if (baseArity === 0) {
      // The function's ONLY parameter is `options` (e.g. `setDefaultOptions(options)`) - there's
      // no options-omitted form to split off, so emit a single arity-1 file under `name` itself
      // (using the options type directly) instead of a `name`/`nameWithOptions` pair.
      writeFpFile(
        base,
        name,
        arity,
        paramTypeTexts,
        returnTypeText,
        paramImportsNeeded,
        returnImportsNeeded
      );
      barrelEntries.push({ exportName: name, modulePath: base });
      continue;
    }
    writeFpFile(
      base,
      name,
      baseArity,
      paramTypeTexts,
      returnTypeText,
      paramImportsNeeded,
      returnImportsNeeded
    );
    barrelEntries.push({ exportName: name, modulePath: base });
    if (hasOptions) {
      writeFpWithOptionsFile(
        base,
        name,
        arity,
        paramTypeTexts,
        returnTypeText,
        paramImportsNeeded,
        returnImportsNeeded
      );
      barrelEntries.push({ exportName: name + 'WithOptions', modulePath: base + '-with-options' });
    }
  }

  writeBarrel(barrelEntries);

  console.log(`Generated ${generated.length} fp module(s); skipped ${skipped.length}.`);
  if (skipped.length > 0) {
    console.log('\nSkipped:');
    for (const [file, reason] of skipped) {
      console.log(`  ${file}: ${reason}`);
    }
  }
}

main();
