# vite-plugin-markdown-it

一个实现了markdown-it样式的vite插件。



## 安装

```bash
npm i -D vite-plugin-markdown-it
```


## 使用

在 `vite.config.[t|j]s`增加如下配置：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginMarkdownIt from 'vite-plugin-markdown-it'
export default defineConfig({
  plugins: [
    VitePluginMarkdownIt(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
})

```
你需要拷贝 example 目录下的文件到你的项目中

同时你还需要导入`style`的主题样式和注册全局vue组件在`main.[t|j]s`文件中。

```ts
import CodeBox from './components/code-box.vue'
import VersionTag from './components/version-tag.vue'
import "./index.scss"

app.component('CodeBox', CodeBox)
app.component('VersionTag', VersionTag)
```



## TypeScript配置

如果你使用的是Typescript，你需要在项目根目录下创建一个`shims.d.ts`文件，
用于帮助Typescript理解Vue SFC文件和Markdown文件的结构。
对于VueJS开发者，你可能已经为你的VueJS文件做了这个，但是你可以用一个单独的文件来包装它`shims.d.ts`在你的项目根目录下：


```ts
declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
```

## 示例

查看 [example](./example) 在当前的项目中。

## 注意事项

* vue路由模式不能使用 `hash` 模式，否则右边导航条会失效
* 组件的滚动事件一定要传递到window这一层，否则滚动时右边导航条不会更新
* 
