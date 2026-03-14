<template>
  <div class="pricing-page">

    <!-- Nav compartido -->
    <LandingNav />

    <!-- Hero pricing -->
    <section class="p-hero">
      <!-- Mesh background -->
      <div class="p-mesh p-mesh--tl" />
      <div class="p-mesh p-mesh--tr" />
      <div class="p-mesh p-mesh--br" />

      <div class="p-hero__inner">
        <div class="p-badge">Precios</div>
        <h1 class="p-hero__h1">Un plan para cada academia.</h1>
        <p class="p-hero__sub">Sin permanencia, sin sorpresas. Empieza gratis y escala cuando lo necesites.</p>

        <!-- Toggle mensual / anual -->
        <div class="p-toggle">
          <button :class="{ active: !annual }" @click="annual = false">Mensual</button>
          <button :class="{ active: annual }" @click="annual = true">
            Anual
            <span class="p-save">−20%</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Plans -->
    <section class="p-plans">
      <div class="p-plans__grid">

        <!-- Free -->
        <div class="p-card">
          <div class="p-card__top">
            <p class="p-card__name">Free</p>
            <p class="p-card__tagline">Para empezar sin riesgo.</p>
            <div class="p-card__price">
              <span class="p-price__num">0€</span>
              <span class="p-price__per">/mes</span>
            </div>
          </div>
          <RouterLink to="/login" class="p-btn p-btn--outline-plan">Empieza gratis</RouterLink>
          <ul class="p-card__features">
            <li v-for="f in freePlan" :key="f">
              <svg class="p-check" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.4"/>
                <path d="M6.5 10l2.5 2.5 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ f }}
            </li>
          </ul>
        </div>

        <!-- Pro (featured) -->
        <div class="p-card p-card--featured">
          <div class="p-card__badge">Más popular</div>
          <div class="p-card__top">
            <p class="p-card__name">Pro</p>
            <p class="p-card__tagline">Para academias que quieren crecer.</p>
            <div class="p-card__price">
              <span class="p-price__num">{{ annual ? '23€' : '29€' }}</span>
              <span class="p-price__per">/mes</span>
            </div>
          </div>
          <RouterLink to="/login" class="p-btn p-btn--white-plan">Empieza 14 días gratis</RouterLink>
          <ul class="p-card__features">
            <li v-for="f in proPlan" :key="f">
              <svg class="p-check" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="rgba(255,255,255,0.4)" stroke-width="1.4"/>
                <path d="M6.5 10l2.5 2.5 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ f }}
            </li>
          </ul>
        </div>

        <!-- Business -->
        <div class="p-card">
          <div class="p-card__top">
            <p class="p-card__name">Business</p>
            <p class="p-card__tagline">Para grupos y franquicias.</p>
            <div class="p-card__price">
              <span class="p-price__num p-price__num--lg">Hablamos</span>
            </div>
            <p class="p-card__sub">Personalizado para tu equipo</p>
          </div>
          <RouterLink to="/login" class="p-btn p-btn--outline-plan">Contactar con ventas</RouterLink>
          <ul class="p-card__features">
            <li v-for="f in bizPlan" :key="f">
              <svg class="p-check" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.4"/>
                <path d="M6.5 10l2.5 2.5 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ f }}
            </li>
          </ul>
        </div>

      </div>
    </section>

    <!-- FAQ -->
    <section class="p-faq">
      <h2 class="p-faq__title">Preguntas frecuentes</h2>
      <div class="p-faq__grid">
        <div v-for="q in faqs" :key="q.q" class="p-faq__item">
          <p class="p-faq__q">{{ q.q }}</p>
          <p class="p-faq__a">{{ q.a }}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="p-cta">
      <div class="p-cta__mesh" />
      <div class="p-cta__inner">
        <h2>¿Listo para automatizar<br/>tu academia?</h2>
        <RouterLink to="/login" class="p-btn p-btn--primary p-btn--lg">
          Empieza gratis hoy
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </RouterLink>
        <p class="p-cta__note">14 días gratis · Sin tarjeta · Cancela cuando quieras</p>
      </div>
    </section>

    <!-- Footer compartido -->
    <LandingFooter />

    <!-- Scroll to top -->
    <Transition name="ptopbtn">
      <button v-if="showTopBtn" class="p-top-btn" @click="scrollToTop" aria-label="Volver arriba">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
        </svg>
      </button>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LandingNav from '@/components/landing/LandingNav.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'

