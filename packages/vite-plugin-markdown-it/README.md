# vite-plugin-markdown-it

## Introduction
A vite plugin that integrates' markdown it '.

You can directly reference the '*. md' file as a component in the 'Vue' project built using 'vite'.

The default plugins that integrate markdown it are as follows:

* `markdown-it-anchor`
* `markdown-it-class`
* `markdown-it-container`
* `markdown-it-emoji`
* `markdown-it-toc-done-right`

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

You need to register the Vue global components and style files required for the plugin in your `main.[t|j]s` file.

In `main.[t|j]s`:

```ts
import { useGlobalComponents } from 'vite-plugin-markdown-it/example/src/components/index.ts';

const app = createApp(App)
useGlobalComponents(app);

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

## Precautions

* Vue routing mode cannot use 'hash' mode, otherwise the right navigation bar will become invalid

* The scrolling event of the component must be passed to the window layer, otherwise the right navigation bar will not be updated during scrolling
*
