import { describe, it } from 'vitest';

const mdFiles = '### 带输入建议\n'
  + '\n'
  + '根据输入内容提供对应的输入建议\n'
  + '\n'
  + ':::demo autocomplete 是一个可带输入建议的输入框组件，`fetch-suggestions` 是一个返回输入建议的方法属性，如 querySearch(queryString, cb)，在该方法中你可以在你的输入建议数据准备好时通过 cb(data) 返回到 autocomplete 组件中。\n'
  + '\n'
  + '\n'
  + '``````\n'
  + '\n'
  + '\n'
  + ':::\n'
  + '\n'
  + '### 自定义模板\n'
  + '\n'
  + '可自定义输入建议的显示\n'
  + '\n'
  + ':::demo 使用`scoped slot`自定义输入建议的模板。该 scope 的参数为`item`，表示当前输入建议对象。\n'
  + '\n'
  + '\n'
  + ':::\n'
  + '\n'
  + '### 远程搜索\n'
  + '\n'
  + '从服务端搜索数据\n'
  + '\n'
  + ':::demo\n'
  + '\n'
  + '\n'
  + '```ccc```\n'
  + '\n'
  + ':::\n'
  + '\n'
  + '### Autocomplete Attributes\n'
  + '\n'
  + '| 参数          | 说明            | 类型            | 可选值                 | 默认值   |\n'
  + '|-------------  |---------------- |---------------- |---------------------- |-------- |\n'
  + '| placeholder   | 输入框占位文本   | string          | — | — |\n'
  + '| disabled      | 禁用            | boolean         | — | false   |\n'
  + '| value-key | 输入建议对象中用于显示的键名 | string | — | value |\n'
  + '| value         | 必填值，输入绑定值   | string  | — | — |\n'
  + '| debounce      | 获取输入建议的去抖延时 | number         | — | 300 |\n'
  + '| placement     | 菜单弹出位置 | string         | top / top-start / top-end / bottom / bottom-start / bottom-end | bottom-start |\n'
  + '| fetch-suggestions | 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它  | Function(queryString, callback)  | — | — |\n'
  + '| popper-class | Autocomplete 下拉列表的类名 | string | — | — |\n'
  + '| trigger-on-focus | 是否在输入框 focus 时显示建议列表 | boolean | — | true |\n'
  + '| name | 原生属性 | string | — | — |\n'
  + '| select-when-unmatched | 在输入没有任何匹配建议的情况下，按下回车是否触发 `select` 事件 | boolean | — | false |\n'
  + '| label | 输入框关联的label文字 | string | — | — |\n'
  + '| prefix-icon | 输入框头部图标 | string | — | — |\n'
  + '| suffix-icon | 输入框尾部图标 | string | — | — |\n'
  + '| hide-loading | 是否隐藏远程加载时的加载图标 | boolean | — | false |\n'
  + '| popper-append-to-body | 是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false | boolean | - | true |\n'
  + '| highlight-first-item | 是否默认突出显示远程搜索建议中的第一项 | boolean | — | false |\n'
  + '\n'
  + '### Autocomplete Slots\n'
  + '| name | 说明 |\n'
  + '|------|--------|\n'
  + '| prefix | 输入框头部内容 |\n'
  + '| suffix | 输入框尾部内容 |\n'
  + '| prepend | 输入框前置内容 |\n'
  + '| append | 输入框后置内容 |\n'
  + '\n'
  + '### Autocomplete Scoped Slot\n'
  + '| name | 说明 |\n'
  + '|------|--------|\n'
  + '| — | 自定义输入建议，参数为 { item } |\n'
  + '\n'
  + '### Autocomplete Events\n'
  + '| 事件名称 | 说明 | 回调参数 |\n'
  + '|---------|--------|---------|\n'
  + '| select | 点击选中建议项时触发 | 选中建议项 |\n'
  + '\n'
  + '### Autocomplete Methods\n'
  + '| 方法名 | 说明 | 参数 |\n'
  + '| ---- | ---- | ---- |\n'
  + '| focus | 使 input 获取焦点 | - |\n';

describe('demo', () => {
  it('should work', () => {
    const result = mdFiles;
    const demoReg = new RegExp(`:::${'demo'}[\\s\\S]*?:::`, 'gi');
    let index = 0;
    result.replace(demoReg, (matches) => {
      console.log(index++);
      const blockCode = matches.replace(/```[\s\S]*?```/, (t) => {
        // eslint-disable-next-line unused-imports/no-unused-vars
        const blockPath = t.replaceAll('```', '').trim();
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
