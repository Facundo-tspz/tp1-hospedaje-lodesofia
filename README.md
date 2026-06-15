# Lo de Sofía - Hospedaje

Sitio web del hospedaje "Lo de Sofía" en Tinogasta, Catamarca. Desarrollado con React + TypeScript como trabajo práctico integrador para la materia Desarrollo Web II de la Tecnicatura Superior en Desarrollo de Software.

---

## Guía de Markdown

### Niveles de títulos

```markdown
# Título nivel 1 (h1)
## Título nivel 2 (h2)
### Título nivel 3 (h3)
#### Título nivel 4 (h4)
```

### Listas

**Lista desordenada:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Supabase
- EmailJS

**Lista ordenada:**
1. Planificación
2. Maquetación
3. Conexión a base de datos
4. Panel administrador
5. Formulario de reserva
6. Despliegue

### Tablas

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Biblioteca UI |
| TypeScript | 6.x | Tipado estático |
| Vite | 8 | Build tool |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Router DOM | 6 | Enrutamiento SPA |
| Supabase | — | Base de datos PostgreSQL + Storage |
| EmailJS | — | Notificaciones por email |

### Bloques de código

```tsx
// Ejemplo de componente React con TypeScript
interface Props {
  titulo: string
  disponible: boolean
}

const CardHabitacion = ({ titulo, disponible }: Props) => {
  return (
    <div>
      <h3>{titulo}</h3>
      {disponible ? <span>Disponible</span> : <span>No disponible</span>}
    </div>
  )
}
```

---

## Descripción del Comercio

**Nombre:** Lo de Sofía Hospedaje.

**Ubicación:** Tinogasta, Catamarca, Argentina — sobre la Ruta del Adobe, en el corazón del valle preandino.

**Objetivos del sitio web:**

- Proveer una vitrina digital profesional para el hospedaje.
- Permitir a los huéspedes consultar habitaciones y servicios de forma clara y rápida.
- Facilitar la reserva de habitaciones mediante un formulario en línea.
- Brindar al dueño un panel administrador para gestionar habitaciones, galería de imágenes y reservas.

---

## Análisis Técnico

### SPA (Single Page Application)

El sitio está construido como una **Single Page Application** utilizando React con React Router DOM v6. Toda la aplicación se carga en una sola página HTML y la navegación entre secciones ocurre del lado del cliente sin recargar el navegador. Beneficios:

- Navegación más rápida y fluida.
- Menor consumo de ancho de banda luego de la carga inicial.
- Experiencia de usuario similar a una aplicación de escritorio.

### PWA (Progressive Web App)

Si bien en esta etapa el sitio no implementa todas las características de una PWA (Service Workers, modo offline, instalación), la arquitectura actual sienta las bases para una futura conversión. El uso de Vite como build tool y la estructura de componentes facilita agregar un manifest.json y un Service Worker en etapas posteriores.

---

## Entorno y Frameworks

### Inicialización

El proyecto se inicializó con el comando:

```bash
npm create vite@latest . -- --template react-ts
```

Esto genera la estructura base con React 19 + TypeScript + Vite.

### Decisión del framework

Se eligió **React** sobre Vue o Angular por las siguientes razones:

- **Ecosistema y comunidad:** React es el framework frontend más utilizado, con amplia documentación, bibliotecas de terceros y soporte en la industria.
- **Flexibilidad:** React es una biblioteca, no un framework completo, lo que permite elegir herramientas complementarias (Vite, React Router, Tailwind) sin imponer una estructura rígida.
- **Curva de aprendizaje:** Al estar orientado a componentes funcionales con hooks, resulta más directo para proyectos académicos que requieren resultados rápidos sin perder buenas prácticas.
- **Salida laboral:** El conocimiento de React es actualmente el más demandado en el mercado laboral para desarrollo frontend.

### Arquitectura del sitio

El proyecto sigue una arquitectura basada en componentes funcionales de React, organizada de la siguiente manera:

