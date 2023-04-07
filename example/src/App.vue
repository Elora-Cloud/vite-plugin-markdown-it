<script>

</script>

<script lang="ts" setup>
import { getCurrentInstance, nextTick, onBeforeMount } from 'vue'
// import ButtonDemo from './button/button.md'
import 'highlight.js/styles/atom-one-dark.css'
// eslint-disable-next-line import/order
import hljs from 'highlight.js'
const instance = getCurrentInstance()

console.log(instance?.proxy)

defineOptions({
  name: 'TButton',
})

onBeforeMount(() => {
  nextTick(() => {
    [...document.querySelectorAll('.vue-demo-highlight pre code:not(.hljs)')].forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
})
</script>

<template>
  <div style="padding: 40px">
    <router-view />
  </div>

  <p>{{ val1 }}</p>
<!--  <ButtonDemo /> -->
</template>
