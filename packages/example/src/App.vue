<script lang="ts" setup>
import { getCurrentInstance, nextTick, onBeforeMount } from 'vue'
import 'highlight.js/styles/atom-one-dark.css'
// eslint-disable-next-line import/order
import hljs from 'highlight.js'
const instance = getCurrentInstance()
defineOptions({
  name: 'TButton',
})

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
