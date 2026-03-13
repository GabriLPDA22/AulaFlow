# AulaFlow — Sistema de Diseño

## Dirección visual

**Concepto**: Minimalista premium con toque editorial. Sobrio, reconocible, profesional.
Piensa en una herramienta de trabajo seria que te genera confianza al abrirla, no en un dashboard SaaS genérico.

**Lo que no es**: admin template, bootstrap default, exceso de gradientes, composición de 4 cards iguales en fila.

**Lo que sí es**: ritmo visual cuidado, tipografía con intención, mucho aire, detalles de marca sutiles, componentes con firma propia.

---

## Paleta de colores

### Fondos y superficies

| Token            | Valor     | Uso                              |
|------------------|-----------|----------------------------------|
| `bg-base`        | `#F7F7F3` | Fondo principal de la app        |
| `bg-surface`     | `#FFFFFF` | Cards, paneles, modales          |
| `bg-subtle`      | `#F1F0ED` | Fondos de hover, secciones       |
| `border`         | `#E5E3E0` | Bordes de cards, inputs, dividers|

### Texto

| Token              | Valor     | Uso                          |
|--------------------|-----------|------------------------------|
| `text-primary`     | `#111111` | Headings, contenido principal |
| `text-secondary`   | `#5C5C5C` | Labels, meta, texto de apoyo |
| `text-disabled`    | `#9CA3AF` | Placeholders, estados off    |

### Brand

| Token              | Valor     | Uso                                        |
|--------------------|-----------|--------------------------------------------|
| `brand-primary`    | `#1D3557` | Botón principal, links activos, highlights |
| `brand-hover`      | `#16293F` | Hover del primario                         |
| `brand-light`      | `#EEF2F7` | Fondos suaves de elementos de marca        |
| `accent`           | `#2A9D8F` | Elemento de apoyo, muy esporádico          |

### Estados

| Token      | Valor     |
|------------|-----------|
| `success`  | `#16A34A` |
| `warning`  | `#D97706` |
| `error`    | `#DC2626` |

### Regla de proporción

- 80% neutros (grises, blancos, off-whites)
- 15% brand primary
- 5% accent + estados

---

## Tipografía

### Familias

| Familia           | Uso                          | Pesos    |
|-------------------|------------------------------|----------|
| **Sora**          | Headings, display, marca     | 400, 600 |
| **Plus Jakarta Sans** | UI, body, labels, forms | 400, 500, 600 |

Importar de Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Escala tipográfica

| Nivel     | Tamaño  | Peso | Familia        | Uso                  |
|-----------|---------|------|----------------|----------------------|
| display   | 2rem    | 600  | Sora           | Headings de landing  |
| h1        | 1.5rem  | 600  | Sora           | Título de página     |
| h2        | 1.25rem | 600  | Sora           | Secciones principales|
| h3        | 1.125rem| 500  | Plus Jakarta   | Subsecciones         |
| body      | 0.9375rem| 400 | Plus Jakarta   | Contenido general    |
| small     | 0.8125rem| 400 | Plus Jakarta   | Meta, timestamps     |
| label     | 0.75rem | 500  | Plus Jakarta   | Labels de formulario |
| overline  | 0.6875rem| 500 | Plus Jakarta   | Etiquetas, categorías|

---

## Espaciado

Base unit: **4px**. Escala: `4 8 12 16 20 24 32 40 48 64 80 96`.

| Uso                     | Valor  |
|-------------------------|--------|
| Padding interno de card | 24px   |
| Gap entre secciones     | 32–48px|
| Padding lateral de página| 32px  |
| Gap entre elementos form | 16px  |
| Padding botón (y/x)     | 10/16px|

---

## Bordes y radios

| Elemento            | Valor       |
|---------------------|-------------|
| Inputs, buttons     | `8px`       |
| Cards, panels       | `12px`      |
| Modales, drawers    | `16px`      |
| Badges, pills, tags | `9999px`    |
| Avatares            | `9999px`    |

---

## Sombras (mínimas)

```css
/* Elevación baja: inputs hover, cards en reposo con bg blanco */
box-shadow: 0 1px 3px rgba(0,0,0,0.05);

/* Elevación media: cards flotantes, dropdowns */
box-shadow: 0 2px 8px rgba(0,0,0,0.07);

/* Elevación alta: modales */
box-shadow: 0 8px 32px rgba(0,0,0,0.10);
```

---

## Componentes base

### Botón primario
```
bg: #1D3557 | text: white | rounded-lg | px-4 py-2.5
font: Plus Jakarta 500 | 0.875rem
hover: #16293F | transition: 150ms
focus: ring-2 ring-[#1D3557]/30
```

### Botón secundario
```
bg: transparent | border: #E5E3E0 | text: #111111
hover: bg-[#F1F0ED]
```

### Input
```
border: #E5E3E0 | rounded-lg | px-3.5 py-2.5
font: Plus Jakarta 400 | 0.9375rem
focus: ring-2 ring-[#1D3557]/20 border-[#1D3557]
placeholder: #9CA3AF
```

### Card
```
bg: white | rounded-xl | border: #E5E3E0 | p-6
No sombra en reposo sobre fondo blanco.
Sombra sutil si flota sobre bg-base.
```

### Badge de estado (Lead)
```
new:        bg-[#EEF2F7] text-[#1D3557]
contacted:  bg-[#FEF3C7] text-[#D97706]
qualified:  bg-[#DCFCE7] text-[#16A34A]
discarded:  bg-[#F3F4F6] text-[#6B7280]
Rounded-full, px-2.5 py-0.5, text-xs font-500
```

### Empty state
```
Icono simple o ilustración mínima (no emojis)
Texto claro + subtexto secundario
Acción CTA opcional
Fondo neutro, no recargado
```

---

## Layout del panel admin

```
┌─────────────────────────────────────────────────┐
│ Sidebar (240px fijo)  │  Content area           │
│                       │                         │
│ Logo                  │  Page header            │
│                       │  (título + acciones)    │
│ Nav items             │  ─────────────────────  │
│                       │  Content                │
│                       │                         │
│                       │                         │
└─────────────────────────────────────────────────┘
```

**Sidebar**: fondo #FFFFFF, borde derecho #E5E3E0. No sidebar oscura.
**Content area**: fondo #F7F7F3. Padding 32px.
**Nav items**: texto #5C5C5C, activo bg-[#EEF2F7] text-[#1D3557] con barra izquierda brand.

---

## Guía visual por pantalla

### Dashboard
- No empieces con 4 cards iguales en fila.
- Propón un layout asimétrico: stat destacada + resumen de actividad reciente + lista de leads nuevos.
- Jerarquía clara: qué es lo más importante para el negocio HOY.

### Leads
- Tabla limpia con columnas esenciales.
- Filtros sutiles arriba, no invasivos.
- States con badge de color.
- Acción de cambio de estado directamente en la fila.

### Conversations
- Layout dividido o lista + detalle.
- Nombre del visitante + preview del último mensaje + timestamp.
- Estado y si hay lead capturado.

### Knowledge Base
- Lista de fuentes con tipo, título y estado activo/inactivo.
- Formulario de creación simple: título + tipo + contenido.

### Settings
- Secciones claras con separadores.
- No un formulario gigante sin estructura.