```
tp1-hospedaje-lodesofia/
├── public/                # Archivos estáticos (imágenes, favicon)
│   ├── hero-tinogasta.webp
│   ├── icono.png
│   ├── logo.png
│   └── logo-alterno.png
│
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Navbar.tsx       # Barra de navegación sticky con hamburguesa
│   │   ├── Hero.tsx         # Hero con imagen de fondo y eslogan
│   │   ├── CardHabitacion.tsx  # Card individual de cada habitación
│   │   ├── Habitaciones.tsx    # Grid de habitaciones con pelotitas indicadoras
│   │   ├── Galeria.tsx         # Flyer de imágenes en la página principal
│   │   ├── Footer.tsx          # Pie de página con contacto e íconos
│   │   └── ModalReserva.tsx    # Modal con formulario de reserva
│   │
│   ├── pages/             # Páginas completas del sitio
│   │   ├── Inicio.tsx
│   │   ├── Admin.tsx
│   │   ├── SobreNosotros.tsx
│   │   ├── PreguntasFrecuentes.tsx
│   │   ├── AcercaDelSistema.tsx
│   │   ├── GaleriaPage.tsx
│   │   └── HabitacionDetalle.tsx
│   │
│   ├── layout/
│   │   └── Layout.tsx     # Layout compartido (Navbar + contenido + Footer)
│   │
│   ├── supabase/
│   │   └── client.ts      # Conexión a Supabase
│   │
│   ├── assets/fonts/      # Fuentes personalizadas Farley MF y Fonseca Light
│   ├── App.tsx            # Componente raíz con definición de rutas
│   ├── main.tsx           # Punto de entrada de la aplicación
│   └── index.css          # Estilos globales (Tailwind + fuentes)
```

#### Enrutamiento

Se utiliza React Router DOM v6 con rutas anidadas. Todas las rutas públicas (`/`, `/habitacion/:id`, `/sobre-nosotros`, `/preguntas-frecuentes`, `/acerca-del-sistema`, `/galeria`) comparten un Layout común con Navbar y Footer. La ruta `/admin` es independiente y no utiliza el Layout.

#### Flujo de datos

- Los datos se obtienen de Supabase (PostgreSQL) mediante consultas asincrónicas.
- Los componentes usan hooks (`useState`, `useEffect`) para manejar el estado local y la carga de datos.
- Las imágenes se almacenan en Supabase Storage (carpetas `habitaciones/` y `galeria/`).
- El formulario de reserva inserta datos directamente en la tabla `reservas`.
- El panel admin permite operaciones CRUD sobre habitaciones, galería y reservas.

#### Autenticación

El acceso al panel admin se controla mediante un código secreto almacenado en la tabla `config` de Supabase (código: `tinogasta2024`). No se utiliza Supabase Auth. La sesión se mantiene en `sessionStorage` y se borra al recargar la página.

---

## Rutas del sitio

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Hero + Grid habitaciones + Flyer galería |
| `/habitacion/:id` | HabitacionDetalle | Detalle de habitación con formulario de reserva |
| `/sobre-nosotros` | SobreNosotros | Información del hospedaje con logo |
| `/preguntas-frecuentes` | PreguntasFrecuentes | FAQ del hospedaje |
| `/acerca-del-sistema` | AcercaDelSistema | Info del sitio y desarrollador |
| `/galeria` | GaleriaPage | Grid completo con modal de imágenes |
| `/admin` | Admin | Panel con login, CRUD habitaciones, galería y reservas |

Todas las rutas excepto `/admin` usan el Layout compartido (Navbar + Footer).

---

## Paleta de colores (manual de identidad)

| Color | Hex | Uso |
|---|---|---|
| Naranja sol | `#D9831A` / `#F98F1D` | Acentos, botones, hover |
| Azul profundo | `#034659` | Títulos, overlay del Hero |
| Azul-verdoso | `#1E5C6D` | Variante secundaria |
| Arena | `#DDC2A5` | Fondo de sección galería |
| Tierra roja | `#A8574B` | Complementario |
| Verde olivo | `#6D8B5F` | Complementario |

## Tipografías

| Fuente | Uso |
|---|---|
| **Farley MF** (woff) | Títulos principales, eslogan, navbar |
| **Fonseca Light** (woff) | Subtítulos, descripciones, cuerpo de texto |

