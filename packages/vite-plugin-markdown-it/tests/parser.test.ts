import type { UserOptions } from '../src/core/typing';
import { fileURLToPath } from 'node:url';
import { normalizePath } from 'vite';

import { describe, it } from 'vitest';
// @ts-expect-error this is raw
import test from '../../example/src/base/alert.md?raw';
import { Parser } from '../src/core/parser';

const srcDir = normalizePath(fileURLToPath(new URL('../../example/src/base', import.meta.url)));

describe('parser', async () => {
  const defaultOptions: UserOptions = { containerName: 'demo', prefix: 'page-content' };

  const parser = new Parser({
    root: srcDir,
    base: '/',
  } as any, defaultOptions);
  it('should it parser', async () => {
    // console.log(test);
    const id = 'alert.md';
    await parser.load(id, {
      fence: false,
      filePath: `../example/src/base/${id}`,
      componentIndex: 0,
    });
    const source = await parser.transform(test, id, { filePath: 'alert.md' } as any);

    console.log(source);
  });
});
