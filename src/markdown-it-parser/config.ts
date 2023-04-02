/*
 * @Author: Yang Lin
 * @Description: config markdownit
 * @Date: 2020-07-12 10:33:37
 * @LastEditTime: 2020-10-16 10:07:17
 * @FilePath: d:\snake\md-vue-loader\src\config.ts
 */

import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
// import Token from 'markdown-it/lib/token'
// import Renderer from 'markdown-it/lib/renderer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const emoji = require('markdown-it-emoji')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const classes = require('@toycode/markdown-it-class')
interface EffectiveProperty {
  (prop?: string): string
}

/**
 * if className exist, return contain className prop
 * or return ''
 * @param className
 */
const getEffectiveClass: EffectiveProperty = (className) => {
  if (className && className.trim())
    return `class="${className}"`

  return ''
}

/**
 * if slot name exist, return contain slot prop
 * or return ''
 * @param slotName
 */
const getEffectiveSlot: EffectiveProperty = (slotName) => {
  if (slotName && slotName.trim())
    return `<slot name="${slotName}"></slot>`

  return ''
}

interface Options {
  containerName?: string
  demoWrapperClass?: string
  descClass?: string
  highlightClass?: string
  beforeDemoSlotName?: string
  afterDemoSlotName?: string
  beforeDescSlotName?: string
  afterDescSlotName?: string
  beforeCodeSlotName?: string
  afterCodeSlotName?: string
  prefix?: string
}

export default function (
  md: MarkdownIt,
  {
    containerName = 'demo',
    demoWrapperClass,
    descClass,
    highlightClass,
    beforeDemoSlotName,
    afterDemoSlotName,
    beforeDescSlotName,
    afterDescSlotName,
    beforeCodeSlotName,
    afterCodeSlotName,
    prefix,
  }: Options,
  getName: () => string,
  classMapping: (prefix: string) => object,
): void {
  const containerReg = new RegExp(`^${containerName}[\\s\\S]*?$`, 'i')
  md.use(emoji)
  md.use(classes, classMapping(prefix || 'vue-a3ui-doc'))

  md.use(container, containerName, {
    validate: (params: string): boolean => {
      return containerReg.test(params.trim())
    },
    render: (tokens: any, idx: number): string => {
      // open tag
      const m = tokens[idx].info.trim().match(/^demo\s+(.*)$/)
      if (tokens[idx].nesting === 1) {
        // uniq component name
        const componentName: string = getName()
        // m[1] 是指 demo 后面描述的内容
        const description = m && m.length > 1 ? m[1] : ''

        let explain = ''
        if (description !== '')
          explain = `<div slot="explain">${md.render(description)}</div>`

        // replace `vue demo code` to child component
        // return `<div ${getEffectiveClass(demoWrapperClass)}>
        //     ${getEffectiveSlot(beforeDemoSlotName)}
        //     <${componentName}></${componentName}>
        //     ${getEffectiveSlot(afterDemoSlotName)}
        // `;
        return `<code-box>${explain}<${componentName} slot="demo" />`
      }
      else {
        // close tag
        return '</code-box>\n'
      }
    },
  })
  md.use(container, 'tip')
  md.use(container, 'warning')

  // const defaultFence: Renderer.RenderRule = md.renderer.rules.fence || function(
  //     tokens: Token[],
  //     idx: number
  // ) {
  //     const token: Token = tokens[idx];
  //     return `
  //         <div>
  //             <pre v-pre ><code class="language-${token.info}">${md.utils.escapeHtml(token.content)}</code></pre>
  //         </div>
  //     `;
  // };
  // insert the `vue demo code` source code
  // md.renderer.rules.fence = function(tokens, idx, options, env, self): string {
  //     const token: Token= tokens[idx];
  //     const prevToken: Token = tokens[idx - 1];
  //     // is `vue demo code` or not
  //     const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
  //     if (isInDemoContainer) {
  //         // `vue demo code` descriptions
  //         const description: string = isInDemoContainer[1].trim();
  //
  //         return `
  //             ${description ? `<div ${getEffectiveClass(descClass)}>
  //                 ${getEffectiveSlot(beforeDescSlotName)}
  //                 ${md.render(description)}
  //                 ${getEffectiveSlot(afterDescSlotName)}
  //             </div>` : ''}\n
  //             <div ${getEffectiveClass(highlightClass)}>
  //                 ${getEffectiveSlot(beforeCodeSlotName)}
  //                 <pre><code class="html" v-pre >${md.utils.escapeHtml(token.content)}</code></pre>
  //                 ${getEffectiveSlot(afterCodeSlotName)}
  //             </div>\n
  //         `;
  //     }
  //     return defaultFence(tokens, idx, options, env, self);
  // };
}
