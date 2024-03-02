<script setup lang="ts">
function delayHandle() {
  ElMessage('延迟执行')
}
</script>

<template>
  <div>
    <el-row>
      <el-button v-btn-delay @click="delayHandle()">
        延迟执行（500）
      </el-button>
      <el-button v-btn-delay="2000" @click="delayHandle()">
        延迟执行（2000）
      </el-button>
    </el-row>
  </div>
</template>