const annual = ref(false)
const showTopBtn = ref(false)

function onScroll() { showTopBtn.value = window.scrollY > 400 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const freePlan = [
  '1 widget activo',
  '50 conversaciones/mes',
  '3 fuentes de conocimiento',
  'Captura de leads básica',
  'Acceso al panel de control',
]
const proPlan = [
  'Todo lo del plan Free',
  'Widgets ilimitados',
  '1.000 conversaciones/mes',
  'Fuentes de conocimiento ilimitadas',
  'Resúmenes automáticos con IA',
  'Integraciones (Zapier, Email)',
  'Soporte prioritario',
]
const bizPlan = [
  'Todo lo del plan Pro',
  'Conversaciones ilimitadas',
  'Múltiples sedes / sub-cuentas',
  'White-label sin marca AulaFlow',
  'Acceso completo a la API',
  'Onboarding dedicado',
  'SLA garantizado',
]
const faqs = [
  { q: '¿Necesito tarjeta de crédito para empezar?', a: 'No. El plan Free es gratuito para siempre y el periodo de prueba del plan Pro no requiere tarjeta.' },
  { q: '¿Puedo cambiar de plan en cualquier momento?', a: 'Sí, puedes subir o bajar de plan cuando quieras. Los cambios se aplican al siguiente ciclo de facturación.' },
  { q: '¿Qué pasa si supero el límite de conversaciones?', a: 'Te avisamos antes de llegar al límite. Puedes ampliar el plan o esperar al próximo mes sin coste adicional.' },
  { q: '¿El widget funciona en cualquier web?', a: 'Sí. Funciona con cualquier CMS o web (WordPress, Wix, Squarespace, HTML…) con un simple snippet de JavaScript.' },
  { q: '¿Mis datos están seguros?', a: 'Absolutamente. Tus datos se almacenan en servidores europeos y nunca se comparten con terceros.' },
  { q: '¿Hay soporte en español?', a: 'Sí, todo nuestro soporte es en español. Respondemos por chat o email en menos de 24h.' },
]
</script>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────── */
.pricing-page {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background: #fff;
  color: #111;
  overflow-x: hidden;
}


/* ── Scroll-to-top ───────────────────────────────────────────── */
.p-top-btn {
  position: fixed; bottom: 28px; right: 24px; z-index: 290;
  width: 44px; height: 44px; border-radius: 50%;
  background: #1D3557; color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(13,26,45,0.3);
  transition: background 0.18s, transform 0.18s;
}
.p-top-btn:hover { background: #243f69; transform: translateY(-2px); }
.ptopbtn-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.ptopbtn-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.ptopbtn-enter-from, .ptopbtn-leave-to { opacity: 0; transform: translateY(10px); }

/* ── Buttons ─────────────────────────────────────────────────── */
.p-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-weight: 600; text-decoration: none; border: none; cursor: pointer;
  transition: all 0.18s; border-radius: 10px; font-size: 0.875rem;
  padding: 9px 18px; font-family: inherit;
}
.p-btn--primary { background: #1D3557; color: #fff; }
.p-btn--primary:hover { background: #162944; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(29,53,87,0.25); }
.p-btn--primary:active { transform: scale(0.98); }
.p-btn--lg { padding: 14px 28px; font-size: 0.9375rem; border-radius: 12px; }
.p-btn--ghost { background: transparent; color: #555; border: 1.5px solid #e0ddd8; }
.p-btn--ghost:hover { color: #111; border-color: #bbb; }

/* Plan buttons */
.p-btn--outline-plan {
  display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 13px; border-radius: 10px; font-size: 0.9rem; font-weight: 600;
  text-decoration: none; border: 1.5px solid #d4d0cb; color: #1D3557;
  background: transparent; cursor: pointer; transition: all 0.18s; font-family: inherit;
}
.p-btn--outline-plan:hover { border-color: #1D3557; background: #f0f4f8; }
.p-btn--white-plan {
  display: flex; align-items: center; justify-content: center;
  width: 100%; padding: 13px; border-radius: 10px; font-size: 0.9rem; font-weight: 700;
  text-decoration: none; background: #fff; color: #1D3557;
  cursor: pointer; transition: all 0.18s; font-family: inherit; border: none;
}
.p-btn--white-plan:hover { background: #f0f4f8; transform: translateY(-1px); }

/* ── Hero ─────────────────────────────────────────────────────── */
.p-hero {
  position: relative; overflow: hidden;
  background: #fafaf8;
  padding: 130px 32px 80px; text-align: center;
}
/* Gradient mesh orbs */
.p-mesh {
  position: absolute; border-radius: 50%; pointer-events: none; filter: blur(70px);
}
.p-mesh--tl {
  width: 500px; height: 500px; top: -150px; left: -100px;
  background: radial-gradient(circle, rgba(212,198,235,0.45) 0%, transparent 70%);
}
.p-mesh--tr {
  width: 400px; height: 400px; top: -80px; right: -80px;
  background: radial-gradient(circle, rgba(165,200,235,0.35) 0%, transparent 70%);
}
.p-mesh--br {
  width: 350px; height: 350px; bottom: -80px; right: 20%;
  background: radial-gradient(circle, rgba(42,157,143,0.12) 0%, transparent 65%);
}

.p-hero__inner { position: relative; z-index: 1; }

.p-badge {
  display: inline-block; background: rgba(29,53,87,0.07);
  color: #1D3557; font-size: 0.8rem; font-weight: 600;
  padding: 5px 14px; border-radius: 40px; margin-bottom: 20px;
  letter-spacing: 0.03em;
}
.p-hero__h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800; color: #0d1a2d; line-height: 1.15;
  letter-spacing: -0.03em; margin-bottom: 14px;
}
.p-hero__sub {
  font-size: 1.0625rem; color: #777;
  max-width: 420px; margin: 0 auto 32px; line-height: 1.65;
}

/* Toggle mensual/anual */
.p-toggle {
  display: inline-flex;
  background: #fff;
  border: 1.5px solid #e8e5e0;
  border-radius: 12px; padding: 5px; gap: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.p-toggle button {
  display: flex; align-items: center; gap: 8px;
  background: transparent; border: none; cursor: pointer;
  color: #888; font-size: 0.875rem; font-weight: 500;
  padding: 8px 20px; border-radius: 8px;
  transition: all 0.2s; font-family: inherit;
}
.p-toggle button.active {
  background: #1D3557; color: #fff; font-weight: 600;
  box-shadow: 0 2px 8px rgba(29,53,87,0.25);
}
.p-save {
  background: #2A9D8F; color: #fff;
  font-size: 0.68rem; font-weight: 700;
  padding: 2px 7px; border-radius: 40px; letter-spacing: 0.02em;
}

/* ── Plans ─────────────────────────────────────────────────────── */
.p-plans {
  padding: 60px 32px 100px; background: #fafaf8;
}
.p-plans__grid {
  max-width: 1040px; margin: 0 auto;
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  /* stretch: todas las cards iguales en alto */
  align-items: stretch;
}

@media (max-width: 860px) {
  .p-plans__grid { grid-template-columns: 1fr; max-width: 400px; }
}

/* Card base — flex column para que el botón quede pegado abajo */
.p-card {
  background: #fff;
  border: 1.5px solid #e8e5e0;
  border-radius: 20px; padding: 28px;
  position: relative;
  display: flex; flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
}

.p-card:not(.p-card--featured):hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

/* Featured card — sin transform para mantener alineación */
.p-card--featured {
  background: #1D3557;
  border-color: #1D3557;
  box-shadow: 0 24px 64px rgba(29,53,87,0.3);
  z-index: 1;
}
.p-card--featured:hover {
  box-shadow: 0 32px 72px rgba(29,53,87,0.38);
}

.p-card__badge {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  background: #2A9D8F; color: #fff;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em;
  padding: 4px 14px; border-radius: 40px; white-space: nowrap;
}

.p-card__top { margin-bottom: 20px; }

.p-card__name {
  font-family: 'Sora', sans-serif; font-weight: 700;
  font-size: 1.125rem; color: #1D3557; margin-bottom: 4px;
}
.p-card--featured .p-card__name { color: rgba(255,255,255,0.7); }

.p-card__tagline {
  font-size: 0.85rem; color: #999; margin-bottom: 18px; line-height: 1.4;
}
.p-card--featured .p-card__tagline { color: rgba(255,255,255,0.5); }

.p-card__price { display: flex; align-items: baseline; gap: 3px; margin-bottom: 4px; }
.p-price__num {
  font-family: 'Sora', sans-serif; font-size: 2.75rem;
  font-weight: 800; color: #0d1a2d; letter-spacing: -0.04em; line-height: 1;
}
.p-price__num--lg { font-size: 1.5rem; letter-spacing: -0.02em; }
.p-card--featured .p-price__num { color: #fff; }
.p-price__per { font-size: 0.875rem; color: #aaa; font-weight: 500; }
.p-card--featured .p-price__per { color: rgba(255,255,255,0.45); }
.p-card__sub { font-size: 0.8125rem; color: #bbb; margin-top: 2px; }
.p-card--featured .p-card__sub { color: rgba(255,255,255,0.35); }

.p-card__features {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 12px;
  /* margin-top: auto empuja las features al fondo de la card */
  margin-top: auto; padding-top: 20px;
}
.p-card__features li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 0.875rem; color: #444; line-height: 1.45;
}
.p-card--featured .p-card__features li { color: rgba(255,255,255,0.85); }

.p-check {
  width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px;
  color: #2A9D8F;
}
.p-card--featured .p-check { color: rgba(255,255,255,0.6); }

/* ── FAQ ─────────────────────────────────────────────────────── */
.p-faq {
  padding: 90px 32px; max-width: 900px; margin: 0 auto;
  border-top: 1px solid #ededeb;
}
.p-faq__title {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 800; color: #0d1a2d; letter-spacing: -0.025em;
  text-align: center; margin-bottom: 52px;
}
.p-faq__grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px 52px;
}
@media (max-width: 640px) { .p-faq__grid { grid-template-columns: 1fr; } }
.p-faq__q {
  font-weight: 700; color: #0d1a2d; margin-bottom: 8px; font-size: 0.9375rem;
}
.p-faq__a { font-size: 0.875rem; color: #777; line-height: 1.72; }

/* ── CTA ─────────────────────────────────────────────────────── */
.p-cta {
  position: relative; overflow: hidden;
  background: #080f1e;
  padding: 100px 32px; text-align: center;
}
.p-cta__mesh {
  position: absolute; width: 700px; height: 700px; border-radius: 50%;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(29,53,87,0.8) 0%, rgba(42,157,143,0.1) 55%, transparent 70%);
  filter: blur(70px); pointer-events: none;
}
.p-cta__inner { position: relative; z-index: 1; }
.p-cta h2 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  font-weight: 800; color: #fff; letter-spacing: -0.025em;
  line-height: 1.2; margin-bottom: 28px;
}
.p-cta__note { font-size: 0.8125rem; color: rgba(255,255,255,0.3); margin-top: 16px; }

</style>
