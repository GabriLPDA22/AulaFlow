<template>
  <div class="min-h-screen flex bg-surface font-ui">

    <!-- ── Izquierda: formulario ──────────────────────────────────── -->
    <div class="w-full lg:w-1/2 flex flex-col px-10 py-10 xl:px-16">
      <div class="flex-1 flex flex-col items-center justify-center">
        <div class="w-full max-w-[340px]">

          <!-- Logo + encabezado -->
          <div class="flex flex-col items-center mb-7">
            <RouterLink to="/login">
              <img :src="logoIcon" alt="AulaFlow" class="w-12 h-12 rounded-xl mb-5 hover:opacity-80 transition-opacity" />
            </RouterLink>

            <template v-if="!submitted">
              <h1 class="font-display text-ink text-center mb-1.5" style="font-size:1.6rem; font-weight:600; line-height:1.25;">
                Recupera tu acceso
              </h1>
              <p class="text-ink-secondary text-body text-center">
                Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </template>
            <template v-else>
              <div class="w-12 h-12 rounded-full bg-[#E8F8F6] flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 class="font-display text-ink text-center mb-1.5" style="font-size:1.6rem; font-weight:600; line-height:1.25;">
                Revisa tu email
              </h1>
              <p class="text-ink-secondary text-body text-center">
                Si <span class="text-ink font-medium">{{ email }}</span> está registrado, recibirás un enlace en breve.
              </p>
            </template>
          </div>

          <!-- Formulario -->
          <template v-if="!submitted">
            <form @submit.prevent="handleSubmit" class="space-y-4 w-full">
              <div>
                <label class="block text-small font-medium text-ink mb-1.5">Email</label>
                <input
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="tu@email.com"
                  class="w-full px-3.5 py-2.5 rounded-lg border border-border bg-white text-ink text-body placeholder:text-ink-disabled focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                />
              </div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ink text-white font-semibold text-body transition-all duration-150 hover:bg-black active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none mt-1"
              >
                <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ loading ? 'Enviando…' : 'Enviar enlace' }}
              </button>
            </form>
          </template>

          <!-- Estado enviado -->
          <template v-else>
            <RouterLink
              to="/login"
              class="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-ink text-white font-semibold text-body transition-all duration-150 hover:bg-black active:scale-[0.99] focus:outline-none"
            >
              Volver al inicio de sesión
            </RouterLink>
          </template>

          <!-- Volver al login -->
          <p v-if="!submitted" class="text-center text-small text-ink-secondary mt-5">
            <RouterLink to="/login" class="text-ink font-medium hover:underline underline-offset-2">
              ← Volver al inicio de sesión
            </RouterLink>
          </p>

        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-6">
        <p class="text-small text-ink-disabled">© 2026 AulaFlow Inc.</p>
        <div class="flex items-center gap-3">
          <RouterLink to="/privacy" class="text-small text-ink-disabled hover:text-ink transition-colors">Privacidad</RouterLink>
          <span class="text-ink-disabled">·</span>
          <RouterLink to="/terms" class="text-small text-ink-disabled hover:text-ink transition-colors">Términos</RouterLink>
        </div>
      </div>
    </div>

    <!-- ── Derecha: decorativa ──────────────────────────────────────── -->
    <div class="hidden lg:flex lg:w-1/2 flex-col relative overflow-hidden" style="background:#0E1A2B;">
      <!-- Gradiente de fondo -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-[0.07]" style="background:radial-gradient(circle,#2A9D8F,transparent 70%);"/>
        <div class="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-[0.05]" style="background:radial-gradient(circle,#457B9D,transparent 70%);"/>
      </div>

      <div class="relative z-10 flex flex-col items-center justify-center h-full px-14 gap-10">
        <!-- Ilustración de seguridad -->
        <div class="flex flex-col items-center gap-6 text-center">
          <div class="w-20 h-20 rounded-2xl flex items-center justify-center" style="background:rgba(42,157,143,0.15);">
            <svg class="w-10 h-10" fill="none" stroke="#2A9D8F" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>

          <div>
            <h2 class="font-display text-white font-semibold text-2xl mb-3 leading-snug">
              Tu cuenta está<br/>protegida
            </h2>
            <p class="text-white/50 text-sm leading-relaxed max-w-[260px]">
              Usamos encriptación de extremo a extremo y tokens de acceso seguros para proteger tus datos.
            </p>
          </div>
        </div>

        <!-- Tarjetas de features de seguridad -->
        <div class="flex flex-col gap-3 w-full max-w-[300px]">
          <div v-for="item in securityItems" :key="item.text"
            class="flex items-center gap-3 px-4 py-3 rounded-xl"
            style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.07);"
          >
            <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style="background:rgba(42,157,143,0.15);">
              <svg class="w-3.5 h-3.5 text-brand" fill="none" stroke="#2A9D8F" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
              </svg>
            </div>
            <span class="text-white/70 text-sm">{{ item.text }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import logoIcon from '@/assets/logo-icon.svg'

const email = ref('')
const loading = ref(false)
const submitted = ref(false)

const securityItems = [
  { text: 'Tokens con expiración automática', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { text: 'Contraseñas cifradas con bcrypt', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' },
  { text: 'Acceso protegido por JWT', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z' },
]

async function handleSubmit() {
  loading.value = true
  // TODO: llamar al endpoint de recuperación de contraseña cuando esté implementado
  await new Promise(resolve => setTimeout(resolve, 1200))
  loading.value = false
  submitted.value = true
}
</script>
