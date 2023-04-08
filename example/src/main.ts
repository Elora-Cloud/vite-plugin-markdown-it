import { createApp } from 'vue'
import '../../src/theme'
import { createRouter, createWebHistory } from 'vue-router'
import type { I18n } from 'vue-i18n'
import {
  createI18n,
} from 'vue-i18n'
import App from './App.vue'
import CodeBox from './button/CodeBox.vue'
// eslint-disable-next-line import/namespace
import { addShortKey, dict, val1 } from './mixins/mymixin'
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: () => import('./index.md'),
    },
    {
      path: '/bu',
      component: () => import('./components/Button.vue'),
    },
    {
      path: '/dict',
      component: () => import('./components/Dict.vue'),
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
addShortKey(app)
dict(app)
const i18n = createI18n({
  legacy: false,
  locale: 'cn',
  sync: true, // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  silentTranslationWarn: true, // true - warning off
  missingWarn: false,
  silentFallbackWarn: true,
}) as I18n
// 此段代码写入main.js中
app.config.globalProperties.$t = i18n.global.t
app.mount('#app')