---

## Componentes destacados

### Navbar
- Sticky (se pega al tope al scrollear)
- Logo izquierda con icono + nombre escalonado
- Botón "Inicio" + menú hamburguesa con dropdown
- Links a Sobre nosotros, Preguntas frecuentes, Acerca del sistema
- Muestra "Panel Admin" si el usuario está autenticado

### Hero
- Imagen de fondo con overlay azul `#034659` al 40%
- Ocupa 70% de la altura de la pantalla (`h-[70vh]`)
- Eslogan "TU HOGAR EN TINOGASTA" en Farley MF blanco
- Subtítulo "Te esperamos con los brazos abiertos"

### Habitaciones
- Grid estático: 3 columnas en desktop, 1 en mobile
- Pelotitas indicadoras debajo del grid (1 por habitación, primera naranja)
- Cada card navega a `/habitacion/:id` al hacer click
- Badge verde "Disponible" / rojo "Ocupada"
- Precio calculado: $15.000 × capacidad

### Página de detalle de habitación
- Imagen grande, descripción, servicios y precio
- Botón "Reservar" que abre modal con formulario
- Si la habitación está ocupada, muestra "No disponible" en vez del botón

### Modal de reserva
- Campos: nombre, DNI, teléfono, cantidad de huéspedes, fecha de llegada
- Validación: la cantidad no puede superar la capacidad de la habitación
- Al enviar, se inserta una reserva con estado `pendiente` en Supabase

### Galería
- Fondo color Arena `#DDC2A5`
- Flyer automático cada 4 segundos con flechas y dots
- Botón "Ver Galería" que navega a `/galeria`
- Página de galería: grid 3 columnas con modal al hacer click

### Footer
- 3 columnas: logo + nombre con icono, contacto con íconos (teléfono, email, ubicación), sobre nosotros
- Datos de contacto: +54 3837 456789, lodesofia.hospedaje@gmail.com, Mariano Moreno 661

### Sobre nosotros
- Texto descriptivo del hospedaje con íconos decorativos al inicio de cada párrafo
- Logo principal circular con sombra
- Recuadro inferior con `logo-alterno.png` y texto "Lo de Sofía Hospedaje — Tinogasta, Catamarca"

### Preguntas frecuentes
- Acordeón con 12 preguntas sobre el hospedaje
- Cada pregunta tiene un ícono distintivo de `react-icons/io5`
- Animación suave de apertura y cierre
- Contenido: horarios, reservas, pagos, estacionamiento, mascotas, WiFi, ubicación, baños, cocina, turismo, cancelación, capacidad

### Acerca del sistema
- Descripción del proyecto como TP integrador de Desarrollo Web II
- Cards con íconos para cada tecnología (React, Vite, React Router, Tailwind, Supabase)
- Información del desarrollador: Facundo Paez, estudiante de 3er año de la Tecnicatura en el IEST
- Materia: Desarrollo Web II — Prof. Barrionuevo A. Camila

### Panel Administrador (`/admin`)
- **Login** con código secreto desde tabla `config` en Supabase (código: `tinogasta2024`)
- **Gestión de habitaciones**: crear, editar, eliminar con subida de imágenes a Storage
  - Servicios por tags seleccionables (WiFi, TV, Calefacción, A/A, A/A F&C, Baño Priv., Amenities)
- **Gestión de galería**: subir y eliminar imágenes
- **Bandeja de reservas**: filtros por estado (Pendientes / Confirmadas / Ocupadas / Rechazadas / Todas)
  - Pendientes: botones Aprobar / Rechazar
  - Confirmadas: botón Cancelar (pide motivo)
  - Ocupadas: botón Marcar disponible (libera la habitación)
  - Rechazadas: botón Eliminar (borra permanentemente)
- Al aprobar una reserva, la habitación se marca como no disponible automáticamente
- Al marcar disponible, la habitación vuelve a estar disponible para reservar
- Sesión se borra al recargar la página

---

## Base de datos (Supabase)

### Tablas

