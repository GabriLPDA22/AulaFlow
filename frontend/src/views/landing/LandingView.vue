<template>
  <div class="land">

    <!-- ── NAV ─────────────────────────────────────────────────── -->
    <LandingNav />

    <!-- ── HERO ─────────────────────────────────────────────────── -->
    <section class="land-hero">
      <!-- Copy -->
      <div class="land-hero__copy">
        <p class="land-hero__eyebrow hero-anim" style="animation-delay:0.05s">
          <span class="land-hero__dash">—</span> PRUÉBALO AHORA
        </p>
        <h1 class="land-hero__h1 hero-anim" style="animation-delay:0.18s">
          Tu academia<br/>
          responde sola<br/>
          <em>las 24 horas.</em>
        </h1>
        <p class="land-hero__sub hero-anim" style="animation-delay:0.32s">
          AulaFlow captura leads, responde dudas repetitivas y centraliza el conocimiento de tu negocio — sin contratar a nadie.
        </p>
        <div class="land-hero__actions hero-anim" style="animation-delay:0.44s">
          <RouterLink to="/login" class="land-btn land-btn--dark land-btn--lg">
            Empieza gratis
          </RouterLink>
          <div class="land-hero__social">
            <div class="land-hero__avatars">
              <div class="land-avatar" style="background:#C7D9F5" />
              <div class="land-avatar" style="background:#A8D5CA" />
              <div class="land-avatar" style="background:#F5C7D0" />
            </div>
            <div>
              <div class="land-stars">★★★★★ <span>4.9</span></div>
              <p class="land-reviews">de más de 200 academias</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Visual: bento 2 cards -->
      <div class="land-hero__visual">

        <!-- Card 1: browser con widget -->
        <div class="land-card land-card--browser hero-card" style="animation-delay:0.15s">
          <div class="land-card__bar">
            <span class="land-dot land-dot--r"/><span class="land-dot land-dot--y"/><span class="land-dot land-dot--g"/>
            <span class="land-card__url">academia-ejemplo.com</span>
          </div>
          <div class="land-card__body">
            <div class="land-fake-page">
              <div class="land-fake-line" style="width:65%" />
              <div class="land-fake-line" style="width:45%" />
              <div class="land-fake-btn" />
            </div>
            <!-- Widget mini flotante -->
            <div class="land-mini-widget">
              <div class="land-mini-widget__head">
                <div class="land-mini-avatar">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="land-mini-name">Asistente Academia</p>
                  <p class="land-mini-status"><span class="land-online"/>En línea</p>
                </div>
              </div>
              <div class="land-mini-msgs">
                <div class="land-mini-msg land-mini-msg--usr">¿Cuánto cuesta el inglés?</div>
                <div class="land-mini-msg land-mini-msg--bot">El intensivo cuesta <strong>299€</strong>. ¿Te lo reservo?</div>
              </div>
            </div>
            <!-- Badge flotante: tiempo de respuesta -->
            <div class="land-speed-badge">
              <span class="land-speed-badge__dot" />
              Responde en &lt; 1s
            </div>
          </div>
        </div>

        <!-- Card 2: lead capturado (tall, col 2) -->
        <div class="land-card land-card--lead hero-card" style="animation-delay:0.28s">
          <div class="land-card-lead__check">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p class="land-card-lead__title">Lead capturado</p>
          <p class="land-card-lead__name">María García</p>
          <p class="land-card-lead__detail">Interés: Inglés B2</p>
          <p class="land-card-lead__time">Hace 2 min</p>
          <!-- Métricas pequeñas dentro de la card -->
          <div class="land-card-lead__metrics">
            <div class="land-clm">
              <p class="land-clm__val">+47</p>
              <p class="land-clm__lbl">esta semana</p>
            </div>
            <div class="land-clm-div" />
            <div class="land-clm">
              <p class="land-clm__val">24/7</p>
              <p class="land-clm__lbl">disponible</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ── SOCIAL PROOF STRIP ─────────────────────────────────── -->
    <section class="land-strip" ref="stripEl">
      <p class="land-strip__label">Para negocios que reciben muchas preguntas repetidas</p>
      <div class="land-strip__tags">
        <span v-for="t in bizTypes" :key="t" class="land-tag">{{ t }}</span>
      </div>
    </section>

    <!-- ── FEATURES ───────────────────────────────────────────── -->
    <section class="land-features" id="features" ref="featuresEl">
      <div class="land-section-header">
        <div class="land-label">Características</div>
        <h2 class="land-h2">Todo lo que necesitas,<br class="land-br-md"/> nada que no necesites.</h2>
        <p class="land-sub">Sin complicaciones técnicas. Funcionando el mismo día.</p>
      </div>
      <div class="land-features__grid">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="land-fcard scroll-anim"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <div class="land-fcard__icon" :style="{ background: f.bg, color: f.color }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" v-html="f.icon" />
          </div>
          <h3 class="land-fcard__title">{{ f.title }}</h3>
          <p class="land-fcard__desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ───────────────────────────────────────── -->
    <section class="land-how" id="how" ref="howEl">
      <div class="land-how__inner">
        <div class="land-how__copy">
          <div class="land-label">Cómo funciona</div>
          <h2 class="land-h2">En marcha en<br/>menos de 5 minutos.</h2>
          <div class="land-steps">
            <div
              v-for="(s, i) in steps"
              :key="s.title"
              class="land-step scroll-anim scroll-anim--left"
              :style="{ animationDelay: `${i * 0.13}s` }"
            >
              <div class="land-step__num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div>
                <p class="land-step__title">{{ s.title }}</p>
                <p class="land-step__desc">{{ s.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="land-how__code scroll-anim scroll-anim--right">
          <div class="land-code">
            <div class="land-code__bar">
              <span class="land-dot land-dot--r"/><span class="land-dot land-dot--y"/><span class="land-dot land-dot--g"/>
              <span class="land-code__file">index.html</span>
            </div>
            <pre class="land-code__body"><span class="ct-gray">&lt;!-- Pega esto en tu web --&gt;</span>
<span class="ct-blue">&lt;script</span>
  <span class="ct-key">src</span>=<span class="ct-str">"https://cdn.aulaflow.io/widget.js"</span>
  <span class="ct-key">data-token</span>=<span class="ct-str">"tu-token-aqui"</span>
<span class="ct-blue">&gt;&lt;/script&gt;</span></pre>
            <div class="land-code__result">
              <span class="land-result-dot" />
              Widget activo en tu web ✓
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATS ──────────────────────────────────────────────── -->
    <section class="land-stats" ref="statsEl">
      <div class="land-stats__grid">
        <div v-for="s in stats" :key="s.label" class="land-stat scroll-anim">
          <span class="land-stat__num">{{ s.num }}</span>
          <span class="land-stat__lbl">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── CTA ───────────────────────────────────────────────── -->
    <section class="land-cta" ref="ctaEl">
      <div class="land-cta__mesh" />
      <div class="land-cta__grain" />
      <div class="land-cta__inner scroll-anim">
        <h2 class="land-cta__title">Empieza hoy.<br/>Sin coste.</h2>
        <p class="land-cta__sub">Prueba AulaFlow gratis 14 días. Sin tarjeta. Cancela cuando quieras.</p>
        <RouterLink to="/login" class="land-btn land-btn--white land-btn--lg">
          Crear cuenta gratis
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </RouterLink>
        <p class="land-cta__note">14 días gratis · Sin permanencia · Soporte incluido</p>
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────── -->
    <LandingFooter />

    <!-- Scroll to top -->
    <Transition name="topbtn">
      <button v-if="showTopBtn" class="land-top-btn" @click="scrollToTop" aria-label="Volver arriba">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import logoIcon from '@/assets/logo-icon.svg'
import LandingNav from '@/components/landing/LandingNav.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'

// ── Refs ──────────────────────────────────────────────────────
const showTopBtn = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ── Data ──────────────────────────────────────────────────────
const bizTypes = ['Academias de idiomas', 'Autoescuelas', 'Academias de danza', 'Clases particulares', 'Centros deportivos', 'Escuelas de música', 'Centros de formación', 'Formación online']

const features = [
  { title: 'Respuestas automáticas 24/7', desc: 'El asistente responde precios, horarios y disponibilidad usando la información que tú configuras.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>', bg: '#EEF4FF', color: '#1D3557' },
  { title: 'Captura leads automáticamente', desc: 'Cuando alguien muestra interés, el asistente recoge nombre, email y teléfono. Tú recibes el lead listo.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>', bg: '#EDFAF7', color: '#2A9D8F' },
  { title: 'Base de conocimiento propia', desc: 'Añade textos, FAQs y URLs. El asistente aprende y responde solo con tu información.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>', bg: '#FFF8EE', color: '#D4860A' },
  { title: 'Instalación en 2 minutos', desc: 'Un solo snippet en tu web. Sin plugins, sin desarrolladores, sin complicaciones.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>', bg: '#F3F0FF', color: '#6366F1' },
  { title: 'Panel de control claro', desc: 'Ve todos tus leads, conversaciones y estadísticas en un panel limpio, diseñado para no técnicos.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>', bg: '#FFF0F0', color: '#E05252' },
  { title: 'Resúmenes automáticos', desc: 'Cada conversación se resume para que veas de un vistazo qué necesita cada contacto.', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>', bg: '#EDFAF7', color: '#2A9D8F' },
]

const steps = [
  { title: 'Crea tu cuenta', desc: 'Regístrate en menos de 1 minuto. Sin tarjeta de crédito.' },
  { title: 'Añade tu contenido', desc: 'Sube precios, horarios, FAQs. El asistente aprende solo.' },
  { title: 'Instala el widget', desc: 'Copia un snippet y pégalo en tu web. Listo.' },
  { title: 'Empieza a captar leads', desc: 'Tu asistente responde y captura datos mientras tú duermes.' },
]

const stats = [
  { num: '< 5 min', label: 'para instalarlo' },
  { num: '24/7', label: 'disponibilidad' },
  { num: '0€', label: 'para empezar' },
  { num: '100%', label: 'tuyo, sin lock-in' },
]

// ── Helpers ───────────────────────────────────────────────────
function onScroll() {
  showTopBtn.value = window.scrollY > 400
}

// ── Scroll animations con IntersectionObserver (100% fiable) ──
let observer: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', onScroll)

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  // Observar todos los elementos animables
  document.querySelectorAll('.scroll-anim').forEach(el => observer?.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════════════════════
   HERO ENTRANCE ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
@keyframes hero-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes hero-in {
  from { opacity: 0; transform: scale(0.96) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.hero-anim {
  opacity: 0;
  animation: hero-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hero-card {
  opacity: 0;
  animation: hero-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL ANIMATIONS — IntersectionObserver + CSS
   ═══════════════════════════════════════════════════════════════ */
@keyframes anim-up {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes anim-left {
  from { opacity: 0; transform: translateX(-28px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes anim-right {
  from { opacity: 0; transform: translateX(28px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Estado inicial: invisible */
.scroll-anim          { opacity: 0; }
.scroll-anim--left    { opacity: 0; }
.scroll-anim--right   { opacity: 0; }

/* Cuando el observer añade .is-visible → anima */
.scroll-anim.is-visible {
  animation: anim-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.scroll-anim--left.is-visible {
  animation: anim-left 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.scroll-anim--right.is-visible {
  animation: anim-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* ═══════════════════════════════════════════════════════════════
   BASE — mobile first
   ═══════════════════════════════════════════════════════════════ */
.land {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background: #fff;
  color: #111;
  overflow-x: hidden;
}


/* ── Scroll-to-top button ─────────────────────────────────────── */
.land-top-btn {
  position: fixed; bottom: 28px; right: 24px; z-index: 290;
  width: 44px; height: 44px; border-radius: 50%;
  background: #1D3557; color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(13,26,45,0.3);
  transition: background 0.18s, transform 0.18s;
}
.land-top-btn:hover { background: #243f69; transform: translateY(-2px); }
.topbtn-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.topbtn-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.topbtn-enter-from, .topbtn-leave-to { opacity: 0; transform: translateY(10px); }

/* ── BUTTONS ──────────────────────────────────────────────────── */
.land-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-weight: 600; text-decoration: none; border: none; cursor: pointer;
  transition: all 0.18s; font-size: 0.9rem; padding: 10px 20px;
  border-radius: 100px; font-family: inherit;
}
.land-btn--dark { background: #0d1a2d; color: #fff; }
.land-btn--dark:hover { background: #1a2f4a; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(13,26,45,0.25); }
.land-btn--dark:active { transform: scale(0.98); }
.land-btn--lg { padding: 14px 28px; font-size: 0.9375rem; }
.land-btn--white { background: #fff; color: #0d1a2d; }
.land-btn--white:hover { background: #f5f5f3; transform: translateY(-1px); }
.land-btn--outline { background: transparent; color: #111; border: 1.5px solid #ddd; }
.land-btn--outline:hover { border-color: #999; }
.land-link {
  font-size: 0.875rem; font-weight: 500; color: #555; text-decoration: none;
  transition: color 0.15s; padding: 8px 12px;
}
.land-link:hover { color: #111; }

/* ── HERO ─────────────────────────────────────────────────────── */
.land-hero {
  padding: 96px 20px 60px;
  display: flex; flex-direction: column; gap: 48px;
}

/* Copy */
.land-hero__eyebrow {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em;
  color: #2A9D8F; text-transform: uppercase; margin-bottom: 16px;
}
.land-hero__dash { font-size: 1rem; }

.land-hero__h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.4rem, 8vw, 4.5rem);
  font-weight: 800; color: #0d1a2d; line-height: 1.08;
  letter-spacing: -0.035em; margin-bottom: 20px;
}
.land-hero__h1 em {
  font-style: italic; color: #1D3557; font-weight: 800;
}

.land-hero__sub {
  font-size: 1rem; color: #666; line-height: 1.72;
  max-width: 460px; margin-bottom: 32px;
}

.land-hero__actions {
  display: flex; flex-direction: column; gap: 20px;
}
.land-hero__social {
  display: flex; align-items: center; gap: 12px;
}
.land-hero__avatars {
  display: flex;
}
.land-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  border: 2px solid #fff; margin-left: -8px;
}
.land-avatar:first-child { margin-left: 0; }
.land-stars {
  font-size: 0.8125rem; color: #F5A623; font-weight: 600;
}
.land-stars span { color: #111; }
.land-reviews { font-size: 0.75rem; color: #999; margin-top: 1px; }

/* ── Visual bento ─────────────────────────────────────────────── */
.land-hero__visual {
  display: grid;
  grid-template-columns: 1fr;   /* 1 columna en mobile */
  gap: 10px;
}
/* En tablet ya mostramos 2 columnas */
@media (min-width: 560px) {
  .land-hero__visual { grid-template-columns: 1fr 1fr; }
  .land-card--browser { grid-column: 1 / -1; }
}

/* Cards base */
.land-card {
  border-radius: 22px; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04);
}

/* ── Card browser ──────────────────────────────────────────────── */
.land-card--browser {
  background: #141e35;
}
.land-card__bar {
  display: flex; align-items: center; gap: 5px;
  padding: 10px 14px; background: #0e1829;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.land-dot { width: 9px; height: 9px; border-radius: 50%; }
.land-dot--r { background: #ff5f57; }
.land-dot--y { background: #febc2e; }
.land-dot--g { background: #28c840; }
.land-card__url {
  font-size: 0.68rem; color: rgba(255,255,255,0.25);
  font-family: monospace; margin-left: 10px;
}
.land-card__body {
  position: relative; padding: 14px; min-height: 130px;
}
.land-fake-page { opacity: 0.12; }
.land-fake-line { height: 10px; background: #fff; border-radius: 3px; margin-bottom: 7px; }
.land-fake-btn { width: 70px; height: 26px; background: #2A9D8F; border-radius: 6px; margin-top: 8px; }

/* Mini widget inside browser */
.land-mini-widget {
  position: absolute; right: 10px; bottom: 10px;
  width: 170px; border-radius: 16px;
  box-shadow: 0 8px 28px rgba(0,0,0,0.25); overflow: hidden;
}
.land-mini-widget__head {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 10px; background: #1D3557;
}
.land-mini-avatar {
  width: 24px; height: 24px; border-radius: 50%;
  background: rgba(255,255,255,0.18);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.land-mini-name { font-size: 9.5px; font-weight: 700; color: #fff; }
.land-mini-status {
  display: flex; align-items: center; gap: 3px;
  font-size: 8px; color: rgba(255,255,255,0.55);
}
.land-online { width: 5px; height: 5px; border-radius: 50%; background: #4ade80; }
.land-mini-msgs { padding: 8px; display: flex; flex-direction: column; gap: 5px; background: #F8F7F5; }
.land-mini-msg { font-size: 9px; line-height: 1.4; padding: 6px 8px; border-radius: 10px; max-width: 90%; }
.land-mini-msg--usr { background: #1D3557; color: #fff; align-self: flex-end; border-bottom-right-radius: 2px; }
.land-mini-msg--bot { background: #fff; color: #111; align-self: flex-start; border: 1px solid #e8e5e2; border-bottom-left-radius: 2px; }

/* ── Card lead — pill tall (spans 2 rows on desktop) ──────────── */
.land-card--lead {
  background: #F3EFE6;
  padding: 20px 16px;
  display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 4px;
}
.land-card-lead__check {
  width: 30px; height: 30px; border-radius: 50%;
  background: #2A9D8F;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0 4px 12px rgba(42,157,143,0.35);
}
.land-card-lead__title {
  font-size: 0.7rem; font-weight: 700; color: #999;
  text-transform: uppercase; letter-spacing: 0.08em;
}
.land-card-lead__name {
  font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: #0d1a2d;
  line-height: 1.2; margin-top: 2px;
}
.land-card-lead__detail { font-size: 0.75rem; color: #888; }
.land-card-lead__time { font-size: 0.7rem; color: #c0b9ae; margin-top: 6px; }

/* ── Speed badge flotante dentro del browser ────────────────── */
.land-speed-badge {
  position: absolute; bottom: 10px; left: 10px;
  display: flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.75);
  white-space: nowrap;
}
.land-speed-badge__dot {
  width: 6px; height: 6px; border-radius: 50%; background: #4ade80; flex-shrink: 0;
}

/* ── Métricas dentro de la lead card ───────────────────────── */
.land-card-lead__metrics {
  display: flex; align-items: center; gap: 12px;
  margin-top: 16px; padding-top: 14px;
  border-top: 1px solid rgba(0,0,0,0.07);
}
.land-clm { text-align: center; flex: 1; }
.land-clm__val {
  font-family: 'Sora', sans-serif; font-size: 1.1rem; font-weight: 800;
  color: #0d1a2d; letter-spacing: -0.03em; line-height: 1;
}
.land-clm__lbl { font-size: 0.65rem; color: #b0a89e; margin-top: 3px; }
.land-clm-div { width: 1px; height: 28px; background: rgba(0,0,0,0.08); flex-shrink: 0; }

/* ── STRIP ────────────────────────────────────────────────────── */
.land-strip {
  padding: 40px 20px; border-top: 1px solid #ededeb; border-bottom: 1px solid #ededeb;
  text-align: center;
}
.land-strip__label { font-size: 0.8rem; color: #aaa; font-weight: 500; margin-bottom: 14px; }
.land-strip__tags { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.land-tag {
  padding: 6px 14px; border: 1.5px solid #e8e6e3; border-radius: 40px;
  font-size: 0.8rem; font-weight: 500; color: #666; transition: all 0.2s;
}
.land-tag:hover { border-color: #1D3557; color: #1D3557; }

/* ── FEATURES ─────────────────────────────────────────────────── */
.land-features { padding: 72px 20px; }
.land-section-header { text-align: center; margin-bottom: 48px; }
.land-label {
  font-size: 0.75rem; font-weight: 700; color: #2A9D8F;
  text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px;
}
.land-h2 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.7rem, 5vw, 2.75rem);
  font-weight: 800; color: #0d1a2d; line-height: 1.18;
  letter-spacing: -0.03em; margin-bottom: 12px;
}
.land-br-md { display: none; }
.land-sub { font-size: 1rem; color: #777; line-height: 1.7; max-width: 440px; margin: 0 auto; }

.land-features__grid {
  display: grid; grid-template-columns: 1fr; gap: 14px;
}
.land-fcard {
  padding: 24px; border: 1.5px solid #ededeb; border-radius: 18px;
  background: #fff; transition: all 0.2s;
}
.land-fcard:hover { border-color: #d4d0cb; box-shadow: 0 8px 32px rgba(0,0,0,0.06); transform: translateY(-2px); }
.land-fcard__icon {
  width: 42px; height: 42px; border-radius: 11px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
}
.land-fcard__title { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 0.9375rem; color: #0d1a2d; margin-bottom: 6px; }
.land-fcard__desc { font-size: 0.875rem; color: #777; line-height: 1.65; }

/* ── HOW IT WORKS ─────────────────────────────────────────────── */
.land-how { background: #F8F7F4; padding: 72px 20px; }
.land-how__inner { display: flex; flex-direction: column; gap: 48px; }
.land-steps { display: flex; flex-direction: column; gap: 24px; margin-top: 36px; }
.land-step { display: flex; gap: 18px; align-items: flex-start; }
.land-step__num { font-family: 'Sora', sans-serif; font-size: 0.72rem; font-weight: 800; color: #2A9D8F; letter-spacing: 0.06em; padding-top: 2px; min-width: 26px; flex-shrink: 0; }
.land-step__title { font-weight: 700; color: #0d1a2d; margin-bottom: 3px; font-size: 0.9375rem; }
.land-step__desc { font-size: 0.875rem; color: #777; line-height: 1.6; }

.land-code { border-radius: 16px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.12); }
.land-code__bar { display: flex; align-items: center; gap: 6px; padding: 12px 16px; background: #1a1a1a; border-bottom: 1px solid rgba(255,255,255,0.05); }
.land-code__file { font-size: 0.72rem; color: rgba(255,255,255,0.28); margin-left: auto; font-family: monospace; }
.land-code__body { background: #0D1117; padding: 20px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.8125rem; line-height: 2; margin: 0; overflow-x: auto; }
.ct-blue { color: #79c0ff; }
.ct-key { color: #7ee787; }
.ct-str { color: #a5d6ff; }
.ct-gray { color: rgba(255,255,255,0.28); }
.land-code__result { background: #0a0e15; padding: 12px 16px; display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #4ade80; font-family: monospace; border-top: 1px solid rgba(255,255,255,0.04); }
.land-result-dot { width: 7px; height: 7px; border-radius: 50%; background: #4ade80; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); } 50% { box-shadow: 0 0 0 5px rgba(74,222,128,0); } }

/* ── STATS ────────────────────────────────────────────────────── */
.land-stats { padding: 60px 20px; border-top: 1px solid #ededeb; border-bottom: 1px solid #ededeb; }
.land-stats__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 800px; margin: 0 auto; text-align: center; }
.land-stat__num { display: block; font-family: 'Sora', sans-serif; font-size: clamp(1.75rem, 5vw, 2.75rem); font-weight: 800; color: #1D3557; letter-spacing: -0.03em; margin-bottom: 4px; }
.land-stat__lbl { font-size: 0.875rem; color: #999; }

/* ── CTA ──────────────────────────────────────────────────────── */
.land-cta { position: relative; overflow: hidden; background: #080f1e; padding: 90px 20px; text-align: center; }
.land-cta__mesh { position: absolute; width: 600px; height: 600px; border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%, -50%); background: radial-gradient(circle, rgba(29,53,87,0.8) 0%, rgba(42,157,143,0.1) 55%, transparent 70%); filter: blur(70px); pointer-events: none; }
.land-cta__grain { position: absolute; inset: 0; opacity: 0.04; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
.land-cta__inner { position: relative; z-index: 1; }
.land-cta__title { font-family: 'Sora', sans-serif; font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 800; color: #fff; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 16px; }
.land-cta__sub { font-size: 1rem; color: rgba(255,255,255,0.55); max-width: 420px; margin: 0 auto 28px; line-height: 1.7; }
.land-cta__note { font-size: 0.8rem; color: rgba(255,255,255,0.28); margin-top: 14px; }


/* ═══════════════════════════════════════════════════════════════
   TABLET — 640px+
   ═══════════════════════════════════════════════════════════════ */
@media (min-width: 640px) {
  .land-hero { padding: 100px 32px 72px; }
  .land-hero__actions { flex-direction: row; align-items: center; }
  .land-features__grid { grid-template-columns: 1fr 1fr; }
  .land-stats__grid { grid-template-columns: repeat(4, 1fr); }
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP — 1024px+
   ═══════════════════════════════════════════════════════════════ */
@media (min-width: 1024px) {
  /* Hero */
  .land-hero {
    flex-direction: row; align-items: center;
    max-width: 1200px; margin: 0 auto;
    padding: 120px 40px 80px; gap: 64px;
  }
  .land-hero__copy { flex: 1; }
  .land-hero__visual {
    flex: 1;
    grid-template-columns: 1.15fr 0.85fr;
    grid-template-rows: auto auto;
  }
  /* Desktop: 2 cols, browser izquierda ambas filas, lead derecha ambas filas */
  .land-hero__visual { grid-template-columns: 1.1fr 0.9fr; grid-template-rows: 1fr; }
  .land-card--browser { grid-column: 1; border-radius: 22px; }
  .land-card--lead    { grid-column: 2; border-radius: 28px; }
  .land-br-md { display: block; }

  /* Sections */
  .land-strip { padding: 52px 40px; }
  .land-features { padding: 100px 40px; max-width: 1200px; margin: 0 auto; }
  .land-features__grid { grid-template-columns: repeat(3, 1fr); }
  .land-how { padding: 100px 40px; }
  .land-how__inner { flex-direction: row; max-width: 1100px; margin: 0 auto; gap: 80px; align-items: center; }
  .land-how__copy { flex: 1; }
  .land-how__code { flex: 1; }
  .land-stats { padding: 80px 40px; }
  .land-cta { padding: 120px 40px; }
}
</style>
