import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: false,
  dts: {
    enabled: false,
  },
  entry: ['src/index.ts', 'src/fp.ts'],
  exports: {
    all: true,
  },
  format: ['esm'],
  minify: {
    compress: true,
  },
  platform: 'neutral',
  publint: true,
  sourcemap: 'hidden',
  target: 'es2022',
  treeshake: true,
  unbundle: true,
});
