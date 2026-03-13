import api from './api'
import type { Conversation, ConversationDetail, ConversationQuery, Message, PagedResult } from '@/types'

export const conversationsService = {
  async getAll(query: ConversationQuery = {}): Promise<PagedResult<Conversation>> {
    const { data } = await api.get<PagedResult<Conversation>>('/conversations', { params: query })
    return data
  },

  async getById(id: string): Promise<ConversationDetail> {
    const { data } = await api.get<ConversationDetail>(`/conversations/${id}`)
    return data
  },

  async getMessages(id: string): Promise<Message[]> {
    const { data } = await api.get<Message[]>(`/conversations/${id}/messages`)
    return data
  },

  async summarize(id: string): Promise<{ summary: string }> {
    const { data } = await api.post<{ summary: string }>(`/conversations/${id}/summarize`)
    return data
  },

  async close(id: string): Promise<void> {
    await api.patch(`/conversations/${id}/close`)
  },
}
