# React Rules & Skills Suite (`react-promt-skills-rules`)

Colección estandarizada de Reglas (Rules) y Habilidades (Skills) para optimizar la asistencia de desarrollo con AI (Antigravity IDE / AGY CLI / Gemini) en cualquier proyecto frontend con React, Vite y Tailwind CSS, utilizando Feature-Sliced Design (FSD), Clean Architecture y estándares ISO.

---

## Contenido del Repositorio

```text
react-promt-skills-rules/
├── rules/
│   ├── react-vite-tailwind-design-system.md # Sistema de Diseño Experto React + Vite + Tailwind CSS 100%
│   ├── react-code-ethics-and-order.md       # Orden Extremo, Prohibición de Emojis, Veracidad y Estándares ISO
│   ├── react-fsd-architecture.md             # Arquitectura Feature-Sliced Design
│   ├── react-clean-architecture.md           # Principios de Arquitectura Limpia
│   ├── react-typescript-standards.md         # Estándares estrictos de TypeScript
│   ├── react-performance-standards.md        # Rendimiento y memoización
│   └── react-state-management.md             # Gestión de estado (Zustand/React Query)
├── skills/
│   ├── react-ui-design-expert/               # Habilidad Experta en Diseño UI React + Vite + Tailwind CSS
│   ├── react-professional-auditor/           # Habilidad de Auditoría Extrema e ISO
│   ├── react-component-builder/              # Constructor asistido de componentes UI
│   ├── react-refactor-optimizer/             # Refactorizador de código legacy
│   └── react-custom-hook-creator/            # Creador de Custom Hooks
├── plugin.json                              # Manifiesto de Plugin para Antigravity
├── install.js                               # Script ejecutable en Node.js (Multiplataforma)
├── install.ps1                              # Script para PowerShell (Windows)
└── install.sh                               # Script para Bash (Linux/macOS)
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
   - Al editar cualquier archivo React (`.tsx`, `.jsx`), Antigravity aplicará automáticamente las directrices de React + Vite, 100% clases de Tailwind CSS sin CSS puro, diseño responsivo fluido (ultra mobile-first), semántica HTML5 experta, tipografía escalable, paletas de colores profesionales y estética humana anti-AI sin emojis.

2. **Skills a Demanda**:
   - Para diseñar interfaces de usuario profesionales en React + Vite + Tailwind CSS: `react-ui-design-expert`.
   - Para auditar código con rigor extremo e ISO: `react-professional-auditor`.
   - Para crear componentes de UI: `react-component-builder`.
   - Para auditar o refactorizar código legacy: `react-refactor-optimizer`.
   - Para crear custom hooks: `react-custom-hook-creator`.

---

## Licencia

MIT - Libre para usar, modificar y distribuir en cualquier proyecto.
