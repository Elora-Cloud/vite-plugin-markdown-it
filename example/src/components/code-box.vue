/*
* @Author: mumu
* @Description: 代码模块 入口
* @Date: 2023-04-03 10:42:53
* @LastEditTime: 2023-04-03 09:57:27
*/

<script setup lang="ts">
import { defineOptions, nextTick, ref, useSlots } from 'vue'
import { useClipboard } from '@vueuse/core'

import { CaretTop } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const props = defineProps<{ rawSource: string }>()
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
const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})
const copyCode = async () => {
  if (!isSupported)
    ElMessage.error('复制错误')

  try {
    await copy()
    ElMessage.success('复制成功')
  }
  catch (e: any) {
    ElMessage.error(e.message)
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
    <el-divider />
    <div class="op-btns">
      <ElTooltip
        content="复制代码"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <ElIcon
          :size="16"
          aria-label="复制代码"
          class="op-btn"
          tabindex="0"
          role="button"
          @click="copyCode"
          @keydown.prevent.enter="copyCode"
          @keydown.prevent.space="copyCode"
        >
          <i-ri-file-copy-line />
        </ElIcon>
      </ElTooltip>
      <ElTooltip
        :content="showText"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <button
          ref="sourceCodeRef"
          :aria-label="showText"
          class="reset-btn el-icon op-btn"
          @click="showCode"
        >
          <ElIcon :size="16">
            <i-ri-code-line />
          </ElIcon>
        </button>
      </ElTooltip>
    </div>
    <div ref="code" class="content" :style="{ height }">
      <div class="code">
        <slot />
      </div>
    </div>
    <div class="show-code" @click="showCode">
      {{ showText }}
    </div>
    <Transition name="el-fade-in-linear">
      <div
        v-show="isShow"
        class="example-float-control"
        tabindex="0"
        role="button"
        @click="showCode"
      >
        <ElIcon :size="16">
          <CaretTop />
        </ElIcon>
        <span>{{ showText }}</span>
      </div>
    </Transition>
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
.example-float-control{
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  height: 44px;
  box-sizing: border-box;
  background-color: var(--bg-color, #fff);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  margin-top: -1px;
  color: var(--el-text-color-secondary);
  cursor: pointer;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
}
</style>
