# IA Aplicada al Desarrollo

## Bitácora de uso de IA

Durante el desarrollo del proyecto se utilizó una herramienta de inteligencia artificial (OpenCode / Claude) como asistente de codificación y documentación. A continuación se registran 3 instancias concretas de uso.

---

### Instancia 1: Definición del stack tecnológico

| Campo | Detalle |
|---|---|
| **Herramienta** | OpenCode (Claude) |
| **Tarea** | Definir el stack tecnológico del proyecto |
| **Prompt** | "Necesito desarrollar un sitio web para un hospedaje en Tinogasta, Catamarca. ¿Qué tecnologías me recomendas? Debe ser gratuito, moderno y escalable." |
| **Resultado** | Se propuso React + TypeScript + Vite + Tailwind CSS + Supabase + Netlify, con justificación de cada tecnología. |
| **Revisión** | Se evaluaron las opciones propuestas y se decidió seguir adelante con el stack sugerido por ser el más adecuado para un proyecto académico con posibilidades de escalar a producción real. No se encontraron vulnerabilidades ni dependencias deprecadas. |

---

### Instancia 2: Creación de la documentación en `/docs/`

| Campo | Detalle |
|---|---|
| **Herramienta** | OpenCode (Claude) |
| **Tarea** | Redactar la carpeta de documentación técnica del proyecto en formato Markdown |
| **Prompt** | "Creá 6 archivos Markdown en /docs/ con planificación, arquitectura de la información, wireframes, stack tecnológico, escalabilidad y changelog. Usá tablas, checklists, diagramas Mermaid y enlaces internos." |
| **Resultado** | Se generaron 6 archivos completos con roadmaps, requerimientos funcionales y no funcionales, sitemaps, user flows, tablas comparativas de stack, análisis CAP/RPS y registro de cambios. |
| **Revisión** | Se revisó que los diagramas Mermaid fueran sintácticamente correctos, se ajustaron las rutas de enlaces internos y se verificó que la información coincidiera con el estado real del proyecto. No se detectaron problemas de seguridad. |

---

### Instancia 3: Soporte continuo como tutor de desarrollo

| Campo | Detalle |
|---|---|
| **Herramienta** | OpenCode (Claude) |
| **Tarea** | Asistencia constante durante todo el desarrollo: depuración de errores, implementación de componentes, diseño responsive, correcciones de bugs y optimización de código |
| **Prompt** | (Múltiples prompts a lo largo del desarrollo, ej: "El panel admin se ve cortado en mobile, cómo lo arreglo?", "Agregá un formulario de contacto con validación", "Las flechas de la galería no me gustan, mejorá el diseño") |
| **Resultado** | Se resolvieron problemas de responsive (filtros del admin en mobile), se crearon componentes como ModalReserva, CardHabitacion, Galeria, Navbar, Footer, se implementaron skeleton loaders, se mejoró la estética de la galería con iconos SVG, entre otros. |
| **Revisión** | Cada fragmento de código generado fue revisado antes de integrarlo: se verificaron tipos de TypeScript, se comprobó que no hubiera funciones deprecadas, se aseguró que las claves de API nunca quedaran hardcodeadas y que los formularios tuvieran validación del lado del cliente. |

---

## Skills y Tool Calling

### ¿Qué es una Skill?

Una **Skill** (habilidad) es una capacidad específica que un asistente de IA puede ejecutar para interactuar con el entorno, ya sea leyendo archivos, escribiendo código, ejecutando comandos o buscando información. A diferencia de un modelo de lenguaje tradicional que solo genera texto, una Skill le permite a la IA **actuar** sobre el sistema, convirtiéndola en una herramienta de desarrollo interactiva.

### Flujo técnico de 4 pasos

1. **Definición:** Se declara una función con un nombre, una descripción y sus parámetros esperados. Por ejemplo: `write(filePath: string, content: string)` para escribir archivos, `bash(command: string)` para ejecutar comandos, `read(filePath: string)` para leer archivos.

2. **Intención:** El modelo de IA analiza el mensaje del usuario y determina qué Skill es la más adecuada para cumplir la tarea. Por ejemplo, si el usuario dice "Creá un archivo robots.txt", la IA identifica que debe usar la Skill `write`.

3. **Argumento:** La IA genera los argumentos necesarios para ejecutar la Skill, respetando el esquema definido. Por ejemplo: `{ filePath: "public/robots.txt", content: "User-agent: *\nAllow: /" }`.

4. **Ejecución:** La Skill se ejecuta en el entorno real del usuario (su sistema de archivos, su terminal, etc.) y devuelve un resultado que la IA procesa para continuar la conversación o realizar acciones adicionales.

### Vectores de seguridad principales

Cuando la IA tiene acceso a Skills que modifican el sistema, existen tres vectores de seguridad críticos:

1. **Permisos de archivos:** La IA podría leer, modificar o eliminar archivos sensibles del sistema si no se limitan las rutas accesibles. Es fundamental restringir el alcance a la carpeta del proyecto y excluir archivos como `.env`, `node_modules` o claves privadas.

2. **Ejecución de comandos:** La IA puede ejecutar comandos en la terminal del usuario. Sin controles adecuados, podría instalar paquetes maliciosos, ejecutar scripts no verificados o modificar configuraciones del sistema. Las Skills deben validar los comandos y limitar los permisos.

3. **Exposición de datos:** La IA podría enviar información del proyecto (código, credenciales, datos de clientes) a servidores externos si no se controla el acceso a la red. Las Skills deben garantizar que la información sensible nunca salga del entorno local sin autorización explícita del usuario.

---

## Reflexión crítica

El uso de inteligencia artificial como asistente de desarrollo transformó por completo la forma en que abordé este proyecto. Al principio, tenía dudas sobre qué tecnologías elegir y cómo estructurar el sitio. La IA me ayudó a definir un stack moderno y coherente con los requisitos académicos, ahorrándome horas de investigación.

Durante la fase de implementación, la IA funcionó como un tutor permanente: cuando me trababa con un bug de responsive, cuando necesitaba crear un componente nuevo o cuando quería mejorar la estética de algún elemento, podía pedir ayuda y obtener soluciones concretas en segundos. Esto aceleró enormemente el desarrollo y me permitió concentrarme en las decisiones de diseño en lugar de perder tiempo en problemas técnicos.

Sin embargo, no todo fue beneficioso. En algunas ocasiones, el código generado requería ajustes manuales porque no consideraba casos borde específicos del proyecto. Por ejemplo, al implementar el formulario de contacto, la primera versión no manejaba correctamente los errores de conexión con la base de datos. También tuve que revisar cuidadosamente que no se introdujeran dependencias innecesarias o funciones deprecadas.

La experiencia me enseñó que la IA es una herramienta poderosa, pero no reemplaza el criterio del desarrollador. Cada fragmento de código debe ser revisado, comprendido y adaptado al contexto del proyecto. El verdadero valor está en saber qué preguntar y cómo validar las respuestas, no en delegar ciegamente. A futuro, integraría la IA de forma más estructurada, documentando cada interacción y manteniendo un equilibrio entre automatización y control manual.

---

> Anterior: [Changelog](06-changelog.md) | Volver al [README](../README.md)
