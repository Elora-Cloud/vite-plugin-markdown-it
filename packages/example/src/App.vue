<script lang="ts" setup>
import 'highlight.js/styles/atom-one-dark.css';

defineOptions({
  name: 'TButton',
});
// onBeforeMount(() => {
//   nextTick(() => {
//     [...document.querySelectorAll('.vue-demo-highlight pre code:not(.hljs)')].forEach((block) => {
//       hljs.highlightBlock(block)
//     })
//   })
// })
</script>

<template>
  <div style="padding: 40px">
    <router-view />
  </div>
</template>
