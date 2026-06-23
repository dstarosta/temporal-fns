import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/fp.ts'],
  checks: {
    pluginTimings: false,
  },
  clean: true,
  dts: {
    emitDtsOnly: true,
    sourcemap: true,
  },
  exports: {
    all: true,
  },
  platform: 'neutral',
  unbundle: true,
});
