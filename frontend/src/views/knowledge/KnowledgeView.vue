<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { knowledgeService } from '@/services/knowledgeService'
import type { KnowledgeSource, KnowledgeType } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppBadge from '@/components/ui/AppBadge.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppTextarea from '@/components/ui/AppTextarea.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppToggle from '@/components/ui/AppToggle.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import EmptyState from '@/components/shared/EmptyState.vue'

const sources = ref<KnowledgeSource[]>([])
const isLoading = ref(true)
const showModal = ref(false)
const isSaving = ref(false)
const editingId = ref<string | null>(null)

const form = reactive({ title: '', type: 'Text' as KnowledgeType, content: '' })

const typeOptions = [
  { value: 'Text', label: 'Texto libre' },
  { value: 'Faq', label: 'Pregunta frecuente' },
  { value: 'Url', label: 'URL' },
]
const typeLabels: Record<KnowledgeType, string> = { Text: 'Texto', Faq: 'FAQ', Url: 'URL' }

onMounted(async () => {
  sources.value = await knowledgeService.getAll()
  isLoading.value = false
})

function openCreate() {
  editingId.value = null
  form.title = ''
  form.type = 'Text'
  form.content = ''
  showModal.value = true
}

function openEdit(source: KnowledgeSource) {
  editingId.value = source.id
  form.title = source.title
  form.type = source.type
  form.content = source.content
  showModal.value = true
}

async function save() {
  isSaving.value = true
  try {
    if (editingId.value) {
      const updated = await knowledgeService.update(editingId.value, { ...form })
      const idx = sources.value.findIndex((s: KnowledgeSource) => s.id === editingId.value)
      if (idx !== -1) sources.value[idx] = updated
    } else {
      const created = await knowledgeService.create({ ...form })
      sources.value.unshift(created)
    }
    showModal.value = false
  } finally {
    isSaving.value = false
  }
}

async function toggleActive(source: KnowledgeSource) {
  const updated = await knowledgeService.toggle(source.id)
  const idx = sources.value.findIndex(s => s.id === source.id)
  if (idx !== -1) sources.value[idx] = updated
}

async function deleteSource(source: KnowledgeSource) {
  if (!confirm(`¿Eliminar "${source.title}"?`)) return
  await knowledgeService.delete(source.id)
  sources.value = sources.value.filter((s: KnowledgeSource) => s.id !== source.id)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div>
    <PageHeader
      title="Base de conocimiento"
      description="El contenido que usa el asistente para responder preguntas."
    >
      <template #actions>
        <AppButton @click="openCreate">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Añadir fuente
        </AppButton>
      </template>
    </PageHeader>

    <!-- Info card -->
    <div class="mb-6 p-4 bg-brand-light rounded-xl border border-brand/20 flex items-start gap-3">
      <svg class="w-5 h-5 text-brand shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-small text-brand/80">
        El asistente usa únicamente las fuentes <strong>activas</strong> para responder. Añade información sobre tus cursos, precios, horarios y preguntas frecuentes.
      </p>
    </div>

    <!-- Lista de fuentes -->
    <div v-if="isLoading" class="space-y-3">
      <AppCard v-for="i in 4" :key="i" class="animate-pulse">
        <div class="h-4 w-48 bg-border rounded mb-2" />
        <div class="h-3 w-full bg-border rounded" />
      </AppCard>
    </div>

    <EmptyState
      v-else-if="sources.length === 0"
      title="Sin fuentes de conocimiento"
      description="Añade textos, FAQs o URLs para que el asistente pueda responder con la información de tu negocio."
      action="Añadir primera fuente"
      @action="openCreate"
    >
      <template #icon>
        <svg class="w-6 h-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </template>
    </EmptyState>

    <div v-else class="space-y-3">
      <AppCard
        v-for="source in sources"
        :key="source.id"
        class="flex items-start gap-4"
        :class="{ 'opacity-60': !source.isActive }"
      >
        <!-- Type badge -->
        <div class="shrink-0 mt-0.5">
          <AppBadge :variant="source.type">{{ typeLabels[source.type] }}</AppBadge>
        </div>

        <!-- Contenido -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-small font-medium text-ink">{{ source.title }}</p>
              <p class="text-label text-ink-disabled mt-0.5 truncate max-w-lg">
                {{ source.type === 'Url' ? source.content : source.content.slice(0, 100) + (source.content.length > 100 ? '…' : '') }}
              </p>
            </div>
            <span class="text-label text-ink-disabled shrink-0">{{ formatDate(source.updatedAt) }}</span>
          </div>
        </div>

        <!-- Acciones -->
        <div class="flex items-center gap-1 shrink-0">
          <AppToggle
            :model-value="source.isActive"
            @update:model-value="toggleActive(source)"
            :title="source.isActive ? 'Desactivar' : 'Activar'"
          />
          <div class="w-px h-4 bg-border mx-1" />
          <button
            @click="openEdit(source)"
            class="p-1.5 rounded-lg text-ink-disabled hover:text-ink hover:bg-subtle transition-colors"
            title="Editar"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            @click="deleteSource(source)"
            class="p-1.5 rounded-lg text-ink-disabled hover:text-red-500 hover:bg-red-50 transition-colors"
            title="Eliminar"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </AppCard>
    </div>

    <!-- Modal -->
    <AppModal
      :open="showModal"
      :title="editingId ? 'Editar fuente' : 'Nueva fuente de conocimiento'"
      @close="showModal = false"
    >
      <form @submit.prevent="save" class="space-y-4">
        <AppInput v-model="form.title" label="Título" placeholder="Ej: Precios y cursos disponibles" required />
        <AppSelect v-model="form.type" label="Tipo" :options="typeOptions" />
        <AppTextarea
          v-if="form.type !== 'Url'"
          v-model="form.content"
          label="Contenido"
          :placeholder="form.type === 'Faq' ? 'Pregunta: ...\nRespuesta: ...' : 'Escribe aquí la información que debe conocer el asistente...'"
          :rows="6"
          required
        />
        <AppInput
          v-else
          v-model="form.content"
          label="URL"
          type="url"
          placeholder="https://tu-academia.com/precios"
          required
        />
        <div class="flex justify-end gap-3 pt-2">
          <AppButton variant="secondary" type="button" @click="showModal = false">Cancelar</AppButton>
          <AppButton type="submit" :loading="isSaving">
            {{ editingId ? 'Guardar cambios' : 'Crear fuente' }}
          </AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>
