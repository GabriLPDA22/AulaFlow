<template>
  <div class="flex h-screen overflow-hidden bg-base">
    <AppSidebar />
    <main class="flex-1 overflow-y-auto">
      <div class="max-w-6xl mx-auto px-8 py-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>
