import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Inspect from 'vite-plugin-inspect'
import components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/],
  }),
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
  })],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/components/dist',
    emptyOutDir: false,
    minify: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    lib: {
      entry: 'src/components/index.ts',
      formats: ['umd', 'cjs', 'es'],
      name: 'vite-plugin-markdown-it',
    },
  },
})
