<template>
  <div class="min-h-screen font-ui" style="background:#FAFAF8;">

    <!-- Header -->
    <header class="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-sm">
      <div class="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/login" class="flex items-center gap-2.5 group">
          <img :src="logoIcon" alt="AulaFlow" class="w-8 h-8 rounded-lg" />
          <span class="font-display font-semibold text-ink text-[15px]">AulaFlow</span>
        </RouterLink>
        <RouterLink
          to="/login"
          class="flex items-center gap-1.5 text-small text-ink-secondary hover:text-ink transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Volver
        </RouterLink>
      </div>
    </header>

    <!-- Contenido -->
    <main class="max-w-3xl mx-auto px-6 py-14 pb-24">
      <div class="mb-10">
        <p class="text-small text-ink-disabled mb-2 uppercase tracking-wider font-medium">Legal</p>
        <h1 class="font-display text-ink font-semibold" style="font-size:2rem; line-height:1.2;">
          Términos y Condiciones
        </h1>
        <p class="text-ink-secondary text-body mt-3">Última actualización: 13 de marzo de 2026</p>
      </div>

      <div class="prose-legal">

        <Section title="1. Aceptación de los términos">
          Al acceder o utilizar AulaFlow (en adelante, "el Servicio"), usted acepta quedar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de los mismos, no podrá acceder al Servicio.
        </Section>

        <Section title="2. Descripción del servicio">
          AulaFlow es una plataforma SaaS (Software as a Service) diseñada para academias, centros de formación y pequeños negocios. Proporciona herramientas para automatizar consultas frecuentes, captar leads y centralizar el conocimiento del negocio mediante un widget de chat embebible y un panel de administración.
        </Section>

        <Section title="3. Cuentas y registro">
          Para utilizar el Servicio, es necesario crear una cuenta proporcionando información verídica, precisa y actualizada. Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente cualquier uso no autorizado de su cuenta.
        </Section>

        <Section title="4. Uso aceptable">
          Usted se compromete a no utilizar el Servicio para:
          <ul>
            <li>Infringir leyes aplicables o derechos de terceros.</li>
            <li>Transmitir contenido fraudulento, abusivo, difamatorio o spam.</li>
            <li>Intentar acceder sin autorización a sistemas informáticos.</li>
            <li>Interferir o interrumpir la integridad o el rendimiento del Servicio.</li>
            <li>Recopilar o rastrear información personal de otros usuarios.</li>
          </ul>
        </Section>

        <Section title="5. Propiedad intelectual">
          El Servicio y su contenido original, características y funcionalidades son propiedad exclusiva de AulaFlow y están protegidos por leyes de propiedad intelectual. Nuestras marcas comerciales no pueden utilizarse en relación con ningún producto o servicio sin el consentimiento previo por escrito de AulaFlow.
        </Section>

        <Section title="6. Datos y privacidad">
          El tratamiento de los datos personales se rige por nuestra <RouterLink to="/privacy" class="text-brand hover:underline underline-offset-2">Política de Privacidad</RouterLink>, que forma parte integrante de estos Términos. Al utilizar el Servicio, usted consiente el tratamiento de sus datos conforme a dicha política.
        </Section>

        <Section title="7. Facturación y pagos">
          Los planes de pago se facturan mensual o anualmente según el plan elegido. Los precios pueden variar y serán comunicados con al menos 30 días de antelación. No se realizan reembolsos por períodos parciales salvo en los casos previstos por la ley aplicable.
        </Section>

        <Section title="8. Cancelación del servicio">
          Puede cancelar su cuenta en cualquier momento desde el panel de configuración. Tras la cancelación, su acceso al Servicio cesará al finalizar el período de facturación en curso. Nos reservamos el derecho de suspender o terminar cuentas que incumplan estos Términos.
        </Section>

        <Section title="9. Limitación de responsabilidad">
          En la máxima medida permitida por la ley, AulaFlow no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de pérdidas de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, derivadas del uso o la imposibilidad de uso del Servicio.
        </Section>

        <Section title="10. Modificaciones">
          Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán efectivas a partir de su publicación. El uso continuado del Servicio tras la publicación constituye la aceptación de los nuevos Términos.
        </Section>

        <Section title="11. Legislación aplicable">
          Estos Términos se rigen e interpretan de acuerdo con la legislación española, sin perjuicio de los derechos que asistan a los usuarios consumidores conforme a la normativa de su país de residencia habitual.
        </Section>

        <Section title="12. Contacto">
          Para cualquier consulta sobre estos Términos, puede contactarnos en <a href="mailto:legal@aulaflow.io" class="text-brand hover:underline underline-offset-2">legal@aulaflow.io</a>.
        </Section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border">
      <div class="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <p class="text-small text-ink-disabled">© 2026 AulaFlow Inc.</p>
        <div class="flex items-center gap-4">
          <RouterLink to="/terms" class="text-small text-ink font-medium">Términos</RouterLink>
          <RouterLink to="/privacy" class="text-small text-ink-secondary hover:text-ink transition-colors">Privacidad</RouterLink>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoIcon from '@/assets/logo-icon.svg'
</script>

<script lang="ts">
import { defineComponent, h } from 'vue'

const Section = defineComponent({
  props: { title: String },
  setup(props, { slots }) {
    return () => h('div', { class: 'legal-section' }, [
      h('h2', { class: 'legal-h2' }, props.title),
      h('div', { class: 'legal-body' }, slots.default?.()),
    ])
  }
})

export { Section }
</script>

<style scoped>
.prose-legal {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

:deep(.legal-section) {
  border-left: 2px solid #E7E5E4;
  padding-left: 1.5rem;
}

:deep(.legal-h2) {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #111111;
  margin-bottom: 0.6rem;
}

:deep(.legal-body) {
  font-size: 0.9375rem;
  line-height: 1.75;
  color: #5C5C5C;
}

:deep(.legal-body ul) {
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

:deep(.legal-body ul li::before) {
  content: '—';
  color: #2A9D8F;
  margin-right: 0.5rem;
}
</style>
