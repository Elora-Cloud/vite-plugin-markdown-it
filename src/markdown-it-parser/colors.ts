/*
 * @Author: Yang Lin
 * @Description: terminal console
 * @Date: 2020-07-12 17:27:40
 * @LastEditTime: 2020-08-01 22:01:41
 * @FilePath: f:\sourcecode\md-vue-loader\src\colors.ts
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('colors')

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
})

const classMapping = function (prefix: string) {
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
export { colors, classMapping }
