<template>
  <div class="demo">
    <el-button-group>
      <el-button type="primary" :icon="ArrowLeft">
        上一页
      </el-button>
      <el-button type="primary">
        下一页
        <el-icon><ArrowRight /></el-icon>
      </el-button>
    </el-button-group>
    <el-button-group style="margin-left: 15px;">
      <el-button type="primary" :icon="Edit" />
      <el-button type="primary" :icon="Share" />
      <el-button type="primary" :icon="Delete" />
    </el-button-group>
  </div>
</template>
