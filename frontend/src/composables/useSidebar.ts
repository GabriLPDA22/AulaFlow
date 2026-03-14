import { ref, onMounted, onUnmounted } from 'vue'

const collapsed = ref(localStorage.getItem('sidebar-collapsed') === 'true')
const mobileOpen = ref(false)

function isMobile() {
  return window.innerWidth < 768
}

export function useSidebar() {
  function toggle() {
    if (isMobile()) {
      mobileOpen.value = !mobileOpen.value
    } else {
      collapsed.value = !collapsed.value
      localStorage.setItem('sidebar-collapsed', String(collapsed.value))
    }
  }

  function closeMobile() {
    mobileOpen.value = false
  }

  function handleResize() {
    if (!isMobile()) mobileOpen.value = false
  }

  onMounted(() => window.addEventListener('resize', handleResize))
  onUnmounted(() => window.removeEventListener('resize', handleResize))

  return { collapsed, mobileOpen, toggle, closeMobile }
}
