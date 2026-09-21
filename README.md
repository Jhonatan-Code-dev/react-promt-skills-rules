# Suite de Reglas y Habilidades para React (`react-promt-skills-rules`)

Paquete centralizado de gobernanza técnica, arquitectura de software y habilidades avanzadas para desarrollo empresarial con React, TypeScript y Tailwind CSS, optimizado para asistentes de inteligencia artificial (Antigravity IDE, AGY CLI y Gemini).

---

## Inicio Rápido

Instala de forma instantánea el conjunto de reglas y habilidades en la raíz de cualquier proyecto React mediante `npx`:

### Instalación en Proyecto (Recomendado)

```bash
npx github:Jhonatan-Code-dev/react-promt-skills-rules
```

*Crea la carpeta `.agents/` en el proyecto activo con la suite completa de reglas y habilidades configuradas.*

### Instalación Global

```bash
npx github:Jhonatan-Code-dev/react-promt-skills-rules --global
```

---

## Actualización a la Última Versión

Si agregas o modificas reglas en este repositorio, cualquier usuario puede actualizar sus proyectos a la versión más reciente **re-ejecutando el comando con el tag `@latest`**:

- **Actualizar en un proyecto local**:
  ```bash
  npx github:Jhonatan-Code-dev/react-promt-skills-rules@latest
  ```

- **Actualizar la instalación global en la máquina**:
  ```bash
  npx github:Jhonatan-Code-dev/react-promt-skills-rules@latest --global
  ```

*El instalador reemplazará automáticamente los archivos de la carpeta `.agents/rules/` y `.agents/skills/` con las últimas actualizaciones publicadas en GitHub.*


---

## Pilares de Arquitectura y Gobernanza

El paquete impone estándares de ingeniería rigurosos basados en normativas internacionales:

- **TypeScript Estricto (100%)**: Prohibición total de JavaScript plano (`.js`/`.jsx`). Cero tolerancia a `any` o `@ts-ignore`.
- **Feature-Sliced Design (FSD)**: Estructuración modular por capas (`app`, `pages`, `widgets`, `features`, `entities`, `shared`).
- **Arquitectura SaaS Multi-Tenant**: Aislamiento dinámico de datos, interceptores HTTP con `X-Tenant-ID` y tematización *white-labeling*.
- **Diseño Mobile-First y Viewport**: Objetivos táctiles mínimos de 44px, prevención de auto-zoom e integración de insets (*Safe Area*).
- **Integración Backend Golang**: Consumo seguro mediante TanStack Query, cliente HTTP desacoplado y Reverse Proxy (Vite / Nginx / Caddy).
- **Cumplimiento ISO**: Alineación con ISO/IEC 25010 (Mantenibilidad) e ISO/IEC 40500 (Accesibilidad Web WCAG 2.1 AA).

---

## Catálogo de Reglas (`rules/`)

| Regla | Descripción |
| :--- | :--- |
| `react-code-ethics-and-order.md` | Anatomía estricta de 5 bloques por archivo, orden de importaciones y cero emojis. |
| `react-strict-typescript-only.md` | Obligatoriedad exclusiva de archivos `.ts` / `.tsx` y tipos estrictos. |
| `react-multitenant-standards.md` | Directivas de aislamiento de almacenamiento local y control de módulos por inquilino. |
| `react-fsd-architecture.md` | Reglas de encapsulamiento e importaciones unidireccionales por capas FSD. |
| `react-clean-architecture.md` | Desacoplamiento de lógica de negocio, interfaces de repositorio y casos de uso. |
| `react-reverse-proxy-architecture.md` | Configuración de proxy inverso para desarrollo (Vite) y producción (Nginx / Caddy). |
| `react-tailwind-architecture-and-governance.md` | Gobernanza de clases CSS, helper `cn()` y prohibición de valores arbitrarios. |
| `react-tailwind-theme-and-variables.md` | Sistema de temas dinámicos mediante variables CSS nativas y purga de assets. |
| `react-tailwind-mobile-first-breakpoints.md` | Matriz de puntos de interrupción y diseño responsivo sin sobrescrituras desktop. |
| `react-tailwind-mobile-first-practices.md` | Estándares de interacción táctil, padding dinámico y optimización móvil. |
| `react-typescript-advanced-best-practices.md` | 20 patrones avanzados de tipado, uniones discriminadas y guardias de tipo. |
| `react-typescript-standards.md` | Tipado de eventos sintéticos React, props e interfaces explícitas. |
| `react-mobile-viewport-safe-area.md` | Manejo de recortes de cámara, barra de estado y comportamiento del viewport. |
| `react-golang-api-tanstack-query.md` | Cliente HTTP con tipos inferidos, caching y mutaciones optimistas. |
| `react-vite-tailwind-design-system.md` | Reglas de componentes UI, diseño atómico y coherencia visual. |
| `react-performance-standards.md` | Estrategias de memoización consciente (`useMemo`, `useCallback`) y bundle size. |
| `react-state-management.md` | Criterios de delimitación entre estado local, global (Zustand) y de servidor. |
| `react-viewport-fit-sticky-pagination.md` | Layout 100% viewport-fit, scroll interno aislado y paginación fija al fondo. |
| `react-toggle-switch-and-table-stability.md` | Interruptor deslizante, UI optimista (0ms), table-fixed y control anti-toast. |

