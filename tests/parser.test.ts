import { fileURLToPath } from 'url'
import { resolve } from 'path'
import { normalizePath } from 'vite'
import { describe, expect, it } from 'vitest'
import { Parser } from '../src/parser'
// @ts-expect-error this is raw
import test from './fixtures/button.md?raw'
const srcDir = normalizePath(fileURLToPath(new URL('./fixtures', import.meta.url)))
const testPath = normalizePath(resolve(srcDir, 'ButtonDemo.md'))

describe('parser', async () => {
  const parser = new Parser({
    root: srcDir,
    base: '/',
  } as any, {})
  await parser.setupRenderer()
  it('should it parser', async () => {
    console.log(new URL('./fixtures', import.meta.url))
    const source = await parser.parseMarkdown(test, testPath)
    console.log(source)
    expect(source).toMatchInlineSnapshot(`
      "
              <template>
                  <div class=\\"vue-a3ui-doc-wrap\\">
                      <h2 class=\\"vue-a3ui-doc-h2\\">Button 组件</h2>
      <p class=\\"vue-a3ui-doc-p\\">一、<code>Button</code> 组件的基本使用</p>
      <code-box><div slot=\\"explain\\"><h4 class=\\"vue-a3ui-doc-h4\\">Button 组件基础用法:</h4>
      </div><Com1kqr0rqklfz620h1Demo0 slot=\\"demo\\" /><pre><code class=\\"language-vue\\">
      &lt;template&gt;
          &lt;div class=&quot;demo&quot;&gt;
              &lt;Button&gt;默认按钮&lt;/Button&gt;
              &lt;Button type=&quot;primary&quot;&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;success&quot;&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;info&quot;&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;warning&quot;&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;danger&quot;&gt;主要按钮&lt;/Button&gt;
          &lt;/div&gt;
      &lt;/template&gt;

      &lt;script setup&gt;
      import Button from &quot;./components/Button&quot;;
      &lt;/script&gt;

      &lt;style scoped &gt;
          .demo{
              padding-bottom: 20px;
              border-bottom: 1px solid #333;
              width: 100%;
              position: relative;
          }
      &lt;/style&gt;

      </code></pre>
      </code-box>
      <h2 class=\\"vue-a3ui-doc-h2\\">Button 组件</h2>
      <p class=\\"vue-a3ui-doc-p\\">二、<code>Button</code> 组件的基本使用</p>
      <code-box><div slot=\\"explain\\"><h4 class=\\"vue-a3ui-doc-h4\\">Button 组件disabled用法:</h4>
      </div><Com1kqr0rqklfz620h1Demo1 slot=\\"demo\\" /><pre><code class=\\"language-vue\\">
      &lt;template&gt;
          &lt;div class=&quot;demo&quot;&gt;
              &lt;Button disabled&gt;默认按钮&lt;/Button&gt;
              &lt;Button type=&quot;primary&quot; disabled&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;success&quot; disabled&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;info&quot; disabled&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;warning&quot; disabled&gt;主要按钮&lt;/Button&gt;
              &lt;Button type=&quot;danger&quot; disabled&gt;主要按钮&lt;/Button&gt;
          &lt;/div&gt;
      &lt;/template&gt;

      &lt;script setup&gt;
      import Button from &quot;./components/Button&quot;;
      &lt;/script&gt;

      &lt;style scoped &gt;
          .demo{
              padding-bottom: 20px;
              border-bottom: 1px solid #333;
              width: 100%;
              position: relative;
          }
      &lt;/style&gt;
      </code></pre>
      </code-box>

                  </div>
              </template>

              <script setup>
                  import Com1kqr0rqklfz620h1Demo0 from 'ButtonDemo.md?fence&componentIndex=0';
      import Com1kqr0rqklfz620h1Demo1 from 'ButtonDemo.md?fence&componentIndex=1';

              </script>
          "
    `)
  })
})
