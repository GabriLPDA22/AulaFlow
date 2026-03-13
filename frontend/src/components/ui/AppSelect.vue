<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue?: string
  label?: string
  options: Option[]
  placeholder?: string
  error?: string
  disabled?: boolean
}

defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-label text-ink-secondary uppercase tracking-wide">{{ label }}</label>
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :class="[
          'w-full appearance-none px-3.5 py-2.5 text-body text-ink bg-surface border rounded-lg transition-all focus:outline-none focus:ring-2 pr-9 disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-red-400 focus:ring-red-200' : 'border-border focus:ring-brand/20 focus:border-brand',
        ]"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
      <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-disabled pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <p v-if="error" class="text-small text-red-500">{{ error }}</p>
  </div>
</template>
