<script lang="ts" setup>
import { ElTag } from 'element-plus'

defineProps<{
  version: string
}>()
defineOptions({
  name: 'EloraVersionTag',
})
</script>

<template>
  <ElTag size="small" effect="plain" hit round class="ml-2">
    {{ version }}
  </ElTag>
</template>
