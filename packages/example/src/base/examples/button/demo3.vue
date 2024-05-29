<script setup lang="ts">
import { Delete, Edit, Search, Share } from '@element-plus/icons-vue'
</script>

<template>
  <div class="demo">
    <el-button type="primary" :icon="Edit" />
    <el-button type="primary" :icon="Share" />
    <el-button type="primary" :icon="Delete" />
    <el-button type="primary" :icon="Search">
      搜索
    </el-button>
    <el-button type="primary">
      上传<i class="el-icon-upload el-icon--right" />
    </el-button>
  </div>
</template>
