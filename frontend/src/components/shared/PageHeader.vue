<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-start justify-between gap-4 mb-8">
    <div>
      <h1 class="font-display text-h1 text-ink">{{ title }}</h1>
      <p v-if="description" class="text-body text-ink-secondary mt-1">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex items-center gap-3 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
