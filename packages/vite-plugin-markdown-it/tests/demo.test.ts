import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'vitest';

const demoReg = /:::demo[\s\S]*?:::/gi;
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const dir_path = (...args: string[]) => resolve(__dirname, ...args);
// eslint-disable-next-line unused-imports/no-unused-vars
const ROOT_DIR = dir_path('.');
// eslint-disable-next-line unused-imports/no-unused-vars
const SRC_DIR = dir_path('../src');
const EXAMPLE_DIR = dir_path('../../example');

const pathDir = resolve(EXAMPLE_DIR, 'src/base');
describe('mdBlock2vue', () => {
  it('should work', () => {
    const rootDir = fs.readdirSync(pathDir);
    for (let i = 0; i < rootDir.length; i++) {
      const fileName = rootDir.at(i);
      if (fileName && fileName.includes('.md')) {
        const result = fs.readFileSync(`${pathDir}\\${fileName}`, 'utf-8');
        const filepath = fileName.split('.md')[0];
        const matches: null | RegExpMatchArray = result.match(demoReg);
        if (matches) {
          for (let index = 0; index < matches.length; index++) {
            // eslint-disable-next-line regexp/no-super-linear-backtracking
            const vueBlocks: null | RegExpMatchArray = matches[index].match(/```([\s\S]*?)(<[\s\S]*)```/);
            if (vueBlocks && vueBlocks[2]) {
              fs.mkdir(`${pathDir}\\examples\\${filepath}`, (error) => {
                if (error) {
                  console.log(error);
                  return false;
                }
                console.log('创建目录成功');
              });
              fs.writeFile(`${pathDir}\\examples\\${filepath}\\demo${index}.vue`, vueBlocks[2], 'utf8', (error) => {
                if (error) {
                  console.log(error);
                  return false;
                }
                console.log('写入成功');
              });
            }
          }
        }
      }
    }
  });
});

describe('parserUrl', async () => {
  it('should it parser', async () => {
    const autoMd = resolve(EXAMPLE_DIR, 'src/base/button.md');

    const result = fs.readFileSync(autoMd, 'utf-8');

    const demoReg = new RegExp(`:::${'demo'}[\\s\\S]*?:::`, 'gi');
    let index = 0;
    result.replace(demoReg, (matches) => {
      console.log(index++);
      const blockCode = matches.replace(/```[\s\S]*?```/, (_t) => {
        // const blockPath = t.replaceAll('```', '').trim();
        // console.log(blockPath)
        const code = 'sdfsddfdf';
        return `\`\`\`html \n${code}\n\`\`\``;
      });
      // console.log(blockCode);
      // return aaa;
      return blockCode;
    });
  });
});
