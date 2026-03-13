<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import logoIcon from '@/assets/logo-icon.svg'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const error = ref('')
const showPassword = ref(false)

async function handleLogin() {
  error.value = ''
  try {
    await authStore.login(form.email, form.password)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Credenciales incorrectas. Verifica tus datos.'
  }
}
</script>

<template>
  <div class="min-h-screen flex bg-white">

    <!-- ── Izquierda: formulario ────────────────────────────────────── -->
    <div class="w-full lg:w-1/2 flex flex-col px-10 py-10 xl:px-16">

      <!-- Form content — centrado verticalmente -->
      <div class="flex-1 flex flex-col items-center justify-center">
        <div class="w-full max-w-[340px]">

          <!-- Logo centrado -->
          <div class="flex flex-col items-center mb-7">
            <img :src="logoIcon" alt="AulaFlow" class="w-12 h-12 rounded-xl mb-5" />
            <h1 class="font-display text-ink text-center mb-1.5" style="font-size:1.6rem; font-weight:600; line-height:1.25;">
              Bienvenido de nuevo
            </h1>
            <p class="text-ink-secondary text-body text-center">
              Introduce tus datos para continuar.
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-4 w-full">

            <!-- Email -->
            <div class="flex flex-col gap-1.5">
              <label class="text-small font-medium text-ink">Correo electrónico</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="Introduce tu correo"
                required
                class="w-full px-4 py-2.5 text-body text-ink bg-white border border-border rounded-lg transition-all placeholder:text-ink-disabled focus:outline-none focus:border-ink focus:ring-0"
              />
            </div>

            <!-- Password -->
            <div class="flex flex-col gap-1.5">
              <label class="text-small font-medium text-ink">Contraseña</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Introduce tu contraseña"
                  required
                  class="w-full px-4 py-2.5 pr-11 text-body text-ink bg-white border border-border rounded-lg transition-all placeholder:text-ink-disabled focus:outline-none focus:border-ink focus:ring-0"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-disabled hover:text-ink-secondary transition-colors"
                  tabindex="-1"
                >
                  <svg v-if="!showPassword" class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <svg v-else class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Error -->
            <div
              v-if="error"
              class="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-small text-red-600"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ error }}
            </div>

            <!-- Submit -->
            <button
              type="submit"
              :disabled="authStore.isLoading"
              class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ink text-white font-semibold text-body transition-all duration-150 hover:bg-black active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none mt-1"
            >
              <svg v-if="authStore.isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {{ authStore.isLoading ? 'Entrando…' : 'Iniciar sesión' }}
            </button>
          </form>

          <p class="mt-6 text-small text-ink-disabled text-center">
            ¿No tienes cuenta?
            <a href="mailto:hola@aulaflow.com" class="text-ink-secondary hover:text-ink transition-colors font-medium ml-1">
              Contáctanos
            </a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-6">
        <p class="text-small text-ink-disabled">© 2026 AulaFlow Inc.</p>
        <div class="flex items-center gap-3">
          <RouterLink to="/forgot-password" class="text-small text-ink-disabled hover:text-ink transition-colors">Recuperar acceso</RouterLink>
          <span class="text-ink-disabled">·</span>
          <RouterLink to="/privacy" class="text-small text-ink-disabled hover:text-ink transition-colors">Privacidad</RouterLink>
          <span class="text-ink-disabled">·</span>
          <RouterLink to="/terms" class="text-small text-ink-disabled hover:text-ink transition-colors">Términos</RouterLink>
        </div>
      </div>
    </div>

    <!-- ── Derecha: product preview oscuro ──────────────────────────── -->
    <div class="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden" style="background:#0E1A2B;">

      <!-- Fondo decorativo sutil -->
      <svg class="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid2" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" stroke-width="0.75"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style="background:radial-gradient(circle, rgba(29,53,87,0.5) 0%, transparent 70%);"></div>

      <!-- Contenido centrado -->
      <div class="relative z-10 flex flex-col h-full items-center justify-center px-14 xl:px-20 text-center">

        <!-- Dashboard mockup -->
        <div class="w-full max-w-[520px] mb-12">
          <!-- Ventana falsa -->
          <div class="rounded-2xl overflow-hidden border border-white/[0.08]" style="background:#14243A; box-shadow: 0 24px 64px rgba(0,0,0,0.5);">
            <!-- Barra superior tipo browser -->
            <div class="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]" style="background:#0E1A2B;">
              <div class="w-2.5 h-2.5 rounded-full bg-red-400/50"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-yellow-400/50"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-green-400/50"></div>
              <div class="flex-1 mx-4">
                <div class="bg-white/[0.06] rounded px-3 py-1 text-white/25 text-xs text-left">app.aulaflow.com/leads</div>
              </div>
            </div>

            <!-- Contenido del dashboard -->
            <div class="p-5">
              <!-- Métricas row -->
              <div class="grid grid-cols-3 gap-3 mb-4">
                <div v-for="(m, i) in [
                  { label: 'Leads nuevos', value: '24', delta: '+12%' },
                  { label: 'Conversaciones', value: '138', delta: '+8%' },
                  { label: 'Respuestas auto', value: '97%', delta: '+3%' }
                ]" :key="i"
                class="rounded-xl p-3 border border-white/[0.07]" style="background:#1a2f48;">
                  <p class="text-white/40 mb-1.5" style="font-size:0.65rem;">{{ m.label }}</p>
                  <div class="flex items-end justify-between gap-1">
                    <span class="font-display text-white font-semibold" style="font-size:1.2rem;">{{ m.value }}</span>
                    <span class="text-emerald-400 font-medium" style="font-size:0.65rem;">{{ m.delta }}</span>
                  </div>
                </div>
              </div>

              <!-- Tabla leads -->
              <div class="rounded-xl border border-white/[0.07] overflow-hidden" style="background:#1a2f48;">
                <div class="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                  <span class="text-white/70 font-medium" style="font-size:0.75rem;">Últimos leads</span>
                  <span class="text-white/25" style="font-size:0.65rem;">Ver todos →</span>
                </div>
                <div class="divide-y divide-white/[0.04]">
                  <div v-for="(lead, i) in [
                    { name: 'Laura Martínez', topic: 'Inglés B2', status: 'Nuevo', color: '#2A9D8F' },
                    { name: 'Carlos Ruiz', topic: 'Curso online', status: 'Contactado', color: '#457B9D' },
                    { name: 'Ana Gómez', topic: 'Precio matrícula', status: 'Nuevo', color: '#2A9D8F' },
                  ]" :key="i" class="flex items-center justify-between px-4 py-2.5">
                    <div class="flex items-start gap-2.5">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center text-white font-semibold shrink-0 mt-px" :style="`background:${lead.color}30; color:${lead.color}; font-size:0.6rem;`">
                        {{ lead.name[0] }}
                      </div>
                      <div>
                        <p class="text-white/80 font-medium leading-none mb-1" style="font-size:0.7rem;">{{ lead.name }}</p>
                        <p class="text-white/35 leading-none" style="font-size:0.62rem;">{{ lead.topic }}</p>
                      </div>
                    </div>
                    <span class="px-2 py-0.5 rounded-full text-white font-medium" :style="`background:${lead.color}20; color:${lead.color}; font-size:0.62rem;`">
                      {{ lead.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Copy -->
        <h2 class="font-display text-white mb-3 leading-tight" style="font-size:1.5rem; font-weight:600;">
          Capta y gestiona leads<br/>desde un solo lugar
        </h2>
        <p class="text-white/40 text-body max-w-sm leading-relaxed">
          Tu asistente responde 24/7, cualifica a los interesados y tú solo te ocupas de cerrar.
        </p>
      </div>
    </div>

  </div>
</template>
