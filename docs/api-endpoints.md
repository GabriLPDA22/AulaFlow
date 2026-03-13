# AulaFlow — Endpoints del API (MVP)

Base URL: `/api`

Autenticación: `Authorization: Bearer {accessToken}` en todos los endpoints protegidos.

---

## Auth

| Método | Ruta                  | Auth | Descripción                        |
|--------|-----------------------|------|------------------------------------|
| POST   | `/auth/login`         | No   | Login con email + password         |
| POST   | `/auth/refresh`       | No   | Renovar access token               |
| POST   | `/auth/logout`        | Sí   | Revocar refresh token              |
| GET    | `/auth/me`            | Sí   | Obtener usuario autenticado        |

### POST /auth/login
```json
Request:  { "email": "...", "password": "..." }
Response: { "accessToken": "...", "refreshToken": "...", "expiresAt": "...", "user": { ... } }
```

### POST /auth/refresh
```json
Request:  { "refreshToken": "..." }
Response: { "accessToken": "...", "refreshToken": "...", "expiresAt": "..." }
```

---

## Business

| Método | Ruta              | Auth | Descripción                      |
|--------|-------------------|------|----------------------------------|
| GET    | `/businesses/me`  | Sí   | Obtener datos del negocio actual |
| PATCH  | `/businesses/me`  | Sí   | Actualizar nombre, logo, etc.    |

---

## Leads

| Método | Ruta                       | Auth | Descripción                          |
|--------|----------------------------|------|--------------------------------------|
| GET    | `/leads`                   | Sí   | Listar leads (filtros: status, search)|
| GET    | `/leads/{id}`              | Sí   | Obtener lead por ID                  |
| PATCH  | `/leads/{id}`              | Sí   | Actualizar nombre, email, notas      |
| PATCH  | `/leads/{id}/status`       | Sí   | Cambiar estado del lead              |
| DELETE | `/leads/{id}`              | Sí   | Eliminar lead                        |

### GET /leads — Query params
```
?status=new|contacted|qualified|discarded
?search=texto
?page=1&pageSize=20
```

### GET /leads — Response
```json
{
  "items": [
    {
      "id": "...",
      "name": "María García",
      "email": "maria@email.com",
      "phone": null,
      "status": "new",
      "notes": "Preguntó por el curso de inglés B2",
      "capturedAt": "2026-03-10T14:30:00Z"
    }
  ],
  "total": 45,
  "page": 1,
  "pageSize": 20
}
```

---

## Conversations

| Método | Ruta                                  | Auth | Descripción                        |
|--------|---------------------------------------|------|------------------------------------|
| GET    | `/conversations`                      | Sí   | Listar conversaciones              |
| GET    | `/conversations/{id}`                 | Sí   | Obtener conversación               |
| GET    | `/conversations/{id}/messages`        | Sí   | Obtener mensajes de conversación   |
| POST   | `/conversations/{id}/summarize`       | Sí   | Generar resumen con IA             |
| PATCH  | `/conversations/{id}/close`           | Sí   | Cerrar conversación                |

### GET /conversations — Query params
```
?status=active|closed
?leadCaptured=true|false
?page=1&pageSize=20
```

---

## Knowledge Sources

| Método | Ruta                       | Auth | Descripción                        |
|--------|----------------------------|------|------------------------------------|
| GET    | `/knowledge-sources`       | Sí   | Listar fuentes de conocimiento     |
| POST   | `/knowledge-sources`       | Sí   | Crear nueva fuente                 |
| GET    | `/knowledge-sources/{id}`  | Sí   | Obtener fuente por ID              |
| PUT    | `/knowledge-sources/{id}`  | Sí   | Actualizar fuente                  |
| DELETE | `/knowledge-sources/{id}`  | Sí   | Eliminar fuente                    |
| PATCH  | `/knowledge-sources/{id}/toggle` | Sí | Activar / desactivar fuente   |

### POST /knowledge-sources — Request
```json
{
  "title": "Precios y cursos disponibles",
  "type": "text",
  "content": "Ofrecemos los siguientes cursos: ..."
}
```

---

## Assistant Settings

| Método | Ruta                    | Auth | Descripción                            |
|--------|-------------------------|------|----------------------------------------|
| GET    | `/assistant-settings`   | Sí   | Obtener configuración del asistente    |
| PUT    | `/assistant-settings`   | Sí   | Guardar configuración completa         |

### PUT /assistant-settings — Request
```json
{
  "assistantName": "Aria",
  "welcomeMessage": "Hola, ¿en qué puedo ayudarte?",
  "personality": "Amable, profesional, concisa",
  "leadCaptureEnabled": true,
  "leadCapturePrompt": "Para ayudarte mejor, ¿me dices tu nombre y email?",
  "primaryColor": "#1D3557",
  "avatarUrl": null
}
```

---

## Widget (endpoints públicos)

Autenticación por `X-Business-Token: {businessToken}` en header.

| Método | Ruta                                       | Auth         | Descripción                         |
|--------|--------------------------------------------|--------------|-------------------------------------|
| POST   | `/widget/conversations`                    | BusinessToken| Iniciar nueva conversación           |
| POST   | `/widget/conversations/{id}/messages`      | BusinessToken| Enviar mensaje y obtener respuesta  |
| GET    | `/widget/conversations/{id}/messages`      | BusinessToken| Obtener historial de mensajes       |
| POST   | `/widget/conversations/{id}/lead`          | BusinessToken| Capturar lead desde conversación    |

### POST /widget/conversations — Request
```json
{ "visitorId": "visitor_abc123" }
```

### POST /widget/conversations/{id}/messages — Request
```json
{ "content": "Hola, quiero información sobre el curso de inglés" }
```

### Response del mensaje
```json
{
  "userMessage": {
    "id": "...",
    "role": "user",
    "content": "Hola, quiero información...",
    "createdAt": "..."
  },
  "assistantMessage": {
    "id": "...",
    "role": "assistant",
    "content": "¡Hola! Tenemos varios niveles de inglés disponibles...",
    "createdAt": "..."
  }
}
```

---

## Convenciones generales

- Códigos HTTP: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict
- Errores devuelven siempre:
```json
{
  "type": "validation_error",
  "message": "El email es requerido",
  "errors": { "email": ["El email es requerido"] }
}
```
- Paginación: `items`, `total`, `page`, `pageSize`
- Timestamps: ISO 8601 UTC
- IDs: Guid como string
