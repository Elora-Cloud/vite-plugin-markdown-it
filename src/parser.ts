import { relative } from 'path'
import fs from 'fs'
import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import type { ResolvedConfig } from 'vite'
import { normalizePath } from 'vite'
import uniqid from 'uniqid'
import config from './config'
import type { QueryParamer, UserOptions } from './typing'
import Cache from './cache'

export class Parser {
  public readonly config: ResolvedConfig

  public readonly options: UserOptions

  public cache: Cache

  constructor(config: ResolvedConfig, options: UserOptions) {
    this.config = config
    this.options = options
    this.cache = new Cache()
  }

  // public async setupRenderer() {
  // }
  public async parseStyle(id: string, opt: any) {
    //

  }

  public async parseMarkdown(source: string, id: string, queryParamer: QueryParamer) {
    const resourcePath: string = normalizePath(relative(this.config.root, queryParamer.fileName))

    // The uniqu name of child component for `vue demo code`
    const uniqComponentName = `Com${uniqid()}Demo`

    const highlight = function highlight(str: string, lang: string, attrs: string) {
      // 代码高亮
      if (lang && hljs.getLanguage(lang)) {
        // 使用 highlight.js 实现代码高亮
        try {
          return `<pre v-pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
        }
        catch (error) {
          console.error(error)
          console.error(attrs)
        }
        return ''
      }

      // 使用外部默认转义
      return ''
    }
    let filePaths = resourcePath.split('/') // linux
    if (resourcePath.includes('\\')) filePaths = resourcePath.split('\\') // window
    const fileName = filePaths[filePaths.length - 1]
    // const path = resourcePath.split(fileName)[0];
    // 初始化markdownit
    const md: MarkdownIt = new MarkdownIt({
      html: true, // 在源码中启用 HTML 标签
      highlight,
      breaks: true, // 转换段落里的 '\n' 到 <br>。
      linkify: true, // 将类似 URL 的文本自动转换为链接。
      ...this.options.markdownConfig,
    })

    // component name counter
    let componentIndex = 0
    // components props in this markdown-vue file
    // const components: string[] = []
    // the final script appended
    let srciptImport = ''

    let toc_source = ''
    // config markdown custom code
    config(md, this.options, () => {
      // gen uniq component Name
      const componentName = `${uniqComponentName}${componentIndex}`
      // gen query params
      // const request = `${filePathTmp}block${componentIndex}-${fileName}?fence&componentIndex=${componentIndex++}`;
      const request = `./examples/${fileName.split('.md')[0]}/demo${componentIndex++}.vue`
      // import component
      srciptImport += `import ${componentName} from '${request}';\n`
      return componentName
    }, () => {
      return this.cache.getExampleCodeCache(id, componentIndex)
    }, (res) => { toc_source = res })

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
    const wrapClass = (this.options && this.options.wrapClass) || 'doc-content-wrapper'
    const demoWrapperClass = (this.options && this.options.demoWrapperClass) || 'page-content'
    const tocWrapperClass = (this.options && this.options.tocWrapperClass) || 'toc-wrapper'
    // the final return
    const ret = `
        <template>
          <div class="${wrapClass}">
             <div class="${demoWrapperClass}">
                  ${code}
              </div>
              <DocPage tocWrapperClass="${tocWrapperClass}">
                ${toc_source}
               </DocPage>
          </div>
        </template>
        <script setup lang="ts">
            ${srciptImport}
        </script>
    `
    return ret
  }

  public async transform(code: string, id: string, queryParamer: QueryParamer) {
    const renderCodeCache = this.cache.getRenderCodeCache(id)
    if (renderCodeCache)
      return renderCodeCache

    const result = await this.parseMarkdown(code, id, queryParamer)
    // 第一次解析，缓存渲染结果
    this.cache.resetExampleCache(id)
    this.cache.setCurrentFile(id, queryParamer.fileName)
    this.cache.setRenderCodeCache(id, result)
    return result
  }

  public async load(id: string, queryParamer: QueryParamer) {
    const sourceCodeCache = this.cache.getSourceCodeCache(id)
    if (sourceCodeCache)
      return sourceCodeCache

    const result = fs.readFileSync(queryParamer.fileName, 'utf-8')
    const resourcePath = queryParamer.fileName
    let filePaths = resourcePath.split('/') // linux
    if (resourcePath.includes('\\')) filePaths = resourcePath.split('\\') // window
    const fileName = filePaths[filePaths.length - 1]
    const path = resourcePath.split(fileName)[0]
    const demoReg = new RegExp(`:::${this.options.containerName || 'demo'}[\\s\\S]*?:::`, 'ig')
    let index = 0
    // 第一次解析，缓存渲染结果
    this.cache.resetExampleCache(id)
    this.cache.setCurrentFile(id, queryParamer.fileName)
    const resultCode = result.replace(demoReg, (matches) => {
      const blockCode = matches.replace(/```[\s\S]*?```/i, (t) => {
        const blockPath = t.replaceAll('```', '').trim()
        let blockFileName
        if (blockPath && blockPath !== '')
          blockFileName = `${blockPath}.vue`
        else
          blockFileName = `demo${index++}.vue`

        const code = fs.readFileSync(`${path}examples/${fileName.split('.md')[0]}/${blockFileName}`, 'utf-8')
        this.cache.setExampleCodeCache(code)
        return `\`\`\`html \n${code}\n\`\`\``
      })
      return blockCode
    })
    this.cache.setSourceCodeCache(id, resultCode)
    return resultCode
  }
}
