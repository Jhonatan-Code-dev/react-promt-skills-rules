# Directivas Maestras y Gobernanza Técnica para Asistentes AI y Desarrolladores

Este archivo define las reglas obligatorias e inviolables que la Inteligencia Artificial (Antigravity IDE, AGY CLI, Gemini) y cualquier desarrollador DEBEN cumplir de forma estricta y automática en cada interacción, generación de código, refactorización o auditoría dentro de este proyecto y en los proyectos donde se instale este repositorio.

---

## 1. Obligatoriedad Incondicional de la Suite de Reglas y Habilidades

Toda respuesta, modificación o adición de código debe acatar de manera simultánea e intransigente los estándares definidos en las carpetas `rules/` y `skills/`:

### A. Cumplimiento Obligatorio de Reglas (`rules/`)
1. **`react-code-ethics-and-order.md`**: Anatomía quirúrgica de 5 bloques en cada archivo `.ts`/`.tsx`, orden alfabético de importaciones categorizadas, cero código muerto y cero comentarios innecesarios.
2. **`react-strict-typescript-only.md`**: Prohibición total de JavaScript plano (`.js`, `.jsx`). 100% TypeScript estricto, sin `any`, sin `@ts-ignore` y sin `React.FC`.
3. **`react-toggle-switch-and-table-stability.md`**: Para estados booleanos en tablas:
   - Toggle Switch deslizante con `role="switch"` y `aria-checked`.
   - UI Optimista inmediata (0ms) en memoria sin spinners que desmonten la tabla ni generen parpadeo.
   - Cero desplazamiento (Anti-Layout Shift): `table-fixed`, anchos en `<th>` y contenedor de ancho rígido (`w-14 text-left`) para las etiquetas "Activo"/"Inactivo".
   - Control Anti-Toast Stacking con `id` fijo en cada toast y bloqueo temporal anti-doble clic (`togglingId`).
4. **`react-viewport-fit-sticky-pagination.md`**: En tablas y módulos administrativos:
   - Ajuste al 100% de la altura visible (`100dvh` / `h-full` con `overflow-hidden` en el contenedor padre).
   - Scroll interno aislado exclusivamente en el contenedor de datos (`flex-1 min-h-0 overflow-y-auto`).
   - Cabecera fija (`thead sticky top-0 z-10`).
   - Barra de paginación anclada de forma fija al fondo (`shrink-0` / `sticky bottom-0 z-10`) con compatibilidad para Safe Area (`pb-[env(safe-area-inset-bottom)]`).
5. **`react-mobile-viewport-safe-area.md`**: Prevención de auto-zoom en inputs (fuente mínima de 16px / `text-base`), atributos `touch-manipulation` y respeto de recortes físicos de cámara e isla dinámica (`safe-area-inset-*`).
6. **`react-fsd-architecture.md`**: Arquitectura Feature-Sliced Design estricta con importaciones unidireccionales entre capas (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).
7. **`react-clean-architecture.md`**: Desacoplamiento riguroso entre lógica de dominio, interfaces de repositorio, casos de uso y componentes UI.
8. **`react-multitenant-standards.md`**: Aislamiento dinámico de almacenamiento local por inquilino y cabecera `X-Tenant-ID`.
9. **`react-reverse-proxy-architecture.md`**: Proxies inversos configurados para desarrollo (Vite) y producción (Nginx / Caddy), evitando exposición indebida de URLs de backend.
10. **`react-tailwind-architecture-and-governance.md`**: Gobernanza de clases de utilidad mediante el helper `cn()` y prohibición de valores arbitrarios injustificados.
11. **`react-tailwind-theme-and-variables.md`**: Variables CSS dinámicas nativas para soportar temas claros, oscuros y personalizaciones corporativas.
12. **`react-tailwind-mobile-first-breakpoints.md`**: Enfoque Mobile-First estricto (`min-width`) sin sobrescrituras destructivas para pantallas grandes.
13. **`react-tailwind-mobile-first-practices.md`**: Objetivos táctiles mínimos de 44px e interacciones optimizadas para dedos.
14. **`react-typescript-advanced-best-practices.md`**: Aplicación de los 20 patrones avanzados de tipado, uniones discriminadas y guardias de tipo exhaustivas.
15. **`react-typescript-standards.md`**: Tipado explícito y exhaustivo de props, estados y eventos sintéticos de React.
16. **`react-golang-api-tanstack-query.md`**: Consumo de APIs REST Golang mediante TanStack Query, tipado inferido, mutaciones optimistas y control de cache.
17. **`react-vite-tailwind-design-system.md`**: Principios de diseño atómico, tokens visuales y consistencia estética.
18. **`react-performance-standards.md`**: Memoización selectiva y justificada con `useMemo` y `useCallback`, evitando re-renderizados innecesarios.
19. **`react-state-management.md`**: Separación inequívoca entre estado local (`useState`), estado global cliente (Zustand) y estado de servidor (TanStack Query).

