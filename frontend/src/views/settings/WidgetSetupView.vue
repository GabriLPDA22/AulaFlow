<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { settingsService } from '@/services/settingsService'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import PageHeader from '@/components/shared/PageHeader.vue'

const businessToken = ref('')
const copied = ref(false)

onMounted(async () => {
  const business = await settingsService.getBusiness()
  businessToken.value = (business as any).businessToken ?? ''
})

const widgetUrl = `https://cdn.aulaflow.io/widget.js`

const snippetCode = ref('')
const computeSnippet = () =>
  `<script src="${widgetUrl}" data-token="${businessToken.value ?? 'TU_TOKEN'}"><\/script>`

onMounted(() => {
  snippetCode.value = computeSnippet()
})

async function copyCode() {
  await navigator.clipboard.writeText(computeSnippet())
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <div>
    <PageHeader
      title="Instalar widget"
      description="Añade el asistente a tu web copiando este código."
    />

    <div class="max-w-2xl space-y-8">
      <!-- Paso 1 -->
      <AppCard>
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
            <span class="text-white text-small font-semibold">1</span>
          </div>
          <div class="flex-1">
            <h2 class="font-display text-h3 text-ink mb-1">Copia el código</h2>
            <p class="text-body text-ink-secondary mb-4">
              Pega este fragmento en el <code class="text-small bg-subtle px-1.5 py-0.5 rounded">&#60;head&#62;</code> o justo antes del cierre de <code class="text-small bg-subtle px-1.5 py-0.5 rounded">&#60;/body&#62;</code> de tu web.
            </p>

            <!-- Code block -->
            <div class="relative bg-[#111] rounded-xl overflow-hidden">
              <div class="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <span class="text-label text-white/40">HTML</span>
                <AppButton
                  variant="ghost"
                  size="sm"
                  class="text-white/60 hover:text-white hover:bg-white/10"
                  @click="copyCode"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {{ copied ? 'Copiado!' : 'Copiar' }}
                </AppButton>
              </div>
              <pre class="p-4 text-small text-green-400 overflow-x-auto leading-relaxed font-mono">{{ computeSnippet() }}</pre>
            </div>
          </div>
        </div>
      </AppCard>

      <!-- Paso 2 -->
      <AppCard>
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
            <span class="text-white text-small font-semibold">2</span>
          </div>
          <div>
            <h2 class="font-display text-h3 text-ink mb-1">Personaliza el aspecto</h2>
            <p class="text-body text-ink-secondary mb-4">
              Ve a <RouterLink to="/settings" class="text-brand hover:text-brand-hover">Ajustes</RouterLink> para cambiar el nombre del asistente, mensaje de bienvenida y color principal del widget.
            </p>
            <RouterLink
              to="/settings"
              class="inline-flex items-center gap-1.5 text-small text-brand font-medium hover:text-brand-hover transition-colors"
            >
              Ir a ajustes del asistente
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </AppCard>

      <!-- Paso 3 -->
      <AppCard>
        <div class="flex items-start gap-4">
          <div class="w-8 h-8 rounded-full bg-brand flex items-center justify-center shrink-0">
            <span class="text-white text-small font-semibold">3</span>
          </div>
          <div>
            <h2 class="font-display text-h3 text-ink mb-1">Añade contenido al asistente</h2>
            <p class="text-body text-ink-secondary mb-4">
              Sin contenido el asistente responderá de forma genérica. Añade información sobre tus cursos, precios, horarios y FAQs en la base de conocimiento.
            </p>
            <RouterLink
              to="/knowledge"
              class="inline-flex items-center gap-1.5 text-small text-brand font-medium hover:text-brand-hover transition-colors"
            >
              Ir a base de conocimiento
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </RouterLink>
          </div>
        </div>
      </AppCard>

      <!-- Token info -->
      <div class="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
        <svg class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <p class="text-small font-medium text-amber-800 mb-0.5">Token de negocio</p>
          <p class="text-small text-amber-700">
            Mantén este token privado. Identifica tu negocio en el widget. Si lo compartes con terceros podrían interactuar con tu asistente de forma no autorizada.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
