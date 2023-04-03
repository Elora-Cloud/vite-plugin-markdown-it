import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VitePluginMarkdownIt from '../src'

export default defineConfig({
  plugins: [
    VitePluginMarkdownIt(),
    Inspect(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    components({
      dirs: ['src/components/'], dts: 'types/components.d.ts', resolvers: [ElementPlusResolver()], deep: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
