import { fileURLToPath } from 'url'
import { describe, it } from 'vitest'
import { normalizePath } from 'vite'

import { Parser } from '../src/parser'
import test from '../example/src/base/button.md?raw'
import type { UserOptions } from '../src/typing'

const srcDir = normalizePath(fileURLToPath(new URL('../example/src/base', import.meta.url)))

describe('parser', async () => {
  const defaultOptions: UserOptions = { containerName: 'demo', prefix: 'vue-jeecg-plus-doc' }

  const parser = new Parser({
    root: srcDir,
    base: '/',
  } as any, defaultOptions)
  it('should it parser', async () => {
    // console.log(test);
    const source = await parser.transform(test, 'auto-complete.md', {} as any)
    console.log(source)
  })
})
