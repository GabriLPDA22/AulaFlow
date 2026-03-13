<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { leadsService } from '@/services/leadsService'
import { conversationsService } from '@/services/conversationsService'
import type { Lead, Conversation } from '@/types'
import AppBadge from '@/components/ui/AppBadge.vue'
import SkeletonLine from '@/components/shared/SkeletonLine.vue'

const authStore = useAuthStore()

const leads = ref<Lead[]>([])
const conversations = ref<Conversation[]>([])
const totalLeads = ref(0)
const newLeads = ref(0)
const activeConversations = ref(0)
const isLoading = ref(true)

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 13) return 'Buenos días'
  if (h < 20) return 'Buenas tardes'
  return 'Buenas noches'
})

const today = computed(() =>
  new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
)

onMounted(async () => {
  try {
    const [leadsResult, convsResult] = await Promise.all([
      leadsService.getAll({ pageSize: 6 }),
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

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Ahora'
  if (mins < 60) return `Hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `Hace ${hours}h`
  return `Hace ${Math.floor(hours / 24)}d`
}

const statusColors: Record<string, string> = {
  New: '#2A9D8F',
  Contacted: '#457B9D',
  Qualified: '#1D3557',
  Lost: '#9CA3AF',
}
</script>

<template>
  <div class="space-y-8">

    <!-- ── Header editorial ────────────────────────────────────────── -->
    <div class="flex items-end justify-between">
      <div>
        <p class="text-small text-ink-disabled mb-1 capitalize">{{ today }}</p>
        <h1 class="font-display text-ink leading-tight" style="font-size:1.75rem; font-weight:600;">
          {{ greeting }}, {{ authStore.user?.name?.split(' ')[0] ?? '' }}.
        </h1>
      </div>
      <RouterLink
        to="/widget-setup"
        class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-small font-medium hover:bg-brand-hover transition-colors"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        Instalar widget
      </RouterLink>
    </div>

    <!-- ── Métricas — layout asimétrico ───────────────────────────── -->
    <div class="grid grid-cols-12 gap-4">

      <!-- Hero stat — leads (fondo oscuro) -->
      <div class="col-span-12 sm:col-span-5 rounded-xl p-6 flex flex-col justify-between min-h-[140px] relative overflow-hidden" style="background:#1D3557;">
        <!-- Decoración fondo -->
        <div class="absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-10" style="background:#2A9D8F;"></div>
        <div class="absolute -right-2 bottom-0 w-24 h-24 rounded-full opacity-[0.07]" style="background:white;"></div>

        <div class="relative">
          <p class="text-white/50 text-small font-medium uppercase tracking-widest mb-4">Leads captados</p>
          <div v-if="isLoading">
            <div class="h-12 w-20 bg-white/10 rounded-lg animate-pulse mb-2"></div>
            <div class="h-4 w-28 bg-white/10 rounded animate-pulse"></div>
          </div>
          <template v-else>
            <p class="font-display text-white leading-none mb-2" style="font-size:3rem; font-weight:700;">{{ totalLeads }}</p>
            <div class="flex items-center gap-2">
              <span class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style="background:rgba(42,157,143,0.25); color:#4ECDC4;">
                <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                {{ newLeads }} nuevos
              </span>
              <span class="text-white/40 text-xs">sin contactar</span>
            </div>
          </template>
        </div>
      </div>

      <!-- Conversaciones activas -->
      <div class="col-span-12 sm:col-span-4 bg-surface rounded-xl border border-border p-6 flex flex-col justify-between min-h-[140px]">
        <div class="flex items-center justify-between mb-4">
          <p class="text-ink-disabled text-small font-medium uppercase tracking-widest">Activas</p>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="text-label text-emerald-600 font-medium">En curso</span>
          </div>
        </div>
        <div v-if="isLoading">
          <div class="h-10 w-16 bg-border rounded-lg animate-pulse mb-2"></div>
          <div class="h-3 w-24 bg-border rounded animate-pulse"></div>
        </div>
        <template v-else>
          <p class="font-display text-ink leading-none mb-1.5" style="font-size:2.25rem; font-weight:700;">{{ activeConversations }}</p>
          <p class="text-small text-ink-secondary">conversaciones</p>
        </template>
      </div>

      <!-- Asistente activo -->
      <div class="col-span-12 sm:col-span-3 bg-surface rounded-xl border border-border p-6 flex flex-col justify-between min-h-[140px]">
        <p class="text-ink-disabled text-small font-medium uppercase tracking-widest mb-4">Asistente</p>
        <div>
          <div class="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p class="text-small font-semibold text-ink">Activo 24/7</p>
          <p class="text-label text-ink-secondary mt-0.5">Respondiendo</p>
        </div>
      </div>
    </div>

    <!-- ── Contenido principal ─────────────────────────────────────── -->
    <div class="grid grid-cols-12 gap-5">

      <!-- Leads recientes -->
      <div class="col-span-12 lg:col-span-7 bg-surface rounded-xl border border-border overflow-hidden">
        <div class="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 class="font-display text-[1.0625rem] font-semibold text-ink">Leads recientes</h2>
          <RouterLink to="/leads" class="text-small text-ink-secondary hover:text-ink transition-colors font-medium">
            Ver todos →
          </RouterLink>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="p-5 space-y-3">
          <div v-for="i in 4" :key="i" class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-border animate-pulse shrink-0"></div>
            <div class="flex-1 space-y-1.5">
              <div class="h-3.5 w-28 bg-border rounded animate-pulse"></div>
              <div class="h-3 w-40 bg-border rounded animate-pulse"></div>
            </div>
            <div class="h-5 w-16 bg-border rounded-full animate-pulse"></div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else-if="leads.length === 0" class="px-6 py-12 text-center">
          <div class="w-10 h-10 rounded-full bg-subtle flex items-center justify-center mx-auto mb-3">
            <svg class="w-5 h-5 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p class="text-small text-ink-disabled">Aún no hay leads captados</p>
        </div>

        <!-- Lista -->
        <ul v-else class="divide-y divide-border">
          <li
            v-for="lead in leads" :key="lead.id"
            class="flex items-center gap-4 px-6 py-3.5 hover:bg-subtle/60 transition-colors cursor-pointer"
            @click="$router.push(`/leads/${lead.id}`)"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-label font-bold"
              :style="`background:${statusColors[lead.status] ?? '#1D3557'}18; color:${statusColors[lead.status] ?? '#1D3557'}`"
            >
              {{ lead.name.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-small font-medium text-ink truncate">{{ lead.name }}</p>
              <p class="text-label text-ink-disabled truncate">{{ lead.email }}</p>
            </div>
            <div class="flex items-center gap-2.5 shrink-0">
              <AppBadge :variant="lead.status" dot>{{ lead.status }}</AppBadge>
              <span class="text-label text-ink-disabled">{{ timeAgo(lead.capturedAt) }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Panel derecho -->
      <div class="col-span-12 lg:col-span-5 flex flex-col gap-4">

        <!-- Conversaciones activas -->
        <div class="bg-surface rounded-xl border border-border overflow-hidden flex-1">
          <div class="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 class="font-display text-[1.0625rem] font-semibold text-ink">Conversaciones</h2>
            <RouterLink to="/conversations" class="text-small text-ink-secondary hover:text-ink transition-colors font-medium">
              Ver todas →
            </RouterLink>
          </div>

          <div v-if="isLoading" class="p-5 space-y-3">
            <div v-for="i in 3" :key="i" class="space-y-1.5">
              <div class="h-3.5 w-20 bg-border rounded animate-pulse"></div>
              <div class="h-3 w-full bg-border rounded animate-pulse"></div>
            </div>
          </div>

          <div v-else-if="conversations.length === 0" class="px-5 py-10 text-center">
            <div class="w-2 h-2 rounded-full bg-border mx-auto mb-3"></div>
            <p class="text-small text-ink-disabled">Sin conversaciones activas</p>
          </div>

          <ul v-else class="divide-y divide-border">
            <li
              v-for="conv in conversations" :key="conv.id"
              class="px-5 py-3.5 hover:bg-subtle/60 transition-colors cursor-pointer group"
              @click="$router.push(`/conversations/${conv.id}`)"
            >
              <div class="flex items-center justify-between mb-1">
                <p class="text-small font-medium text-ink truncate max-w-[140px]">{{ conv.visitorId }}</p>
                <span class="text-label text-ink-disabled">{{ timeAgo(conv.startedAt) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-label text-ink-secondary">{{ conv.messageCount }} mensajes</span>
                <span v-if="conv.leadCaptured" class="flex items-center gap-1 text-label text-emerald-600 font-medium">
                  <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Lead
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Quick actions -->
        <div class="bg-surface rounded-xl border border-border p-4">
          <p class="text-label text-ink-disabled uppercase tracking-widest mb-3 font-medium">Acciones rápidas</p>
          <div class="space-y-1">
            <RouterLink
              v-for="action in [
                { label: 'Añadir conocimiento', to: '/knowledge', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                { label: 'Ver configuración', to: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
                { label: 'Instalar widget', to: '/widget-setup', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
              ]"
              :key="action.to"
              :to="action.to"
              class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-subtle transition-colors group"
            >
              <svg class="w-4 h-4 text-ink-disabled group-hover:text-ink-secondary transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                <path stroke-linecap="round" stroke-linejoin="round" :d="action.icon" />
              </svg>
              <span class="text-small text-ink-secondary group-hover:text-ink transition-colors">{{ action.label }}</span>
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
