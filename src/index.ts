import type { PluginOption } from 'vite'
import { Parser } from './parser'
import type { QueryParamer, UserOptions } from './typing'

const VitePluginMarkdownIt = (_options?: UserOptions): PluginOption => {
  let parser: Parser
  const defaultOptions: UserOptions = { containerName: 'demo', prefix: 'vue-a3ui-doc' }
  const options: UserOptions = { ...defaultOptions, ..._options }
  const queryParamer: QueryParamer = {
    fence: false,
  }
  return {
    name: 'vite-plugin-markdown-it',
    async configResolved(_config) {
      parser = new Parser(_config, options)
      await parser.setupRenderer()
    },
    transform(code, id) {
      // 只对md文件进行解析
      if (id.includes('.md')) {
        // 处理import参数
        if (id.includes('?fence')) {
          queryParamer.fence = true
          queryParamer.componentIndex = id.split('&componentIndex=')[1]
        }
        else {
          queryParamer.fence = false
        }
        return parser.transform(code, id, queryParamer)
      }
    },
  }
}

export {
  VitePluginMarkdownIt,
}

export default VitePluginMarkdownIt
