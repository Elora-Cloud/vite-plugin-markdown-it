<script setup lang="ts">
function primaryClick() {
  ElMessageBox.alert('111')
}
</script>

<template>
  <div class="demo">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button v-acl="1" type="primary" @click="primaryClick">
        主要按钮
      </el-button>
      <el-button v-acl type="success">
        成功按钮
      </el-button>
      <el-button type="info">
        信息按钮
      </el-button>
      <el-button type="warning">
        警告按钮
      </el-button>
      <el-button type="danger">
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button plain>
        朴素按钮
      </el-button>
      <el-button type="primary" plain>
        主要按钮
      </el-button>
      <el-button type="success" plain>
        成功按钮
      </el-button>
      <el-button type="info" plain>
        信息按钮
      </el-button>
      <el-button type="warning" plain>
        警告按钮
      </el-button>
      <el-button type="danger" plain>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button round>
        圆角按钮
      </el-button>
      <el-button type="primary" round>
        主要按钮
      </el-button>
      <el-button type="success" round>
        成功按钮
      </el-button>
      <el-button type="info" round>
        信息按钮
      </el-button>
      <el-button type="warning" round>
        警告按钮
      </el-button>
      <el-button type="danger" round>
        危险按钮
      </el-button>
    </el-row>
    <el-row>
      <el-button :icon="Search" circle />
      <el-button type="primary" :icon="Edit" circle />
      <el-button type="success" :icon="Check" circle />
      <el-button type="info" :icon="Message" circle />
      <el-button type="warning" :icon="Star" circle />
      <el-button type="danger" :icon="Delete" circle />
    </el-row>
  </div>
</template>

<style scoped lang="scss">
  .demo :deep(.el-row ){
    box-sizing: border-box;
    margin-top: 10px;
  }
</style>
