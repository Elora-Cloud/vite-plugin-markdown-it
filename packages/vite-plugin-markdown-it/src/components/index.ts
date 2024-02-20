import type { App, Plugin } from 'vue'
import { EloraCodeBox, EloraDocPage, EloraVersionTag } from './components'
import './style/index.scss'

const components = [EloraCodeBox, EloraDocPage, EloraVersionTag]
export * from './components'
const VitePluginMarkdownIt: Plugin = {
  install(App: App) {
    components.forEach((item) => {
      App.use(item)
    })
  },
}

export default VitePluginMarkdownIt
