import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { usePageTransition } from '@/composables/usePageTransition'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => resolve({ el: to.hash, top: 72, behavior: 'smooth' }), 120)
      })
    }
    return { top: 0, behavior: 'instant' }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/views/landing/LandingView.vue'),
      meta: { public: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { public: true },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/landing/PricingView.vue'),
      meta: { public: true },
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/landing/FaqView.vue'),
      meta: { public: true },
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/legal/TermsView.vue'),
      meta: { public: true },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/legal/PrivacyView.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/DashboardView.vue'),
        },
        {
          path: 'leads',
          name: 'leads',
          component: () => import('@/views/leads/LeadsView.vue'),
        },
        {
          path: 'leads/:id',
          name: 'lead-detail',
          component: () => import('@/views/leads/LeadDetailView.vue'),
        },
        {
          path: 'conversations',
          name: 'conversations',
          component: () => import('@/views/conversations/ConversationsView.vue'),
        },
        {
          path: 'conversations/:id',
          name: 'conversation-detail',
          component: () => import('@/views/conversations/ConversationDetailView.vue'),
        },
        {
          path: 'knowledge',
          name: 'knowledge',
          component: () => import('@/views/knowledge/KnowledgeView.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/settings/SettingsView.vue'),
        },
        {
          path: 'widget-setup',
          name: 'widget-setup',
          component: () => import('@/views/settings/WidgetSetupView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
})

// ── Helpers ────────────────────────────────────────────────────
function isAdmin(route: RouteLocationNormalized): boolean {
  return route.matched.some(r => r.meta.requiresAuth)
}

/**
 * Criterio: cuándo lanzar la transición SVG.
 * NO se lanza si:
 *  - Es la misma ruta
 *  - Ambas rutas son del panel admin (navegación interna: leads, conversaciones, etc.)
 *  - Se hace logout (admin → login): se prefiere una salida limpia y rápida
 */
function shouldTransition(to: RouteLocationNormalized, from: RouteLocationNormalized): boolean {
  if (!from.name || to.name === from.name) return false
  if (isAdmin(from) && isAdmin(to))         return false  // dentro del admin
  if (isAdmin(from) && to.name === 'login') return false  // logout
  if (to.name === 'login')                  return false  // ir al login desde cualquier sitio
  if (from.name === 'login')                return false  // venir del login (tras hacer login)
  return true
}

// ── Guards ─────────────────────────────────────────────────────
let isFirstNavigation = true

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // Auth check
  if (!to.meta.public) {
    const hasToken = authStore.loadFromStorage()
    if (!hasToken) return '/login'

    if (!authStore.user) {
      await authStore.fetchCurrentUser()
      if (!authStore.isAuthenticated) return '/login'
    }
  }

  // Transición de salida (solo en navegaciones sucesivas)
  if (!isFirstNavigation && shouldTransition(to, from)) {
    const { leave } = usePageTransition()
    await leave()
  }

  return true
})

router.afterEach((to, from) => {
  const wasFirst = isFirstNavigation
  isFirstNavigation = false

  if (wasFirst) {
    // Animación de entrada en la primera carga (revela la página)
    const { initialEntry } = usePageTransition()
    // Timeout corto para garantizar que PageTransition.vue está montado y registrado
    setTimeout(() => initialEntry(), 150)
    return
  }

  if (shouldTransition(to, from)) {
    const { enter } = usePageTransition()
    setTimeout(() => enter(), 50)
  }
})

export default router
