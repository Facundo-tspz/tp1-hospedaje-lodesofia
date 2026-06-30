# IA Aplicada al Desarrollo

## Bitácora de uso de IA

Durante el desarrollo del proyecto se utilizó **OpenCode (Claude)** como asistente de codificación y documentación. A continuación se registran 4 instancias concretas de uso.

---

### Instancia 1: Definición del stack tecnológico

| Campo | Detalle |
|---|---|
| **Tarea** | Definir el stack tecnológico del proyecto |
| **Prompt** | "Necesito desarrollar un sitio web para un hospedaje en Tinogasta, Catamarca. ¿Qué tecnologías me recomendas? Debe ser gratuito, moderno y escalable." |
| **Resultado** | Se propuso React + TypeScript + Vite + Tailwind CSS + Supabase + Netlify, con justificación de cada tecnología. |
| **Revisión** | Se verificó que las tecnologías estuvieran vigentes y que los planes gratuitos fueran suficientes. Se descartaron las otras opciones propuestas (WordPress, Django) por no alinearse con los fines académicos. |

---

### Instancia 2: Creación de la documentación en `/docs/`

| Campo | Detalle |
|---|---|
| **Tarea** | Redactar 6 archivos de documentación técnica en Markdown |
| **Prompt** | "Creá 6 archivos Markdown en /docs/ con planificación, arquitectura de la información, wireframes, stack tecnológico, escalabilidad y changelog. Usá tablas, checklists, diagramas Mermaid y enlaces internos." |
| **Resultado** | Se generaron 6 archivos completos con roadmaps, sitemaps, user flows, tablas comparativas, análisis CAP/RPS y registro de cambios. |
| **Revisión** | Se corrigió la sintaxis de 2 diagramas Mermaid y se ajustaron las rutas de enlaces internos. No se detectaron problemas de seguridad. |

---

### Instancia 3: Soporte continuo como tutor de desarrollo

| Campo | Detalle |
|---|---|
| **Tarea** | Asistencia durante toda la implementación: componentes, bugs responsive, formularios, mejoras de diseño |
| **Prompts representativos** | "El panel admin se ve cortado en mobile, cómo lo arreglo?", "Agregá un formulario de contacto con validación", "Las flechas de la galería no me gustan, mejorá el diseño" |
| **Resultado** | Se resolvieron problemas de responsive, se crearon componentes (ModalReserva, CardHabitacion, Galeria, Navbar, Footer, skeleton loaders), se mejoró la estética de la galería con iconos SVG. |
| **Revisión** | Cada fragmento fue revisado antes de integrarlo: tipos TypeScript, ausencia de funciones deprecadas, claves de API no hardcodeadas, validación de formularios. Se corrigieron 3 casos con vulnerabilidades potenciales (console.log de datos, falta de validación de tipos). |

---

### Instancia 4: Implementación de SEO y Seguridad

| Campo | Detalle |
|---|---|
| **Tarea** | Implementar SEO técnico (meta tags, JSON-LD, sitemap, robots.txt) y seguridad (variables de entorno, headers HTTP, RLS policies) |
| **Prompt** | "Necesito agregar SEO a todas las páginas del sitio: meta tags, Open Graph, JSON-LD, sitemap.xml, robots.txt, canonical. También necesito mejorar la seguridad: mover las credenciales a .env, agregar headers HTTP y explicar RLS policies." |
| **Resultado** | Se generó el componente SEO.tsx con react-helmet-async, archivos `public/_headers`, `robots.txt`, `sitemap.xml`, JSON-LD en index.html, reestructuración de client.ts con variables de entorno, y documentación de RLS policies. |
| **Revisión** | Se validó JSON-LD con herramienta de Google, se verificaron headers HTTP en producción, se confirmó que `.env.local` estuviera en `.gitignore`, se comprobaron las RLS policies de cada tabla. |

---

## Skills y Tool Calling

Una **Skill** es una capacidad que permite a la IA interactuar con el entorno (leer archivos, escribir código, ejecutar comandos). El flujo es: (1) el usuario da una instrucción, (2) la IA selecciona la Skill adecuada, (3) genera los argumentos necesarios, (4) la Skill se ejecuta en el sistema real, (5) la IA verifica el resultado.

**Vectores de seguridad:** (1) permisos de archivos (no acceder a `.env`, `node_modules`), (2) ejecución de comandos (validar que no instale paquetes maliciosos), (3) exposición de datos (no enviar información sensible a servidores externos sin autorización).

---

## Reflexión crítica

El uso de IA transformó la forma de abordar el proyecto. Ayudó a definir el stack tecnológico, resolver bugs y crear componentes rápidamente, funcionando como un tutor permanente. Sin embargo, el código generado requería ajustes manuales porque no siempre consideraba casos borde del proyecto. Por ejemplo, la primera versión del formulario de contacto no manejaba errores de conexión con la base de datos.

La experiencia demostró que la IA es una herramienta poderosa pero no reemplaza el criterio del desarrollador. Cada fragmento de código debe ser revisado, comprendido y adaptado al contexto. Se estima que un 40% de las tareas se resolvieron sin intervención, otro 40% requirió 1-2 iteraciones de corrección, y un 20% la IA no pudo resolverlo. El verdadero valor está en saber qué preguntar y cómo validar las respuestas, no en delegar ciegamente.

---

> Anterior: [Changelog](06-changelog.md) | Volver al [README](../README.md)
