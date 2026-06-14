# Documentación del Proyecto — Hospedaje Tinogasta

## Ficha técnica

| Campo | Valor |
|---|---|
| **Institución** | Tecnicatura Superior en Desarrollo de Software |
| **Materia** | Desarrollo Web |
| **Proyecto** | Sitio web para hospedaje en Tinogasta |
| **Cliente** | Hospedaje local (Tinogasta, Catamarca) |
| **Rol del alumno** | Diseñador y desarrollador full-stack |
| **Tutor/Asistente** | opencode (Tech Lead) |

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| **React** | 19 | Biblioteca principal de interfaz de usuario |
| **TypeScript** | 5.x | Lenguaje (tipado estático) |
| **Vite** | 6 | Build tool (bundler y dev server) |
| **React Router DOM** | 6 | Enrutamiento (SPA) |
| **Tailwind CSS** | 4 | Framework de estilos utilitario |
| **Supabase** | — | BaaS: base de datos PostgreSQL + Storage |
| **EmailJS** | — | Envío de notificaciones por email sin backend propio |
| **react-icons** | — | Librería de iconos |
| **Git + GitHub** | — | Control de versiones y repositorio remoto |

> No se utiliza backend propio. Supabase funciona como backend como servicio (BaaS).

---

## Roadmap del sitio

```
SITIO WEB DEL HOSPEDAJE
│
├── PÁGINA PÚBLICA (/)
│   ├── Navbar
│   │   ├── Logo del hospedaje
│   │   └── Enlace "Inicio"
│   │
│   ├── Hero
│   │   ├── Imagen de fondo (Tinogasta)
│   │   └── Frase / eslogan del local
│   │
│   ├── Sección Habitaciones
│   │   └── Cards 3×1 rotativas
│   │       ├── Imagen de la habitación
│   │       ├── Nombre
│   │       ├── Descripción breve
│   │       ├── Servicios
│   │       ├── Precio
│   │       ├── Indicador disponible / no disponible
│   │       └── Botón "Reservar" → abre formulario
│   │
│   ├── Galería de imágenes
│   │   └── Grid de fotos del local
│   │
│   ├── Badge flotante
│   │   ├── 🟢 "Habitaciones disponibles"
│   │   └── 🔴 "No hay habitaciones disponibles"
│   │
│   └── Footer
│       ├── Logo
│       ├── Ubicación
│       ├── Contacto
│       └── "Sobre nosotros"
│
├── FORMULARIO DE RESERVA (modal)
│   ├── Nombre del huésped
│   ├── Email
│   ├── Teléfono
│   ├── Habitación seleccionada (automático)
│   ├── Fecha de entrada
│   ├── Fecha de salida
│   └── Botón "Enviar reserva"
│       ├── → Se guarda en Supabase (estado: "pendiente")
│       └── → Se envía notificación por EmailJS
│
└── PANEL ADMIN (/admin)
    ├── Login con código secreto
    ├── Dashboard con badge de reservas pendientes
    ├── Gestión de habitaciones (CRUD con formulario guiado)
    ├── Gestión de galería (subir / eliminar imágenes)
    └── Bandeja de reservas (aprobar / rechazar)
```

---

## Estructura de la base de datos (Supabase)

### Tabla: `habitaciones`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `nombre` | text | Nombre de la habitación |
| `descripcion` | text | Descripción breve |
| `servicios` | text[] | Array de servicios |
| `precio` | numeric | Precio por noche |
| `imagen_url` | text | URL en Supabase Storage |
| `disponible` | boolean | Disponible o no |
| `created_at` | timestamptz | Fecha de creación |

### Tabla: `galeria`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `imagen_url` | text | URL en Supabase Storage |
| `descripcion` | text | Descripción opcional |
| `created_at` | timestamptz | Fecha de creación |

### Tabla: `reservas`

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador único |
| `nombre` | text | Nombre del huésped |
| `email` | text | Email de contacto |
| `telefono` | text | Teléfono de contacto |
| `habitacion_id` | uuid FK | Referencia a `habitaciones.id` |
| `fecha_entrada` | date | Check-in |
| `fecha_salida` | date | Check-out |
| `estado` | text | `pendiente`, `confirmada` o `rechazada` |
| `created_at` | timestamptz | Fecha de creación |

