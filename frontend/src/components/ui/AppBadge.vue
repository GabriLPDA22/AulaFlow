<script setup lang="ts">
import type { LeadStatus, ConversationStatus, KnowledgeType } from '@/types'

type BadgeVariant = LeadStatus | ConversationStatus | KnowledgeType | 'default' | 'success' | 'warning' | 'error'

interface Props {
  variant?: BadgeVariant
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), { variant: 'default' })

const styles: Record<string, string> = {
  New:         'bg-brand-light text-brand',
  Contacted:   'bg-amber-50 text-amber-700',
  Qualified:   'bg-green-50 text-green-700',
  Discarded:   'bg-gray-100 text-gray-500',
  Active:      'bg-green-50 text-green-700',
  Closed:      'bg-gray-100 text-gray-500',
  Text:        'bg-subtle text-ink-secondary',
  Faq:         'bg-purple-50 text-purple-700',
  Url:         'bg-blue-50 text-blue-700',
  default:     'bg-subtle text-ink-secondary',
  success:     'bg-green-50 text-green-700',
  warning:     'bg-amber-50 text-amber-700',
  error:       'bg-red-50 text-red-600',
}

const dotStyles: Record<string, string> = {
  New:       'bg-brand',
  Contacted: 'bg-amber-500',
  Qualified: 'bg-green-500',
  Discarded: 'bg-gray-400',
  Active:    'bg-green-500',
  Closed:    'bg-gray-400',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-label font-medium whitespace-nowrap',
      styles[variant] ?? styles.default,
    ]"
  >
    <span
      v-if="dot"
      :class="['w-1.5 h-1.5 rounded-full', dotStyles[variant] ?? 'bg-gray-400']"
    />
    <slot />
  </span>
</template>
