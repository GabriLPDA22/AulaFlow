<template>
  <footer class="lf">
    <!-- Top: brand + cols -->
    <div class="lf__inner">

      <!-- Brand -->
      <div class="lf__brand">
        <RouterLink to="/" class="lf__logo">
          <img :src="logoIcon" alt="AulaFlow" class="lf__logo-img" />
          <span class="lf__logo-name">AulaFlow</span>
        </RouterLink>
        <p class="lf__tagline">
          La forma más sencilla de automatizar la atención al cliente de tu academia.
        </p>
        <!-- Social -->
        <div class="lf__social">
          <a href="https://twitter.com/aulaflow" target="_blank" rel="noopener" aria-label="Twitter/X" class="lf__social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.84L2.25 2.25H8.08l4.264 5.634 5.9-5.634Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/company/aulaflow" target="_blank" rel="noopener" aria-label="LinkedIn" class="lf__social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Columnas -->
      <div class="lf__cols">
        <div class="lf__col">
          <p class="lf__col-title">Producto</p>
          <RouterLink :to="{ path: '/', hash: '#features' }" class="lf__link">Características</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#how' }" class="lf__link">Cómo funciona</RouterLink>
          <RouterLink to="/pricing" class="lf__link">Precios</RouterLink>
          <RouterLink to="/login" class="lf__link">Panel admin</RouterLink>
        </div>
        <div class="lf__col">
          <p class="lf__col-title">Empresa</p>
          <RouterLink to="/faq" class="lf__link">FAQ</RouterLink>
          <a href="mailto:hola@aulaflow.io" class="lf__link">Contacto</a>
        </div>
        <div class="lf__col">
          <p class="lf__col-title">Legal</p>
          <RouterLink to="/privacy" class="lf__link">Privacidad</RouterLink>
          <RouterLink to="/terms" class="lf__link">Términos</RouterLink>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="lf__bottom">
      <p class="lf__copy">© 2026 AulaFlow Inc. Todos los derechos reservados.</p>
      <div class="lf__bottom-badge">
        <span class="lf__badge-dot" />
        Hecho con ❤️ desde España
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoIcon from '@/assets/logo-icon.svg'
</script>

<style scoped>
/* ── Footer premium ──────────────────────────────────────────── */
.lf {
  background: #F5F4F0;
  border-top: 1px solid #e8e6e0;
  padding: 60px 20px 0;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.lf__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 52px;
  border-bottom: 1px solid #e0ded8;
}

/* ── Brand ───────────────────────────────────────────────────── */
.lf__brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lf__logo {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
}
.lf__logo-img {
  width: 30px;
  height: 30px;
  border-radius: 8px;
}
.lf__logo-name {
  font-family: 'Sora', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #111;
  letter-spacing: -0.01em;
}

.lf__tagline {
  font-size: 0.875rem;
  color: #999;
  line-height: 1.65;
  max-width: 280px;
  margin: 0;
}

.lf__social {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}
.lf__social-link {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #dddbd5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bbb;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.lf__social-link:hover {
  border-color: #bbb;
  color: #333;
  background: rgba(0,0,0,0.04);
}

/* ── Columnas ─────────────────────────────────────────────────── */
.lf__cols {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.lf__col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 120px;
}

.lf__col-title {
  font-size: 0.7rem;
  font-weight: 700;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 2px;
}

.lf__link {
  font-size: 0.875rem;
  color: #777;
  text-decoration: none;
  transition: color 0.15s;
  cursor: pointer;
}
.lf__link:hover {
  color: #111;
}

/* ── Bottom bar ───────────────────────────────────────────────── */
.lf__bottom {
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.lf__copy {
  font-size: 0.8rem;
  color: #bbb;
  margin: 0;
}

.lf__bottom-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #bbb;
}
.lf__badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2A9D8F;
  flex-shrink: 0;
}

/* ── Tablet 640px ─────────────────────────────────────────────── */
@media (min-width: 640px) {
  .lf__inner {
    flex-direction: row;
    justify-content: space-between;
    gap: 60px;
  }
  .lf__brand { max-width: 260px; }
  .lf__bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

/* ── Desktop 1024px ──────────────────────────────────────────── */
@media (min-width: 1024px) {
  .lf {
    padding: 72px 40px 0;
  }
}
</style>
