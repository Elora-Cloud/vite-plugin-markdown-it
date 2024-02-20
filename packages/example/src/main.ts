import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
// import { useGlobalComponents } from '@elora-cloud/vite-plugin-markdown-it'
import VitePluginMarkdownIt from '@elora-cloud/vite-plugin-markdown-it/components'
import '@elora-cloud/vite-plugin-markdown-it/dist/components/es/style.css'

import App from './App.vue'
import 'element-plus/dist/index.css'

const router = createRouter({
  history: createWebHistory('/'),

  routes: [
    {
      path: '/',
      redirect: '/button',
      name: 'index-main',
      meta: {
        title: 'index-main'
      }
    },
    {
      path: '/button',
      component: () => import('./base/button.md'),
    }, {
      path: '/alert',
      component: () => import('./base/alert.md'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.use(VitePluginMarkdownIt)
app.mount('#app')
