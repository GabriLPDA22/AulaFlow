<div align="center">

<br/>

# ⚡ AulaFlow

### Automatiza la atención de tu academia. Capta leads mientras duermes.

SaaS B2B para academias, centros de formación y pequeños negocios que reciben muchas preguntas repetitivas y no quieren perder contactos por no responder a tiempo.

<br/>

[![Estado](https://img.shields.io/badge/Estado-En%20desarrollo-1D3557?style=for-the-badge)](.)
[![Licencia](https://img.shields.io/badge/Licencia-Privada-111111?style=for-the-badge)](.)
[![MVP](https://img.shields.io/badge/Fase-MVP-2A9D8F?style=for-the-badge)](.)

</div>

---

## ✦ ¿Qué es AulaFlow?

AulaFlow no es un chatbot genérico. Es una herramienta que permite a academias y negocios:

- **Responder dudas automáticamente** usando su propio contenido
- **Captar leads** cuando un visitante muestra interés real en su web
- **Centralizar el conocimiento** del negocio en un solo lugar
- **Gestionar contactos** sin depender de hojas de cálculo o emails perdidos
- **Instalarlo en cualquier web** con una sola línea de código

<br/>

## 🛠 Tech Stack

<div align="center">

### Frontend
[![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-F7D336?style=for-the-badge&logo=vue.js&logoColor=black)](https://pinia.vuejs.org/)

### Backend
[![ASP.NET Core](https://img.shields.io/badge/ASP.NET_Core_9-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=csharp&logoColor=white)](https://learn.microsoft.com/en-us/dotnet/csharp/)
[![Entity Framework](https://img.shields.io/badge/EF_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://learn.microsoft.com/en-us/ef/core/)

### Infraestructura
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

</div>

<br/>

## 📦 Módulos del MVP

| Módulo | Descripción |
|--------|-------------|
| 🤖 **Widget embebible** | Chat instalable en cualquier web con `<script data-token="...">` |
| 🧠 **Asistente con contexto** | Responde usando el contenido que el negocio ha configurado |
| 🎯 **Captura de leads** | Recoge nombre, email y teléfono cuando el visitante muestra interés |
| 👥 **Panel de leads** | Gestión de contactos con estados, notas e historial |
| 💬 **Conversaciones** | Historial completo de chats con resumen automático por IA |
| 📚 **Base de conocimiento** | Textos, FAQs y URLs que alimentan al asistente |
| ⚙️ **Configuración del asistente** | Nombre, personalidad, color y mensaje de bienvenida |
| 🔐 **Autenticación segura** | JWT con refresh tokens y soporte multiusuario |

<br/>

## 🗂 Estructura del proyecto

```
AulaFlow/
├── 📁 backend/        → ASP.NET Core 9 Web API
│   └── src/
│       ├── AulaFlow.Api           → Controllers, Middleware, Program.cs
│       ├── AulaFlow.Application   → Servicios, DTOs, Interfaces
│       ├── AulaFlow.Domain        → Entidades, Enums
│       └── AulaFlow.Infrastructure → DbContext, EF Core, Implementaciones
│
├── 📁 frontend/       → Panel admin Vue 3 + Vite
│   └── src/
│       ├── components/  → UI base + Layout + Shared
│       ├── views/       → Dashboard, Leads, Conversaciones, Conocimiento, Ajustes
│       ├── stores/      → Pinia (auth)
│       ├── services/    → Capa de llamadas al API
│       └── types/       → Interfaces TypeScript del dominio
│
├── 📁 widget/         → Bundle JS embebible (Fase 4)
└── 📁 docs/           → Documentación técnica
```

<br/>

## 🗺 Roadmap

| Fase | Estado | Descripción |
|------|--------|-------------|
| **Fase 1** | ✅ Completada | Arquitectura, sistema de diseño, entidades y endpoints |
| **Fase 2** | ✅ Completada | Backend base: API REST completa + autenticación JWT |
| **Fase 3** | ✅ Completada | Panel admin: todas las vistas y flujos de usuario |
| **Fase 4** | 🔜 Pendiente | Widget embebible con Shadow DOM |
| **Fase 5** | 🔜 Pendiente | Integración con OpenAI Responses API |

<br/>

## 🚀 Ejecutar en local

### Backend
```bash
cd backend
dotnet restore
dotnet ef database update --project src/AulaFlow.Infrastructure --startup-project src/AulaFlow.Api
dotnet run --project src/AulaFlow.Api
# API disponible en http://localhost:5000
# Swagger en http://localhost:5000/swagger
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Panel disponible en http://localhost:5173
```

<br/>

## 📖 Documentación técnica

| Documento | Contenido |
|-----------|-----------|
| [📐 Arquitectura](docs/architecture.md) | Diagrama del sistema y decisiones técnicas |
| [🎨 Sistema de diseño](docs/design-system.md) | Paleta, tipografía y guía de componentes |
| [🗃 Entidades](docs/entities.md) | Modelos de datos y relaciones |
| [🔌 API Endpoints](docs/api-endpoints.md) | Referencia completa del API REST |
| [🗺 Roadmap](docs/roadmap.md) | Fases del proyecto con tareas detalladas |

<br/>

---

<div align="center">
<sub>Construido con intención. Sin atajos de diseño.</sub>
</div>