### B. Aplicación Activa de Habilidades (`skills/`)
La IA debe adoptar automáticamente el rol y los procedimientos técnicos de las siguientes habilidades ante requerimientos afines:
- **`react-toggle-switch-expert`**: Al diseñar, auditar o refactorizar columnas de estado e interruptores en grillas de datos.
- **`react-viewport-fit-pagination-expert`**: Al diseñar pantallas de gestión, catálogos, maestros o tablas administrativas con paginación anclada.
- **`react-mobile-viewport-auditor`**: Al auditar formularios, inputs móviles y safe area insets.
- **`react-professional-auditor`**: Al evaluar mantenibilidad, accesibilidad (WCAG 2.1 AA) y estándares ISO.
- **`react-component-builder`**: Al crear nuevos componentes aislados, modulares y tipados.
- **`react-refactor-optimizer`**: Al limpiar deuda técnica y reorganizar código desestructurado.
- **`react-custom-hook-creator`**: Al encapsular lógica de estado y efectos secundarios reutilizables.
- **`react-golang-integration`**: Al integrar endpoints y servicios de backend en Go.
- **`react-multitenant-architecture`**: Al implementar SaaS multi-inquilino y marcas dinámicas.
- **`react-reverse-proxy-expert`**: Al auditar y conectar proxies locales o de producción.
- **`react-tailwind-architecture-expert`**: Al gobernar tokens visuales y hojas de estilos globales.
- **`react-tailwind-responsive-architect`**: Al estructurar maquetas responsivas adaptables.
- **`react-tailwind-mobile-expert`**: Al pulir micro-interacciones táctiles en pantallas móviles.
- **`react-typescript-expert`**: Al resolver genéricos complejos y contratos de interfaz.
- **`react-ui-design-expert`**: Al concebir interfaces modernas, sobrias y de alto impacto estético.

---

## 2. Directivas Fundamentales de Conducta y Comunicación

1. **Idioma Español Garantizado**: Todas las interacciones, explicaciones, documentación, comentarios de código y respuestas DEBEN redactarse en **Español técnico, formal, claro y profesional**.
2. **Prohibición Total de JavaScript (100% TypeScript)**: Prohibida la creación o uso de archivos JavaScript plano (`.js`, `.jsx`). Todo el código debe ser exclusivamente TypeScript estricto (`.ts`, `.tsx`).
3. **Veracidad Absoluta**: Prohibido asumir comportamientos no verificados, inventar librerías inexistentes o disimular fallas técnicas. La transparencia y precisión son obligatorias.
4. **Obsesión por el Orden Extremo**: Pulcritud quirúrgica en nomenclatura (`kebab-case` en archivos, `PascalCase` en componentes, `camelCase` en funciones y variables), cero código muerto y cero comentarios en desuso.
5. **Prohibición Estricta de Emojis**: Queda terminantemente prohibido el uso de emojis en cualquier explicación, documentación, comentario de código, nombre de archivo o salida de consola. La estética debe ser 100% profesional, sobria y austera.
6. **Cumplimiento ISO**: Respetar permanentemente las directrices ISO/IEC 25010 (Calidad y Mantenibilidad del Software) e ISO/IEC 40500 (Accesibilidad Web WCAG 2.1 AA).

---

## 3. Compatibilidad Antigravity / AGY e Instalabilidad

- Todos los archivos dentro de `rules/` y `skills/` deben mantener rutas relativas e inmutabilidad estructural para permitir su copiado automático mediante el script `install.js` tanto a nivel local (`.agents/`) como global (`~/.gemini/config/`).
