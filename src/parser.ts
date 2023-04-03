import { relative } from 'path'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import { normalizePath } from 'vite'
import type { ResolvedConfig } from 'vite'
import uniqid from 'uniqid'
import config from './config'
import type { QueryParamer, UserOptions } from './typing'

// The uniqu name of child component for `vue demo code`
const uniqComponentName = `Com${uniqid()}Demo`

export class Parser {
  constructor(public readonly config: ResolvedConfig, public readonly options: UserOptions) {
  }

  public async setupRenderer() {
  }

  public async parseMarkdown(source: string, id: string, queryParamer: QueryParamer) {
    const resourcePath: string = normalizePath(relative(this.config.root, id))

    let filePaths = resourcePath.split('/') // linux
    if (resourcePath.includes('\\'))
      filePaths = resourcePath.split('\\') // window

    const fileName = filePaths[filePaths.length - 1]
    // has fence mark
    // strip the `vue demo code` directly
    if (queryParamer.fence) {
      // the nth of component
      const index: number = typeof queryParamer.componentIndex === 'string'
        ? isNaN(Number(queryParamer.componentIndex))
          ? 0
          : Number(queryParamer.componentIndex)
        : 0
      // match the `vue demo code`
      const demoReg = new RegExp(`:::${this.options.containerName || 'demo'}[\\s\\S]*?:::`, 'ig')
      const matches: null | RegExpMatchArray = source.match(demoReg)
      if (!matches || !matches[index])
        return ''

      // weed out description code
      // get the real single file component format file
      const vueBlocks: null | RegExpMatchArray = matches[index].match(/```([\s\S]*?)(<[\s\S]*)```/i)
      if (vueBlocks && vueBlocks[2])
        return vueBlocks[2]
      return ''
    }
    // 初始化markdownit
    // @ts-expect-error
    const md: MarkdownIt = new MarkdownIt({
      html: true,
      highlight(str: string, lang: string) {
        // 代码高亮
        if (lang && hljs.getLanguage(lang)) {
          // 使用 highlight.js 实现代码高亮
          try {
            return `<pre v-pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
          }
          catch (error) {
            console.error(error)
          }
        }
        else {
          // 使用外部默认转义
          return ''
        }
      },
      breaks: true,
      linkify: true,
      ...this.options.markdownConfig,
    })

    // component name counter
    let componentIndex = 0
    // components props in this markdown-vue file
    // const components: string[] = []
    // the final script appended
    let srciptImport = ''

    // config markdown custom code
    config(md, this.options, () => {
      // gen uniq component Name
      const componentName = `${uniqComponentName}${componentIndex}`
      // gen query params
      const request = `./${fileName}?fence&componentIndex=${componentIndex++}`
      // import component
      srciptImport += `import ${componentName} from '${request}';\n`
      return componentName
    })

    // install markdown plugins if exist
    if (this.options.plugins && this.options.plugins.length > 0) {
      let len = this.options.plugins.length
      while (len--) {
        const curPlugin = this.options.plugins[len]
        md.use(curPlugin.plugin, ...curPlugin.options)
      }
    }
    // markdownit convert md fiele to html file
    const code: string = md.render(source)
    const wrapClass = (this.options && this.options.wrapClass) || 'vue-a3ui-doc-wrap'

    // the final return
    const ret = `
        <template>
            <div class="${wrapClass}">
                ${code}
            </div>
        </template>

        <script setup>
            ${srciptImport}
        </script>
    `
    return ret
  }

  public async transform(code: string, id: string, queryParamer: QueryParamer) {
    if (id.includes('.md'))
      return await this.parseMarkdown(code, id = `${id.split('.md')[0]}.md`, queryParamer)
  }
}
