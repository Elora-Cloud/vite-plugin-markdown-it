import type {
  Options,
  PluginSimple,
  PluginWithOptions,
  PluginWithParams,
} from 'markdown-it';

export interface QueryParamer {
  fence: boolean
  componentIndex: number
  filePath: string
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
   * the div className wrapped the `vue demo code` toc
   */
  readonly tocWrapperClass?: string
  /**
   * the div className wrapped the `vue demo code` source code
   */
  readonly highlightClass?: string
  /**
   * the div className wrapped the `vue demo code` source code
   */
  readonly prefix?: string

  /**
   * custom markdownit plugins
   */
  readonly plugins?: MarkdownItPluginOptions[]

}
