import type { App } from 'vue'

import CodeBox from './code-box.vue'
import DocPage from './doc-page.vue'
import VersionTag from './version-tag.vue'
import '../style/index.scss'
export const registerGlobalComponents = (app: App) => {
  app.component('CodeBox', CodeBox)
  app.component('DocPage', DocPage)
  app.component('VersionTag', VersionTag)
}
