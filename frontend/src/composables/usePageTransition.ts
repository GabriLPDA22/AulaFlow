import { ref } from 'vue'
import gsap from 'gsap'

const overlayRef = ref<HTMLElement | null>(null)
const pathRef    = ref<SVGPathElement | null>(null)
let pathLength   = 0

export const showTransitionLogo = ref(false)

export function usePageTransition() {
  function register(overlay: HTMLElement, path: SVGPathElement) {
    overlayRef.value = overlay
    pathRef.value    = path
    pathLength = path.getTotalLength()

    gsap.set(path,    { strokeDasharray: pathLength, strokeDashoffset: pathLength, strokeWidth: 2 })
    gsap.set(overlay, { opacity: 0 })
  }

  // ── LEAVE — tapa la pantalla con la ola ───────────────────────
  function leave(): Promise<void> {
    return new Promise(resolve => {
      const overlay = overlayRef.value
      const path    = pathRef.value
      if (!overlay || !path) { resolve(); return }

      showTransitionLogo.value = false
      gsap.set(overlay, { pointerEvents: 'all' })

      const tl = gsap.timeline({
        onComplete: () => {
          showTransitionLogo.value = true
          resolve()
        },
      })

      tl.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
      tl.to(path,    { strokeDashoffset: 0, strokeWidth: 300, duration: 1.5, ease: 'power2.inOut' }, 0)
    })
  }

  // ── ENTER — destapa la pantalla con la ola ────────────────────
  function enter(): Promise<void> {
    return new Promise(resolve => {
      const overlay = overlayRef.value
      const path    = pathRef.value
      if (!overlay || !path) { resolve(); return }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { pointerEvents: 'none' })
          gsap.set(path,    { strokeDashoffset: pathLength, strokeWidth: 2 })
          resolve()
        },
      })

      tl.to(path,    { strokeDashoffset: -pathLength, strokeWidth: 2, duration: 1.5, ease: 'power2.inOut' })
      tl.to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 1)
      tl.call(() => { showTransitionLogo.value = false }, [], 0.85)
    })
  }

  // ── INITIAL ENTRY — revelación al cargar la web por primera vez ──
  // Usa un fondo sólido temporal (solo aquí) para cubrir la pantalla fiablemente.
  // Las navegaciones entre páginas siguen usando la ola sin fondo.
  function initialEntry(): Promise<void> {
    return new Promise(resolve => {
      const overlay = overlayRef.value
      if (!overlay) { resolve(); return }

      // Cubrir instantáneamente con fondo navy (solo para esta animación)
      gsap.set(overlay, { opacity: 1, pointerEvents: 'all', backgroundColor: '#1D3557' })
      showTransitionLogo.value = true

      // Logo visible durante ~700ms, luego fade out del overlay
      setTimeout(() => {
        showTransitionLogo.value = false

        gsap.timeline({
          onComplete: () => {
            // Limpiar el fondo inline para no afectar a futuras transiciones
            gsap.set(overlay, { pointerEvents: 'none', backgroundColor: '' })
            resolve()
          },
        }).to(overlay, { opacity: 0, duration: 0.6, ease: 'power2.inOut', delay: 0.15 })
      }, 700)
    })
  }

  return { register, leave, enter, initialEntry }
}
