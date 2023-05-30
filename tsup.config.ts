import { defineConfig } from 'tsup'

export default defineConfig({
  external: [
    'vite',
    '@element-plus/icons-vue',
    'element-plus',
    'vue',
    'vue-router',
    'scss',
  ],
  entry: [
    'src/index.ts',
  ],
  outDir: 'dist',
  dts: {
    entry: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
})