| Tabla | Columnas |
|---|---|
| `habitaciones` | id, nombre, descripcion, servicios(text[]), precio, capacidad, imagen_url, disponible, created_at |
| `galeria` | id, imagen_url, descripcion, created_at |
| `reservas` | id, nombre, dni, telefono, habitacion_id, cantidad_huespedes, fecha_llegada, estado(pendiente/confirmada/rechazada), motivo_cancelacion, created_at |
| `config` | id, clave, valor |

### Storage

- Bucket: `imagenes`
- Carpetas: `habitaciones/` y `galeria/`

---

## HTML Semántico

La estructura del sitio utiliza etiquetas semánticas de HTML5:

- `<header>` para el Navbar
- `<main>` para el contenido principal
- `<section>` para cada bloque temático (hero, habitaciones, galería)
- `<footer>` para la información de contacto
- `<nav>` para la navegación

---

## Funcionalidades pendientes

| Funcionalidad | Estado |
|---|---|
| Notificaciones por email al recibir una reserva (EmailJS) | Pendiente |
| Despliegue en Vercel / Netlify | Pendiente |
| Modal de reserva con fecha de salida y validación de disponibilidad por rango de fechas | Pendiente |
| Pestaña "Ocupadas" en admin con auto-liberación al pasar la fecha de salida | Pendiente |
| Componente Badge flotante global con indicador de disponibilidad general | Pendiente |
| Página de confirmación de reserva | Pendiente |
| Modo oscuro | Pendiente |

---

## Mejoras potenciales

- **Rendimiento**: implementar lazy loading en imágenes de galería y páginas pesadas con `React.lazy()` y `Suspense`
- **UX**: agregar skeleton loaders mientras cargan los datos desde Supabase
- **SEO**: agregar meta tags dinámicos con `react-helmet-async` para mejorar la indexación
- **PWA**: convertir en Progressive Web App con Service Worker para soporte offline y carga instantánea
- **Panel admin**: agregar dashboard con estadísticas (reservas del mes, ingresos estimados, ocupación)
- **Formulario de reserva**: agregar selector de rango de fechas con calendario visual y cálculo automático del total de noches
- **Imágenes**: implementar compresión y redimensionado automático al subir a Supabase Storage
- **Multiidioma**: soporte para inglés y portugués usando `i18next`
- **Accesibilidad**: mejorar contraste, agregar etiquetas aria y navegación por teclado

---

## Escalabilidad

El proyecto está diseñado para escalar de forma sencilla:

- **Nuevas habitaciones**: se agregan desde el panel admin sin tocar código — aparecen automáticamente en el grid y las pelotitas indicadoras se actualizan solas
- **Nuevos servicios**: los tags de servicios se definen en un array en `Admin.tsx` y se renderizan dinámicamente
- **Nuevas secciones en la página**: basta con crear un componente en `pages/`, agregar la ruta en `App.tsx` y el link en `Navbar.tsx`
- **Base de datos**: Supabase permite agregar columnas y tablas sin migraciones complejas; las consultas se adaptan fácilmente
- **Autenticación**: si en el futuro se quiere migrar a Supabase Auth (con email y contraseña), la estructura actual lo permite sin reescribir el panel
- **API propia**: si el proyecto crece, se puede migrar la lógica de Supabase a un backend propio (Node.js, Django, etc.) manteniendo el frontend intacto gracias a la separación de responsabilidades

---

## Control de Versiones y Despliegue

### Git / GitHub

El proyecto utiliza Git para control de versiones con commits convencionales siguiendo el formato `tipo: mensaje descriptivo`. El repositorio remoto se aloja en GitHub en [Facundo-tspz/tp1-hospedaje-lodesofia](https://github.com/Facundo-tspz/tp1-hospedaje-lodesofia).

### Cloud Deployment

(pendiente)

---

## Entregables

| Entregable | URL |
|---|---|
| Repositorio GitHub | [https://github.com/Facundo-tspz/tp1-hospedaje-lodesofia](https://github.com/Facundo-tspz/tp1-hospedaje-lodesofia) |
| Sitio en producción | (pendiente) |
| Documento técnico | Este archivo `README.md` |
