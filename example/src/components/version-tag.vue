<script lang="ts" setup>
import { defineOptions } from 'vue'
import { ElTag } from 'element-plus'
defineProps<{
  version: string
}>()
defineOptions({
  name: 'VersionTag',
})
</script>

<template>
  <ElTag size="small" effect="plain" hit round class="ml-2">
    {{ version }}
  </ElTag>
</template>
