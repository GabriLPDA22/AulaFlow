<script setup lang="ts">
interface Props {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

withDefaults(defineProps<Props>(), { padding: 'md' })
</script>

<template>
  <div
    :class="[
      'bg-surface rounded-xl border border-border',
      padding === 'none' && 'p-0',
      padding === 'sm' && 'p-4',
      padding === 'md' && 'p-6',
      padding === 'lg' && 'p-8',
      hover && 'transition-shadow hover:shadow-float cursor-pointer',
    ]"
  >
    <slot />
  </div>
</template>