---

## Estructura de archivos del proyecto

```
tp1-hospedaje/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Habitaciones.tsx
│   │   ├── CardHabitacion.tsx
│   │   ├── Galeria.tsx
│   │   ├── Footer.tsx
│   │   ├── BadgeDisponibilidad.tsx
│   │   └── ModalReserva.tsx
│   │
│   ├── pages/
│   │   ├── Inicio.tsx
│   │   └── Admin.tsx
│   │
│   ├── types/
│   │   ├── habitacion.ts
│   │   ├── galeria.ts
│   │   └── reserva.ts
│   │
│   ├── supabase/
│   │   └── client.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── DOCUMENTACION.md
```

---

## Interfaces de TypeScript

```typescript
// types/habitacion.ts
export interface Habitacion {
  id: string
  nombre: string
  descripcion: string
  servicios: string[]
  precio: number
  imagen_url: string
  disponible: boolean
  created_at: string
}

// types/galeria.ts
export interface GaleriaImagen {
  id: string
  imagen_url: string
  descripcion?: string
  created_at: string
}

// types/reserva.ts
export type EstadoReserva = 'pendiente' | 'confirmada' | 'rechazada'

export interface Reserva {
  id: string
  nombre: string
  email: string
  telefono: string
  habitacion_id: string
  fecha_entrada: string
  fecha_salida: string
  estado: EstadoReserva
  created_at: string
}
```

---

## Componentes y responsabilidades

| Componente | Archivo | Responsabilidad |
|---|---|---|
| `App` | `App.tsx` | Define rutas (/, /admin), layout general |
| `Navbar` | `Navbar.tsx` | Logo + navegación |
| `Hero` | `Hero.tsx` | Imagen de fondo + eslogan |
| `Habitaciones` | `Habitaciones.tsx` | Contenedor que obtiene habitaciones desde Supabase y las muestra en grid 3×1 |
| `CardHabitacion` | `CardHabitacion.tsx` | Card individual (imagen, nombre, desc, servicios, precio, disponibilidad, botón reservar) |
| `Galeria` | `Galeria.tsx` | Grid de imágenes desde Supabase |
| `Footer` | `Footer.tsx` | Información de contacto y logo |
| `BadgeDisponibilidad` | `BadgeDisponibilidad.tsx` | Indicador flotante 🟢/🔴 |
| `ModalReserva` | `ModalReserva.tsx` | Formulario de reserva + envío a Supabase + EmailJS |
| `Admin` | `Admin.tsx` | Pantalla completa del panel admin (login + CRUDs + bandeja) |

---

## Autenticación admin (código secreto)

1. Se accede a `/admin`
2. Se muestra un input de código secreto
3. Se valida contra un valor en Supabase (tabla `config`) o variable de entorno
4. Si es correcto → se guarda en `sessionStorage` y se permite el acceso
5. Si es incorrecto → mensaje de error
6. Cerrar sesión → botón que limpia `sessionStorage`

---

## Flujo de trabajo

1. **Ver** — Analizar el código o funcionalidad actual
2. **Entender** — Explicar el código o concepto antes de modificarlo
3. **Modificar** — Escribir el cambio paso a paso
4. **Commit** — `git add . && git commit -m "tipo: mensaje"`

### Convención de commits

| Tipo | Uso |
|---|---|
| `chore` | Configuración, instalación, setup |
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de errores |
| `style` | Cambios de estilos solamente |
| `refactor` | Reestructuración sin cambiar funcionalidad |
| `docs` | Documentación |

---

## Plan de etapas

| Etapa | Commits | Descripción |
|---|---|---|
| 1 — Setup | 1 | Crear proyecto Vite + React + TS, instalar dependencias, configurar Tailwind |
| 2 — Maquetación | 1–2 | Componentes estáticos de la página pública |
| 3 — Supabase + datos | 1 | Crear tablas, conectar, datos dinámicos |
| 4 — Reserva + EmailJS | 1 | Formulario de reserva, bandeja, notificación |
| 5 — Panel admin | 2–3 | CRUD habitaciones, galería, bandeja de reservas |
| 6 — Autenticación | 1 | Login con código secreto |
| 7 — GitHub | 1 | Subir repositorio remoto |
