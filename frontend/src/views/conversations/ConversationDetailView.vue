<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { conversationsService } from '@/services/conversationsService'
import type { ConversationDetail } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppBadge from '@/components/ui/AppBadge.vue'

const route = useRoute()
const router = useRouter()
const conversation = ref<ConversationDetail | null>(null)
const isLoading = ref(true)
const isSummarizing = ref(false)
const isClosing = ref(false)
const messagesEnd = ref<HTMLElement | null>(null)

onMounted(async () => {
  try {
    conversation.value = await conversationsService.getById(route.params.id as string)
    await nextTick()
    messagesEnd.value?.scrollIntoView()
  } finally {
    isLoading.value = false
  }
})

async function summarize() {
  if (!conversation.value) return
  isSummarizing.value = true
  try {
    const result = await conversationsService.summarize(conversation.value.id)
    conversation.value.summary = result.summary
  } finally {
    isSummarizing.value = false
  }
}

async function close() {
  if (!conversation.value) return
  isClosing.value = true
  try {
    await conversationsService.close(conversation.value.id)
    conversation.value.status = 'Closed'
    conversation.value.closedAt = new Date().toISOString()
  } finally {
    isClosing.value = false
  }
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div>
    <button @click="router.push('/conversations')" class="flex items-center gap-1.5 text-small text-ink-secondary hover:text-ink transition-colors mb-6">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Volver a conversaciones
    </button>

    <div v-if="isLoading" class="space-y-4">
      <div class="h-8 w-48 bg-border animate-pulse rounded" />
    </div>

    <template v-else-if="conversation">
      <!-- Header -->
      <div class="flex items-start justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-3 mb-1">
            <h1 class="font-display text-h1 text-ink">Conversación</h1>
            <AppBadge :variant="conversation.status">
              {{ conversation.status === 'Active' ? 'Activa' : 'Cerrada' }}
            </AppBadge>
          </div>
          <p class="text-body text-ink-secondary">{{ formatDate(conversation.startedAt) }}</p>
        </div>
        <div class="flex items-center gap-3">
          <AppButton
            v-if="conversation.status === 'Active'"
            variant="secondary" size="sm"
            :loading="isClosing"
            @click="close"
          >
            Cerrar conversación
          </AppButton>
          <AppButton
            size="sm"
            :loading="isSummarizing"
            @click="summarize"
          >
            {{ conversation.summary ? 'Regenerar resumen' : 'Generar resumen' }}
          </AppButton>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-5">
        <!-- Chat -->
        <AppCard padding="none" class="col-span-12 lg:col-span-8 flex flex-col" style="max-height: 640px;">
          <div class="px-6 py-4 border-b border-border shrink-0">
            <p class="text-small text-ink-secondary">
              Visitante: <span class="font-medium text-ink">{{ conversation.visitorId }}</span>
              · {{ conversation.messages.length }} mensajes
            </p>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <div
              v-for="msg in conversation.messages"
              :key="msg.id"
              :class="['flex', msg.role === 'User' ? 'justify-end' : 'justify-start']"
            >
              <div
                :class="[
                  'max-w-[75%] rounded-xl px-4 py-3',
                  msg.role === 'User'
                    ? 'bg-brand text-white rounded-br-sm'
                    : 'bg-subtle text-ink rounded-bl-sm border border-border',
                ]"
              >
                <p class="text-small leading-relaxed whitespace-pre-wrap">{{ msg.content }}</p>
                <p :class="['text-label mt-1.5', msg.role === 'User' ? 'text-white/50' : 'text-ink-disabled']">
                  {{ formatTime(msg.createdAt) }}
                </p>
              </div>
            </div>
            <div ref="messagesEnd" />
          </div>
        </AppCard>

        <!-- Sidebar -->
        <div class="col-span-12 lg:col-span-4 space-y-5">
          <!-- Lead capturado -->
          <AppCard v-if="conversation.leadCaptured">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-small font-medium text-green-700">Lead capturado</h3>
            </div>
            <p class="text-small text-ink-secondary">Se capturaron los datos del visitante durante esta conversación.</p>
          </AppCard>

          <!-- Resumen -->
          <AppCard>
            <h3 class="text-label text-ink-disabled uppercase tracking-wide mb-3">Resumen</h3>
            <p v-if="conversation.summary" class="text-small text-ink leading-relaxed">
              {{ conversation.summary }}
            </p>
            <p v-else class="text-small text-ink-disabled italic">
              Aún no hay resumen. Genera uno con el botón de arriba.
            </p>
          </AppCard>

          <!-- Info -->
          <AppCard>
            <h3 class="text-label text-ink-disabled uppercase tracking-wide mb-4">Detalles</h3>
            <dl class="space-y-3">
              <div>
                <dt class="text-label text-ink-disabled mb-0.5">Iniciada</dt>
                <dd class="text-small text-ink">{{ formatDate(conversation.startedAt) }}</dd>
              </div>
              <div v-if="conversation.closedAt">
                <dt class="text-label text-ink-disabled mb-0.5">Cerrada</dt>
                <dd class="text-small text-ink">{{ formatDate(conversation.closedAt) }}</dd>
              </div>
              <div>
                <dt class="text-label text-ink-disabled mb-0.5">Mensajes</dt>
                <dd class="text-small text-ink">{{ conversation.messages.length }}</dd>
              </div>
            </dl>
          </AppCard>
        </div>
      </div>
    </template>
  </div>
</template>
