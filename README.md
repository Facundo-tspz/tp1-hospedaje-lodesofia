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

**Lista ordenada:**
1. Planificación
2. Maquetación
3. Conexión a base de datos
4. Panel administrador

### Tablas

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Biblioteca UI |
| TypeScript | 5.x | Tipado estático |
| Vite | 6 | Build tool |
| Tailwind CSS | 4 | Estilos |
| Supabase | — | Base de datos + Storage |
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

**Ubicación:** Tinogasta, Catamarca, Argentina.

**Objetivos del sitio web:**

- Proveer una vitrina digital profesional para el hospedaje.
- Permitir a los huéspedes consultar habitaciones y servicios de forma clara y rápida.
- Facilitar la reserva de habitaciones mediante un formulario en línea.
- Brindar al dueño un panel administrador para gestionar habitaciones, galería de imágenes y reservas.

---

## Análisis Técnico

### SPA (Single Page Application)

El sitio está construido como una **Single Page Application** utilizando React con React Router DOM v6. Esto significa que toda la aplicación se carga en una sola página HTML y la navegación entre secciones (Inicio, Admin) ocurre del lado del cliente sin recargar completamente el navegador. Beneficios:

- Navegación más rápida y fluida.
- Menor consumo de ancho de banda luego de la carga inicial.
- Experiencia de usuario similar a una aplicación de escritorio.

### PWA (Progressive Web App)

Si bien en esta etapa el sitio no implementa todas las características de una PWA (Service Workers, modo offline, instalación), la arquitectura actual sienta las bases para una futura conversión a PWA. El uso de Vite como build tool y la estructura de componentes facilita agregar un manifest.json y un Service Worker en etapas posteriores.

---

## Entorno y Frameworks

### Inicialización

El proyecto se inicializó con el comando:

```bash
npm create vite@latest . -- --template react-ts
```

Esto genera la estructura base con React 19 + TypeScript + Vite 6.

### Componentización

La aplicación se organiza en componentes funcionales reutilizables dentro de `src/components/` y páginas dentro de `src/pages/`. Cada componente es responsable de una única parte de la interfaz:

```
src/
├── components/      # Componentes reutilizables (Navbar, Hero, Footer, etc.)
├── pages/           # Páginas (Inicio, Admin)
├── types/           # Interfaces de TypeScript
├── supabase/        # Configuración del cliente de Supabase
├── assets/          # Recursos estáticos (fuentes, imágenes)
├── App.tsx          # Componente raíz con rutas
├── main.tsx         # Punto de entrada
└── index.css        # Estilos globales + Tailwind
```

---

## HTML Semántico

La estructura del sitio utiliza etiquetas semánticas de HTML5 para mejorar la accesibilidad y el SEO:

- `<header>` para el Navbar
- `<main>` para el contenido principal
- `<section>` para cada bloque temático (habitaciones, galería)
- `<footer>` para la información de contacto

---

## Control de Versiones y Despliegue

### Git / GitHub

El proyecto utiliza Git para control de versiones con commits convencionales siguiendo el formato `tipo: mensaje descriptivo`. El repositorio remoto se aloja en GitHub.

### Cloud Deployment

El sitio se despliega en Vercel (o Netlify), conectando el repositorio de GitHub para despliegue automático ante cada push a la rama principal.

---

## Entregables de la Etapa 1

| Entregable | URL |
|---|---|
| Repositorio GitHub | (pendiente) |
| Sitio en producción | (pendiente) |
| Documento técnico | Este archivo `README.md` |
