import { createApp } from 'vue'
import '../../src/theme'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CodeBox from './button/CodeBox.vue'
// eslint-disable-next-line import/namespace
import { val1 } from './mixins/mymixin'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('./index.md'),
    },
    {
      path: '/test',
      component: () => import('./test.md'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.component('CodeBox', CodeBox)
app.mixin(val1)
app.mount('#app')
