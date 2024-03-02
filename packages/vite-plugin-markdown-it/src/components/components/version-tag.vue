<script lang="ts" setup>
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
