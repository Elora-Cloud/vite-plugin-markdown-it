import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
import dts from 'unplugin-dts/rollup';

export default defineConfig([
  {
    input: ['src/core/index.ts'],
    output: [
      {
        format: 'esm',
        dir: 'dist/core/es',
        entryFileNames: '[name].mjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
      {
        format: 'cjs',
        dir: 'dist/core/lib',
        entryFileNames: '[name].cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.core.json',
      }),
      dts({
        tsconfigPath: './tsconfig.core.json',
        outDirs: ['dist/core/es', 'dist/core/lib'],
      }),
    ],
  },
]);
