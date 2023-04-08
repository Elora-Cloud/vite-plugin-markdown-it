/*
* @Author: mumu
* @Description: Button 入口
* @Date: 2023-04-03 10:42:53
* @LastEditTime: 2023-04-03 09:57:27
*/

<script setup>
import Notice from './toast/toast.ts'
Notice({ message: 'hello world' })

defineOptions({
  jeecgdicts: ['demo'],
})
</script>

<template>
  <div style="height: 200px;width: 300px; background-color: red" />
</template>
