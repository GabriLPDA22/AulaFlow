<script setup lang="ts">
interface Props {
  title: string
  description?: string
  action?: string
}

defineProps<Props>()
defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div class="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mb-4">
      <slot name="icon">
        <svg class="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </slot>
    </div>
    <h3 class="font-display text-h3 text-ink mb-1">{{ title }}</h3>
    <p v-if="description" class="text-body text-ink-secondary max-w-xs">{{ description }}</p>
    <button
      v-if="action"
      @click="$emit('action')"
      class="mt-5 inline-flex items-center gap-2 px-4 py-2.5 bg-brand text-white text-body font-medium rounded-lg hover:bg-brand-hover transition-colors"
    >
      {{ action }}
    </button>
  </div>
</template>
