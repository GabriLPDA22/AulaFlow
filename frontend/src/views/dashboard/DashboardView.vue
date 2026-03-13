<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { leadsService } from '@/services/leadsService'
import { conversationsService } from '@/services/conversationsService'
import type { Lead, Conversation } from '@/types'
import AppCard from '@/components/ui/AppCard.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import SkeletonLine from '@/components/shared/SkeletonLine.vue'

const authStore = useAuthStore()

const leads = ref<Lead[]>([])
const conversations = ref<Conversation[]>([])
const totalLeads = ref(0)
const newLeads = ref(0)
const activeConversations = ref(0)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const [leadsResult, convsResult] = await Promise.all([
      leadsService.getAll({ pageSize: 5 }),
      conversationsService.getAll({ status: 'Active', pageSize: 5 }),
    ])
    leads.value = leadsResult.items
    totalLeads.value = leadsResult.total
    newLeads.value = (await leadsService.getAll({ status: 'New', pageSize: 1 })).total
    conversations.value = convsResult.items
    activeConversations.value = convsResult.total
  } finally {
    isLoading.value = false
  }
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `Hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours}h`
  return `Hace ${Math.floor(hours / 24)}d`
}
</script>

<template>
  <div>
    <PageHeader
      :title="`Hola, ${authStore.user?.name?.split(' ')[0] ?? 'de nuevo'} 👋`"
      description="Esto es lo que está pasando en tu negocio."
    />

    <!-- Métricas — layout asimétrico intencional -->
    <div class="grid grid-cols-12 gap-5 mb-8">
      <!-- Stat grande — leads totales -->
      <AppCard class="col-span-12 sm:col-span-4">
        <p class="text-label text-ink-disabled uppercase tracking-wide mb-3">Leads captados</p>
        <div v-if="isLoading" class="space-y-2">
          <SkeletonLine height="h-10" width="w-16" />
          <SkeletonLine height="h-4" width="w-24" />
        </div>
        <template v-else>
          <p class="font-display text-[2.5rem] leading-none font-semibold text-ink mb-1">{{ totalLeads }}</p>
          <p class="text-small text-ink-secondary">
            <span class="text-brand font-medium">{{ newLeads }} nuevos</span> sin contactar
          </p>
        </template>
      </AppCard>

      <!-- Stat — conversaciones activas -->
      <AppCard class="col-span-12 sm:col-span-4">
        <p class="text-label text-ink-disabled uppercase tracking-wide mb-3">Conversaciones activas</p>
        <div v-if="isLoading" class="space-y-2">
          <SkeletonLine height="h-10" width="w-16" />
          <SkeletonLine height="h-4" width="w-24" />
        </div>
        <template v-else>
          <p class="font-display text-[2.5rem] leading-none font-semibold text-ink mb-1">{{ activeConversations }}</p>
          <p class="text-small text-ink-secondary">En curso ahora mismo</p>
        </template>
      </AppCard>

      <!-- Widget install card -->
      <AppCard class="col-span-12 sm:col-span-4 bg-brand-light border-brand/20 flex flex-col justify-between">
        <div>
          <p class="text-label text-brand/70 uppercase tracking-wide mb-3">Widget</p>
          <p class="font-display text-h3 text-brand mb-1">Instala tu asistente</p>
          <p class="text-small text-brand/70">Añádelo a tu web en 2 minutos.</p>
        </div>
        <RouterLink
          to="/widget-setup"
          class="inline-flex items-center gap-1.5 mt-4 text-small font-medium text-brand hover:text-brand-hover transition-colors"
        >
          Ver instrucciones
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </RouterLink>
      </AppCard>
    </div>

    <!-- Leads recientes + Conversaciones activas -->
    <div class="grid grid-cols-12 gap-5">
      <!-- Leads recientes -->
      <AppCard padding="none" class="col-span-12 lg:col-span-7">
        <div class="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 class="font-display text-h3 text-ink">Leads recientes</h2>
          <RouterLink to="/leads" class="text-small text-brand hover:text-brand-hover transition-colors">
            Ver todos →
          </RouterLink>
        </div>

        <div v-if="isLoading" class="p-6 space-y-4">
          <div v-for="i in 4" :key="i" class="flex items-center gap-4">
            <SkeletonLine height="h-8" width="w-8" class="rounded-full" />
            <div class="flex-1 space-y-2">
              <SkeletonLine height="h-4" width="w-32" />
              <SkeletonLine height="h-3" width="w-48" />
            </div>
            <SkeletonLine height="h-5" width="w-16" class="rounded-full" />
          </div>
        </div>

        <div v-else-if="leads.length === 0" class="px-6 py-10 text-center">
          <p class="text-body text-ink-disabled">Aún no hay leads captados.</p>
        </div>

        <ul v-else class="divide-y divide-border">
          <li v-for="lead in leads" :key="lead.id" class="flex items-center gap-4 px-6 py-4 hover:bg-subtle transition-colors">
            <div class="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0">
              <span class="text-label font-semibold text-brand uppercase">{{ lead.name.charAt(0) }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-small font-medium text-ink truncate">{{ lead.name }}</p>
              <p class="text-label text-ink-disabled truncate">{{ lead.email }}</p>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <AppBadge :variant="lead.status" dot>{{ lead.status }}</AppBadge>
              <span class="text-label text-ink-disabled">{{ formatDate(lead.capturedAt) }}</span>
            </div>
          </li>
        </ul>
      </AppCard>

      <!-- Conversaciones activas -->
      <AppCard padding="none" class="col-span-12 lg:col-span-5">
        <div class="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 class="font-display text-h3 text-ink">Conversaciones activas</h2>
          <RouterLink to="/conversations" class="text-small text-brand hover:text-brand-hover transition-colors">
            Ver todas →
          </RouterLink>
        </div>

        <div v-if="isLoading" class="p-6 space-y-4">
          <div v-for="i in 4" :key="i" class="space-y-2">
            <SkeletonLine height="h-4" width="w-24" />
            <SkeletonLine height="h-3" width="w-full" />
          </div>
        </div>

        <div v-else-if="conversations.length === 0" class="px-6 py-10 text-center">
          <p class="text-body text-ink-disabled">Sin conversaciones activas.</p>
        </div>

        <ul v-else class="divide-y divide-border">
          <li v-for="conv in conversations" :key="conv.id"
              class="px-6 py-4 hover:bg-subtle transition-colors cursor-pointer"
              @click="$router.push(`/conversations/${conv.id}`)">
            <div class="flex items-start justify-between gap-2 mb-1">
              <p class="text-small font-medium text-ink truncate">{{ conv.visitorId }}</p>
              <span class="text-label text-ink-disabled shrink-0">{{ timeAgo(conv.startedAt) }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-label text-ink-disabled">{{ conv.messageCount }} mensajes</span>
              <span v-if="conv.leadCaptured" class="text-label text-green-600 font-medium">· Lead capturado</span>
            </div>
          </li>
        </ul>
      </AppCard>
    </div>
  </div>
</template>
