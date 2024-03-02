<script setup lang="ts">
function hello() {
  ElMessageBox.alert('Hello World!')
}
</script>

<template>
  <div>
    <el-alert
      title="不可关闭的 alert"
      type="success"
      :closable="false"
    />
    <el-alert
      title="自定义 close-text"
      type="info"
      close-text="知道了"
    />
    <el-alert
      title="设置了回调的 alert"
      type="warning"
      @close="hello"
    />
  </div>
</template>
