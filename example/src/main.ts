import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalComponents } from './components/index'
import App from './App.vue'
import 'element-plus/dist/index.css'

const router = createRouter({
  history: createWebHistory('/'),

  routes: [
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
useGlobalComponents(app)
app.mount('#app')
