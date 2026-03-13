<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { leadsService } from '@/services/leadsService'
import type { Lead, LeadStatus } from '@/types'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import EmptyState from '@/components/shared/EmptyState.vue'
import SkeletonLine from '@/components/shared/SkeletonLine.vue'

const router = useRouter()

const leads = ref<Lead[]>([])
const total = ref(0)
const isLoading = ref(true)

const filters = reactive({
  status: '' as LeadStatus | '',
  search: '',
  page: 1,
  pageSize: 20,
})

const statusOptions: { value: LeadStatus | ''; label: string }[] = [
  { value: '', label: 'Todos los estados' },
  { value: 'New', label: 'Nuevo' },
  { value: 'Contacted', label: 'Contactado' },
  { value: 'Qualified', label: 'Cualificado' },
  { value: 'Discarded', label: 'Descartado' },
]

const statusLabels: Record<LeadStatus, string> = {
  New: 'Nuevo',
  Contacted: 'Contactado',
  Qualified: 'Cualificado',
  Discarded: 'Descartado',
}

let searchTimeout: ReturnType<typeof setTimeout>

async function fetchLeads() {
  isLoading.value = true
  try {
    const result = await leadsService.getAll({
      status: filters.status || undefined,
      search: filters.search || undefined,
      page: filters.page,
      pageSize: filters.pageSize,
    })
    leads.value = result.items
    total.value = result.total
  } finally {
    isLoading.value = false
  }
}

watch(() => filters.status, () => { filters.page = 1; fetchLeads() })
watch(() => filters.search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => { filters.page = 1; fetchLeads() }, 350)
})

onMounted(fetchLeads)

async function changeStatus(lead: Lead, status: LeadStatus) {
  await leadsService.updateStatus(lead.id, status)
  lead.status = status
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div>
    <PageHeader title="Leads" description="Contactos captados desde el widget de chat.">
      <template #actions>
        <span class="text-small text-ink-disabled">{{ total }} leads en total</span>
      </template>
    </PageHeader>

    <!-- Filtros -->
    <div class="flex items-center gap-3 mb-6 flex-wrap">
      <!-- Búsqueda -->
      <div class="relative flex-1 min-w-52 max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="filters.search"
          type="text"
          placeholder="Buscar por nombre o email..."
          class="w-full pl-9 pr-4 py-2.5 text-body border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all placeholder:text-ink-disabled"
        />
      </div>

      <!-- Filtro estado -->
      <div class="flex items-center gap-1.5 p-1 bg-subtle rounded-lg">
        <button
          v-for="opt in statusOptions"
          :key="opt.value"
          @click="filters.status = opt.value"
          :class="[
            'px-3 py-1.5 rounded-md text-small font-medium transition-all',
            filters.status === opt.value
              ? 'bg-surface text-ink shadow-card'
              : 'text-ink-secondary hover:text-ink',
          ]"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <!-- Tabla de leads -->
    <AppCard padding="none">
      <!-- Loading -->
      <div v-if="isLoading" class="p-6 space-y-4">
        <div v-for="i in 6" :key="i" class="flex items-center gap-4">
          <SkeletonLine height="h-8" width="w-8" class="rounded-full shrink-0" />
          <div class="flex-1 space-y-2">
            <SkeletonLine height="h-4" width="w-32" />
            <SkeletonLine height="h-3" width="w-48" />
          </div>
          <SkeletonLine height="h-5" width="w-20" class="rounded-full" />
          <SkeletonLine height="h-4" width="w-24" />
        </div>
      </div>

      <!-- Empty -->
      <EmptyState
        v-else-if="leads.length === 0"
        title="Sin leads aún"
        description="Cuando alguien deje sus datos en el chat, aparecerán aquí."
      />

      <!-- Tabla -->
      <table v-else class="w-full">
        <thead>
          <tr class="border-b border-border">
            <th class="px-6 py-3.5 text-left text-label text-ink-disabled uppercase tracking-wide">Contacto</th>
            <th class="px-6 py-3.5 text-left text-label text-ink-disabled uppercase tracking-wide">Estado</th>
            <th class="px-6 py-3.5 text-left text-label text-ink-disabled uppercase tracking-wide hidden md:table-cell">Notas</th>
            <th class="px-6 py-3.5 text-left text-label text-ink-disabled uppercase tracking-wide hidden lg:table-cell">Captado</th>
            <th class="px-6 py-3.5" />
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr
            v-for="lead in leads"
            :key="lead.id"
            class="hover:bg-subtle transition-colors cursor-pointer"
            @click="router.push(`/leads/${lead.id}`)"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0">
                  <span class="text-label font-semibold text-brand uppercase">{{ lead.name.charAt(0) }}</span>
                </div>
                <div class="min-w-0">
                  <p class="text-small font-medium text-ink">{{ lead.name }}</p>
                  <p class="text-label text-ink-disabled truncate max-w-[200px]">{{ lead.email }}</p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4" @click.stop>
              <!-- Selector de estado inline -->
              <div class="relative group">
                <AppBadge :variant="lead.status" dot class="cursor-pointer">
                  {{ statusLabels[lead.status] }}
                </AppBadge>
                <div class="absolute left-0 top-full mt-1 z-10 hidden group-hover:flex flex-col bg-surface border border-border rounded-xl shadow-float overflow-hidden min-w-[160px]">
                  <button
                    v-for="opt in statusOptions.slice(1)"
                    :key="opt.value"
                    @click.stop="changeStatus(lead, opt.value as LeadStatus)"
                    class="flex items-center gap-2 px-3 py-2.5 text-small hover:bg-subtle text-left transition-colors"
                    :class="lead.status === opt.value ? 'text-brand font-medium' : 'text-ink'"
                  >
                    <AppBadge :variant="opt.value as LeadStatus" dot class="pointer-events-none" />
                  </button>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 hidden md:table-cell">
              <p class="text-small text-ink-secondary truncate max-w-[200px]">{{ lead.notes ?? '—' }}</p>
            </td>
            <td class="px-6 py-4 hidden lg:table-cell">
              <p class="text-small text-ink-disabled">{{ formatDate(lead.capturedAt) }}</p>
            </td>
            <td class="px-6 py-4 text-right" @click.stop>
              <button
                @click="router.push(`/leads/${lead.id}`)"
                class="text-ink-disabled hover:text-brand transition-colors"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </AppCard>
  </div>
</template>
