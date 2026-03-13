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
          Política de Privacidad
        </h1>
        <p class="text-ink-secondary text-body mt-3">Última actualización: 13 de marzo de 2026</p>
      </div>

      <div class="prose-legal">

        <Section title="1. Responsable del tratamiento">
          AulaFlow Inc. (en adelante, "AulaFlow", "nosotros" o "nuestro") es el responsable del tratamiento de los datos personales recogidos a través del Servicio, de conformidad con el Reglamento General de Protección de Datos (RGPD) y demás normativa aplicable.
        </Section>

        <Section title="2. Datos que recogemos">
          Recopilamos los siguientes tipos de datos:
          <ul>
            <li><strong>Datos de cuenta:</strong> nombre, email y contraseña (cifrada) al registrarse.</li>
            <li><strong>Datos de uso:</strong> interacciones con el panel, configuraciones y preferencias.</li>
            <li><strong>Datos del widget:</strong> conversaciones y leads generados en las webs de nuestros clientes.</li>
            <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, sistema operativo y páginas visitadas.</li>
          </ul>
        </Section>

        <Section title="3. Finalidad del tratamiento">
          Utilizamos sus datos para:
          <ul>
            <li>Prestar y mantener el Servicio.</li>
            <li>Gestionar su cuenta y autenticación.</li>
            <li>Mejorar y personalizar la experiencia de usuario.</li>
            <li>Comunicarle actualizaciones importantes del Servicio.</li>
            <li>Cumplir con obligaciones legales aplicables.</li>
          </ul>
        </Section>

        <Section title="4. Base jurídica">
          El tratamiento de sus datos se basa en:
          <ul>
            <li>La ejecución del contrato de prestación de servicios aceptado al registrarse.</li>
            <li>El cumplimiento de obligaciones legales.</li>
            <li>Nuestro interés legítimo en mejorar el Servicio y prevenir fraudes.</li>
            <li>Su consentimiento expreso cuando así se requiera.</li>
          </ul>
        </Section>

        <Section title="5. Conservación de los datos">
          Conservamos sus datos personales durante el tiempo que sea necesario para los fines indicados y, en todo caso, durante los plazos legalmente exigibles. Una vez cancelada la cuenta, los datos se eliminarán en un plazo máximo de 90 días, salvo que la ley exija su conservación por más tiempo.
        </Section>

        <Section title="6. Compartir datos con terceros">
          No vendemos ni cedemos sus datos a terceros con fines comerciales. Podemos compartir datos con:
          <ul>
            <li><strong>Proveedores de infraestructura</strong> (alojamiento, bases de datos) bajo acuerdos de confidencialidad.</li>
            <li><strong>Proveedores de IA</strong> (OpenAI) para procesar conversaciones, con los datos minimizados al máximo.</li>
            <li><strong>Autoridades competentes</strong> cuando sea requerido por ley.</li>
          </ul>
        </Section>

        <Section title="7. Seguridad">
          Aplicamos medidas técnicas y organizativas adecuadas para proteger sus datos frente a accesos no autorizados, pérdida, destrucción o alteración. Entre otras, utilizamos encriptación TLS, contraseñas cifradas con bcrypt y tokens JWT de corta duración.
        </Section>

        <Section title="8. Sus derechos">
          Como titular de los datos, tiene derecho a:
          <ul>
            <li>Acceder a sus datos personales.</li>
            <li>Solicitar la rectificación de datos inexactos.</li>
            <li>Solicitar la supresión de sus datos ("derecho al olvido").</li>
            <li>Oponerse al tratamiento o solicitar su limitación.</li>
            <li>Solicitar la portabilidad de sus datos.</li>
          </ul>
          Para ejercer estos derechos, contacte con nosotros en <a href="mailto:privacy@aulaflow.io" class="text-brand hover:underline underline-offset-2">privacy@aulaflow.io</a>.
        </Section>

        <Section title="9. Cookies">
          Utilizamos únicamente cookies técnicas estrictamente necesarias para el funcionamiento del Servicio, como las sesiones de autenticación. No utilizamos cookies de seguimiento ni publicidad.
        </Section>

        <Section title="10. Cambios en esta política">
          Nos reservamos el derecho de actualizar esta Política de Privacidad. Notificaremos los cambios relevantes por email o mediante un aviso en el panel de administración con al menos 15 días de antelación.
        </Section>

        <Section title="11. Contacto">
          Para cualquier consulta sobre privacidad o protección de datos, puede contactarnos en <a href="mailto:privacy@aulaflow.io" class="text-brand hover:underline underline-offset-2">privacy@aulaflow.io</a>.
        </Section>

      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border">
      <div class="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <p class="text-small text-ink-disabled">© 2026 AulaFlow Inc.</p>
        <div class="flex items-center gap-4">
          <RouterLink to="/terms" class="text-small text-ink-secondary hover:text-ink transition-colors">Términos</RouterLink>
          <RouterLink to="/privacy" class="text-small text-ink font-medium">Privacidad</RouterLink>
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

:deep(.legal-body strong) {
  color: #111111;
  font-weight: 600;
}
</style>
