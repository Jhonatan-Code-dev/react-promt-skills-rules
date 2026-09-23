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
| `react-mobile-system-bars-and-safe-areas.md` | Gobernanza estricta de Safe Areas, Status Bar (Apple HIG y Android 15 Edge-to-Edge), cámara y batería/wifi. |

---

## Catálogo de Habilidades (`skills/`)

| Habilidad | Propósito y Caso de Uso |
| :--- | :--- |
| `react-safe-area-system-bars-expert` | Auditoría y blindaje de cabeceras, modales y layouts contra cámara frontal, Dynamic Island y barras de estado. |
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
├── rules/             # 20 Reglas estandarizadas de gobernanza técnica
├── skills/            # 16 Habilidades especializadas para asistentes AI
├── package.json       # Manifiesto ejecutable para distribución NPX / NPM
├── plugin.json        # Manifiesto de integración para Antigravity IDE
├── install.js         # Script ejecutable multiplataforma (Node.js)
├── install.ps1        # Script de instalación para Windows PowerShell
├── install.sh         # Script de instalación para Linux y macOS
└── LICENSE            # Licencia pública MIT libre y gratuita
```

---

## Prompts Maestros Oficiales (Uso Directo)

Puedes copiar y pegar estos prompts en cualquier sesión de chat con un asistente de inteligencia artificial o agregarlos a las instrucciones del sistema en cualquier IDE:

### 1. Prompt Maestro: Zonas Seguras y Barras de Sistema (iOS / Android)

```text
DIRECTIVA ESTRICTA DE GOBERNANZA MÓVIL: RESPETO ABSOLUTO DE BARRAS DE SISTEMA Y SAFE AREAS (iOS / ANDROID)

Se exige el cumplimiento riguroso de las directrices Apple Human Interface Guidelines (iOS) y Google Material Design 3 (Android 15 Edge-to-Edge). Queda terminantemente prohibido generar interfaces móviles donde los elementos visuales, títulos, botones de retroceso, logotipos, campos de búsqueda o acciones queden tapados, recortados o solapados por la cámara frontal (notch, orificio punch-hole, Isla Dinámica), barra de estado del sistema (reloj, notificaciones), o indicadores de batería y señal Wi-Fi.

REGLAS DE OBLIGATORIO CUMPLIMIENTO:
1. En index.html es mandatorio el metatag: <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />.
2. Arquitectura 'Bleed Background, Inset Content': El fondo o desenfoque de la cabecera debe sangrar hasta el borde físico superior (top: 0), pero todos los elementos interactivos e informativos deben tener padding-top estricto mediante pt-[env(safe-area-inset-top)].
3. Modales y Paneles Deslizables: Ningún modal a pantalla completa o drawer lateral puede posicionar botones de cierre ('X') con coordenadas absolutas sin considerar safe-area-inset-top. Todo modal debe poseer una barra de control con relleno seguro.
4. Tamaños Táctiles Mínimos: Todo control interactivo ubicado en barras superiores debe medir al menos 44x44px para evitar colisión con los gestos del sistema (Centro de Control en iOS, Notificaciones en Android).
5. Rotación Horizontal: Respetar recortes laterales de cámara mediante pl-[env(safe-area-inset-left)] y pr-[env(safe-area-inset-right)].
6. Código 100% TypeScript estricto, sin any, sin @ts-ignore, sin React.FC y con clases Tailwind validadas.
```

### 2. Prompt Maestro: Eliminación Total de Auto-Zoom en iPhone (Safari e iOS PWA)

```text
DIRECTIVA DE GOBERNANZA: ELIMINACIÓN TOTAL DE AUTO-ZOOM EN IPHONE (SAFARI, PWA Y WEBVIEW)

Queda estrictamente prohibido generar campos de formulario (<input>, <select>, <textarea>) que provoquen auto-zoom al recibir foco en iPhone (iOS Safari, PWA instalada en Home Screen o WebViews).

REGLAS OBLIGATORIAS:
1. Tamaño Mínimo de 16px: Todo input, select y textarea DEBE tener la clase 'text-base' (16px) como estilo base para móviles. Solo está permitido reducir a 'sm:text-sm' o 'md:text-sm' a partir de pantallas de escritorio (sm: o md:).
2. Prohibición de Fuentes Menores a 16px en Móvil: Queda prohibido el uso de 'text-xs' (12px) o 'text-sm' (14px) directamente en campos de entrada móviles sin prefijo responsivo.
3. Clase touch-manipulation: Todos los botones, campos de entrada y controles interactivos deben incluir 'touch-manipulation' para evitar el retardo táctil de 300ms y el doble-tap zoom.
4. Salvaguarda CSS Global: Asegurar en la capa de estilos base la regla '@supports (-webkit-touch-callout: none)' forzando font-size: 16px en max-width: 767px.
5. Código 100% TypeScript estricto, sin any, sin @ts-ignore y con accesibilidad WCAG 2.1 AA.
```

---

## Integración con Asistentes AI

Una vez instalada la carpeta `.agents/` en tu proyecto o registrada globalmente:

1. **Reglas Automáticas**: Antigravity y Gemini aplican de forma pasiva y continua todas las normas de TypeScript estricto, orden de archivos, gobernanza Tailwind y directivas de seguridad en cada edición de código.
2. **Invocación de Habilidades**: Puedes activar cualquiera de las 16 habilidades solicitándolo explícitamente en la interacción (ejemplo: *"Aplica la habilidad react-safe-area-system-bars-expert para blindar la cabecera móvil"*).

---

## Licencia Libre (MIT)

Este proyecto es software de código abierto distribuido bajo la **Licencia MIT**. Es 100% **libre y gratuito** para su uso, modificación, distribución e integración en cualquier proyecto comercial o privado sin restricciones.

