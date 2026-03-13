<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { conversationsService } from '@/services/conversationsService'
import type { Conversation } from '@/types'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppCard from '@/components/ui/AppCard.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import SkeletonLine from '@/components/shared/SkeletonLine.vue'

const router = useRouter()
const conversations = ref<Conversation[]>([])
const total = ref(0)
const isLoading = ref(true)

const filters = reactive({
  status: '' as 'Active' | 'Closed' | '',
  leadCaptured: '' as 'true' | 'false' | '',
  page: 1,
})

async function fetchConversations() {
  isLoading.value = true
  try {
    const result = await conversationsService.getAll({
      status: filters.status || undefined,
      leadCaptured: filters.leadCaptured ? filters.leadCaptured === 'true' : undefined,
      page: filters.page,
    })
    conversations.value = result.items
    total.value = result.total
  } finally {
    isLoading.value = false
  }
}

watch([() => filters.status, () => filters.leadCaptured], () => {
  filters.page = 1
  fetchConversations()
})

onMounted(fetchConversations)

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora mismo'
  if (mins < 60) return `Hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours}h`
  return `Hace ${Math.floor(hours / 24)}d`
}
</script>

<template>
  <div>
    <PageHeader title="Conversaciones" description="Historial de chats con visitantes de tu web.">
      <template #actions>
        <span class="text-small text-ink-disabled">{{ total }} conversaciones</span>
      </template>
    </PageHeader>

    <!-- Filtros -->
    <div class="flex items-center gap-3 mb-6 flex-wrap">
      <div class="flex items-center gap-1.5 p-1 bg-subtle rounded-lg">
        <button
          v-for="opt in [{ value: '', label: 'Todas' }, { value: 'Active', label: 'Activas' }, { value: 'Closed', label: 'Cerradas' }]"
          :key="opt.value"
          @click="filters.status = opt.value as any"
          :class="[
            'px-3 py-1.5 rounded-md text-small font-medium transition-all',
            filters.status === opt.value ? 'bg-surface text-ink shadow-card' : 'text-ink-secondary hover:text-ink',
          ]"
        >
          {{ opt.label }}
        </button>
      </div>

      <div class="flex items-center gap-1.5 p-1 bg-subtle rounded-lg">
        <button
          v-for="opt in [{ value: '', label: 'Con y sin lead' }, { value: 'true', label: 'Con lead' }, { value: 'false', label: 'Sin lead' }]"
          :key="opt.value"
          @click="filters.leadCaptured = opt.value as any"
          :class="[
            'px-3 py-1.5 rounded-md text-small font-medium transition-all',
            filters.leadCaptured === opt.value ? 'bg-surface text-ink shadow-card' : 'text-ink-secondary hover:text-ink',
          ]"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Lista -->
    <AppCard padding="none">
      <div v-if="isLoading" class="p-6 space-y-0 divide-y divide-border">
        <div v-for="i in 6" :key="i" class="py-5 space-y-2">
          <SkeletonLine height="h-4" width="w-40" />
          <SkeletonLine height="h-3" width="w-3/4" />
        </div>
      </div>

      <EmptyState
        v-else-if="conversations.length === 0"
        title="Sin conversaciones"
        description="Cuando alguien use el chat en tu web, las conversaciones aparecerán aquí."
      />

      <ul v-else class="divide-y divide-border">
        <li
          v-for="conv in conversations"
          :key="conv.id"
          class="flex items-start gap-4 px-6 py-5 hover:bg-subtle transition-colors cursor-pointer"
          @click="router.push(`/conversations/${conv.id}`)"
        >
          <!-- Indicador estado -->
          <div class="mt-1 shrink-0">
            <span
              :class="[
                'w-2 h-2 rounded-full block',
                conv.status === 'Active' ? 'bg-green-500' : 'bg-gray-300',
              ]"
            />
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <p class="text-small font-medium text-ink truncate">{{ conv.visitorId }}</p>
              <span v-if="conv.leadCaptured" class="text-label text-green-600 font-medium">· Lead</span>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <span class="text-label text-ink-disabled">{{ conv.messageCount }} mensajes</span>
              <span v-if="conv.summary" class="text-label text-ink-secondary truncate max-w-xs">{{ conv.summary }}</span>
            </div>
          </div>

          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <AppBadge :variant="conv.status">{{ conv.status === 'Active' ? 'Activa' : 'Cerrada' }}</AppBadge>
            <span class="text-label text-ink-disabled">{{ timeAgo(conv.startedAt) }}</span>
          </div>
        </li>
      </ul>
    </AppCard>
  </div>
</template>
