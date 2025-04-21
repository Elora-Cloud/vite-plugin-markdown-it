import VitePluginMarkdownIt from '@elora-cloud/vite-plugin-markdown-it/components';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import '@elora-cloud/vite-plugin-markdown-it/dist/components/es/components/style/index';
import '@elora-cloud/vite-plugin-markdown-it/dist/components/dist/vite-plugin-markdown-it.css';

import 'element-plus/theme-chalk/src/var.scss';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: '/button',
      name: 'index-main',
      meta: {
        title: 'index-main',
      },
    },
    {
      path: '/button',
      component: () => import('./base/button.md'),
    },
    {
      path: '/alert',
      component: () => import('./base/alert.md'),
    },
  ],
});

const app = createApp(App);
app.use(router);
app.use(VitePluginMarkdownIt);
app.mount('#app');
