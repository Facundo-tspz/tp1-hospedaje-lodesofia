# Escalabilidad

## 1. Escalabilidad de Carga y Tráfico (RPS y Concurrencia)

### Patrón de tráfico estimado

El hospedaje "Lo de Sofía" está ubicado en Tinogasta, Catamarca, una ciudad del interior con una fuerte **estacionalidad turística**. Los picos de demanda ocurren en:

- **Enero y febrero** (temporada de verano): máxima afluencia de turistas.
- **Semana Santa** y feriados largos: alta demanda de alojamiento.
- **Fiestas patronales y eventos locales** (febrero): picos puntuales de visitantes.

Fuera de esas fechas, la demanda es baja y constante (viajeros de paso por la Ruta del Adobe).

### Peticiones por segundo (RPS)

Cada visita al sitio genera aproximadamente 5-10 peticiones (HTML, CSS, JS, imágenes, consultas a Supabase para habitaciones, galería, etc.). El cálculo estimado de RPS es:

| Período | Visitas diarias | Peticiones totales | RPS promedio | RPS pico |
|---|---|---|---|---|
| Temporada baja (lunes a viernes) | 10-30 | 100-300 | 0.01-0.05 | 0.5 |
| Fin de semana normal | 30-60 | 300-600 | 0.05-0.1 | 1-2 |
| Fin de semana largo | 50-100 | 500-1000 | 0.1-0.2 | 3-5 |
| Temporada alta (enero) | 100-200 | 1000-2000 | 0.2-0.5 | 5-10 |

**Conclusión:** El tráfico estimado es **muy bajo** para los estándares web. Incluso en el pico máximo teórico (10 RPS), un servidor básico maneja la carga sin dificultad. Netlify y Supabase no requieren configuración especial para estos volúmenes.

### Modelo de concurrencia del backend

Supabase utiliza **PostgreSQL con PgBouncer** (connection pooling) como mecanismo de concurrencia. Esto permite:

- Reutilizar conexiones a la base de datos en lugar de abrir una nueva por cada petición.
- Manejar cientos de conexiones simultáneas sin saturar el servidor de PostgreSQL.
- Escalar verticalmente si fuera necesario (plan de pago de Supabase).

El frontend React utiliza el modelo de **I/O asíncrono no bloqueante** de JavaScript: las peticiones `fetch()` a la API de Supabase se ejecutan en segundo plano mediante `async/await`, permitiendo que el usuario siga interactuando con la interfaz sin bloqueos.

> **Comparación:** En un modelo bloqueante (como PHP sin async), cada petición ocuparía un hilo del servidor hasta completarse. En nuestro modelo asíncrono, el hilo se libera mientras espera la respuesta de la base de datos, permitiendo atender más conexiones simultáneas con los mismos recursos.

### Diseño stateless

El frontend es completamente **stateless** (sin estado de servidor):

- La autenticación del admin se almacena en `sessionStorage` del navegador.
- No hay sesiones de servidor, cookies de sesión ni almacenamiento en disco del lado del backend.
- Cualquier instancia del frontend puede atender a cualquier usuario sin necesidad de sesiones compartidas.

Esto permite escalar horizontalmente de forma trivial: si el tráfico creciera, bastaría con servir el mismo frontend estático desde múltiples servidores CDN (Netlify ya lo hace automáticamente).

### Estrategia de caching

| Estrategia | Estado | Descripción |
|---|---|---|
| **CDN de Netlify** | ✅ Activo | Assets estáticos (JS, CSS, imágenes del build) servidos desde edge servers |
| **CDN de Supabase Storage** | ✅ Activo | Imágenes de habitaciones y galería servidas con caché HTTP |
| **Caching del navegador** | ✅ Activo | Recursos estáticos cacheados según cabeceras `Cache-Control` |
| **Redis** | ❌ Pendiente | Se podría implementar para cachear consultas frecuentes (lista de habitaciones, configuración) |
| **Service Worker** | ❌ Pendiente | Permitiría funcionamiento offline y carga instantánea en visitas repetidas (futura PWA) |

