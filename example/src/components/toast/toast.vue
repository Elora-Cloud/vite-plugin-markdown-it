<script setup lang="ts">
/*
 * @Author: Liao.xiuli
 * @Date: 2021-09-18 11:18:59
 * @Last Modified by: Liao.xiuli
 * @Last Modified time: 2022-07-16 17:56:58
 */
import { computed } from 'vue'
import CodeBox from '../../button/CodeBox.vue'
console.log(CodeBox)
interface Props {
  show_toast: boolean
  message: string
  toast_type?: 'success' | 'alert' | 'warning' | 'error'
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  show_toast: true,
  message: '',
  toast_type: 'success',
  duration: 1500,
})
</script>

<template>
  <div v-if="show_toast" :class="`notice ${toast_type}`">
    <div class="icon">
      <dov  alt="" />
    </div>
    <CodeBox></CodeBox>
    <p class="text">
      {{ message }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(-50%, -100%, 0);
    transform: translate3d(-50%, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(-50%, 20px, 0);
    transform: translate3d(-50%, 20px, 0);
  }
}

.notice {
  box-sizing: border-box;
  padding: 8px 16px;
  color: red;
  animation: slideInDown 1s;
  display: inline-flex;
  align-items: center;
  border-radius: 30px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 20px, 0);
  z-index: 9999;
  font-size: 14px;

  .icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }

  .text {
    flex: 1;
    word-break: break-all;
    margin-left: 5px;
  }

  &.success {
    border: 1px solid #70cda1;
    background-color: #f1faf5;
  }

  &.alert {
    border: 1px solid #1c9fff;
    background-color: #e8f6ff;
  }

  &.warning {
    border: 1px solid #ff9444;
    background-color: #fff5ed;
  }

  &.error {
    border: 1px solid #ff4545;
    background-color: #ffeded;
  }
}
</style>
