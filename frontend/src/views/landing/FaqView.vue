<template>
  <div class="faq-page">

    <!-- Nav compartido -->
    <LandingNav />

    <!-- Header section -->
    <section class="faq-hero">
      <p class="faq-hero__label">Pregúntanos lo que quieras</p>
      <h1 class="faq-hero__h1">Preguntas frecuentes</h1>
      <p class="faq-hero__sub">Nuestro equipo estará encantado de resolver tus dudas.</p>
    </section>

    <!-- Accordion -->
    <section class="faq-body">
      <div class="faq-list">
        <div
          v-for="(item, i) in faqs"
          :key="i"
          class="faq-item"
          :class="{ open: openIdx === i }"
          @click="toggle(i)"
        >
          <div class="faq-item__row">
            <p class="faq-item__q">{{ item.q }}</p>
            <div class="faq-item__icon">
              <svg v-if="openIdx === i" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
            </div>
          </div>
          <div class="faq-item__body" v-show="openIdx === i">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>

      <!-- CTA lateral -->
      <div class="faq-cta-box">
        <div class="faq-cta-box__icon">💬</div>
        <h3 class="faq-cta-box__title">¿No encuentras lo que buscas?</h3>
        <p class="faq-cta-box__desc">Escríbenos directamente y te respondemos en menos de 24 horas.</p>
        <a href="mailto:hola@aulaflow.io" class="fn-btn fn-btn--full">Contactar</a>
        <RouterLink to="/login" class="fn-btn fn-btn--outline fn-btn--full">Probar gratis</RouterLink>
      </div>
    </section>

    <!-- Footer mínimo -->
    <!-- Footer compartido -->
    <LandingFooter />

    <!-- Scroll to top -->
    <Transition name="ftopbtn">
      <button v-if="showTopBtn" class="fn-top-btn" @click="scrollToTop" aria-label="Volver arriba">
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

const openIdx = ref<number | null>(0)
const showTopBtn = ref(false)

function toggle(i: number) {
  openIdx.value = openIdx.value === i ? null : i
}

function onScroll() { showTopBtn.value = window.scrollY > 400 }
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const faqs = [
  {
    q: '¿Necesito tarjeta de crédito para empezar?',
    a: 'No. El plan Free es completamente gratuito para siempre y no requiere tarjeta de crédito. El periodo de prueba de 14 días del plan Pro tampoco la necesita.',
  },
  {
    q: '¿Cómo funciona la instalación del widget?',
    a: 'Es tan sencillo como copiar un snippet de JavaScript (una línea) y pegarlo antes del cierre del </body> de tu web. Funciona con cualquier CMS: WordPress, Wix, Squarespace, HTML estático, etc. Sin plugins ni extensiones.',
  },
  {
    q: '¿El asistente responde solo con mi información?',
    a: 'Sí, completamente. El asistente solo usa el contenido que tú le proporciones (textos, FAQs, URLs). Nunca inventará respuestas ni usará información de terceros. Si no sabe algo, lo dice y ofrece ponerte en contacto.',
  },
  {
    q: '¿Qué pasa si supero el límite de conversaciones?',
    a: 'Te avisamos cuando estés cerca del límite. Puedes subir de plan con un clic o, si prefieres, el widget simplemente deja de responder hasta el siguiente mes sin coste adicional.',
  },
  {
    q: '¿Puedo personalizar el aspecto del widget?',
    a: 'Sí. Desde el panel de control puedes cambiar el color principal, el nombre del asistente, el mensaje de bienvenida y el idioma. Próximamente añadiremos más opciones de personalización visual.',
  },
  {
    q: '¿Puedo cambiar de plan en cualquier momento?',
    a: 'Absolutamente. Puedes subir o bajar de plan cuando quieras desde tu panel de control. Los cambios se aplican inmediatamente (subida) o al siguiente ciclo de facturación (bajada).',
  },
  {
    q: '¿Dónde se almacenan mis datos?',
    a: 'Todos los datos se almacenan en servidores dentro de la Unión Europea, cumpliendo el RGPD. Nunca compartimos tu información ni la de tus clientes con terceros.',
  },
  {
    q: '¿Tiene soporte en español?',
    a: 'Sí, todo nuestro soporte es en español. Puedes contactarnos por chat (en el panel de control) o por email y respondemos en menos de 24 horas en días laborables.',
  },
  {
    q: '¿Funciona el widget en dispositivos móviles?',
    a: 'Sí. El widget está diseñado para ser completamente responsive y funciona perfectamente en móviles, tablets y escritorio.',
  },
  {
    q: '¿Puedo cancelar en cualquier momento?',
    a: 'Sí, sin permanencia ni penalizaciones. Si cancelas, mantienes el acceso hasta el final del periodo pagado y después pasas al plan gratuito automáticamente.',
  },
]
</script>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────── */
.faq-page {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background: #fff; color: #111; overflow-x: hidden; min-height: 100vh;
}


