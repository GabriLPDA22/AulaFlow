<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none',
      size === 'sm' && 'px-3 py-1.5 text-small',
      size === 'md' && 'px-4 py-2.5 text-body',
      size === 'lg' && 'px-5 py-3 text-body',
      variant === 'primary' && 'bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand/30',
      variant === 'secondary' && 'bg-surface text-ink border border-border hover:bg-subtle focus-visible:ring-brand/20',
      variant === 'ghost' && 'bg-transparent text-ink-secondary hover:bg-subtle hover:text-ink focus-visible:ring-brand/20',
      variant === 'danger' && 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400/30',
    ]"
  >
    <svg v-if="loading" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>
