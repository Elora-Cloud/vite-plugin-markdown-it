import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import dts from 'vite-plugin-dts'

const externals = ['path', /^electron(\/.+)?$/]
export default defineConfig({
  build: {
    target: 'modules',
    outDir: 'dist/components/es',
    emptyOutDir: false,
    minify: true,
    // 这一块是不会被使用的
    lib: {
      entry: 'src/components/index.ts',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vite',
        '@element-plus/icons-vue',
        'element-plus',
        '@vueuse/core',
        'vue',
        'vue-router',
        'scss',
      ],
      input: ['src/components/index.ts'],
      output: [
        // esm
        {
          format: 'es',
          dir: 'dist/components/es',
          entryFileNames: '[name].js',
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
        ElementPlusResolver(),
      ],
    }),
    components({
      dirs: ['src/components/'], dts: 'types/components.d.ts', resolvers: [ElementPlusResolver()], deep: true,
    }),
  ],
})
