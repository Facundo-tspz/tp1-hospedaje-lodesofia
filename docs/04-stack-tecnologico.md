# Stack Tecnológico

## Stack completo

| Capa | Tecnología | Versión | Rol |
|---|---|---|---|
| Frontend | React + TypeScript | 19.x | Biblioteca de UI con tipado estático |
| Build tool | Vite | 8.x | Servidor de desarrollo y empaquetado |
| Estilos | Tailwind CSS | 4.x | Framework de estilos utilitario |
| Enrutamiento | React Router DOM | 6.x | Navegación SPA del lado del cliente |
| Backend | Supabase (BaaS) | — | Backend como servicio (API REST + PostgreSQL) |
| Base de datos | PostgreSQL | 15.x | Motor de base de datos relacional |
| Almacenamiento | Supabase Storage | — | Almacenamiento y CDN de imágenes |
| Autenticación | Código secreto (tabla `config`) | — | Control de acceso al panel admin |
| Notificaciones | EmailJS | ^4.4.1 | Envío de emails desde el frontend (pendiente) |
| Iconos | react-icons | ^5.6.0 | Librería de iconos vectoriales |
| Despliegue | Netlify | — | Hosting estático con CI/CD desde GitHub |
| Control de versiones | Git + GitHub | — | Repositorio y control de cambios |

---

## Frontend

### React + TypeScript

**¿Por qué React?** Se eligió React por su flexibilidad, su enorme ecosistema y su curva de aprendizaje accesible. A diferencia de Angular (opinionado y más pesado) o Vue (menor adopción laboral), React permite elegir librerías complementarias sin imponer una estructura rígida. Es la tecnología frontend más demandada en el mercado laboral.

**¿Por qué TypeScript?** El tipado estático previene errores en tiempo de desarrollo, mejora la autocompletación del editor y facilita el mantenimiento del código a largo plazo. TypeScript es especialmente valioso en proyectos con múltiples componentes y datos provenientes de una base de datos externa.

### Vite

Vite ofrece un servidor de desarrollo ultrarrápido con Hot Module Replacement (HMR) instantáneo y builds optimizados con Tree Shaking. Es el reemplazo moderno de Create React App, con mejor rendimiento y configuración más sencilla.

### Tailwind CSS

Tailwind permite desarrollar interfaces responsive directamente desde el HTML/JSX con clases utilitarias. Su sistema de purga elimina las clases no utilizadas en producción, resultando en archivos CSS muy pequeños. La integración con Vite se realiza mediante el plugin `@tailwindcss/vite`.

### React Router DOM

Maneja el enrutamiento del lado del cliente en la SPA, permitiendo la navegación entre páginas sin recargar el navegador. Se utiliza con rutas anidadas (Layout compartido para páginas públicas, Layout independiente para Admin).

---

## Backend: Supabase (BaaS)

Supabase es una alternativa open source a Firebase que proporciona los siguientes servicios integrados:

| Servicio | Uso en el proyecto |
|---|---|
| **PostgreSQL** | Base de datos relacional con API REST y GraphQL automáticas |
| **Storage** | Almacenamiento de imágenes con CDN integrado (bucket `imagenes`) |
| **Autenticación** | No utilizada (se implementó autenticación por código secreto propio) |
| **RLS (Row Level Security)** | Políticas de seguridad a nivel de filas para proteger los datos |

### Modelo de concurrencia

Supabase maneja la concurrencia del lado del servidor mediante **PgBouncer** (connection pooling) y el motor multihilo de PostgreSQL. Cada petición HTTP desde el frontend abre una conexión asíncrona que no bloquea la interfaz de usuario.

El frontend React utiliza el modelo **I/O asíncrono no bloqueante** de JavaScript: las llamadas a la API de Supabase mediante `async/await` se ejecutan en segundo plano mientras el usuario sigue interactuando con la interfaz.

---

## Base de Datos: PostgreSQL

### ¿SQL o NoSQL?

Se eligió **PostgreSQL (SQL)** porque los datos del proyecto son **altamente relacionales**:

| Dato | Relaciones |
|---|---|
| Habitaciones | 1 habitación → N reservas |
| Reservas | 1 reserva → 1 habitación, 1 reserva → 1 huésped |
| Galería | Independiente (solo imágenes con descripción) |
| Config | Independiente (clave-valor) |

