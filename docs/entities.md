# AulaFlow — Entidades del Dominio (MVP)

## Business

Representa a un negocio cliente del SaaS.

```
Business
├── Id: Guid
├── Name: string
├── Slug: string (único, para URLs)
├── LogoUrl: string?
├── BusinessToken: Guid (token público para el widget)
├── CreatedAt: DateTime
└── UpdatedAt: DateTime
```

## User

Usuarios del panel admin. Pertenecen a un Business.

```
User
├── Id: Guid
├── BusinessId: Guid → Business
├── Name: string
├── Email: string (único)
├── PasswordHash: string
├── Role: UserRole (Admin | Member)
├── IsActive: bool
├── CreatedAt: DateTime
└── RefreshTokens: ICollection<RefreshToken>
```

## RefreshToken

```
RefreshToken
├── Id: Guid
├── UserId: Guid → User
├── Token: string (único)
├── ExpiresAt: DateTime
├── IsRevoked: bool
└── CreatedAt: DateTime
```

## KnowledgeSource

Fuentes de conocimiento del negocio que usa el asistente.

```
KnowledgeSource
├── Id: Guid
├── BusinessId: Guid → Business
├── Type: KnowledgeType (Text | Faq | Url)
├── Title: string
├── Content: string (texto libre o URL)
├── IsActive: bool
├── CreatedAt: DateTime
└── UpdatedAt: DateTime
```

**Nota MVP**: No se procesa vectorialmente. El contenido se inyecta en el prompt del asistente.
En fases posteriores se puede añadir embeddings/chunking.

## Conversation

Sesión de chat entre un visitante y el asistente de un negocio.

```
Conversation
├── Id: Guid
├── BusinessId: Guid → Business
├── VisitorId: string (generado en cliente, persistido en localStorage)
├── Status: ConversationStatus (Active | Closed)
├── LeadCaptured: bool
├── Summary: string? (generado por IA)
├── StartedAt: DateTime
├── ClosedAt: DateTime?
└── Messages: ICollection<Message>
```

## Message

Mensaje individual dentro de una conversación.

```
Message
├── Id: Guid
├── ConversationId: Guid → Conversation
├── Role: MessageRole (User | Assistant)
├── Content: string
└── CreatedAt: DateTime
```

## Lead

Contacto capturado desde una conversación.

```
Lead
├── Id: Guid
├── BusinessId: Guid → Business
├── ConversationId: Guid? → Conversation (opcional)
├── Name: string
├── Email: string
├── Phone: string?
├── Notes: string? (contexto de la conversación)
├── Status: LeadStatus (New | Contacted | Qualified | Discarded)
├── CapturedAt: DateTime
└── UpdatedAt: DateTime
```

## AssistantSettings

Configuración del asistente por negocio (1:1 con Business).

```
AssistantSettings
├── Id: Guid
├── BusinessId: Guid → Business (único)
├── AssistantName: string
├── WelcomeMessage: string
├── Personality: string (descripción libre para el prompt)
├── LeadCaptureEnabled: bool
├── LeadCapturePrompt: string (texto para pedir datos al usuario)
├── PrimaryColor: string (hex, para el widget)
├── AvatarUrl: string?
└── UpdatedAt: DateTime
```

---

## Enums

```csharp
enum UserRole        { Admin, Member }
enum KnowledgeType   { Text, Faq, Url }
enum ConversationStatus { Active, Closed }
enum MessageRole     { User, Assistant }
enum LeadStatus      { New, Contacted, Qualified, Discarded }
```

---

## Diagrama de relaciones

```
Business ──┬── Users (1:N)
           ├── KnowledgeSources (1:N)
           ├── Conversations (1:N)
           ├── Leads (1:N)
           └── AssistantSettings (1:1)

User ────── RefreshTokens (1:N)
Conversation ─── Messages (1:N)
Conversation ─── Lead (1:0..1)
```
