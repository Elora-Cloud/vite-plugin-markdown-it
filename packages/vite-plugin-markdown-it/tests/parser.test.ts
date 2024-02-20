import { fileURLToPath } from 'url'
import { describe, it } from 'vitest'
import { normalizePath } from 'vite'

import { Parser } from '../src/core/parser'
// @ts-expect-error this is raw
import test from '../example/src/base/button.md?raw'
import type { UserOptions } from '../src/core/typing'

const srcDir = normalizePath(fileURLToPath(new URL('../example/src/base', import.meta.url)))

describe('parser', async () => {
  const defaultOptions: UserOptions = { containerName: 'demo', prefix: 'page-content' }

  const parser = new Parser({
    root: srcDir,
    base: '/',
  } as any, defaultOptions)
  it('should it parser', async () => {
    // console.log(test);
    const source = await parser.transform(test, 'button.md', { fileName: 'button.md' } as any)
    // eslint-disable-next-line no-console
    console.log(source)
  })
})
