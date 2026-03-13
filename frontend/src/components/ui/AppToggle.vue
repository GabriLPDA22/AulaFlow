<script setup lang="ts">
interface Props {
  modelValue: boolean
  disabled?: boolean
}
defineProps<Props>()
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    @click="$emit('update:modelValue', !modelValue)"
    :class="[
      'relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none shrink-0',
      modelValue ? 'bg-brand' : 'bg-border',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    :aria-checked="modelValue"
    role="switch"
  >
    <span
      :class="[
        'inline-block w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform duration-200',
        modelValue ? 'translate-x-[22px]' : 'translate-x-[3px]',
      ]"
    />
  </button>
</template>
