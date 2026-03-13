import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
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

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (to.meta.public) return true

  const hasToken = authStore.loadFromStorage()
  if (!hasToken) return '/login'

  if (!authStore.user) {
    await authStore.fetchCurrentUser()
    if (!authStore.isAuthenticated) return '/login'
  }

  return true
})

export default router
