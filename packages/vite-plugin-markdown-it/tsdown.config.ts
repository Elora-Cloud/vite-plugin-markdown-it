import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/core/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist/core',
});
