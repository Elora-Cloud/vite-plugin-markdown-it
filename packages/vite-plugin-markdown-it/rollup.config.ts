import { defineConfig } from 'rollup';
import typescript2 from 'rollup-plugin-typescript2';

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
      typescript2({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
        },
        tsconfig: 'tsconfig.core.json',
      }),
    ],
  },
]);
