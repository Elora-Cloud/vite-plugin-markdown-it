import type { App } from 'vue'

import EloraCodeBox from './code-box.vue'
import EloraDocPage from './doc-page.vue'
import EloraVersionTag from './version-tag.vue'
import './style/index.scss'
export const useGlobalComponents = (app: App) => {
  app.component('EloraCodeBox', EloraCodeBox)
  app.component('EloraDocPage', EloraDocPage)
  app.component('EloraVersionTag', EloraVersionTag)
}
