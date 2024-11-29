/*
* @Author: mumu
* @Description: 右侧导航入口
* @Date: 2023-04-03 10:42:53
* @LastEditTime: 2023-04-03 09:57:27
*/

<script setup lang="ts">
import { ref } from 'vue';
import { useActiveSidebarLinks } from '../../utils/active-bar';

defineOptions({
  name: 'DocDocPage',
});
defineProps<{ tocWrapperClass: string }>();
const marker = ref();
const container = ref();

useActiveSidebarLinks(container, marker);
</script>

<template>
  <aside ref="container" :class="tocWrapperClass">
    <nav class="toc-content">
      <slot />
      <div ref="marker" class="toc-marker" />
    </nav>
  </aside>
</template>
