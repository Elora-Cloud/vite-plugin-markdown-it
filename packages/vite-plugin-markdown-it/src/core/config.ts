/*
 * @Author: mumu
 * @Description: loader 入口
 * @Date: 2023-04-03 10:42:53
 * @LastEditTime: 2023-04-03 09:57:27
 */

import type MarkdownIt from 'markdown-it';
import type { UserOptions } from './typing';
import classes from '@toycode/markdown-it-class';
import markdownItAnchor from 'markdown-it-anchor';
import container from 'markdown-it-container';
import { full as emoji } from 'markdown-it-emoji';
import markdownItTocDoneRight from 'markdown-it-toc-done-right';
import tag from '../plugins/tag';

import tooltip from '../plugins/tooltip';

const classMapping = function classMapping(prefix = 'page-content') {
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
  };
};
export default function config(
  md: MarkdownIt,
  options: UserOptions,
  getName: () => string,
  getExampleSourceCode: () => string,
  setTocSource: (val: string) => void,
): void {
  const containerReg = new RegExp(`^${options.containerName}[\\s\\S]*?$`, 'i');
  md.use(emoji);
  md.use(tooltip);
  md.use(tag);
  md.use(classes, classMapping(options.prefix));
  md.use(markdownItAnchor, {
    slugify(s: string) {
      return String(s).trim().toLowerCase().replace(/\s+/g, '-');
    },
    permalink: markdownItAnchor.permalink.headerLink(),
  });
  md.use(markdownItTocDoneRight, {
    containerClass: 'toc-content',
    listClass: 'toc-items',
    itemClass: 'toc-item',
    linkClass: 'toc-link',
    listType: 'ul',
    slugify(s) {
      return String(s).trim().toLowerCase().replace(/\s+/g, '-');
    },
    callback: (res) => {
      if (res !== '<nav class="toc-content"></nav>')
        setTocSource(res.replace('<nav class="toc-content">', '').replace('</nav>', ''));
    },
  });
  md.use(container, options.containerName, {
    validate: (params: string): boolean => containerReg.test(params.trim()),
    render: (tokens: any, idx: number): string => {
      const regex = new RegExp(`^${options.containerName}\\s+(.*)$`);
      // open tag
      const m = tokens[idx].info.trim().match(regex);
      if (tokens[idx].nesting === 1) {
        // uniq component name
        const componentName: string = getName();
        // m[1] 是指 demo 后面描述的内容
        const description = m && m.length > 1 ? m[1] : '';

        let explain = '';
        if (description !== '')
          explain = `<template v-slot:explain>${md.render(description)}</template>`;
        return `<EloraCodeBox rawSource="${encodeURIComponent(getExampleSourceCode())}">${explain}<template v-slot:demo> <${componentName}/></template>`;
      }

      // close tag
      return '</EloraCodeBox>\n';
    },
  });
  md.use(container, 'tip');
  md.use(container, 'warning');
  // install markdown plugins if exist
  if (options.plugins && options.plugins.length > 0) {
    let len = options.plugins.length;
    while (len--) {
      const curPlugin = options.plugins[len];
      md.use(curPlugin.plugin, ...curPlugin.options);
    }
  }
}
