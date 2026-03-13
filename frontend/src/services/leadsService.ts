import api from './api'
import type { Lead, LeadQuery, LeadStatus, PagedResult } from '@/types'

export const leadsService = {
  async getAll(query: LeadQuery = {}): Promise<PagedResult<Lead>> {
    const { data } = await api.get<PagedResult<Lead>>('/leads', { params: query })
    return data
  },

  async getById(id: string): Promise<Lead> {
    const { data } = await api.get<Lead>(`/leads/${id}`)
    return data
  },

  async update(id: string, payload: Partial<Pick<Lead, 'name' | 'email' | 'phone' | 'notes'>>): Promise<Lead> {
    const { data } = await api.patch<Lead>(`/leads/${id}`, payload)
    return data
  },

  async updateStatus(id: string, status: LeadStatus): Promise<Lead> {
    const { data } = await api.patch<Lead>(`/leads/${id}/status`, { status })
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/leads/${id}`)
  },
}
