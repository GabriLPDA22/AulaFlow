<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  rows?: number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), { rows: 4 })
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-label text-ink-secondary uppercase tracking-wide">{{ label }}</label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :class="[
        'w-full px-3.5 py-2.5 text-body text-ink bg-surface border rounded-lg transition-all duration-150 placeholder:text-ink-disabled focus:outline-none focus:ring-2 resize-none disabled:opacity-50 disabled:bg-subtle',
        error
          ? 'border-red-400 focus:ring-red-200'
          : 'border-border focus:ring-brand/20 focus:border-brand',
      ]"
    />
    <p v-if="error" class="text-small text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="text-small text-ink-disabled">{{ hint }}</p>
  </div>
</template>
