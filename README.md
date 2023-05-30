# vite-plugin-markdown-it

A use markdown-it theme plugin for Vite.


## Install

```bash
npm i -D vite-plugin-markdown-it
```


## Usage

In `vite.config.[t|j]s`:

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

You need to import the `style` theme in your `main.[t|j]s` file.

```ts
import "./markdown.scss"
```



## TypeScript Config

If you're using Typescript than you'll want take the additional step of adding a "shim file" to help Typescript to understand how to think of Vue SFC files and Markdown files structurally. For VueJS developers, you've probably already done this for your VueJS files but you can wrap this up with a single file -- shims.d.ts -- in the root of your repo:

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

## Example Usage

See the [example](./example) app in this repo.