---

## Catálogo de Habilidades (`skills/`)

| Habilidad | Propósito y Caso de Uso |
| :--- | :--- |
| `react-multitenant-architecture` | Implementación de SaaS multinquilino, resolución de tenant y marcas dinámicas. |
| `react-golang-integration` | Creación de clientes de API REST y hooks de consulta para backends Golang. |
| `react-reverse-proxy-expert` | Auditoría y configuración de proxies inversos en Vite Dev Server, Nginx y Caddy. |
| `react-tailwind-architecture-expert` | Configuración de sistemas de tokens visuales y gobernanza de estilos. |
| `react-tailwind-responsive-architect` | Maquetación y auditoría de layouts responsivos Mobile-First. |
| `react-tailwind-mobile-expert` | Optimización de experiencia táctil y adaptabilidad móvil. |
| `react-typescript-expert` | Resolución de tipos complejos, genéricos y refactorización estricta. |
| `react-mobile-viewport-auditor` | Diagnóstico de zoom no deseado y solapamiento en pantallas móviles. |
| `react-ui-design-expert` | Construcción de interfaces profesionales de alto impacto visual. |
| `react-professional-auditor` | Auditoría de calidad de código, accesibilidad A11y y estándares ISO. |
| `react-component-builder` | Generación asistida de componentes React limpios e independientes. |
| `react-refactor-optimizer` | Conversión de código legado desorganizado a patrones modernos y ordenados. |
| `react-custom-hook-creator` | Extracción y encapsulamiento de lógica de estado en custom hooks. |
| `react-viewport-fit-pagination-expert` | Diseño y auditoría de layouts viewport-fit y paginación sticky bottom. |
| `react-toggle-switch-expert` | Implementación y auditoría de Toggle Switches estables y anti-toast stacking. |

---

## Estructura del Proyecto

```text
react-promt-skills-rules/
├── rules/             # 19 Reglas estandarizadas de gobernanza técnica
├── skills/            # 15 Habilidades especializadas para asistentes AI
├── package.json       # Manifiesto ejecutable para distribución NPX / NPM
├── plugin.json        # Manifiesto de integración para Antigravity IDE
├── install.js         # Script ejecutable multiplataforma (Node.js)
├── install.ps1        # Script de instalación para Windows PowerShell
├── install.sh         # Script de instalación para Linux y macOS
└── LICENSE            # Licencia pública MIT libre y gratuita
```

---

## Integración con Asistentes AI

Una vez instalada la carpeta `.agents/` en tu proyecto o registrada globalmente:

1. **Reglas Automáticas**: Antigravity y Gemini aplican de forma pasiva y continua todas las normas de TypeScript estricto, orden de archivos, gobernanza Tailwind y directivas de seguridad en cada edición de código.
2. **Invocación de Habilidades**: Puedes activar cualquiera de las 15 habilidades solicitándolo explícitamente en la interacción (ejemplo: *"Aplica la habilidad react-multitenant-architecture para configurar el contexto de inquilinos"*).

---

## Licencia Libre (MIT)

Este proyecto es software de código abierto distribuido bajo la **Licencia MIT**. Es 100% **libre y gratuito** para su uso, modificación, distribución e integración en cualquier proyecto comercial o privado sin restricciones.

