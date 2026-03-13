import api from './api'
import type { AssistantSettings, Business } from '@/types'

export const settingsService = {
  async getBusiness(): Promise<Business> {
    const { data } = await api.get<Business>('/businesses/me')
    return data
  },

  async updateBusiness(payload: { name: string; logoUrl?: string }): Promise<Business> {
    const { data } = await api.patch<Business>('/businesses/me', payload)
    return data
  },

  async getAssistantSettings(): Promise<AssistantSettings> {
    const { data } = await api.get<AssistantSettings>('/assistant-settings')
    return data
  },

  async updateAssistantSettings(payload: Omit<AssistantSettings, 'id' | 'businessId'>): Promise<AssistantSettings> {
    const { data } = await api.put<AssistantSettings>('/assistant-settings', payload)
    return data
  },
}
