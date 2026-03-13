<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import logoIcon from '@/assets/logo-icon.svg'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navItems = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />`,
  },
  {
    name: 'Leads',
    to: '/leads',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />`,
  },
  {
    name: 'Conversaciones',
    to: '/conversations',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />`,
  },
  {
    name: 'Conocimiento',
    to: '/knowledge',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />`,
  },
  {
    name: 'Ajustes',
    to: '/settings',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />`,
  },
]

function isActive(to: string) {
  if (to === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(to)
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="w-60 shrink-0 flex flex-col h-full bg-surface border-r border-border">
    <!-- Logo -->
    <div class="px-6 py-5 border-b border-border">
      <div class="flex items-center gap-2.5">
        <img :src="logoIcon" alt="AulaFlow" class="w-7 h-7 rounded-lg" />
        <span class="font-display font-semibold text-ink text-[1rem] tracking-tight">AulaFlow</span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-body transition-colors group relative',
          isActive(item.to)
            ? 'bg-brand-light text-brand font-medium'
            : 'text-ink-secondary hover:bg-subtle hover:text-ink',
        ]"
      >
        <span
          v-if="isActive(item.to)"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-brand rounded-r-full"
        />
        <svg
          class="w-5 h-5 shrink-0"
          :class="isActive(item.to) ? 'text-brand' : 'text-ink-disabled group-hover:text-ink-secondary'"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          v-html="item.icon"
        />
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>

    <!-- Widget setup link -->
    <div class="px-3 pb-2">
      <RouterLink
        to="/widget-setup"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-body transition-colors',
          route.path === '/widget-setup'
            ? 'bg-brand-light text-brand font-medium'
            : 'text-ink-secondary hover:bg-subtle hover:text-ink',
        ]"
      >
        <svg class="w-5 h-5 shrink-0 text-ink-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <span>Instalar widget</span>
      </RouterLink>
    </div>

    <!-- User info + logout -->
    <div class="px-4 py-4 border-t border-border">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0">
          <span class="text-label font-semibold text-brand uppercase">
            {{ authStore.user?.name?.charAt(0) ?? '?' }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-small font-medium text-ink truncate">{{ authStore.user?.name }}</p>
          <p class="text-label text-ink-disabled truncate">{{ authStore.user?.email }}</p>
        </div>
        <button
          @click="handleLogout"
          class="p-1.5 rounded-lg text-ink-disabled hover:text-ink hover:bg-subtle transition-colors shrink-0"
          title="Cerrar sesión"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>
