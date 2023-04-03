
<script lang="ts" setup>
import { nextTick, onBeforeMount } from 'vue'
import ButtonDemo from './button/button.md'
import 'highlight.js/styles/atom-one-dark.css'
// eslint-disable-next-line import/order
import hljs from 'highlight.js'
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
  <ButtonDemo />
</template>
