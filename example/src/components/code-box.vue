/*
* @Author: mumu
* @Description: 代码模块 入口
* @Date: 2023-04-03 10:42:53
* @LastEditTime: 2023-04-03 09:57:27
*/

<script setup lang="ts">
import { defineOptions, onMounted, ref, useSlots } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ElDivider, ElIcon, ElMessage, ElTooltip } from 'element-plus'

import { CaretTop } from '@element-plus/icons-vue'

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
// nextTick(() => {
//
// })
onMounted(() => {
  relHeight.value = code.value ? code.value.getBoundingClientRect().height : 0
  height.value = '0px'
})
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
    <div v-if="explainSlotState" class="explain">
      <div class="title">
        <span>说明</span>
      </div>
      <div class="text">
        <slot name="explain" />
      </div>
    </div>
    <ElDivider class="m-0" />
    <div class="demo">
      <slot name="demo" />
    </div>
    <ElDivider class="m-0" />
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
          <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-5d9e4641="">
            <path
              fill="currentColor"
              d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
            />
          </svg>
        </ElIcon>
      </ElTooltip>
      <ElTooltip
        :content="showText"
        :show-arrow="false"
        :trigger="['hover', 'focus']"
        :trigger-keys="[]"
      >
        <ElIcon
          :size="16"
          class="op-btn"
          :aria-label="showText"
          tabindex="0"
          role="button"
          @click="showCode"
        >
          <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-5d9e4641="">
            <path
              fill="currentColor"
              d="m23 12l-7.071 7.071l-1.414-1.414L20.172 12l-5.657-5.657l1.414-1.414L23 12zM3.828 12l5.657 5.657l-1.414 1.414L1 12l7.071-7.071l1.414 1.414L3.828 12z"
            />
          </svg>
        </ElIcon>
      </ElTooltip>
    </div>
    <div ref="code" class="content" :style="{ height }">
      <div class="code">
        <slot />
      </div>
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

  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  &:hover {
    box-shadow: 0 0 10px 0 var(--jeecg-border-color-base);
  }

  & > .demo {
    position: relative;
    padding: 20px;
  }

  & > .content {
    height: auto;
    overflow: hidden;
    transition: height 0.2s;
    /* border: 1px dotted #d8d8d8; */
    border-bottom-width: 0;
    background-color: var(--jeecg-component-bg-color);

    & > .code {
      margin: 0 10px;

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

  .example-float-control {
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
  }

  .op-btns {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

  }

  .op-btns .op-btn {
    margin: 0 .5rem;
    cursor: pointer;
    color: var(--text-color-lighter);
    transition: .2s;

  }
  .m-0 {
    margin: 0rem;
  }
}
</style>
