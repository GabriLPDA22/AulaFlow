<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { settingsService } from '@/services/settingsService'
import type { AssistantSettings } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppTextarea from '@/components/ui/AppTextarea.vue'
import AppToggle from '@/components/ui/AppToggle.vue'
import PageHeader from '@/components/shared/PageHeader.vue'

const isLoading = ref(true)
const isSavingBusiness = ref(false)
const isSavingAssistant = ref(false)
const savedBusiness = ref(false)
const savedAssistant = ref(false)

const businessForm = reactive({ name: '', logoUrl: '' })
const assistantForm = reactive<Omit<AssistantSettings, 'id' | 'businessId'>>({
  assistantName: '',
  welcomeMessage: '',
  personality: '',
  leadCaptureEnabled: true,
  leadCapturePrompt: '',
  primaryColor: '#1D3557',
  avatarUrl: null,
})

onMounted(async () => {
  const [business, settings] = await Promise.all([
    settingsService.getBusiness(),
    settingsService.getAssistantSettings(),
  ])
  businessForm.name = business.name
  businessForm.logoUrl = business.logoUrl ?? ''
  Object.assign(assistantForm, {
    assistantName: settings.assistantName,
    welcomeMessage: settings.welcomeMessage,
    personality: settings.personality,
    leadCaptureEnabled: settings.leadCaptureEnabled,
    leadCapturePrompt: settings.leadCapturePrompt,
    primaryColor: settings.primaryColor,
    avatarUrl: settings.avatarUrl,
  })
  isLoading.value = false
})

async function saveBusiness() {
  isSavingBusiness.value = true
  try {
    await settingsService.updateBusiness({ name: businessForm.name, logoUrl: businessForm.logoUrl || undefined })
    savedBusiness.value = true
    setTimeout(() => (savedBusiness.value = false), 2500)
  } finally {
    isSavingBusiness.value = false
  }
}

async function saveAssistant() {
  isSavingAssistant.value = true
  try {
    await settingsService.updateAssistantSettings({ ...assistantForm })
    savedAssistant.value = true
    setTimeout(() => (savedAssistant.value = false), 2500)
  } finally {
    isSavingAssistant.value = false
  }
}
</script>

<template>
  <div>
    <PageHeader title="Ajustes" description="Configura tu negocio y el comportamiento del asistente." />

    <div v-if="isLoading" class="space-y-5">
      <AppCard class="animate-pulse space-y-4">
        <div class="h-5 w-40 bg-border rounded" />
        <div class="h-10 w-full bg-border rounded" />
        <div class="h-10 w-full bg-border rounded" />
      </AppCard>
    </div>

    <div v-else class="space-y-8 max-w-2xl">
      <!-- Sección: negocio -->
      <section>
        <h2 class="font-display text-h2 text-ink mb-1">Información del negocio</h2>
        <p class="text-body text-ink-secondary mb-5">Datos básicos visibles en el panel.</p>
        <AppCard>
          <form @submit.prevent="saveBusiness" class="space-y-4">
            <AppInput v-model="businessForm.name" label="Nombre del negocio" required />
            <AppInput v-model="businessForm.logoUrl" label="URL del logo" placeholder="https://..." type="url" />
            <div class="flex items-center justify-end gap-3 pt-2">
              <span v-if="savedBusiness" class="text-small text-green-600 font-medium flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Guardado
              </span>
              <AppButton type="submit" :loading="isSavingBusiness">Guardar cambios</AppButton>
            </div>
          </form>
        </AppCard>
      </section>

      <!-- Divisor -->
      <div class="border-t border-border" />

      <!-- Sección: asistente -->
      <section>
        <h2 class="font-display text-h2 text-ink mb-1">Configuración del asistente</h2>
        <p class="text-body text-ink-secondary mb-5">Define cómo se comporta y se presenta el asistente en tu widget.</p>
        <AppCard>
          <form @submit.prevent="saveAssistant" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <AppInput v-model="assistantForm.assistantName" label="Nombre del asistente" required />
              <div class="flex flex-col gap-1.5">
                <label class="text-label text-ink-secondary uppercase tracking-wide">Color principal</label>
                <div class="flex items-center gap-3">
                  <input
                    v-model="assistantForm.primaryColor"
                    type="color"
                    class="w-10 h-10 rounded-lg border border-border cursor-pointer p-1"
                  />
                  <span class="text-body text-ink-secondary font-mono">{{ assistantForm.primaryColor }}</span>
                </div>
              </div>
            </div>

            <AppInput
              v-model="assistantForm.welcomeMessage"
              label="Mensaje de bienvenida"
              placeholder="Hola, ¿en qué puedo ayudarte?"
              required
            />

            <AppTextarea
              v-model="assistantForm.personality"
              label="Personalidad"
              placeholder="Ej: Amable, profesional y conciso. Responde siempre en español."
              :rows="3"
              hint="Describe cómo debe comportarse el asistente al responder."
            />

            <!-- Lead capture -->
            <div class="p-4 bg-subtle rounded-xl border border-border space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-small font-medium text-ink">Captura de leads</p>
                  <p class="text-label text-ink-secondary">El asistente pedirá los datos del visitante si muestra interés.</p>
                </div>
                <AppToggle v-model="assistantForm.leadCaptureEnabled" />
              </div>

              <AppInput
                v-if="assistantForm.leadCaptureEnabled"
                v-model="assistantForm.leadCapturePrompt"
                label="Mensaje de captura"
                placeholder="Para ayudarte mejor, ¿me dices tu nombre y correo?"
              />
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
              <span v-if="savedAssistant" class="text-small text-green-600 font-medium flex items-center gap-1.5">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Guardado
              </span>
              <AppButton type="submit" :loading="isSavingAssistant">Guardar asistente</AppButton>
            </div>
          </form>
        </AppCard>
      </section>
    </div>
  </div>
</template>
