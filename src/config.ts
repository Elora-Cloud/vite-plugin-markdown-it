/*
 * @Author: mumu
 * @Description: loader 入口
 * @Date: 2023-04-03 10:42:53
 * @LastEditTime: 2023-04-03 09:57:27
 */

import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import emoji from 'markdown-it-emoji'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import classes from '@toycode/markdown-it-class'
import type { UserOptions } from './typing'

const classMapping = function classMapping(prefix = 'vue-jeecg-ui-doc') {
  return {
    h1: `${prefix}-h1`,
    h2: `${prefix}-h2`,
    h3: `${prefix}-h3`,
    h4: `${prefix}-h4`,
    h5: `${prefix}-h5`,
    h6: `${prefix}-h6`,
    hr: `${prefix}-hr`,
    a: `${prefix}-a`,
    input: `${prefix}-input`,
    img: `${prefix}-img`,
    p: `${prefix}-p`,
    kbd: `${prefix}-kbd`,
    code: `${prefix}-code`,
    pre: `${prefix}-pre`,
    details: `${prefix}-details`,
    summary: `${prefix}-summary`,
    blockquote: `${prefix}-blockquote`,
    strong: `${prefix}-strong`,
    table: `${prefix}-table`,
    tr: `${prefix}-tr`,
    th: `${prefix}-th`,
    td: `${prefix}-td`,
    ol: `${prefix}-ol`,
    ul: `${prefix}-ul`,
    li: `${prefix}-li`,
    dd: `${prefix}-dd`,
    dl: `${prefix}-dl`,
    dt: `${prefix}-dt`,
  }
}
export default function config(
  md: MarkdownIt,
  options: UserOptions,
  getName: () => string,
  getExampleSourceCode: () => string,
): void {
  const containerReg = new RegExp(`^${options.containerName}[\\s\\S]*?$`, 'i')
  md.use(emoji)
  md.use(classes, classMapping(options.prefix))
  md.use(container, options.containerName, {
    validate: (params: string): boolean => containerReg.test(params.trim()),
    render: (tokens: any, idx: number): string => {
      // open tag
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        // uniq component name
        const componentName: string = getName()
        // m[1] 是指 demo 后面描述的内容
        const description = m && m.length > 1 ? m[1] : ''

        let explain = ''
        if (description !== '') explain = `<template v-slot:explain>${md.render(description)}</template>`
        return `<CodeBox rawSource="${encodeURIComponent(getExampleSourceCode())}">${explain}<template v-slot:demo> <${componentName}/></template>`
      }

      // close tag
      return '</CodeBox>\n'
    },
  })
  md.use(container, 'tip')
  md.use(container, 'warning')
}
