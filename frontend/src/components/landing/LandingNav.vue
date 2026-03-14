<template>
  <!-- NAV -->
  <header class="ln" :class="{ scrolled }">
    <div class="ln__inner">
      <RouterLink to="/" class="ln__logo">
        <img :src="logoIcon" alt="AulaFlow" class="ln__logo-img" />
        <span>AulaFlow</span>
      </RouterLink>

      <!-- Desktop links — centrados -->
      <nav class="ln__links">
        <a @click.prevent="go('#features')">Características</a>
        <a @click.prevent="go('#how')">Cómo funciona</a>
        <RouterLink to="/pricing">Precios</RouterLink>
        <RouterLink to="/faq">FAQ</RouterLink>
      </nav>

      <!-- Desktop CTA -->
      <div class="ln__cta">
        <RouterLink to="/login" class="ln__ghost">Entrar</RouterLink>
        <RouterLink to="/login" class="ln__btn">Empieza gratis</RouterLink>
      </div>

      <!-- Mobile burger -->
      <button class="ln__burger" @click="menuOpen = !menuOpen" aria-label="Menú">
        <svg v-if="!menuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </header>

  <!-- Mobile overlay -->
  <Transition name="lnmenu">
    <div v-if="menuOpen" class="ln-overlay" @click.self="menuOpen = false">
      <div class="ln-panel">
        <nav class="ln-panel__links">
          <a @click="go('#features')">Características</a>
          <a @click="go('#how')">Cómo funciona</a>
          <RouterLink to="/pricing" @click="menuOpen = false">Precios</RouterLink>
          <RouterLink to="/faq" @click="menuOpen = false">FAQ</RouterLink>
        </nav>
        <div class="ln-panel__actions">
          <RouterLink to="/login" class="ln__btn ln__btn--block" @click="menuOpen = false">
            Empieza gratis
          </RouterLink>
          <RouterLink to="/login" class="ln-panel__ghost" @click="menuOpen = false">
            Ya tengo cuenta → Entrar
          </RouterLink>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import logoIcon from '@/assets/logo-icon.svg'

const route = useRoute()
const router = useRouter()

const scrolled  = ref(false)
const menuOpen  = ref(false)

// Bloqueo de scroll al abrir el menú mobile
watch(menuOpen, open => {
  document.body.style.overflow = open ? 'hidden' : ''
  document.body.classList.toggle('nav-open', open)
})

// Nav se vuelve navy al hacer scroll
function onScroll() { scrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
  document.body.classList.remove('nav-open')
})

// Navega a una sección: smooth scroll si ya estamos en landing, hash-push si no
function go(hash: string) {
  menuOpen.value = false
  if (route.path === '/') {
    const el = document.querySelector(hash)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    router.push({ path: '/', hash })
  }
}
</script>

