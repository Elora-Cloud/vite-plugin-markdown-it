import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'
import commonjsExternals from 'vite-plugin-commonjs-externals'

const externals = ['path', /^electron(\/.+)?$/]
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'es',
    emptyOutDir: false,
    minify: true,
    // 这一块是不会被使用的
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vite',
        '@element-plus/icons-vue',
        'element-plus',
        '@vueuse/core',
        'highlight.js',
        'vue',
        'vue-router',
        'scss',
      ],
      input: ['src/index.ts'],
      output: [
        // esm
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        // cjs
        {
          format: 'cjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
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
        ElementPlusResolver(),
      ],
    }),
    commonjsExternals({
      externals,
    }),
    components({
      dirs: ['src/components/'], dts: 'types/components.d.ts', resolvers: [ElementPlusResolver()], deep: true,
    }),
  ],
})
