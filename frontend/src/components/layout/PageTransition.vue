<template>
  <div ref="overlayEl" class="pt-overlay">
    <!-- SVG animado de transición -->
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1316 664"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="pt-svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        ref="pathEl"
        d="M13.4746 291.27C13.4746 291.27 100.646 -18.6724 255.617 16.8418C410.588 52.356 61.0296 431.197 233.017 546.326C431.659 679.299 444.494 21.0125 652.73 100.784C860.967 180.556 468.663 430.709 617.216 546.326C765.769 661.944 819.097 48.2722 988.501 120.156C1174.21 198.957 809.424 543.841 988.501 636.726C1189.37 740.915 1301.67 149.213 1301.67 149.213"
        stroke="#1D3557"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Logo con animación — solo visible cuando la pantalla está tapada -->
    <Transition name="logo-appear">
      <div v-if="showTransitionLogo" class="pt-logo">
        <!-- Icono: fondo blanco, rayo azul -->
        <div class="pt-icon">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M61 12L28 52H48L39 88L76 46H54L61 12Z" fill="#1D3557"/>
            <circle cx="68" cy="20" r="7" fill="#2A9D8F"/>
          </svg>
        </div>
        <span class="pt-name">AulaFlow</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePageTransition, showTransitionLogo } from '@/composables/usePageTransition'

const overlayEl = ref<HTMLElement>()
const pathEl = ref<SVGPathElement>()
const { register } = usePageTransition()

onMounted(() => {
  if (overlayEl.value && pathEl.value) {
    register(overlayEl.value, pathEl.value)
  }
})
</script>

<style scoped>
/* ── Overlay ────────────────────────────────────────────────── */
.pt-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
}

.pt-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.3);
}

/* ── Logo centrado ──────────────────────────────────────────── */
.pt-logo {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Icono: caja blanca redondeada con rayo azul */
.pt-icon {
  width: 48px;
  height: 48px;
  background: #fff;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  /* Animación spin 2D con rebote elástico */
  animation: icon-spin 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.pt-name {
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
  /* Texto aparece ligeramente después */
  animation: name-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
}

/* ── Keyframes ─────────────────────────────────────────────── */

/* Spin 2D con rebote: empieza girado y pequeño, rebota al llegar */
@keyframes icon-spin {
  0%   { transform: rotate(-200deg) scale(0.3); opacity: 0; }
  60%  { transform: rotate(15deg)   scale(1.12); opacity: 1; }
  80%  { transform: rotate(-6deg)   scale(0.97); }
  100% { transform: rotate(0deg)    scale(1);    opacity: 1; }
}

/* Texto: fade + slide desde la izquierda */
@keyframes name-in {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* ── Transition Vue (entrada/salida del logo completo) ─────── */
.logo-appear-enter-active {
  /* El icono ya tiene su propia animación CSS, el contenedor solo hace fade */
  transition: opacity 0.1s ease;
}
.logo-appear-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.logo-appear-enter-from { opacity: 0; }
.logo-appear-leave-to   { opacity: 0; transform: scale(0.95); }
</style>
