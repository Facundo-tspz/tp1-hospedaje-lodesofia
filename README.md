# Lo de Sofía - Hospedaje

Sitio web del hospedaje "Lo de Sofía" en Tinogasta, Catamarca. Desarrollado con React + TypeScript como trabajo práctico para la materia Desarrollo Web de la Tecnicatura Superior en Desarrollo de Software.

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
| TypeScript | 5.x | Tipado estático |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Router DOM | 6 | Enrutamiento SPA |
| Supabase | — | Base de datos PostgreSQL + Storage |
| EmailJS | — | Notificaciones por email |
| react-icons | — | Librería de iconos |

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

### Componentización

La aplicación se organiza en componentes funcionales reutilizables:

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx       # Barra de navegación sticky con hamburguesa
│   ├── Hero.tsx         # Hero con imagen, overlay azul y eslogan
│   ├── CardHabitacion.tsx  # Card de habitación con badge disponible/ocupada
│   ├── Habitaciones.tsx    # Carrusel 3×1 con auto-rotación y drag
│   ├── Galeria.tsx         # Flyer automático con flechas y dots
│   └── Footer.tsx          # Pie de página con 3 columnas
│
├── pages/               # Páginas del sitio
│   ├── Inicio.tsx       # Página principal (Hero + Habitaciones + Galería)
│   ├── Admin.tsx        # Panel administrador (login + CRUD + bandeja)
│   ├── SobreNosotros.tsx
│   ├── PreguntasFrecuentes.tsx
│   ├── AcercaDelSistema.tsx
│   └── GaleriaPage.tsx  # Galería completa con grid y modal
│
├── layout/
│   └── Layout.tsx       # Layout con Navbar + Outlet + Footer
│
├── supabase/
│   └── client.ts        # Conexión a Supabase
│
├── types/               # Interfaces de TypeScript
├── assets/fonts/        # Fuentes Farley MF y Fonseca Light
├── App.tsx              # Componente raíz con todas las rutas
├── main.tsx             # Punto de entrada
└── index.css            # Tailwind + @font-face + @theme
```

---

## Rutas del sitio

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Hero + Carrusel habitaciones + Flyer galería |
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

### Hero
- Imagen de fondo con overlay azul `#034659` al 40%
- Ocupa 70% de la altura de la pantalla (`h-[70vh]`)
- Eslogan "TU HOGAR EN TINOGASTA" en Farley MF blanco
- Subtítulo "Te esperamos con los brazos abiertos"

### Carrusel de Habitaciones
- 3 cards en desktop, 1 en mobile
- Rotación automática cada 5 segundos
- Arrastre con mouse para navegación manual
- Flechas ◀ ▶ y dots indicadores
- Badge verde "Disponible" / rojo "Ocupada"
- Precio calculado: $15.000 × capacidad

### Galería
- Fondo color Arena `#DDC2A5`
- Flyer automático cada 4 segundos con flechas y dots
- Botón "Ver Galería" que navega a `/galeria`
- Página de galería: grid 3 columnas con modal al hacer click

### Panel Administrador (`/admin`)
- **Login** con código secreto desde tabla `config` en Supabase
- **Gestión de habitaciones**: crear, editar, eliminar (subida de imágenes a Storage)
- **Gestión de galería**: subir y eliminar imágenes
- **Bandeja de reservas**: filtrar por estado, aprobar o rechazar
- Sesión persistente en `sessionStorage`

---

## Base de datos (Supabase)

### Tablas

| Tabla | Columnas |
|---|---|
| `habitaciones` | id, nombre, descripcion, servicios(text[]), precio, capacidad, imagen_url, disponible, created_at |
| `galeria` | id, imagen_url, descripcion, created_at |
| `reservas` | id, nombre, email, telefono, habitacion_id, fecha_entrada, fecha_salida, estado(pendiente/confirmada/rechazada), created_at |
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
