import type { PluginOption, ResolvedConfig } from 'vite'
import type { QueryParamer, UserOptions } from './typing'
import { Parser } from './parser'

function dealParamer(id: string): QueryParamer {
  const queryParamer: QueryParamer = {
    fence: false,
    fileName: id,
    componentIndex: 0,
  }
  // 处理import参数
  queryParamer.fileName = `${id.split('.md')[0]}.md`
  if (id.includes('?fence')) {
    queryParamer.fence = true
    queryParamer.componentIndex = Number(id.split('&componentIndex=')[1])
  }
  else {
    queryParamer.fence = false
  }
  return queryParamer
}
const VitePluginMarkdownIt = (_options?: UserOptions): PluginOption => {
  let parser: Parser
  const defaultOptions: UserOptions = { containerName: 'demo', prefix: 'page-content' }
  const options: UserOptions = { ...defaultOptions, ..._options }

  return {
    name: 'vite-plugin-markdown-it',
    enforce: 'pre',
    async configResolved(_config: ResolvedConfig) {
      parser = new Parser(_config, options)
      // await parser.setupRenderer();
    },
    load(id: string) {
      if (id.includes('.md') && !id.includes('?raw'))
        return parser.load(id, dealParamer(id))

      return null
    },
    transform(code: string, id: string) {
      // 只对md文件进行解析, 排除?raw加载文件内容
      if (id.includes('.md') && !id.includes('?raw') && !id.includes('type=style'))
        return parser.transform(code, id, dealParamer(id))
      return null
    },
  }
}

export default VitePluginMarkdownIt
