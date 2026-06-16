# Changelog — Registro de Cambios

## [1.1.0] — 2025-06-16 — Etapa 2: Planificación y Arquitectura

### Añadido
- Creación de la carpeta `/docs/` con documentación técnica del proyecto
- `01-planificacion.md`: Roadmap con 3 fases, requerimientos funcionales y no funcionales
- `02-arquitectura-info.md`: Sitemap con diagrama Mermaid y User Flow del proceso de reserva
- `03-wireframes.md`: Descripción de wireframes de 3 pantallas principales
- `04-stack-tecnologico.md`: Stack completo con justificación de cada componente
- `05-escalabilidad.md`: Análisis de escalabilidad (CAP, RPS, caching, contexto local)
- `06-changelog.md`: Registro de cambios de la etapa

### Modificado
- `README.md`: Nueva sección "Etapa 2 — Planificación" con enlaces a los archivos de `/docs/`

---

## [1.0.0] — 2025-06-XX — Etapa 1: Configuración y Desarrollo (MVP)

### Añadido
- Proyecto inicializado con Vite + React 19 + TypeScript
- Fuentes personalizadas: Farley MF (títulos) y Fonseca Light (cuerpo)
- Paleta de colores según manual de identidad visual
- Componentes: Navbar, Hero, CardHabitacion, Habitaciones, Galeria, Footer, ModalReserva
- Layout compartido (Navbar + Outlet + Footer)
- Páginas: Inicio, SobreNosotros, PreguntasFrecuentes, AcercaDelSistema, GaleriaPage, HabitacionDetalle
- Panel administrador: login con código, CRUD habitaciones, gestión galería, bandeja de reservas
- Formulario de reserva con validación de capacidad
- Conexión a Supabase (PostgreSQL + Storage + RLS)
- Diseño responsive con Tailwind CSS 4
- Skeleton loaders en componentes con carga de datos

### Configuración
- ESLint + TypeScript strict
- Netlify deploy con CI/CD desde GitHub
- Archivo `public/_redirects` para SPA routing

---

> Volver al [README](../README.md)