**¿Por qué no NoSQL?** MongoDB o Firestore serían menos adecuados porque:

1. Las reservas requieren joins entre tablas (habitación + huésped).
2. Se necesita consistencia transaccional: al aprobar una reserva, la habitación debe marcarse como no disponible atómicamente.
3. Los datos están claramente estructurados y no se espera variedad de esquemas.

### Esquema de tablas

```sql
-- Tabla: habitaciones
CREATE TABLE habitaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  servicios TEXT[],
  precio NUMERIC NOT NULL,
  capacidad INTEGER NOT NULL,
  imagen_url TEXT,
  disponible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: reservas
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  dni TEXT NOT NULL,
  telefono TEXT NOT NULL,
  habitacion_id UUID REFERENCES habitaciones(id),
  cantidad_huespedes INTEGER NOT NULL,
  fecha_llegada DATE NOT NULL,
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'rechazada')),
  motivo_cancelacion TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: galeria
CREATE TABLE galeria (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imagen_url TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla: config
CREATE TABLE config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clave TEXT UNIQUE NOT NULL,
  valor TEXT NOT NULL
);
```

---

## Estrategia de Caching

Actualmente el proyecto no implementa una capa de caching adicional en el frontend. Sin embargo, se aprovechan los siguientes mecanismos:

| Mecanismo | Descripción |
|---|---|
| **CDN de Netlify** | Los assets estáticos (JS, CSS, imágenes) se cachean automáticamente en los servidores perimetrales de Netlify |
| **CDN de Supabase Storage** | Las imágenes subidas se sirven a través del CDN de Supabase con cabeceras de caché HTTP |
| **Caching del navegador** | Los navegadores cachean recursos estáticos según las cabeceras `Cache-Control` |

### Estrategia futura (si el tráfico creciera)

| Dato | Estrategia propuesta | Herramienta |
|---|---|---|
| Lista de habitaciones | Cachear con TTL 5 minutos | Redis en Supabase |
| Configuración del sitio | Cachear en memoria (Context API) | React Context |
| Imágenes | Optimizar con transformaciones on-the-fly | Supabase Image Transformations |

---

## Infraestructura y Despliegue

### Netlify

El sitio se despliega en **Netlify** con las siguientes características:

- **CI/CD automático:** Cada push a la rama `main` del repositorio GitHub dispara un nuevo build y deploy.
- **Hosting gratuito:** Plan gratuito suficiente para el volumen de tráfico estimado.
- **CDN global:** El sitio se sirve desde servidores distribuidos para reducir latencia.
- **SPA routing:** Se configuró el archivo `public/_redirects` con la regla `/* /index.html 200` para que todas las rutas funcionen correctamente.
- **Dominio personalizado:** `lo-de-sofia.netlify.app` (se puede configurar dominio propio).

**Configuración del deploy:**

| Parámetro | Valor |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Base directory | (vacío) |

---

## Modelo de Stack Elegido: Jamstack (Stack C)

El proyecto se alinea con el **Stack C – Jamstack** del apunte de cátedra, caracterizado por:

1. **Frontend estático** generado con React + Vite (pre-renderizado HTML + JS).
2. **Backend descentralizado** mediante APIs de terceros (Supabase).
3. **Despliegue en CDN** (Netlify) sin servidor propio.
4. **Escalabilidad automática** sin intervención del desarrollador.

### Justificación

Para un hospedaje pequeño en Tinogasta con tráfico estacional y recursos limitados, Jamstack ofrece el mejor equilibrio entre:

- **Rendimiento:** Sitio ultrarrápido (carga instantánea desde CDN).
- **Costo:** Todo el stack es gratuito (Netlify + Supabase tienen planes gratuitos generosos).
- **Mantenimiento:** Sin servidores que administrar, actualizaciones automáticas de seguridad.
- **Escalabilidad:** Netlify y Supabase escalan automáticamente sin cambiar el código.

---

> Anterior: [Wireframes](03-wireframes.md) | Siguiente: [Escalabilidad](05-escalabilidad.md) | Volver al [README](../README.md)
