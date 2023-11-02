/*
* @Author: mumu
* @Description: 右侧导航入口
* @Date: 2023-04-03 10:42:53
* @LastEditTime: 2023-04-03 09:57:27
*/

<script setup lang="ts">
import { defineOptions, ref } from 'vue'
import { useActiveSidebarLinks } from './active-bar'

defineProps<{ tocWrapperClass: string }>()
defineOptions({
  name: 'DocPage',
})
const marker = ref()
const container = ref()

useActiveSidebarLinks(container, marker)
</script>

<template>
  <aside ref="container" :class="tocWrapperClass">
    <nav class="toc-content">
      <slot />
      <div ref="marker" class="toc-marker" />
    </nav>
  </aside>
</template>

<style lang="scss" scoped>

</style>
