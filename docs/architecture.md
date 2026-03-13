# AulaFlow — Arquitectura General

## Visión del sistema

AulaFlow es un SaaS B2B multitenant donde cada negocio (Business) tiene su propio
panel de administración y un widget de chat embebible que pueden instalar en su web.

```
                   ┌─────────────────────────────────────┐
                   │           Web externa               │
                   │   <script src="widget.js" />        │
                   └──────────────┬──────────────────────┘
                                  │ Public API
                   ┌──────────────▼──────────────────────┐
                   │         AulaFlow API                 │
                   │      (ASP.NET Core 9)                │
                   │                                     │
                   │  Auth · Leads · Conversations       │
                   │  Knowledge · Settings · Widget      │
                   └──────┬──────────────────┬───────────┘
                          │                  │
               ┌──────────▼───┐    ┌─────────▼─────────┐
               │  PostgreSQL  │    │   OpenAI API       │
               │  (principal) │    │  (integración IA)  │
               └──────────────┘    └───────────────────┘
                          ▲
               ┌──────────┴───────────────────────────┐
               │        Panel Admin (Vue 3)            │
               │  Dashboard · Leads · Conversations   │
               │  Knowledge · Settings · Widget Setup │
               └──────────────────────────────────────┘
```

## Proyectos del backend

```
backend/
├── AulaFlow.sln
└── src/
    ├── AulaFlow.Api/              → Entry point. Controllers, Middleware, Program.cs
    ├── AulaFlow.Application/      → Servicios, DTOs, Interfaces, Lógica de negocio
    ├── AulaFlow.Domain/           → Entidades, Enums, BaseEntity (sin dependencias)
    └── AulaFlow.Infrastructure/   → DbContext, EF Configs, Implementaciones externas
```

### Dependencias entre proyectos

```
Api → Application → Domain
Infrastructure → Application, Domain
```

## Estructura frontend

```
frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── fonts/
│   ├── components/
│   │   ├── ui/            → AppButton, AppInput, AppBadge, AppCard, AppModal, AppTable
│   │   ├── layout/        → AppShell, AppSidebar, AppHeader, AppTopbar
│   │   └── shared/        → EmptyState, Skeleton, ConfirmModal, StatusBadge
│   ├── views/
│   │   ├── auth/          → LoginView
│   │   ├── dashboard/     → DashboardView
│   │   ├── leads/         → LeadsView, LeadDetailView
│   │   ├── conversations/ → ConversationsView, ConversationDetailView
│   │   ├── knowledge/     → KnowledgeView
│   │   └── settings/      → SettingsView, WidgetSetupView
│   ├── layouts/           → AdminLayout, PublicLayout
│   ├── composables/       → useAuth, useLeads, useConversations, useKnowledge
│   ├── stores/            → authStore, uiStore
│   ├── services/          → api.ts (base), authService, leadsService...
│   ├── types/             → index.ts con todas las interfaces
│   └── router/            → index.ts con guards de auth
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## Widget embebible

El widget es un JS bundle independiente que se distribuye como:
```html
<script src="https://cdn.aulaflow.io/widget.js" data-token="BUSINESS_TOKEN"></script>
```

Monta un Shadow DOM para aislar estilos. Comunica con la API pública `/api/widget/*`.
Se construye como un proyecto Vite separado (`widget/`).

## Multiempresa

- Cada `User` pertenece a un `Business`.
- JWT incluye `businessId` en los claims.
- Todos los servicios filtran automáticamente por `businessId`.
- No se usa row-level security en esta fase.

## Seguridad

- JWT con acceso de 15 minutos.
- Refresh tokens con 7 días, rotación en cada refresh.
- Endpoints del widget autenticados por `businessToken` (GUID único por negocio).
- CORS configurado por entorno.

## IA (preparado para MVP)

- Integración con OpenAI Responses API.
- Puntos de entrada: responder mensajes del widget, clasificar leads, resumir conversaciones.
- Los prompts usan el contenido de `KnowledgeSource` del negocio.
- En MVP: llamadas directas a OpenAI. Sin streaming en primera versión.
