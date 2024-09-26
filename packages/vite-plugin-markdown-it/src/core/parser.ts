import type { ResolvedConfig } from 'vite';
import type { QueryParamer, UserOptions } from './typing';
import fs from 'node:fs';
import { join, parse, relative } from 'node:path';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { normalizePath } from 'vite';
import Cache from './cache';
import config from './config';

export class Parser {
  public readonly config: ResolvedConfig;

  public readonly options: UserOptions;

  public cache: Cache;

  constructor(config: ResolvedConfig, options: UserOptions) {
    this.config = config;
    this.options = options;
    this.cache = new Cache();
  }

  public async parseMarkdown(source: string, id: string, queryParamer: QueryParamer) {
    const resourcePath: string = normalizePath(relative(this.config.root, queryParamer.filePath));

    const highlight = function highlight(str: string, lang: string, attrs: string) {
      // 代码高亮
      if (lang && hljs.getLanguage(lang)) {
        // 使用 highlight.js 实现代码高亮
        try {
          return `<pre v-pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
        }
        catch (error) {
          console.error(error);
          console.error(attrs);
        }
        return '';
      }

      // 使用外部默认转义
      return '';
    };
    let filePaths = resourcePath.split('/'); // linux
    if (resourcePath.includes('\\'))
      filePaths = resourcePath.split('\\'); // window
    const fileName = filePaths[filePaths.length - 1];
    // const path = resourcePath.split(fileName)[0];
    // 初始化markdownit
    const md: MarkdownIt = new MarkdownIt({
      html: true, // 在源码中启用 HTML 标签
      highlight,
      breaks: true, // 转换段落里的 '\n' 到 <br>。
      linkify: true, // 将类似 URL 的文本自动转换为链接。
      ...this.options.markdownConfig,
    });

    // component name counter
    let componentIndex = 0;
    // components props in this markdown-vue file
    // const components: string[] = []
    // the final script appended
    let srciptImport = '';

    let toc_source = '';
    // config markdown custom code
    config(md, this.options, () => {
      // const request = `${filePathTmp}block${componentIndex}-${fileName}?fence&componentIndex=${componentIndex++}`;
      // get cache names
      const exampleName = this.cache.getExampleNamesCache()[componentIndex++];
      const componentName = exampleName.name;
      const request = `./examples/${fileName.split('.md')[0]}/${exampleName.demoName}`;
      // import component
      srciptImport += `import ${componentName} from '${request}';\n`;
      return componentName;
    }, () => {
      return this.cache.getExampleCodeCache(id, componentIndex);
    }, (res) => { toc_source = res; });

    // markdownit convert md fiele to html file
    const code: string = md.render(source);
    const wrapClass = (this.options && this.options.wrapClass) || 'doc-content-wrapper';
    const demoWrapperClass = (this.options && this.options.demoWrapperClass) || 'page-content';
    const tocWrapperClass = (this.options && this.options.tocWrapperClass) || 'toc-wrapper';
    // the final return
    // do not set <script lang="ts">,esbuild will error
    const ret = `
        <template>
          <div class="${wrapClass}">
             <div class="${demoWrapperClass}">
                  ${code}
              </div>
              <EloraDocPage tocWrapperClass="${tocWrapperClass}">
                ${toc_source}
               </EloraDocPage>
          </div>
        </template>
        <script setup>
            ${srciptImport}
        </script>
    `;
    return ret;
  }

  public async transform(code: string, id: string, queryParamer: QueryParamer) {
    const renderCodeCache = this.cache.getRenderCodeCache(id);
    if (renderCodeCache)
      return renderCodeCache;

    const result = await this.parseMarkdown(code, id, queryParamer);
    // 第一次解析，缓存渲染结果
    this.cache.resetExampleCache(id);
    const { base, dir } = parse(queryParamer.filePath);
    this.cache.setCurrentFile(id, base, dir);
    this.cache.setRenderCodeCache(id, result);
    return result;
  }

  public async load(id: string, queryParamer: QueryParamer) {
    const sourceCodeCache = this.cache.getSourceCodeCache(id);
    if (sourceCodeCache)
      return sourceCodeCache;
    const resourcePath = queryParamer.filePath;
    const result = fs.readFileSync(resourcePath, 'utf-8');
    const { dir, base, name } = parse(resourcePath);
    const demoReg = new RegExp(`:::${this.options.containerName || 'demo'}[\\s\\S]*?:::`, 'gi');
    let index = 0;
    // 第一次解析，缓存渲染结果
    this.cache.resetExampleCache(id);
    this.cache.setCurrentFile(id, base, dir);
    const resultCode = result.replace(demoReg, (matches) => {
      const blockCode = matches.replace(/```[\s\S]*?```/, (t) => {
        const blockPath = t.replaceAll('```', '').trim();
        let blockFileName;
        if (blockPath && blockPath !== '')
          blockFileName = `${blockPath}.vue`;
        else
          blockFileName = `demo${index++}.vue`;

        const code = fs.readFileSync(join(dir, 'examples', name, blockFileName), 'utf-8');
        this.cache.setExampleCodeCache(code, blockFileName);
        return `\`\`\`html \n${code}\n\`\`\``;
      });
      return blockCode;
    });
    this.cache.setSourceCodeCache(id, resultCode);
    return resultCode;
  }
}
