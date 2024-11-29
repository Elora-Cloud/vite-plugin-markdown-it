import { fileURLToPath } from 'node:url';
import VitePluginMarkdownIt from '@elora-cloud/vite-plugin-markdown-it/core';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  build: {
    // 设置最终构建的浏览器兼容目标
    target: 'modules',
    minify: true,
    emptyOutDir: false,
    //  chunk 大小警告的限制（以 kb为单位）
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
    outDir: 'dist',
  },
  plugins: [
    VitePluginMarkdownIt(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Inspect(),
    AutoImport({
      imports: ['vue', '@vueuse/core', 'vue-router'],
      // dirs: ['src/utils'], // 配置自动导入的目录
      dts: './types/auto-import.d.ts',
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    components({
      dts: 'types/components.d.ts',
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      }), IconsResolver({
        enabledCollections: ['ep'],
      })],
      deep: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
