import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import Inspect from 'vite-plugin-inspect';
import { generateExternal } from './scripts/rollup';

export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist/components/es',
    emptyOutDir: false,
    minify: true,
    // 这一块是不会被使用的
    lib: {
      cssFileName: 'style',
      entry: ['src/components/index.ts', 'src/components/components/style/css.ts', 'src/components/components/style/index.ts'],
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: generateExternal({ full: true }),
      input: ['src/components/index.ts', 'src/components/components/style/css.ts', 'src/components/components/style/index.ts'],
      output: [
        // esm
        {
          format: 'es',
          dir: 'dist/components/es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
        },
        // cjs
        {
          format: 'cjs',
          dir: 'dist/components/lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src/components',
        },
      ],
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/],
    }),
    dts(),
    Inspect(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue-router'],
      // dirs: ['src/utils'], // 配置自动导入的目录
      dts: './types/auto-import.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: false,
        }),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    components({
      dirs: ['src/components/'],
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver({
        importStyle: false,
      }), IconsResolver({
        enabledCollections: ['ep'],
      })],
      deep: true,
    }),
  ],
});
