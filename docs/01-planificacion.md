# Planificación del Proyecto

## Roadmap

### Fase 1 — MVP (Completada en TP1)

- [x] Configuración del entorno (Vite + React + TypeScript + Tailwind)
- [x] Diseño de identidad visual (colores, tipografías)
- [x] Componentes base: Navbar, Hero, Footer, Layout
- [x] Visualización de habitaciones con grid y pelotitas indicadoras
- [x] Página de detalle de habitación con botón reservar
- [x] Galería de imágenes con flyer automático y página completa
- [x] Páginas estáticas: Sobre Nosotros, Preguntas Frecuentes, Acerca del Sistema
- [x] Conexión a Supabase (base de datos + storage)
- [x] Panel administrador con login y CRUD de habitaciones
- [x] Gestión de galería desde el panel admin
- [x] Bandeja de reservas con filtros y acciones (aprobar, rechazar, cancelar, eliminar)
- [x] Formulario de reserva con validación de capacidad
- [x] Diseño responsive
- [x] Despliegue en Netlify

### Fase 2 — Planificación y Arquitectura (TP2 — Presente)

- [x] Documentación de planificación (este archivo)
- [x] Arquitectura de la información (sitemap y user flow)
- [x] Wireframes de pantallas principales
- [x] Definición y justificación del stack tecnológico
- [x] Análisis de escalabilidad (CAP, RPS, caching)
- [ ] Página de contacto con formulario
- [ ] Mock data JSON para documentación de datos
- [ ] Registro de cambios (changelog)

### Fase 3 — Expansión (Futuro)

- [ ] Notificaciones por email (EmailJS)
- [ ] Validación de disponibilidad por rango de fechas
- [ ] Dashboard de estadísticas en panel admin
- [ ] Auto-liberación de habitaciones al pasar la fecha de salida
- [ ] Página de confirmación de reserva
- [ ] Modo oscuro
- [ ] Multiidioma (español / inglés / portugués)
- [ ] PWA con Service Worker para soporte offline

---

## Requerimientos Funcionales (RF)

| ID | Descripción | Prioridad |
|---|---|---|
| RF1 | El sistema debe permitir visualizar las habitaciones disponibles con foto, descripción, servicios y precio calculado por capacidad. | Alta |
| RF2 | El sistema debe permitir a los huéspedes enviar solicitudes de reserva indicando nombre, DNI, teléfono, cantidad de huéspedes y fecha de llegada. | Alta |
| RF3 | El sistema debe validar que la cantidad de huéspedes no supere la capacidad máxima de la habitación. | Alta |
| RF4 | El sistema debe contar con un panel administrativo protegido por código secreto almacenado en la base de datos. | Alta |
| RF5 | El administrador debe poder crear, editar y eliminar habitaciones desde el panel, incluyendo subida de imágenes. | Alta |
| RF6 | El administrador debe poder gestionar las reservas cambiando su estado (pendiente, confirmada, rechazada, ocupada) y eliminando registros. | Alta |
| RF7 | El sistema debe mostrar una galería de imágenes del hospedaje con vista previa en modal. | Media |
| RF8 | El sistema debe incluir una página de contacto con formulario para consultas. | Media |
| RF9 | El sistema debe ser responsive, adaptándose correctamente a dispositivos móviles, tablets y desktop. | Alta |

## Requerimientos No Funcionales (RNF)

| ID | Descripción | Prioridad |
|---|---|---|
| RNF1 | El sitio debe cargar la página principal en menos de 3 segundos en conexiones de banda ancha. | Alta |
| RNF2 | El código fuente debe estar escrito en TypeScript con tipado estricto para minimizar errores en tiempo de ejecución. | Alta |
| RNF3 | El diseño debe seguir el manual de identidad visual definido: colores (#D9831A, #034659, #DDC2A5) y fuentes (Farley MF, Fonseca Light). | Alta |
| RNF4 | La sesión del administrador debe almacenarse en sessionStorage y destruirse al recargar la página por seguridad. | Alta |
| RNF5 | El panel administrativo solo debe ser accesible mediante autenticación con código secreto; cualquier intento sin autenticar debe redirigir al login. | Alta |
| RNF6 | El sitio debe utilizar etiquetas semánticas de HTML5 (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) para accesibilidad y SEO. | Media |
| RNF7 | Las imágenes deben almacenarse en Supabase Storage y servirse a través de su CDN para optimizar la carga. | Media |

---

> Anterior: [README.md](../README.md) | Siguiente: [Arquitectura de la Información](02-arquitectura-info.md)
