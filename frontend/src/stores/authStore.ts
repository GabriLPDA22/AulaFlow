import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  function loadFromStorage() {
    const token = localStorage.getItem('accessToken')
    if (!token) return false
    return true
  }

  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      const response = await authService.login(email, password)
      localStorage.setItem('accessToken', response.accessToken)
      localStorage.setItem('refreshToken', response.refreshToken)
      user.value = response.user
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCurrentUser() {
    try {
      user.value = await authService.me()
    } catch {
      logout()
    }
  }

  async function logout() {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      try { await authService.logout(refreshToken) } catch { /* silencioso */ }
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    user.value = null
  }

  return { user, isLoading, isAuthenticated, loadFromStorage, login, logout, fetchCurrentUser }
})
