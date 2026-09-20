# React Rules & Skills Suite (`react-promt-skills-rules`)

Colección estandarizada de Reglas (Rules) y Habilidades (Skills) para optimizar la asistencia de desarrollo con AI (Antigravity IDE / AGY CLI / Gemini) en cualquier proyecto frontend con React, Vite, Tailwind CSS (Gobernanza a gran escala, Tematización con Variables CSS, Mobile-First y Breakpoints), prohibición total de JavaScript (100% TypeScript estricto), 20 Buenas Prácticas Avanzadas de TypeScript, control de Viewport Móvil (Safe Area y Prevención de Auto-Zoom) y consumo de backend en Golang mediante TanStack Query, utilizando Feature-Sliced Design (FSD), Clean Architecture y estándares ISO.

---

## Contenido del Repositorio

```text
react-promt-skills-rules/
├── rules/
│   ├── react-tailwind-theme-and-variables.md    # Tematización Dinámica con Variables CSS, Purga Eficiente y ESLint
│   ├── react-tailwind-architecture-and-governance.md # Gobernanza a Gran Escala (cn helper, prohibición de @apply y valores arbitrarios)
│   ├── react-tailwind-mobile-first-breakpoints.md # Arquitectura Responsiva Mobile-First y Matriz de Breakpoints
│   ├── react-strict-typescript-only.md          # Prohibición Total de JavaScript y Obligatoriedad 100% TypeScript (.ts/.tsx)
│   ├── react-tailwind-mobile-first-practices.md # Mejores Prácticas de Diseño Móvil con Tailwind CSS (Touch targets 44px, etc.)
│   ├── react-typescript-advanced-best-practices.md # 20 Buenas Prácticas Avanzadas de TypeScript
│   ├── react-mobile-viewport-safe-area.md           # Viewport Móvil, Prevención de Auto-Zoom e Insets de Cámara/Notch
│   ├── react-golang-api-tanstack-query.md           # Consumo de Backend Golang REST con TanStack Query
│   ├── react-vite-tailwind-design-system.md         # Sistema de Diseño Experto React + Vite + Tailwind CSS 100%
│   ├── react-code-ethics-and-order.md               # Orden Extremo, Prohibición de Emojis, Veracidad y Estándares ISO
│   ├── react-fsd-architecture.md                     # Arquitectura Feature-Sliced Design
│   ├── react-clean-architecture.md                   # Principios de Arquitectura Limpia
│   ├── react-typescript-standards.md                 # Estándares estrictos de TypeScript
│   ├── react-performance-standards.md                # Rendimiento y memoización
│   └── react-state-management.md                     # Gestión de estado (Zustand/React Query)
├── skills/
│   ├── react-tailwind-architecture-expert/           # Habilidad Experta en Gobernanza y Arquitectura Tailwind CSS
│   ├── react-tailwind-responsive-architect/          # Habilidad Experta en Arquitectura Responsiva Mobile-First
│   ├── react-tailwind-mobile-expert/                 # Habilidad Experta en Diseño Móvil con Tailwind CSS
│   ├── react-typescript-expert/                      # Habilidad Experta en 20 Buenas Prácticas de TypeScript
│   ├── react-mobile-viewport-auditor/                # Habilidad de Auditoría de Viewport Móvil y Safe Area
│   ├── react-golang-integration/                     # Habilidad de Integración y Consumo de Backend Golang
│   ├── react-ui-design-expert/                       # Habilidad Experta en Diseño UI React + Vite + Tailwind CSS
│   ├── react-professional-auditor/                   # Habilidad de Auditoría Extrema e ISO
│   ├── react-component-builder/                      # Constructor asistido de componentes UI
│   ├── react-refactor-optimizer/                     # Refactorizador de código legacy
│   └── react-custom-hook-creator/                    # Creador de Custom Hooks
├── plugin.json                                      # Manifiesto de Plugin para Antigravity
├── install.js                                       # Script ejecutable en Node.js (Multiplataforma)
├── install.ps1                                      # Script para PowerShell (Windows)
└── install.sh                                       # Script para Bash (Linux/macOS)
```

---

## Cómo Importar en Cualquier Proyecto

Puedes utilizar este repositorio en cualquier proyecto React mediante 3 métodos sencillos:

### Método 1: Script de Instalación Automático (Recomendado)

Desde la terminal del proyecto React donde quieras instalar las reglas:

```bash
node path/to/react-promt-skills-rules/install.js .
```

Esto creará automáticamente la carpeta `.agents/` en el proyecto destino con todas las reglas y habilidades listadas.

---

### Método 2: Instalación Global en la Máquina (Para todos los proyectos)

Si deseas que estas reglas y habilidades estén disponibles automáticamente en cualquier proyecto que abras en tu equipo:

```bash
# Usando Node.js
node install.js --global

# O en Windows PowerShell
.\install.ps1 -Global

# O en Linux/macOS
./install.sh --global
```

Las reglas se instalarán en `~/.gemini/config/`.

---

### Método 3: Copiado Manual o Submódulo Git

```bash
mkdir -p .agents
cp -r path/to/react-promt-skills-rules/rules .agents/
cp -r path/to/react-promt-skills-rules/skills .agents/
```

---

## Cómo Actuarán el Asistente y Antigravity con estas Reglas

1. **Automatic Rules (Siempre Activas)**:
   - Al editar cualquier archivo React (`.tsx`, `.ts`), Antigravity aplicará automáticamente la gobernanza de Tailwind CSS a gran escala (helper `cn()` con `clsx` y `tailwind-merge`, prohibición de `@apply` y valores arbitrarios), tematización con variables CSS, purga en producción, linting con ESLint, metodología Mobile-First, prohibición de JavaScript plano (`.js`/`.jsx`), las 20 buenas prácticas de TypeScript, prevención de auto-zoom en móviles, safe area insets, consumo de backend Golang con TanStack Query, arquitectura FSD y orden extremo sin emojis.

2. **Skills a Demanda**:
   - Para estructurar componentes UI reutilizables y tematizar con Tailwind CSS: `react-tailwind-architecture-expert`.
   - Para maquetar y auditar interfaces responsivas Mobile-First: `react-tailwind-responsive-architect`.
   - Para maquetar y auditar interfaces móviles con Tailwind CSS: `react-tailwind-mobile-expert`.
   - Para auditar y estructurar tipos complejos en TypeScript: `react-typescript-expert`.
   - Para auditar y corregir problemas de zoom o solapamiento en móviles: `react-mobile-viewport-auditor`.
   - Para integrar y consumir endpoints de un backend en Golang: `react-golang-integration`.
   - Para diseñar interfaces de usuario profesionales en React + Vite + Tailwind CSS: `react-ui-design-expert`.
   - Para auditar código con rigor extremo e ISO: `react-professional-auditor`.
   - Para crear componentes de UI: `react-component-builder`.
   - Para auditar o refactorizar código legacy: `react-refactor-optimizer`.
   - Para crear custom hooks: `react-custom-hook-creator`.

---

## Licencia

MIT - Libre para usar, modificar y distribuir en cualquier proyecto.
