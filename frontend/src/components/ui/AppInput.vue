<script setup lang="ts">
interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-label text-ink-secondary uppercase tracking-wide">
      {{ label }}<span v-if="required" class="text-red-500 ml-0.5">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="[
        'w-full px-3.5 py-2.5 text-body text-ink bg-surface border rounded-lg transition-all duration-150 placeholder:text-ink-disabled focus:outline-none focus:ring-2 disabled:opacity-50 disabled:bg-subtle disabled:cursor-not-allowed',
        error
          ? 'border-red-400 focus:ring-red-200 focus:border-red-400'
          : 'border-border focus:ring-brand/20 focus:border-brand',
      ]"
    />
    <p v-if="error" class="text-small text-red-500">{{ error }}</p>
    <p v-else-if="hint" class="text-small text-ink-disabled">{{ hint }}</p>
  </div>
</template>
