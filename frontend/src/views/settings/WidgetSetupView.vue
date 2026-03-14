<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { settingsService } from '@/services/settingsService'
import AppButton from '@/components/ui/AppButton.vue'
import PageHeader from '@/components/shared/PageHeader.vue'

const businessToken = ref('')
const copied = ref(false)
const copiedToken = ref(false)

onMounted(async () => {
  try {
    const business = await settingsService.getBusiness()
    businessToken.value = (business as any).businessToken ?? ''
  } catch {}
})

const widgetUrl = import.meta.env.PROD
  ? `https://cdn.aulaflow.io/widget.js`
  : `${window.location.protocol}//${window.location.hostname}:${window.location.port}/widget.js`

const apiUrl = import.meta.env.PROD ? 'https://api.aulaflow.io' : 'http://localhost:5000'

const snippet = computed(() =>
  `<script src="${widgetUrl}" data-token="${businessToken.value || 'TU_TOKEN'}" data-api="${apiUrl}"><\/script>`
)

async function copySnippet() {
  await navigator.clipboard.writeText(snippet.value.replace(/\n\s*/g, ' '))
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

async function copyToken() {
  if (!businessToken.value) return
  await navigator.clipboard.writeText(businessToken.value)
  copiedToken.value = true
  setTimeout(() => (copiedToken.value = false), 2000)
}
</script>

<template>
  <div>
    <PageHeader
      title="Instalar widget"
      description="Añade el asistente de AulaFlow a cualquier web en menos de un minuto."
    />

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-5xl">

      <!-- Columna principal (pasos) -->
      <div class="xl:col-span-3 flex flex-col gap-5">

        <!-- Paso 1: Token -->
        <div class="bg-white rounded-2xl border border-border p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0">
              <span class="text-white text-[11px] font-bold">1</span>
            </div>
            <h2 class="font-display font-semibold text-ink text-[0.9375rem]">Tu token de negocio</h2>
          </div>
          <p class="text-small text-ink-secondary mb-3 leading-relaxed">
            Este identificador único conecta el widget con tu cuenta. Mantenlo privado.
          </p>
          <div class="flex items-center gap-2 p-3 bg-subtle rounded-xl border border-border font-mono">
            <span class="flex-1 text-small text-ink truncate">
              {{ businessToken || '—' }}
            </span>
            <button
              @click="copyToken"
              :disabled="!businessToken"
              class="shrink-0 flex items-center gap-1.5 text-label font-medium px-2.5 py-1.5 rounded-lg transition-colors"
              :class="copiedToken ? 'bg-[#E8F8F6] text-brand' : 'bg-white border border-border text-ink-secondary hover:text-ink hover:border-ink/20'"
            >
              <svg v-if="!copiedToken" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
              </svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ copiedToken ? 'Copiado' : 'Copiar' }}
            </button>
          </div>
        </div>

        <!-- Paso 2: Snippet -->
        <div class="bg-white rounded-2xl border border-border p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0">
              <span class="text-white text-[11px] font-bold">2</span>
            </div>
            <h2 class="font-display font-semibold text-ink text-[0.9375rem]">Copia e instala el código</h2>
          </div>
          <p class="text-small text-ink-secondary mb-3 leading-relaxed">
            Pega esto justo antes del cierre de <code class="bg-subtle px-1.5 py-0.5 rounded text-ink font-mono">&lt;/body&gt;</code> en tu web.
          </p>

          <!-- Code block -->
          <div class="rounded-xl overflow-hidden" style="background:#0D1117;">
            <div class="flex items-center justify-between px-4 py-2.5" style="border-bottom:1px solid rgba(255,255,255,0.06);">
              <span class="text-label font-medium" style="color:rgba(255,255,255,0.3);">HTML</span>
              <button
                @click="copySnippet"
                class="flex items-center gap-1.5 text-label font-medium px-2.5 py-1 rounded-lg transition-colors"
                :class="copied ? 'text-[#2A9D8F]' : 'text-white/40 hover:text-white/70'"
              >
                <svg v-if="!copied" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                {{ copied ? 'Copiado' : 'Copiar' }}
              </button>
            </div>
            <pre class="px-5 py-4 text-[13px] leading-[1.7] font-mono overflow-x-auto" style="color:#4ade80; white-space:pre;">{{ snippet }}</pre>
          </div>
        </div>

        <!-- Paso 3: Personalizar -->
        <div class="bg-white rounded-2xl border border-border p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-7 h-7 rounded-full bg-brand flex items-center justify-center shrink-0">
              <span class="text-white text-[11px] font-bold">3</span>
            </div>
            <h2 class="font-display font-semibold text-ink text-[0.9375rem]">Personaliza y añade contenido</h2>
          </div>
          <p class="text-small text-ink-secondary mb-4 leading-relaxed">
            El asistente responderá usando las fuentes activas de tu base de conocimiento.
          </p>
          <div class="flex flex-col sm:flex-row gap-2">
            <RouterLink
              to="/settings"
              class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-small font-medium text-ink hover:bg-subtle transition-colors"
            >
              <svg class="w-4 h-4 text-ink-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Ajustes del asistente
            </RouterLink>
            <RouterLink
              to="/knowledge"
              class="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border text-small font-medium text-ink hover:bg-subtle transition-colors"
            >
              <svg class="w-4 h-4 text-ink-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              Base de conocimiento
            </RouterLink>
          </div>
        </div>

      </div>

      <!-- Columna lateral: preview + info -->
      <div class="xl:col-span-2 flex flex-col gap-5">

        <!-- Preview widget -->
        <div class="rounded-2xl overflow-hidden border border-border" style="background:#0E1A2B;">
          <div class="px-5 pt-5 pb-3">
            <p class="text-white/40 text-label font-medium uppercase tracking-wider mb-3">Vista previa</p>
          </div>

          <!-- Chat mockup -->
          <div class="mx-4 mb-0 rounded-xl overflow-hidden" style="box-shadow:0 8px 32px rgba(0,0,0,0.3);">
            <!-- Header -->
            <div class="flex items-center gap-3 px-4 py-3" style="background:#1D3557;">
              <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style="background:rgba(255,255,255,0.15);">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div>
                <p class="text-white text-[13px] font-semibold leading-none mb-0.5">Asistente</p>
                <p class="text-white/60 text-[11px] flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                  En línea
                </p>
              </div>
            </div>
            <!-- Messages -->
            <div class="px-4 py-3 space-y-2.5" style="background:#FAFAF8;">
              <div class="flex max-w-[80%]">
                <div class="px-3 py-2 rounded-2xl rounded-bl-sm text-[12px] leading-relaxed border border-[#ece9e6]" style="background:#fff; color:#111;">
                  Hola, ¿en qué puedo ayudarte?
                </div>
              </div>
              <div class="flex justify-end">
                <div class="px-3 py-2 rounded-2xl rounded-br-sm text-[12px] leading-relaxed text-white" style="background:#1D3557;">
                  ¿Cuál es el precio del curso?
                </div>
              </div>
              <div class="flex max-w-[80%]">
                <div class="px-3 py-2 rounded-2xl rounded-bl-sm text-[12px] leading-relaxed border border-[#ece9e6]" style="background:#fff; color:#111;">
                  El curso tiene un precio de 299€. ¿Necesitas más info?
                </div>
              </div>
            </div>
            <!-- Input -->
            <div class="px-3 py-2.5 border-t border-[#eee] flex items-center gap-2" style="background:#fff;">
              <div class="flex-1 text-[12px] text-[#aaa] px-3 py-1.5 rounded-lg border border-[#e5e5e5]" style="background:#fafaf8;">
                Escribe tu mensaje…
              </div>
              <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style="background:#1D3557;">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Floating button mockup -->
          <div class="flex justify-end px-5 py-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style="background:#1D3557;">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Aviso token -->
        <div class="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
          <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <p class="text-small text-amber-800 leading-relaxed">
            <span class="font-semibold">Mantén el token privado.</span> Identifica tu negocio y permite que el widget se comunique con el asistente.
          </p>
        </div>

        <!-- Link de test -->
        <a
          href="/widget-test.html"
          target="_blank"
          class="flex items-center justify-between px-4 py-3 bg-white border border-border rounded-2xl hover:border-brand/30 hover:bg-brand-light transition-colors group"
        >
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p class="text-small font-medium text-ink">Página de prueba</p>
              <p class="text-label text-ink-disabled">Prueba el widget en local</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-ink-disabled group-hover:text-brand transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>

      </div>
    </div>
  </div>
</template>
