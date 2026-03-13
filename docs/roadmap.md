# AulaFlow — Roadmap Técnico por Fases

## Fase 1 — Arquitectura y Diseño ✅

**Objetivo**: Tener toda la base definida antes de escribir código.

- [x] Comprensión del producto y propuesta de valor
- [x] Dirección visual y sistema de diseño
- [x] Estructura de carpetas backend y frontend
- [x] Entidades del dominio MVP
- [x] Endpoints iniciales del API
- [x] Reglas del proyecto (.cursor/rules/)
- [x] Roadmap técnico por fases

---

## Fase 2 — Backend Base

**Objetivo**: API funcional con autenticación y todos los módulos operativos.

**Duración estimada**: 3–5 días de desarrollo

### 2.1 Setup inicial
- [ ] Crear solución `AulaFlow.sln` con 4 proyectos
- [ ] Configurar EF Core + Npgsql + PostgreSQL
- [ ] Crear `AppDbContext` con configuraciones de entidades
- [ ] Crear y aplicar migración inicial
- [ ] Configurar `appsettings.json` con secciones limpias

### 2.2 Dominio y persistencia
- [ ] Crear todas las entidades del dominio
- [ ] Crear enums
- [ ] Crear configuraciones EF Fluent API por entidad
- [ ] `BaseEntity` con Id y timestamps

### 2.3 Autenticación
- [ ] `AuthService`: login, hash de contraseña, generación de tokens
- [ ] JWT con claims: userId, businessId, email, role
- [ ] Refresh tokens: generación, rotación, revocación
- [ ] `AuthController`: login, refresh, logout, me

### 2.4 Infraestructura base
- [ ] Middleware global de manejo de errores
- [ ] `ApiResponse<T>` wrapper consistente
- [ ] Logging con `ILogger<T>` en servicios clave
- [ ] CORS configurado
- [ ] Swagger/OpenAPI configurado

### 2.5 Módulos del API
- [ ] BusinessesController + BusinessService
- [ ] LeadsController + LeadService (CRUD + cambio de estado)
- [ ] ConversationsController + ConversationService
- [ ] KnowledgeSourcesController + KnowledgeService
- [ ] AssistantSettingsController + AssistantSettingsService

### 2.6 Endpoints del widget
- [ ] WidgetController (público, por BusinessToken)
- [ ] Iniciar conversación
- [ ] Enviar/recibir mensajes (mock IA por ahora)
- [ ] Capturar lead

---

## Fase 3 — Frontend Admin

**Objetivo**: Panel administrativo completo y usable.

**Duración estimada**: 5–8 días de desarrollo

### 3.1 Setup frontend
- [ ] Crear proyecto Vite + Vue 3 + Tailwind
- [ ] Configurar tipografías (Sora + Plus Jakarta Sans)
- [ ] Configurar paleta en tailwind.config
- [ ] Configurar Vue Router con guards de auth
- [ ] Configurar Pinia
- [ ] Crear capa de servicios API (axios + interceptors)

### 3.2 Componentes UI base
- [ ] AppButton (variantes: primary, secondary, ghost, danger)
- [ ] AppInput, AppTextarea, AppSelect
- [ ] AppBadge (estados del lead)
- [ ] AppCard
- [ ] AppModal
- [ ] AppTable
- [ ] EmptyState, Skeleton
- [ ] AppSidebar, AppHeader

### 3.3 Vistas del panel
- [ ] LoginView
- [ ] DashboardView (layout asimétrico, actividad reciente)
- [ ] LeadsView (tabla + filtros + cambio de estado)
- [ ] LeadDetailView (detalle + historial conversación)
- [ ] ConversationsView (lista + preview)
- [ ] ConversationDetailView (mensajes + lead capturado)
- [ ] KnowledgeView (lista + crear/editar fuente)
- [ ] SettingsView (datos del negocio + configuración asistente)
- [ ] WidgetSetupView (código de instalación + preview)

---

## Fase 4 — Widget Embebible

**Objetivo**: Widget funcional listo para instalar en cualquier web.

**Duración estimada**: 3–4 días de desarrollo

- [ ] Crear proyecto Vite separado para el widget (`widget/`)
- [ ] Arquitectura Shadow DOM para aislamiento de estilos
- [ ] Componente de chat: burbuja, panel expandible, mensajes
- [ ] Comunicación con API pública (`/api/widget/*`)
- [ ] Gestión de `visitorId` en localStorage
- [ ] Formulario de captura de lead integrado
- [ ] Personalización por colores y nombre del asistente (desde settings)
- [ ] Build como IIFE bundle distribuible
- [ ] Script de instalación con `data-token`

---

## Fase 5 — Integración IA

**Objetivo**: Asistente funcional con respuestas basadas en el conocimiento del negocio.

**Duración estimada**: 2–3 días de desarrollo

- [ ] Configurar cliente OpenAI en Infrastructure
- [ ] Servicio `AiService` con método `GetAssistantResponse`
- [ ] Construcción de prompt con: personalidad + knowledge sources activas + historial
- [ ] Integrar en flujo del widget (`POST /widget/conversations/{id}/messages`)
- [ ] Servicio de resumen de conversaciones (`POST /conversations/{id}/summarize`)
- [ ] Clasificación básica de leads (¿mostró intención de compra?)
- [ ] Preparar estructura para function calling en fases posteriores
- [ ] Gestión segura de API Key (no en código, desde config)

---

## Post-MVP (sin fecha)

Funcionalidades para después del MVP validado:

- Panel de analítica básica (leads por período, conversaciones, tasa de captación)
- Multiusuario por business (invitar equipo)
- Notificaciones por email al capturar lead
- WhatsApp o canal adicional
- Embeddings + búsqueda semántica para knowledge base
- Function calling para acciones (buscar plaza, ver disponibilidad)
- Facturación y planes (integración Stripe)
- Onboarding guiado para nuevos negocios
