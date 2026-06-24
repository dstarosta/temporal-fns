// Generates tests/fp-exhaustive.generated.ts: a data table of { exportName, baseExportName, args }
// entries, one per export in src/fp.ts (minus the 6 hand-written modules already covered by
// tests/fp.test.ts), used by tests/fp-exhaustive.test.ts to verify that EVERY generated fp/*.ts
// module's curried, data-last function produces the same result as calling the corresponding direct
// (data-first) function from src/index.ts with the same logical arguments.
//
// This is a generator-bug-catcher, not a date-math correctness test: each function's own dedicated
// test file under tests/ already covers correctness. This table only needs "good enough" fixture
// values per parameter to exercise arity, argument order, and options-splitting.
//
// Arity/options-shape is read the same way scripts/generate-fp.mjs reads it: via the TypeScript
// compiler API over dist/<file>.d.ts, using the first (plain Date-based) overload's parameter types.
// Re-run after adding/changing a function in src/ (and re-running scripts/generate-fp.mjs):
//   npm run build && node scripts/generate-fp-exhaustive-table.mjs
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const repoRoot = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(repoRoot, 'src');
const distDir = path.join(repoRoot, 'dist');
const outPath = path.join(repoRoot, 'tests', 'fp-exhaustive.generated.ts');

// Already covered by hand in tests/fp.test.ts - excluded here to avoid duplicating coverage.
const handWritten = new Set([
  'parse',
  'parseWithOptions',
  'parseISO',
  'parseISOWithOptions',
  'parseJSON',
  'intlFormat',
]);

// Parses src/fp.ts to recover { exportName, modulePath } for every barrel export.
function readFpBarrel() {
  const text = fs.readFileSync(path.join(srcDir, 'fp.ts'), 'utf8');
  const entries = [];
  for (const m of text.matchAll(/export\s*{\s*(\w+)\s*}\s*from\s*'\.\/fp\/([^']+)\.js';/g)) {
    entries.push({ exportName: m[1], modulePath: m[2] });
  }
  return entries;
}

// Maps an fp/ modulePath (e.g. "add-days-with-options") back to the direct source file's base name
// (e.g. "add-days") by stripping a trailing "-with-options" suffix, if present.
function toDirectBase(modulePath) {
  return modulePath.replace(/-with-options$/, '');
}

// Mirrors scripts/generate-fp.mjs's resolveReExportDtsPath(): for a pure re-export shim
// (`export { name } from './helpers/x.js';`, no `dist/<file>.d.ts` of its own since tsdown dedupes
// the declaration to its original definition site), resolves the dist .d.ts path of the helper
// module it re-exports from. Returns null if `base` isn't a pure shim.
function resolveReExportDtsPath(base) {
  const srcPath = path.join(srcDir, base + '.ts');
  if (!fs.existsSync(srcPath)) {
    return null;
  }
  const text = fs.readFileSync(srcPath, 'utf8').trim();
  const match = text.match(/^export\s*{\s*\w+\s*}\s*from\s*'(\.\/[^']+)';?\s*$/);
  if (!match) {
    return null;
  }
  const relativeJsPath = match[1];
  const dtsRelative = relativeJsPath.replace(/\.js$/, '.d.ts');
  return path.join(distDir, dtsRelative);
}

// Mirrors scripts/generate-fp.mjs's readSignature(): returns { arity, hasOptions, paramTypeTexts }
// for the named export's first overload in dist/<base>.d.ts.
function readSignature(program, checker, distDtsPath, exportName) {
  const sourceFile = program.getSourceFile(distDtsPath);
  if (!sourceFile) {
    throw new Error(`no dist .d.ts found at ${distDtsPath}`);
  }
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  const exports = checker.getExportsOfModule(moduleSymbol);
  const symbol = exports.find((s) => s.name === exportName);
  if (!symbol) {
    throw new Error(`"${exportName}" not exported from ${distDtsPath}`);
  }

  const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration ?? sourceFile);
  const signatures = type.getCallSignatures();
  const firstSig = signatures[0];
  const lastSig = signatures.at(-1);
  const lastParam = lastSig.getParameters().at(-1);
  const hasOptions = lastParam?.getName() === 'options';

  const typeFlags = ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseFullyQualifiedType;
  const paramTypeTexts = firstSig.getParameters().map((param) => {
    const paramType = checker.getTypeOfSymbolAtLocation(param, sourceFile);
    return checker.typeToString(paramType, sourceFile, typeFlags);
  });
  const paramNames = firstSig.getParameters().map((param) => param.getName());

  return { arity: firstSig.getParameters().length, hasOptions, paramTypeTexts, paramNames };
}