<style scoped>
/* ── Nav base ────────────────────────────────────────────────── */
.ln {
  position: fixed; top: 0; inset-inline: 0; z-index: 300;
  background: rgba(255,255,255,0.95);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(12px);
  transition: background 0.35s ease, box-shadow 0.3s, color 0.25s;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.ln.scrolled {
  background: #1D3557;
  box-shadow: 0 4px 24px rgba(13,26,45,0.25);
}

/* Inner */
.ln__inner {
  display: flex; align-items: center;
  height: 64px; padding: 0 20px; gap: 16px;
  position: relative;
}

/* Logo */
.ln__logo {
  display: flex; align-items: center; gap: 8px; text-decoration: none;
  font-family: 'Sora', sans-serif; font-weight: 700; font-size: 1rem;
  color: #111; flex-shrink: 0;
  transition: color 0.25s;
}
.ln.scrolled .ln__logo { color: #fff; }
.ln__logo-img { width: 28px; height: 28px; border-radius: 7px; }

/* Desktop links — hidden on mobile */
.ln__links {
  display: none;
}
.ln__links a {
  font-size: 0.875rem; font-weight: 500; color: #555;
  text-decoration: none; transition: color 0.15s; cursor: pointer;
}
.ln__links a:hover { color: #111; }
.ln.scrolled .ln__links a { color: rgba(255,255,255,0.75); }
.ln.scrolled .ln__links a:hover { color: #fff; }
/* router-link-active para sección actual */
.ln__links :deep(.router-link-active) { color: #111; font-weight: 600; }
.ln.scrolled .ln__links :deep(.router-link-active) { color: #fff; }

/* Desktop CTA — hidden on mobile */
.ln__cta {
  display: none; align-items: center; gap: 6px;
}
.ln__ghost {
  font-size: 0.875rem; font-weight: 500; color: #555;
  text-decoration: none; padding: 6px 12px; transition: color 0.15s;
}
.ln__ghost:hover { color: #111; }
.ln.scrolled .ln__ghost { color: rgba(255,255,255,0.8); }
.ln.scrolled .ln__ghost:hover { color: #fff; }

.ln__btn {
  display: inline-flex; align-items: center; justify-content: center;
  background: #0d1a2d; color: #fff; font-size: 0.875rem; font-weight: 600;
  text-decoration: none; padding: 9px 20px; border-radius: 100px;
  transition: background 0.18s, transform 0.15s;
}
.ln__btn:hover { background: #1a2f4a; transform: translateY(-1px); }
.ln.scrolled .ln__btn { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); }
.ln.scrolled .ln__btn:hover { background: rgba(255,255,255,0.25); }

/* Burger */
.ln__burger {
  margin-left: auto; background: none; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  padding: 6px; color: #111; transition: color 0.25s;
}
.ln.scrolled .ln__burger { color: #fff; }

/* ── Mobile overlay ──────────────────────────────────────────── */
.ln-overlay {
  position: fixed; inset: 0; top: 64px; z-index: 299;
  /* Fondo opaco para que no se vea la página detrás */
  background: #F5F4F0;
  overflow-y: auto;
}
.ln-panel {
  background: #F5F4F0; padding: 8px 0 28px;
  display: flex; flex-direction: column;
}
.ln-panel__links { display: flex; flex-direction: column; }
.ln-panel__links a {
  font-size: 1rem; font-weight: 500; color: #333; text-decoration: none;
  padding: 14px 24px; border-bottom: 1px solid #e8e6e0;
  transition: background 0.12s, color 0.12s; display: block; cursor: pointer;
}
.ln-panel__links a:hover { background: #eceae4; color: #111; }
.ln-panel__actions { padding: 20px 24px 0; display: flex; flex-direction: column; gap: 10px; }
.ln__btn--block { width: 100%; padding: 14px; font-size: 1rem; border-radius: 12px; }
.ln-panel__ghost {
  text-align: center; font-size: 0.875rem; color: #888;
  text-decoration: none; padding: 4px; transition: color 0.15s;
}
.ln-panel__ghost:hover { color: #111; }

/* Animación menú mobile */
.lnmenu-enter-active { transition: opacity 0.2s ease; }
.lnmenu-leave-active { transition: opacity 0.18s ease; }
.lnmenu-enter-from, .lnmenu-leave-to { opacity: 0; }
.lnmenu-enter-active .ln-panel { transition: transform 0.22s cubic-bezier(0.22,1,0.36,1); }
.lnmenu-enter-from .ln-panel { transform: translateY(-10px); }
.lnmenu-leave-active .ln-panel { transition: transform 0.18s ease; }
.lnmenu-leave-to .ln-panel { transform: translateY(-6px); }

/* ── Desktop 1024px ──────────────────────────────────────────── */
@media (min-width: 1024px) {
  .ln__inner { max-width: 1200px; margin: 0 auto; height: 68px; padding: 0 40px; }
  .ln__links {
    display: flex; gap: 32px;
    position: absolute; left: 50%; transform: translateX(-50%);
  }
  .ln__cta { display: flex; margin-left: auto; }
  .ln__burger { display: none; }
}
</style>
