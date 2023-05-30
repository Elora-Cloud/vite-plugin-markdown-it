import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CodeBox from './components/code-box.vue'
import VersionTag from './components/version-tag.vue'
import './style/index.scss'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('./base/button.md'),
    }, {
      path: '/alert',
      component: () => import('./base/alert.md'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.component('CodeBox', CodeBox)
app.component('VersionTag', VersionTag)
app.mount('#app')
