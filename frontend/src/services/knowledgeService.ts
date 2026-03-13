import api from './api'
import type { KnowledgeSource, KnowledgeType } from '@/types'

interface CreateKnowledgeSourceRequest {
  title: string
  type: KnowledgeType
  content: string
}

export const knowledgeService = {
  async getAll(): Promise<KnowledgeSource[]> {
    const { data } = await api.get<KnowledgeSource[]>('/knowledge-sources')
    return data
  },

  async getById(id: string): Promise<KnowledgeSource> {
    const { data } = await api.get<KnowledgeSource>(`/knowledge-sources/${id}`)
    return data
  },

  async create(payload: CreateKnowledgeSourceRequest): Promise<KnowledgeSource> {
    const { data } = await api.post<KnowledgeSource>('/knowledge-sources', payload)
    return data
  },

  async update(id: string, payload: CreateKnowledgeSourceRequest): Promise<KnowledgeSource> {
    const { data } = await api.put<KnowledgeSource>(`/knowledge-sources/${id}`, payload)
    return data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/knowledge-sources/${id}`)
  },

  async toggle(id: string): Promise<KnowledgeSource> {
    const { data } = await api.patch<KnowledgeSource>(`/knowledge-sources/${id}/toggle`)
    return data
  },
}
