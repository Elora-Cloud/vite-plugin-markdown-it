/*
 * @Author: Yang Lin
 * @Description: loader 入口
 * @Date: 2020-07-18 10:42:53
 * @LastEditTime: 2020-10-16 09:57:27
 * @FilePath: d:\snake\md-vue-loader\src\index.ts
 */
import MarkdownIt from 'markdown-it'
// import loaderUtils from 'loader-utils'
// import type {
//   loader,
// } from 'webpack'
import uniqid from 'uniqid'
import { classMapping, colors } from './colors'
import config from './config'
import type Options from './options'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hljs = require('highlight.js')

// The uniqu name of child component for `vue demo code`
const uniqComponentName = `Com${uniqid()}Demo`

// loader query params
type QueryOptions = Partial<loaderUtils.OptionObject> | {
  fence: boolean | null | string
  componentIndex: boolean | null | string | number
}

const convert: (source: string, resourcePath: string) => string = function (source, resourcePath) {
  console.log(resourcePath)
  // if (source instanceof Buffer)
  //   return source

  // const loaderContext: loader.LoaderContext = this
  // const {
  //   resourcePath,
  //   resourceQuery,
  // } = loaderContext
  // // parse query params
  // const queryParams: QueryOptions = resourceQuery.length > 0
  //   ? loaderUtils.parseQuery(resourceQuery)
  //   : {
  //       fence: false,
  //       componentIndex: null,
  //     }

  // loader options
  // const options: Options = loaderUtils.getOptions(loaderContext)
  const options: Options = {}
  let filePaths = resourcePath.split('/') // linux
  if (resourcePath.includes('\\'))
    filePaths = resourcePath.split('\\') // window

  const fileName = filePaths[filePaths.length - 1]

  // has fence mark
  // strip the `vue demo code` directly
  // if (queryParams.fence) {
  //   // the nth of component
  //   const index: number = typeof queryParams.componentIndex === 'string'
  //     ? isNaN(Number(queryParams.componentIndex))
  //       ? 0
  //       : Number(queryParams.componentIndex)
  //     : 0
  //   // match the `vue demo code`
  //   const demoReg = new RegExp(`:::${options.containerName || 'demo'}[\\s\\S]*?:::`, 'ig')
  //   const matches: null | RegExpMatchArray = source.match(demoReg)
  //   if (!matches || !matches[index]) {
  //     console.log(`${colors.warn('[markdone-vue-loader]')}: resolve ${index}th ${colors.error(':::demo')} in ${resourcePath} failed`)
  //     return ''
  //   }
  //
  //   // weed out description code
  //   // get the real single file component format file
  //   const vueBlocks: null | RegExpMatchArray = matches[index].match(/```([\s\S]*?)(<[\s\S]*)```/i)
  //   if (vueBlocks && vueBlocks[2]) {
  //     if (fileName == 'button.md')
  //
  //       console.log(vueBlocks[2])
  //
  //     return vueBlocks[2]
  //   }
  //
  //   console.log(`${colors.warn('[markdone-vue-loader]')}: resolve ${index}th ${colors.error(':::demo')} markded vue code failed in ${resourcePath}.`)
  //   return ''
  // }
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
    ...options.markdownConfig,
  })

  // component name counter
  let componentIndex = 0
  // components props in this markdown-vue file
  // const components: string[] = []
  // the final script appended
  let srciptImport = ''

  // config markdown custom code
  config(md, {
    containerName: options.containerName,
    demoWrapperClass: options.demoWrapperClass,
    descClass: options.descWrapperClass,
    highlightClass: options.highlightClass,
    beforeDemoSlotName: options.beforeDemoSlotName,
    afterDemoSlotName: options.afterDemoSlotName,
    beforeDescSlotName: options.beforeDescSlotName,
    afterDescSlotName: options.afterDescSlotName,
    beforeCodeSlotName: options.beforeCodeSlotName,
    afterCodeSlotName: options.afterCodeSlotName,
    prefix: options.prefix,
  }, () => {
    // gen uniq component Name
    const componentName = `${uniqComponentName}${componentIndex}`
    // gen query params
    const request = `@/../${resourcePath}?fence&componentIndex=${componentIndex++}`
    // import component
    // srciptImport += `import ${componentName} from ${loaderUtils.stringifyRequest(loaderContext, request)};`
    srciptImport += `import ${componentName} from '${request}';\n`
    // regist child component
    // components.push(`'${componentName}': ${componentName}`)
    return componentName
  }, classMapping)

  // install markdown plugins if exist
  if (options.plugins && options.plugins.length > 0) {
    let len = options.plugins.length
    while (len--) {
      const curPlugin = options.plugins[len]
      md.use(curPlugin.plugin, ...curPlugin.options)
    }
  }

  // markdownit convert md fiele to html file
  const code: string = md.render(source)

  // the div className wrapped all md file
  const templateClass: string = options.wrapClass
    ? `class="${options.wrapClass}"`
    : ''
  const wrapClass = (options && options.wrapClass) || 'vue-a3ui-doc-wrap'

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
  if (fileName === 'ButtonDemo.md.md')
    // eslint-disable-next-line no-console
    console.log(ret)

  return ret
}

export default convert
