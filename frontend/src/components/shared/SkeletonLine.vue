<script setup lang="ts">
interface Props {
  width?: string
  height?: string
}

withDefaults(defineProps<Props>(), { width: 'w-full', height: 'h-4' })
</script>

<template>
  <div :class="['animate-pulse bg-border rounded', width, height]" />
</template>
