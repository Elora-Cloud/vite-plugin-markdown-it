## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```
```
:::


### 禁用状态

按钮不可用状态。

:::demo 你可以使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

```
```
:::

### 文字按钮
:::tip

文字按钮在现在有了全新的设计样式。 2.2.0 如果您想要使用老版样式的按钮，可以考虑使用 [Link](./link.md#basic) 组件。

API也已更新，由于 `type` 属性会同时控制按钮的样式， 因此我们通过一个新的 API`text: boolean` 来控制文字按钮。

:::
没有边框和背景色的按钮。

:::demo
```
```
:::

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置`icon`属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用`i`标签即可，可以使用自定义图标。

```
```
:::

### 按钮组

以按钮组的方式出现，常用于多项类似操作。

:::demo 使用`<el-button-group>`标签来嵌套你的按钮。

```
```
:::

### 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。
:::tip

您可以使用 `loading` 插槽或 `loadingIcon` 属性自定义您的loading图标

ps: `loading` 插槽优先级高于 `loadingIcon`属性

:::

:::demo 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

```
```
:::

### 不同尺寸

Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。

```
```
:::


### Button Attributes

| 属性名                               | 说明                                           | 类型                                                | 默认值       |
| --------------------------------- |----------------------------------------------|---------------------------------------------------|-----------|
| size                              | 尺寸                                           | large/default/small                               | —         |
| type                              | 类型                                           | primary/success/warning/danger/info/text(delete)  | —       |
| plain                             | 是否为朴素按钮                                      | boolean                                           | false     |
| text<EloraVersionTag version="2.2.0" /> | 是否为文字按钮                                      | boolean                                           | false     |
| bg<EloraVersionTag version="2.2.0" />  | 是否显示文字按钮背景颜色                                 | boolean                                           | false     |
| link<EloraVersionTag version="2.2.1" /> | 是否为链接按钮                                      | boolean                                           | false     |
| round                             | 是否为圆角按钮                                      | boolean                                           | false     |
| circle                            | 是否为圆形按钮                                      | boolean                                           | false     |
| loading                           | 是否为加载中状态                                     | boolean                                           | false     |
| loading-icon                      | 自定义加载中状态图标组件                                 | string/ Component                                 | Loading   |
| disabled                          | 按钮是否为禁用状态                                    | boolean                                           | false     |
| icon                              | 图标组件                                         | string/ Component                                 | —         |
| autofocus                         | 原生 `autofocus`  属性                           | boolean                                           | false     |
| native-type                       | 原生 `type`   属性                               | button/submit/reset                        | button  |
| auto-insert-space                 | 自动在两个中文字符之间插入空格                              | boolean                                           | —         |
| color                             | 自定义按钮颜色, 并自动计算 `hover` 和  `active` 触发后的颜色    | string                                            | —         |
| dark                              | `dark`模式, 意味着自动设置 `color` 为 `dark` 模式的颜色 | boolean                                           | false     |

### Button Slots

| 插槽名    | 说明                          |
| ------- |-----------------------------|
| default | 自定义默认内容                     |
| loading | 自定义加载中组件 |
| icon    | 自定义图标组件    |

### Button Exposes

| 属性名           | 说明                  | 类型                                                                               |
| -------------- |---------------------|----------------------------------------------------------------------------------|
| ref            | 按钮 html 元素          | `Ref<HTMLButtonElement>`                                                         |
| size           | 按钮尺寸                | `ComputedRef<'small'/'default' /'large'> `                                       |
| type           | 按钮类型                | ` ComputedRef<'default'/'primary'/'success'/'warning'/'info' /'danger' /'text'>` |
| disabled       | 按钮已禁用	| `ComputedRef<boolean>  `                                                         |
| shouldAddSpace | 是否在两个字符之间插入空格 | ` ComputedRef<boolean>   `                                                       |

## ButtonGroup API

### ButtonGroup Attributes

| 插槽名	 | 说明                                      | 子标签                                         | Default |
| ---- | ------------------------------------------------ |---------------------------------------------| ------- |
| size | 用于控制该按钮组内按钮的大小 | large / default / small                     | —       |
| type | 用于控制该按钮组内按钮的类型 | primary / success / warning / danger / info | —       |

### ButtonGroup Slots

| 插槽名     | 说明                    | 子标签    |
|---------| ------------------------------ |--------|
| default | 自定义按钮组内容	 | Button |
