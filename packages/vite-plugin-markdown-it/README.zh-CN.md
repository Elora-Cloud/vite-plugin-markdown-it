# vite-plugin-markdown-it

## 介绍

一个集成了`markdown-it`的vite插件。

可以在使用`vite`构建的`Vue`项目中直接引用 `*.md`文件作为组件。

默认集成了了markdown-it的插件如下：

* `markdown-it-anchor`
* `@toycode/markdown-it-class`
* `markdown-it-container`
* `markdown-it-emoji`
* `markdown-it-toc-done-right`

## 安装

```bash
npm i vite-plugin-markdown-it
```

## 使用

在 `vite.config.[t|j]s`增加如下配置：

```ts
import VitePluginMarkdownIt from '@elora-cloud/vite-plugin-markdown-it/core';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    VitePluginMarkdownIt(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],
});
```
你需要注册插件所需的vue全局组件，以及样式文件，在`main.[t|j]s`文件中。

```ts
import VitePluginMarkdownIt from '@elora-cloud/vite-plugin-markdown-it/components';
import '@elora-cloud/vite-plugin-markdown-it/dist/components/es/style.css';
// scss
import '@elora-cloud/vite-plugin-markdown-it/dist/components/es/components/style/index';
// css
// import '@elora-cloud/vite-plugin-markdown-it/dist/components/es/components/style/css';

const app = createApp(App);
app.use(VitePluginMarkdownIt);
```

## TypeScript配置

如果你使用的是Typescript，你需要在项目根目录下创建一个`shims.d.ts`文件，
用于帮助Typescript理解Vue SFC文件和Markdown文件的结构。
对于VueJS开发者，你可能已经为你的VueJS文件做了这个，但是你可以用一个单独的文件来包装它`shims.d.ts`在你的项目根目录下：

```ts
declare module '*.vue' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue';
  const Component: ComponentOptions;
  export default Component;
}
```

## 示例

查看 [example](./example) 在当前的项目中。

## 注意事项

* vue路由模式不能使用 `hash` 模式，否则右边导航条会失效
* 组件的滚动事件一定要传递到window这一层，否则滚动时右边导航条不会更新
*