**¿Qué datos se cachearían con Redis?** En caso de implementarse, se cachearían:

- Lista de habitaciones (TTL 5 minutos) — reduce consultas a PostgreSQL.
- Configuración del sistema (TTL 1 hora) — el código secreto del admin y otras configuraciones.
- No se cachearían reservas (deben ser siempre consistentes).

---

## 2. Escalabilidad de Datos (Teorema CAP y Almacenamiento)

### Tipo de datos del proyecto

Todos los datos del proyecto son **estructurados y relacionales**:

| Tabla | Tipo de datos | Volumen estimado (5 años) |
|---|---|---|
| `habitaciones` | Maestro (catálogo) | ~12 filas |
| `reservas` | Transaccional | ~1.200 filas |
| `galeria` | Maestro (catalogo) | ~150 filas |
| `config` | Maestro (configuración) | ~5 filas |

### Elección SQL / NoSQL

Se eligió **PostgreSQL (SQL)** por las siguientes razones:

1. **Integridad referencial:** Las reservas deben asociarse a habitaciones existentes mediante clave foránea (`habitacion_id`).
2. **Consistencia transaccional:** Al aprobar una reserva, se actualiza la disponibilidad de la habitación en la misma operación.
3. **Consultas estructuradas:** Los filtros por estado de reserva, búsquedas por fecha y agrupaciones son consultas SQL directas.
4. **Madurez y confiabilidad:** PostgreSQL es un motor probado durante décadas, con amplia documentación y soporte.

NoSQL no es adecuado aquí porque los datos no son semi-estructurados ni requieren escalamiento horizontal masivo. El volumen de datos proyectado es mínimo para cualquier motor SQL.

### Postura ante el Teorema CAP

El sistema prioriza **Consistencia y Tolerancia a Particiones** (CP):

> **El Teorema CAP** establece que un sistema distribuido solo puede garantizar dos de las siguientes tres propiedades: Consistencia (C), Disponibilidad (A) y Tolerancia a Particiones (P).

| Propiedad | Prioridad | Justificación |
|---|---|---|
| **Consistencia (C)** | Alta | En un sistema de reservas, la consistencia es crítica. No se puede permitir que dos huéspedes reciban confirmación para la misma habitación en la misma fecha. PostgreSQL garantiza consistencia mediante transacciones ACID. |
| **Disponibilidad (A)** | Alta | El sitio debe estar accesible la mayor parte del tiempo. Sin embargo, ante una partición de red, se prefiere mostrar un error o degradar la experiencia antes que permitir datos inconsistentes. |
| **Tolerancia a Particiones (P)** | Alta | PostgreSQL maneja particiones mediante replicación. Supabase ofrece alta disponibilidad con failover automático en sus planes de pago. |

**Conclusión: CP (Consistencia + Tolerancia a Particiones)**

### Proyección de crecimiento de datos a 5 años

| Año | Reservas acumuladas | Imágenes | Almacenamiento estimado |
|---|---|---|---|
| 2025 (actual) | ~100 | ~30 | ~50 MB |
| 2026 | ~300 | ~50 | ~100 MB |
| 2027 | ~500 | ~80 | ~200 MB |
| 2028 | ~800 | ~100 | ~350 MB |
| 2029 | ~1.200 | ~150 | ~500 MB |

**Conclusión:** Incluso a 5 años, el volumen de datos es **mínimo**. No se requiere escalamiento horizontal de base de datos ni estrategias avanzadas de particionado (sharding). Una sola instancia de PostgreSQL maneja este volumen sin esfuerzo.

### Escalabilidad vertical vs. horizontal