/* ── Scroll-to-top ───────────────────────────────────────────── */
.fn-top-btn {
  position: fixed; bottom: 28px; right: 24px; z-index: 290;
  width: 44px; height: 44px; border-radius: 50%;
  background: #1D3557; color: #fff; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(13,26,45,0.3);
  transition: background 0.18s, transform 0.18s;
}
.fn-top-btn:hover { background: #243f69; transform: translateY(-2px); }
.ftopbtn-enter-active { transition: opacity 0.25s ease, transform 0.25s ease; }
.ftopbtn-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.ftopbtn-enter-from, .ftopbtn-leave-to { opacity: 0; transform: translateY(10px); }

/* ── Buttons ──────────────────────────────────────────────────── */
.fn-btn {
  display: inline-flex; align-items: center; justify-content: center;
  background: #0d1a2d; color: #fff; font-weight: 600; font-size: 0.875rem;
  padding: 9px 18px; border-radius: 100px; text-decoration: none;
  border: none; cursor: pointer; transition: all 0.18s; font-family: inherit;
}
.fn-btn:hover { background: #1a2f4a; transform: translateY(-1px); }
.fn-btn--full { width: 100%; justify-content: center; margin-top: 8px; }
.fn-btn--outline { background: transparent; color: #1D3557; border: 1.5px solid #d4d0cb; }
.fn-btn--outline:hover { border-color: #1D3557; background: #f0f4f8; }
.fn-ghost { font-size: 0.875rem; font-weight: 500; color: #666; text-decoration: none; padding: 8px 12px; transition: color 0.15s; }
.fn-ghost:hover { color: #111; }

/* ── Hero ─────────────────────────────────────────────────────── */
.faq-hero {
  padding: 110px 20px 48px; text-align: center;
  background: #fafaf8;
  border-bottom: 1px solid #ededeb;
}
.faq-hero__label {
  font-size: 0.78rem; font-weight: 700; color: #2A9D8F;
  text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;
}
.faq-hero__h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(1.9rem, 5vw, 2.75rem);
  font-weight: 800; color: #0d1a2d; letter-spacing: -0.03em; margin-bottom: 10px;
}
.faq-hero__sub { font-size: 1rem; color: #888; line-height: 1.6; }

/* ── Body ─────────────────────────────────────────────────────── */
.faq-body {
  display: flex; flex-direction: column; gap: 32px;
  max-width: 820px; margin: 0 auto; padding: 48px 20px 80px;
}

/* Accordion list */
.faq-list { display: flex; flex-direction: column; gap: 10px; }

.faq-item {
  border: 1.5px solid #e8e5e0; border-radius: 14px;
  cursor: pointer; transition: border-color 0.2s;
  overflow: hidden;
}
.faq-item:hover { border-color: #d0cdc8; }

/* Open state */
.faq-item.open {
  background: #0d1a2d; border-color: #0d1a2d;
}

.faq-item__row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; padding: 18px 20px;
}
.faq-item__q {
  font-size: 0.9375rem; font-weight: 600; color: #0d1a2d;
  line-height: 1.4; flex: 1; margin: 0;
  transition: color 0.2s;
}
.faq-item.open .faq-item__q { color: #fff; }

.faq-item__icon {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  border: 1.5px solid #e0ddd8; color: #888;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.faq-item.open .faq-item__icon {
  border-color: rgba(255,255,255,0.25); color: #fff;
}

.faq-item__body {
  padding: 0 20px 18px;
}
.faq-item__body p {
  font-size: 0.875rem; color: rgba(255,255,255,0.7);
  line-height: 1.75; margin: 0;
}

/* CTA box (sidebar on desktop) */
.faq-cta-box {
  background: #fafaf8; border: 1.5px solid #ededeb;
  border-radius: 20px; padding: 28px; text-align: center;
}
.faq-cta-box__icon { font-size: 2rem; margin-bottom: 14px; }
.faq-cta-box__title {
  font-family: 'Sora', sans-serif; font-weight: 700; font-size: 1rem;
  color: #0d1a2d; margin-bottom: 8px;
}
.faq-cta-box__desc { font-size: 0.875rem; color: #888; line-height: 1.6; margin-bottom: 4px; }


/* ═══════════════════════════════════════════════════════════════
   TABLET 640px+
   ═══════════════════════════════════════════════════════════════ */
@media (min-width: 640px) {
  .faq-body { padding: 56px 32px 100px; }
}

/* ═══════════════════════════════════════════════════════════════
   DESKTOP 1024px+
   ═══════════════════════════════════════════════════════════════ */
@media (min-width: 1024px) {
  /* Two-column layout for faq body */
  .faq-body {
    flex-direction: row; max-width: 1000px;
    padding: 64px 40px 100px; align-items: flex-start; gap: 48px;
  }
  .faq-list { flex: 1; }
  .faq-cta-box { width: 260px; flex-shrink: 0; position: sticky; top: 96px; }
}
</style>
