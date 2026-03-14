<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import logoIcon from '@/assets/logo-icon.svg'
import { useAuthStore } from '@/stores/authStore'
import { useSidebar } from '@/composables/useSidebar'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { collapsed, toggle } = useSidebar()

const tooltip = ref<{ text: string; x: number; y: number; danger?: boolean } | null>(null)

const navItems = [
  { name: 'Dashboard',       to: '/dashboard',    icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />` },
  { name: 'Leads',           to: '/leads',         icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />` },
  { name: 'Conversaciones',  to: '/conversations', icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />` },
  { name: 'Conocimiento',    to: '/knowledge',     icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />` },
  { name: 'Ajustes',         to: '/settings',      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />` },
  { name: 'Instalar widget', to: '/widget-setup',  icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />` },
]

function isActive(to: string) {
  if (to === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(to)
}

async function handleLogout() {
  await authStore.logout()
  router.push('/login')
}

function showTooltip(e: MouseEvent, text: string, danger = false) {
  if (!collapsed.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  tooltip.value = {
    text,
    x: rect.right + 10,
    y: rect.top + rect.height / 2,
    danger,
  }
}

function hideTooltip() {
  tooltip.value = null
}
</script>

<template>
  <aside
    :class="[
      'shrink-0 flex flex-col h-full bg-surface border-r border-border transition-all duration-200 ease-in-out',
      collapsed ? 'w-[64px]' : 'w-[232px]',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center border-b border-border h-[57px] shrink-0 px-4 gap-2.5 overflow-hidden">
      <img :src="logoIcon" alt="AulaFlow" class="w-7 h-7 rounded-lg shrink-0" />
      <span
        v-if="!collapsed"
        class="font-display font-semibold text-ink text-[0.9375rem] tracking-tight whitespace-nowrap"
      >AulaFlow</span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-3 space-y-0.5 overflow-y-auto" :class="collapsed ? 'px-2' : 'px-2'">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex items-center rounded-lg text-body transition-colors relative overflow-hidden',
          collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5',
          isActive(item.to)
            ? 'bg-brand-light text-brand font-medium'
            : 'text-ink-secondary hover:bg-subtle hover:text-ink',
        ]"
        @mouseenter="showTooltip($event, item.name)"
        @mouseleave="hideTooltip"
      >
        <span
          v-if="isActive(item.to) && !collapsed"
          class="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-brand rounded-r-full"
        />
        <svg
          class="w-5 h-5 shrink-0"
          :class="isActive(item.to) ? 'text-brand' : 'text-ink-disabled'"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
          v-html="item.icon"
        />
        <span v-if="!collapsed" class="whitespace-nowrap truncate">{{ item.name }}</span>
      </RouterLink>
    </nav>

    <!-- Toggle (oculto en mobile, el cierre lo hace el overlay) -->
    <div class="px-2 pb-2 shrink-0 hidden md:block">
      <button
        @click="toggle(); hideTooltip()"
        :class="[
          'flex items-center rounded-lg text-ink-disabled hover:text-ink hover:bg-subtle transition-colors w-full',
          collapsed ? 'justify-center py-2.5' : 'gap-2 px-3 py-2',
        ]"
        @mouseenter="showTooltip($event, collapsed ? 'Expandir' : '')"
        @mouseleave="hideTooltip"
      >
        <svg
          class="w-4 h-4 shrink-0 transition-transform duration-200"
          :class="collapsed ? 'rotate-180' : ''"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
        <span v-if="!collapsed" class="text-small whitespace-nowrap">Colapsar</span>
      </button>
    </div>

    <!-- User -->
    <div class="border-t border-border shrink-0 px-2 py-3">
      <!-- Colapsado: avatar + logout apilados verticalmente -->
      <template v-if="collapsed">
        <div class="flex flex-col items-center gap-1.5">
          <div
            class="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0 cursor-default"
            @mouseenter="showTooltip($event, authStore.user?.name ?? '')"
            @mouseleave="hideTooltip"
          >
            <span class="text-label font-semibold text-brand uppercase">
              {{ authStore.user?.name?.charAt(0) ?? '?' }}
            </span>
          </div>
          <button
            @click="handleLogout"
            class="w-8 h-8 rounded-lg flex items-center justify-center text-ink-disabled hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
            @mouseenter="showTooltip($event, 'Cerrar sesión', true)"
            @mouseleave="hideTooltip"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </template>

      <!-- Expandido: fila completa -->
      <template v-else>
        <div class="flex items-center gap-3 px-1">
          <div class="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center shrink-0 cursor-default">
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
            class="p-1.5 rounded-lg text-ink-disabled hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </template>
    </div>
  </aside>

  <!-- Tooltip portal — renderizado fuera del aside, sin overflow clipping -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 translate-x-[-6px]"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-[-4px]"
    >
      <div
        v-if="tooltip && tooltip.text"
        class="fixed z-[9999] pointer-events-none"
        :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px', transform: 'translateY(-50%)' }"
      >
        <div
          :class="[
            'text-white text-small font-semibold px-3 py-1.5 rounded-lg shadow-modal whitespace-nowrap',
            tooltip.danger ? 'bg-red-500' : 'bg-[#111111]',
          ]"
        >
          {{ tooltip.text }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
