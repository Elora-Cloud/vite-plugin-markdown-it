## Button 组件

一、`Button` 组件的基本使用

:::demo #### Button 组件基础用法:

``` html

<template>
  <div class="demo">
    <Button disabled>
      默认按钮
    </Button>
    <Button type="primary" disabled>
      主要按钮
    </Button>
    <Button type="success" disabled>
      主要按钮
    </Button>
    <Button type="info" disabled>
      主要按钮
    </Button>
    <Button type="warning" disabled>
      主要按钮
    </Button>
    <Button type="danger" disabled>
      主要按钮
    </Button>
  </div>
</template>
<script setup name='ButtonDemo'>
import Button from '@/components/Button.vue'
</script>

```
:::

## Button 组件

二、`Button` 组件的基本使用

:::demo #### Button 组件disabled用法:
```html


<template>
    <div class="demo">
        <Button disabled>默认按钮</Button>
        <Button type="primary" disabled>主要按钮</Button>
        <Button type="success" disabled>主要按钮</Button>
        <Button type="info" disabled>主要按钮</Button>
        <Button type="warning" disabled>主要按钮</Button>
        <Button type="danger" disabled>主要按钮</Button>
    </div>
</template>

<script setup name='ButtonDemo'>
import Button from '@/components/Button.vue'
</script>
```
:::
