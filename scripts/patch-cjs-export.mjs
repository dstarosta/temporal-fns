// tsdown's own exports:{all:true} (tsdown.config.ts) regenerates package.json's ENTIRE `exports`
// map on every build, including overwriting `exports["."]`/`exports["./fp"]` back to flat
// ESM-only strings - it has no awareness of the separately-built CJS bundles
// (tsdown.cjs.config.ts produces dist/index.cjs + dist/index.d.cts and dist/fp.cjs +
// dist/fp.d.cts). Run this AFTER both tsdown builds (last step of `npm run build`) to patch just
// these two keys back to the conditional require/import shape Node/bundlers need to resolve the
// right format. Every other entry in the exports map is left untouched - tsdown already gets
// those right.
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const packageJsonPath = path.join(repoRoot, 'package.json');

const pkg = JSON.parse(fs.readFileSync(packageJsonPath));

function conditionalExport(base) {
  return {
    require: {
      types: `./dist/${base}.d.cts`,
      default: `./dist/${base}.cjs`,
    },
    import: {
      types: `./dist/${base}.d.ts`,
      default: `./dist/${base}.js`,
    },
  };
}

pkg.exports['.'] = conditionalExport('index');
pkg.exports['./fp'] = conditionalExport('fp');

fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Patched exports["."] and exports["./fp"] in package.json for the CJS bundles.');
