import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Inspect from 'vite-plugin-inspect'
import components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import { generateExternal } from './scripts/rollup'

export default defineConfig({
  plugins: [vue({
    include: [/\.vue$/],
  }),
  Inspect(),
  AutoImport({
    imports: ['vue', '@vueuse/core', 'vue-router'],
    dts: './types/auto-import.d.ts',
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        prefix: 'Icon',
      }),
    ],
  }),
  components({
    dirs: ['src/components/'],
    dts: 'types/components.d.ts',
    resolvers: [ElementPlusResolver(), IconsResolver({
      enabledCollections: ['ep'],
    })],
    deep: true,
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
      // 确保外部化处理那些你不想打包进库的依赖
      external: await generateExternal({
        full: true,
      }),
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
