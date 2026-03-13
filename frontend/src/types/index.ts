// ─── Auth ────────────────────────────────────────────────────────────────────

export type UserRole = 'Admin' | 'Member'

export interface User {
  id: string
  businessId: string
  name: string
  email: string
  role: UserRole
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  expiresAt: string
  user: User
}

// ─── Business ────────────────────────────────────────────────────────────────

export interface Business {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  createdAt: string
}

// ─── Leads ───────────────────────────────────────────────────────────────────

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Discarded'

export interface Lead {
  id: string
  businessId: string
  conversationId: string | null
  name: string
  email: string
  phone: string | null
  notes: string | null
  status: LeadStatus
  capturedAt: string
  updatedAt: string
}

export interface LeadQuery {
  status?: LeadStatus
  search?: string
  page?: number
  pageSize?: number
}

// ─── Conversations ───────────────────────────────────────────────────────────

export type ConversationStatus = 'Active' | 'Closed'
export type MessageRole = 'User' | 'Assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  createdAt: string
}

export interface Conversation {
  id: string
  businessId: string
  visitorId: string
  status: ConversationStatus
  leadCaptured: boolean
  summary: string | null
  startedAt: string
  closedAt: string | null
  messageCount: number
}

export interface ConversationDetail extends Omit<Conversation, 'messageCount'> {
  messages: Message[]
}

export interface ConversationQuery {
  status?: ConversationStatus
  leadCaptured?: boolean
  page?: number
  pageSize?: number
}

// ─── Knowledge ───────────────────────────────────────────────────────────────

export type KnowledgeType = 'Text' | 'Faq' | 'Url'

export interface KnowledgeSource {
  id: string
  businessId: string
  type: KnowledgeType
  title: string
  content: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ─── Assistant Settings ───────────────────────────────────────────────────────

export interface AssistantSettings {
  id: string
  businessId: string
  assistantName: string
  welcomeMessage: string
  personality: string
  leadCaptureEnabled: boolean
  leadCapturePrompt: string
  primaryColor: string
  avatarUrl: string | null
}

// ─── Common ──────────────────────────────────────────────────────────────────

export interface PagedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  type: string
  message: string
  errors?: Record<string, string[]>
}
