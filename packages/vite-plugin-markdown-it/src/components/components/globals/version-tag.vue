<script lang="ts" setup>
defineOptions({
  name: 'DocVersionTag',
});
defineProps<{
  version: string
}>();
</script>

<template>
  <ElTag size="small" effect="plain" hit round class="ml-2">
    {{ version }}
  </ElTag>
</template>
