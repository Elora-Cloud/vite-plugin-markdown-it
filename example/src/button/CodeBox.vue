<script setup>
import { computed,setup } from 'vue'

const getCodeStyle = computed(() => {
  return this.codeStyle
})
function showCode() {
  if (this.isShow) {
    this.isShow = false
    this.height = '0px'
    this.showText = '显示代码'
  }
  else {
    this.isShow = true
    this.height = `${this.relHeight}px`
    this.showText = '隐藏代码'
  }
}


export default {
  name: 'code-box',
  data() {
    return {
      showText: '显示代码',
      relHeight: 0,
      isShow: false,
      height: 'auto',
      explainSlotState: false,
    }
  },
  created() {
    console.log(this.$slots.demo)
    if (this.$slots.explain)
      this.explainSlotState = true

    this.$nextTick(() => {
      this.relHeight = this.$refs.code.getBoundingClientRect().height
      this.height = '0px'
    })
  },

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

<style lang="less" scoped>
.code-box {
  border: var(--as-border-base);
  &:hover {
    box-shadow: 0 0 10px 0 var(--as-border-color-base);
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
    background-color: var(--as-component-bg-color);
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
    background-color: var(--as-component-bg-color);
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
