import type {
  Options, PluginSimple, PluginWithOptions, PluginWithParams,
} from 'markdown-it'

export interface QueryParamer {
  fence: boolean
  componentIndex: number
  fileName: string
}
/**
 * 使用自定义markdownit插件
 */
interface MarkdownItPluginOptions {
  readonly plugin: PluginSimple | PluginWithOptions | PluginWithParams
  readonly options: any[]
}
export interface UserOptions {
  markdownConfig?: Options
  /**
   * As a mark of `vue demo code`
   * @default "demo"
   */
  readonly containerName?: string
  /**
   * the div className wrapped all markdown file
   */
  readonly wrapClass?: string
  /**
   * the div className wrapped `vue demo code` render result
   */
  readonly demoWrapperClass?: string
  /**
   * the div className wrapped the `vue demo code` descriptions
   */
  readonly descWrapperClass?: string
  /**
   * the div className wrapped the `vue demo code` source code
   */
  readonly highlightClass?: string
  /**
   * the slot's name before `vue demo code` render result
   */
  readonly beforeDemoSlotName?: string
  /**
   * the slot's name after `vue demo code` render result
   */
  readonly afterDemoSlotName?: string
  /**
   * the slot's name before `vue demo code` descriptions
   */
  readonly beforeDescSlotName?: string
  /**
   * the slot's name after `vue demo code` descriptions
   */
  readonly afterDescSlotName?: string
  /**
   * the slot's name before `vue demo code` source code
   */
  readonly beforeCodeSlotName?: string
  /**
   * the slot's name after `vue demo code` source code
   */
  readonly afterCodeSlotName?: string
  readonly prefix?: string
  /**
   * custom markdownit plugins
   * @example
   * [{
   *  plugin: require('markdown-it-anchor'),
   *  options: [{
   *      level: 2,
            slugify: slugify,
            permalink: true,
            permalinkBefore: true
   *  }]
   * }]
   * =>
   * md.use(plugin, ...options)
   * @default []
   */
  readonly plugins?: MarkdownItPluginOptions[]

}
