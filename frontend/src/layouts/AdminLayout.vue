<template>
  <div class="flex h-screen overflow-hidden bg-base">

    <!-- Overlay mobile -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 bg-black/30 md:hidden"
        @click="closeMobile"
      />
    </Transition>

    <!-- Sidebar: en mobile es un drawer, en desktop es fijo -->
    <div
      :class="[
        'shrink-0 h-full z-50 transition-transform duration-200',
        'fixed md:relative md:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <AppSidebar />
    </div>

    <!-- Contenido principal -->
    <main class="flex-1 overflow-y-auto min-w-0">
      <!-- Topbar mobile con botón hamburguesa -->
      <div class="flex items-center h-14 px-4 border-b border-border bg-surface md:hidden shrink-0">
        <button
          @click="toggle"
          class="p-2 rounded-lg text-ink-secondary hover:bg-subtle transition-colors"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-2 ml-3">
          <img :src="logoIcon" alt="AulaFlow" class="w-6 h-6 rounded-md" />
          <span class="font-display font-semibold text-ink text-[0.9rem]">AulaFlow</span>
        </div>
      </div>

      <div class="px-4 py-5 md:px-8 md:py-8 max-w-6xl mx-auto">
        <RouterView />
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useSidebar } from '@/composables/useSidebar'
import logoIcon from '@/assets/logo-icon.svg'

const { mobileOpen, toggle, closeMobile } = useSidebar()
</script>
