import { defineConfig, type UserConfig } from 'tsdown';

// Single bundled CJS files (one per entry) for require()-based consumers - mirrors how date-fns
// ships index.cjs as a real bundle (not a barrel), since CJS has no native tree-shaking to lose
// by bundling, unlike the ESM output (tsdown.config.ts), which stays unbundled per-file so ESM
// consumers can still tree-shake the barrel import.
//
// `index` and `fp` are each their own separate config (rather than one config listing both
// entries) so rolldown can't factor shared code between them into a separate chunk - each output
// must be one genuinely self-contained file, not split across a shared dependency chunk (this was
// confirmed to happen when both were listed as entries in a single config).
const shared: Omit<UserConfig, 'entry'> = {
  clean: false,
  // Emits a matching dist/<entry>.d.cts (the .cts extension follows from format: ['cjs'])
  // alongside the bundled .cjs, so require()-based consumers resolve a genuinely CJS-flavored
  // type declaration file instead of the ESM .d.ts - satisfies publint's
  // exports[...].require.types check, which treats the .d.ts/.d.cts extension itself as the
  // signal regardless of how the JSON exports map nests it.
  dts: true,
  format: ['cjs'],
  minify: { compress: true },
  platform: 'neutral',
  publint: false,
  sourcemap: 'hidden',
  target: 'es2022',
  treeshake: true,
  unbundle: false,
};

export default defineConfig([
  { ...shared, entry: ['src/index.ts'] },
  { ...shared, entry: ['src/fp.ts'] },
]);
