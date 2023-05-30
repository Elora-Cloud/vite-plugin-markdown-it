<script lang="ts" setup>
import { defineOptions, defineProps } from 'vue'
defineProps<{
  version: string
}>()
defineOptions({
  name: 'VersionTag',
})
</script>

<template>
  <el-tag size="small" effect="plain" hit round class="ml-2">
    {{ version }}
  </el-tag>
</template>
