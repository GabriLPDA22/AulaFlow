<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import logoIcon from '@/assets/logo-icon.svg'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '' })
const error = ref('')

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
  <div class="min-h-screen bg-base flex">
    <!-- Panel izquierdo — marca -->
    <div class="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col justify-between bg-brand p-12">
      <div class="flex items-center gap-3">
        <img :src="logoIcon" alt="AulaFlow" class="w-8 h-8 rounded-lg opacity-90" />
        <span class="font-display font-semibold text-white text-lg tracking-tight">AulaFlow</span>
      </div>

      <div class="space-y-6">
        <h2 class="font-display text-display text-white leading-tight">
          Tu academia,<br/>siempre disponible.
        </h2>
        <p class="text-white/60 text-body leading-relaxed max-w-sm">
          Responde dudas automáticamente, capta leads desde tu web y centraliza todo el conocimiento de tu negocio.
        </p>

        <!-- Feature list -->
        <ul class="space-y-3">
          <li v-for="feat in ['Asistente con tu contenido', 'Captura de leads automática', 'Panel de gestión simple']" :key="feat"
              class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span class="text-white/80 text-small">{{ feat }}</span>
          </li>
        </ul>
      </div>

      <p class="text-white/30 text-small">© 2026 AulaFlow</p>
    </div>

    <!-- Panel derecho — formulario -->
    <div class="flex-1 flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <!-- Logo mobile -->
        <div class="flex items-center gap-2 mb-10 lg:hidden">
          <img :src="logoIcon" alt="AulaFlow" class="w-7 h-7 rounded-lg" />
          <span class="font-display font-semibold text-ink">AulaFlow</span>
        </div>

        <h1 class="font-display text-h1 text-ink mb-1">Bienvenido</h1>
        <p class="text-body text-ink-secondary mb-8">Accede a tu panel de administración.</p>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <AppInput
            v-model="form.email"
            label="Correo electrónico"
            type="email"
            placeholder="tu@academia.com"
            required
          />
          <AppInput
            v-model="form.password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
          />

          <div
            v-if="error"
            class="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-small text-red-600"
          >
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </div>

          <AppButton
            type="submit"
            :loading="authStore.isLoading"
            size="lg"
            class="w-full"
          >
            Entrar
          </AppButton>
        </form>
      </div>
    </div>
  </div>
</template>
