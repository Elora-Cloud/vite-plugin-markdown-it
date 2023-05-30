/*
* @Author: mumu
* @Description: 代码模块 入口
* @Date: 2023-04-03 10:42:53
* @LastEditTime: 2023-04-03 09:57:27
*/

<script setup lang="ts">
import { defineOptions, nextTick, ref, useSlots } from 'vue'
defineOptions({
  name: 'CodeBox',
})
const showText = ref('显示代码')
const relHeight = ref(0)
const isShow = ref(false)
const height = ref('auto')
const explainSlotState = ref(false)
if (useSlots().explain) explainSlotState.value = true

const code = ref()
nextTick(() => {
  relHeight.value = code.value.getBoundingClientRect().height
  height.value = '0px'
})

// const getCodeStyle = computed(() => codeStyle);
function showCode() {
  if (isShow.value) {
    isShow.value = false
    height.value = '0px'
    showText.value = '显示代码'
  }
  else {
    isShow.value = true
    height.value = `${relHeight.value}px`
    showText.value = '隐藏代码'
  }
}
</script>

<template>
  <div class="code-box">
    <div class="demo">
      <slot name="demo" />
    </div>
    <div v-if="explainSlotState" class="explain">
      <div class="title">
        <span>说明</span>
      </div>
      <div class="text">
        <slot name="explain" />
      </div>
    </div>
    <div ref="code" class="content" :style="{ height }">
      <div class="code">
        <slot />
      </div>
    </div>
    <div class="show-code" @click="showCode">
      {{ showText }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code-box {
  border: var(--jeecg-border-base);
  &:hover {
    box-shadow: 0 0 10px 0 var(--jeecg-border-color-base);
  }
  & > .demo {
    position: relative;
    padding: 20px;
    z-index: 10;
  }
  & > .content {
    height: auto;
    overflow: hidden;
    transition: height 0.2s;
    /* border: 1px dotted #d8d8d8; */
    border-bottom-width: 0;
    background-color: var(--jeecg-component-bg-color);
    & > .code {
      margin: 10px;
      pre {
        margin-bottom: 0;
      }
    }
  }
  & > .explain {
    margin: 10px;
    & > .title {
      display: flex;
      width: 100%;
      height: 50px;
      line-height: 50px;
    }
    & > .title::before {
      content: '';
      flex-grow: 0;
      width: 20px;
      height: 50px;
      height: 0;
      margin-top: 25px;
      border-top: 1px solid #e8eaec;
    }
    & > .title > span {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
    }
    & > .title::after {
      content: '';
      flex-grow: 1;
      height: 0;
      margin-top: 25px;
      border-top: 1px solid #e8eaec;
    }
    & > .text {
      padding: 0 5px;
      text-indent: 15px;
      font-size: 13px;
      color: #8a8a8a;
    }
  }
  & > .show-code {
    height: 40px;
    line-height: 40px;
    border-top: 1px dotted #d8d8d8;
    background-color: var(--jeecg-component-bg-color);
    text-align: center;
    color: #d8d8d8;
    cursor: pointer;
    &:hover {
      color: #409dff;
      /* background-color: #f6f8fa; */
      /* box-shadow: 0 0 4px 0 #ecf3fb; */
    }
  }
}
</style>