// Classifies a printed type string (plus its declared parameter name, for the string/timeZone
// ambiguity below) into one of a small fixed set of fixture kinds. Order matters - more specific
// patterns are checked first. This looks only at the param's OWN printed type text (e.g.
// "FormatOptions | undefined", or bare "SetDefaultOptions" for the single-options-param case)
// rather than position + the function's overall hasOptions flag - a positional check would
// misclassify e.g. interval()'s 2nd "Date" param, or setDay()'s 2nd "number" param, as options
// whenever the underlying function happens to ALSO have a trailing options param that isn't part of
// THIS export's sliced arg list.
function classifyParamType(typeText, paramName) {
  // `FormatDurationUnit = keyof Duration` (a derived/mapped type alias) gets printed by
  // `checker.typeToString` as its fully-expanded form `keyof import("./format-duration.js")
  // .Duration` rather than the alias name - this must be checked BEFORE the `Options` catch-all
  // below, since it doesn't match any of the more specific patterns and would otherwise fall
  // through to the generic 'options' (-> `{}` fixture) default, which silently no-ops
  // `countIntervalUnits`'s internal `{ [unit]: 1 }` step construction and hangs its loop forever.
  if (/^keyof import\(.*\)\.Duration$/.test(typeText)) {
    return 'durationUnit';
  }
  if (/Options(\s*\|\s*undefined)?$/.test(typeText) && !/^Date\b/.test(typeText)) {
    return 'options';
  }
  if (/^readonly \(?Date\b/.test(typeText) || /^Date\[]$/.test(typeText)) {
    return 'dateArray';
  }
  if (typeText.startsWith('Interval<') || /^Interval\b/.test(typeText)) {
    return 'interval';
  }
  if (/^Duration\b/.test(typeText)) {
    return 'duration';
  }
  if (/^ISODuration\b/.test(typeText)) {
    return 'isoDuration';
  }
  if (/^DateValues\b/.test(typeText)) {
    return 'dateValues';
  }
  if (
    /^(Date \| DateLike|DateLike \| Date|Date \| TimeLike|TimeLike \| Date|Date)(\s*\|\s*undefined)?$/.test(
      typeText
    )
  ) {
    return 'date';
  }
  if (/^string(\s*\|\s*undefined)?$/.test(typeText)) {
    // A plain `string` param is either a genuine string value (e.g. isMatch's formatStr) or an
    // IANA timeZone id (e.g. todayZonedDateTime(timeZone?: string)) - these need DIFFERENT
    // fixtures (a format-pattern-shaped string is not a valid IANA zone, and vice versa), so the
    // declared parameter name disambiguates.
    if (paramName === 'timeZone') {
      return 'timeZoneId';
    }
    return 'string';
  }
  if (/^number(\s*\|\s*undefined)?$/.test(typeText)) {
    return 'number';
  }
  if (/^boolean(\s*\|\s*undefined)?$/.test(typeText)) {
    return 'boolean';
  }
  if (/^unknown$/.test(typeText)) {
    // Type-guard predicates like isDate/isValid/isTemporal take `value: unknown` - any concrete
    // value works as a fixture; a plain Date exercises the "true" branch where applicable.
    return 'date';
  }
  // Fallback heuristics for anything not matched above (e.g. options-shaped non-last params like
  // setWeek's options-shaped 2nd positional in some hypothetical signature) - default to a generic
  // empty-object fixture, which is valid for every all-optional options interface in this codebase.
  return 'options';
}

function buildArgsForExport(arity, paramTypeTexts, paramNames) {
  return paramTypeTexts.slice(0, arity).map((typeText, index) => {
    const kind = classifyParamType(typeText, paramNames[index]);
    return { kind, typeText };
  });
}

function main() {
  const barrelEntries = readFpBarrel().filter((entry) => !handWritten.has(entry.exportName));

  const directBases = [...new Set(barrelEntries.map((entry) => toDirectBase(entry.modulePath)))];
  const directDtsPaths = directBases
    .map((base) => path.join(distDir, base + '.d.ts'))
    .filter((p) => fs.existsSync(p));
  const reExportDtsPaths = directBases
    .map((base) => resolveReExportDtsPath(base))
    .filter((p) => p && fs.existsSync(p));
  const dtsPaths = [...new Set([...directDtsPaths, ...reExportDtsPaths])];
  const program = ts.createProgram(dtsPaths, {
    allowJs: false,
    lib: ['lib.es2022.d.ts', 'lib.esnext.temporal.d.ts'],
  });
  const checker = program.getTypeChecker();

  const table = [];
  const errors = [];

  for (const { exportName, modulePath } of barrelEntries) {
    const base = toDirectBase(modulePath);
    let distDtsPath = path.join(distDir, base + '.d.ts');
    if (!fs.existsSync(distDtsPath)) {
      distDtsPath = resolveReExportDtsPath(base) ?? distDtsPath;
    }
    const directExportName = exportName.replace(/WithOptions$/, '');

    try {
      const { arity, hasOptions, paramTypeTexts, paramNames } = readSignature(
        program,
        checker,
        distDtsPath,
        directExportName
      );
      // Arity to use for THIS fp export: the base (options-omitted) export uses arity-1 positional
      // args (no options arg at all) UNLESS the function's only parameter IS options (baseArity 0
      // case in generate-fp.mjs) - detected by exportName === directExportName && hasOptions &&
      // arity === 1, where the single param is itself the options param.
      const isWithOptions = exportName.endsWith('WithOptions');
      const onlyOptionsParam = hasOptions && arity === 1;

      let useArity;
      if (onlyOptionsParam) {
        useArity = 1; // e.g. setDefaultOptions(options)
      } else if (isWithOptions) {
        useArity = arity;
      } else {
        useArity = hasOptions ? arity - 1 : arity;
      }

      const args = buildArgsForExport(useArity, paramTypeTexts, paramNames);
      table.push({
        exportName,
        directExportName,
        onlyOptionsParam,
        args,
      });
    } catch (error) {
      errors.push([exportName, error.message]);
    }
  }

  if (errors.length > 0) {
    console.error('Errors building table:');
    for (const [name, message] of errors) {
      console.error(`  ${name}: ${message}`);
    }
    process.exitCode = 1;
    return;
  }

  const lines = [
    '// AUTO-GENERATED by scripts/generate-fp-exhaustive-table.mjs - do not edit by hand.',
    '// Re-run: npm run build && node scripts/generate-fp-exhaustive-table.mjs',
    'export type FixtureKind =',
    "  | 'date'",
    "  | 'dateArray'",
    "  | 'interval'",
    "  | 'duration'",
    "  | 'isoDuration'",
    "  | 'dateValues'",
    "  | 'string'",
    "  | 'timeZoneId'",
    "  | 'durationUnit'",
    "  | 'number'",
    "  | 'boolean'",
    "  | 'options';",
    '',
    'export interface FpExhaustiveCase {',
    '  exportName: string;',
    '  directExportName: string;',
    '  onlyOptionsParam: boolean;',
    '  args: { kind: FixtureKind; typeText: string }[];',
    '}',
    '',
    'export const fpExhaustiveTable: FpExhaustiveCase[] = ' + JSON.stringify(table, null, 2) + ';',
    '',
  ];

  fs.writeFileSync(outPath, lines.join('\n'));
  console.log(`Wrote ${table.length} entries to ${path.relative(repoRoot, outPath)}.`);
}

main();