| Tipo | Definición | Aplicación al proyecto |
|---|---|---|
| **Vertical (scale up)** | Aumentar los recursos de un servidor (más RAM, CPU, disco). | Supabase y Netlify lo manejan automáticamente. Si la base de datos creciera, se puede migrar a un plan con más recursos sin cambiar el código. |
| **Horizontal (scale out)** | Agregar más servidores y distribuir la carga entre ellos. | No es necesario para el volumen proyectado a 5 años. Si el proyecto creciera inesperadamente, el frontend estático permitiría distribuir la carga mediante el CDN de Netlify, y la base de datos podría replicarse con Supabase. |

**Punto Único de Fallo (SPOF):** El principal SPOF es la base de datos en Supabase. Si Supabase dejara de funcionar, el sitio mostraría datos cacheados (si se implementa caching) pero no podría procesar nuevas reservas. Mitigaciones:

- Supabase ofrece backups automáticos en todos los planes.
- Se puede migrar a un hosting propio de PostgreSQL si fuera necesario.
- El frontend estático puede seguir funcionando con datos cacheados aunque la BD esté caída temporalmente.

---

## 3. Justificación del Stack y Contexto Local

### Contexto de Tinogasta

Tinogasta es una ciudad del departamento homónimo en Catamarca, con aproximadamente 10.000 habitantes. Está ubicada sobre la Ruta Nacional 60 y la Ruta del Adobe, un corredor turístico que conecta con Fiambalá y los Andes.

**Características relevantes para el proyecto:**

| Factor | Impacto en el proyecto |
|---|---|
| **Conectividad a internet** | Moderada. Muchos turistas llegan con conexiones 3G/4G. El sitio debe cargar rápido y ser liviano. |
| **Estacionalidad turística** | Marcada. Picos en verano y feriados. El sistema debe soportar aumentos de tráfico sin intervención manual. |
| **Mantenimiento local** | No hay equipo técnico en el lugar. El sitio debe ser fácil de mantener y actualizar. |
| **Presupuesto** | Mínimo. Todas las herramientas deben ser gratuitas o de bajo costo. |

### Stack C — Jamstack (Elección final)

El proyecto implementa el **Stack C – Jamstack**, que consiste en:

- **J**avaScript (React + TypeScript) para la interactividad del lado del cliente.
- **A**PIs (Supabase) como backend descentralizado.
- **M**arkup pre-renderizado (Vite genera HTML estático en build).
- **CDN** (Netlify) para la entrega global del contenido.

**¿Por qué Jamstack para Tinogasta?**

| Requisito | Cómo lo cumple Jamstack |
|---|---|
| Carga rápida con conexiones lentas | HTML+CSS+JS estático servido desde CDN cercano al usuario |
| Sin costos de servidor | Netlify y Supabase tienen planes gratuitos generosos |
| Escalabilidad automática | Netlify maneja picos de tráfico sin configuración adicional |
| Mantenimiento remoto | El dueño gestiona contenido desde el panel admin; el código se actualiza con `git push` |
| Seguridad | Sin servidor propio = menor superficie de ataque. Autenticación por código secreto |
| Fácil de retomar | Stack popular con abundante documentación y comunidad |

### Stack A vs. Stack B vs. Stack C

| Aspecto | Stack A (Monolito Robusto) | Stack B (Alta Concurrencia) | Stack C (Jamstack) ✅ |
|---|---|---|---|
| Backend | Django / Laravel (monolítico) | Node.js + Express (async) | Supabase (BaaS) |
| Base de datos | PostgreSQL | MongoDB / PostgreSQL | PostgreSQL |
| Caching | Redis / Memcached | Redis | CDN + Redis futuro |
| Despliegue | VPS / Render | Render / Railway | Netlify (CDN) |
| Complejidad operativa | Alta (hay que mantener servidor) | Media | Baja (sin servidor) |
| Costo mensual | ~$5-10 USD (VPS) | ~$5-10 USD | $0 (planes gratuitos) |
| Adecuado para el proyecto | ❌ Sobredimensionado | ❌ Sobredimensionado | ✅ Perfecto |

---

> Anterior: [Stack Tecnológico](04-stack-tecnologico.md) | Siguiente: [Changelog](06-changelog.md) | Volver al [README](../README.md)
