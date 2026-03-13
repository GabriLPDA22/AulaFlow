<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { leadsService } from '@/services/leadsService'
import type { Lead, LeadStatus } from '@/types'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppTextarea from '@/components/ui/AppTextarea.vue'
import AppModal from '@/components/ui/AppModal.vue'

const route = useRoute()
const router = useRouter()
const lead = ref<Lead | null>(null)
const isLoading = ref(true)
const isSaving = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const editForm = ref({ name: '', email: '', phone: '', notes: '' })

const statusLabels: Record<LeadStatus, string> = {
  New: 'Nuevo', Contacted: 'Contactado', Qualified: 'Cualificado', Discarded: 'Descartado',
}
const allStatuses: LeadStatus[] = ['New', 'Contacted', 'Qualified', 'Discarded']

onMounted(async () => {
  try {
    lead.value = await leadsService.getById(route.params.id as string)
    editForm.value = {
      name: lead.value.name,
      email: lead.value.email,
      phone: lead.value.phone ?? '',
      notes: lead.value.notes ?? '',
    }
  } finally {
    isLoading.value = false
  }
})

async function saveEdit() {
  if (!lead.value) return
  isSaving.value = true
  try {
    lead.value = await leadsService.update(lead.value.id, editForm.value)
    isEditing.value = false
  } finally {
    isSaving.value = false
  }
}

async function changeStatus(status: LeadStatus) {
  if (!lead.value) return
  lead.value = await leadsService.updateStatus(lead.value.id, status)
}

async function deleteLead() {
  if (!lead.value) return
  await leadsService.delete(lead.value.id)
  router.push('/leads')
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div>
    <!-- Back -->
    <button @click="router.push('/leads')" class="flex items-center gap-1.5 text-small text-ink-secondary hover:text-ink transition-colors mb-6">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Volver a leads
    </button>

    <div v-if="isLoading" class="space-y-4">
      <div class="h-8 w-48 bg-border animate-pulse rounded" />
      <div class="h-4 w-64 bg-border animate-pulse rounded" />
    </div>

    <template v-else-if="lead">
      <!-- Header del lead -->
      <div class="flex items-start justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center shrink-0">
            <span class="font-display font-semibold text-brand text-lg uppercase">{{ lead.name.charAt(0) }}</span>
          </div>
          <div>
            <h1 class="font-display text-h1 text-ink">{{ lead.name }}</h1>
            <p class="text-body text-ink-secondary">{{ lead.email }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <AppButton variant="ghost" size="sm" @click="showDeleteModal = true">Eliminar</AppButton>
          <AppButton variant="secondary" size="sm" @click="isEditing = !isEditing">
            {{ isEditing ? 'Cancelar' : 'Editar' }}
          </AppButton>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-5">
        <!-- Info principal -->
        <AppCard class="col-span-12 lg:col-span-8">
          <h2 class="font-display text-h3 text-ink mb-5">Información del contacto</h2>

          <template v-if="!isEditing">
            <dl class="grid grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <dt class="text-label text-ink-disabled uppercase tracking-wide mb-1">Nombre</dt>
                <dd class="text-body text-ink font-medium">{{ lead.name }}</dd>
              </div>
              <div>
                <dt class="text-label text-ink-disabled uppercase tracking-wide mb-1">Email</dt>
                <dd class="text-body text-ink">{{ lead.email }}</dd>
              </div>
              <div>
                <dt class="text-label text-ink-disabled uppercase tracking-wide mb-1">Teléfono</dt>
                <dd class="text-body text-ink">{{ lead.phone ?? '—' }}</dd>
              </div>
              <div>
                <dt class="text-label text-ink-disabled uppercase tracking-wide mb-1">Captado</dt>
                <dd class="text-body text-ink">{{ formatDate(lead.capturedAt) }}</dd>
              </div>
              <div class="col-span-2">
                <dt class="text-label text-ink-disabled uppercase tracking-wide mb-1">Notas</dt>
                <dd class="text-body text-ink whitespace-pre-line">{{ lead.notes || '—' }}</dd>
              </div>
            </dl>
          </template>

          <template v-else>
            <form @submit.prevent="saveEdit" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <AppInput v-model="editForm.name" label="Nombre" required />
                <AppInput v-model="editForm.email" label="Email" type="email" required />
                <AppInput v-model="editForm.phone" label="Teléfono" placeholder="Opcional" />
              </div>
              <AppTextarea v-model="editForm.notes" label="Notas" placeholder="Contexto, observaciones..." :rows="4" />
              <div class="flex justify-end gap-3 pt-2">
                <AppButton variant="secondary" @click="isEditing = false">Cancelar</AppButton>
                <AppButton type="submit" :loading="isSaving">Guardar cambios</AppButton>
              </div>
            </form>
          </template>
        </AppCard>

        <!-- Sidebar derecha -->
        <div class="col-span-12 lg:col-span-4 space-y-5">
          <!-- Estado -->
          <AppCard>
            <h3 class="text-label text-ink-disabled uppercase tracking-wide mb-4">Estado del lead</h3>
            <div class="space-y-2">
              <button
                v-for="status in allStatuses"
                :key="status"
                @click="changeStatus(status)"
                :class="[
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-small transition-colors',
                  lead.status === status ? 'bg-brand-light' : 'hover:bg-subtle',
                ]"
              >
                <AppBadge :variant="status" dot class="pointer-events-none" />
                <span :class="lead.status === status ? 'text-brand font-medium' : 'text-ink'">
                  {{ statusLabels[status] }}
                </span>
                <svg v-if="lead.status === status" class="w-4 h-4 text-brand ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </button>
            </div>
          </AppCard>

          <!-- Conversación origen -->
          <AppCard v-if="lead.conversationId">
            <h3 class="text-label text-ink-disabled uppercase tracking-wide mb-3">Conversación</h3>
            <RouterLink
              :to="`/conversations/${lead.conversationId}`"
              class="flex items-center gap-2 text-small text-brand hover:text-brand-hover transition-colors"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ver conversación original
            </RouterLink>
          </AppCard>
        </div>
      </div>
    </template>

    <!-- Modal confirmar borrado -->
    <AppModal :open="showDeleteModal" title="Eliminar lead" size="sm" @close="showDeleteModal = false">
      <p class="text-body text-ink-secondary">
        ¿Seguro que quieres eliminar el lead de <strong class="text-ink">{{ lead?.name }}</strong>? Esta acción no se puede deshacer.
      </p>
      <template #footer>
        <AppButton variant="secondary" @click="showDeleteModal = false">Cancelar</AppButton>
        <AppButton variant="danger" @click="deleteLead">Eliminar</AppButton>
      </template>
    </AppModal>
  </div>
</template>
