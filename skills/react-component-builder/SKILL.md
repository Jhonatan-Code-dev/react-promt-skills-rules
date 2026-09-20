---
name: react-component-builder
description: >-
  Asiste paso a paso en la creación de componentes de React limpios, tipados con TypeScript,
  responsivos, accesibles (a11y) y estructurados según las mejores prácticas de FSD y Clean Architecture.
---

# React Component Builder Skill

Esta habilidad guía al asistente en la construcción de componentes React de nivel producción.

---

## Proceso de Creación Paso a Paso

1. **Definición de la Interfaz de Props**:
   - Identificar propiedades requeridas y opcionales.
   - Incluir soporte para eventos estándar (ej. `onClick`, `onChange`, `className`).

2. **Implementación del Componente**:
   - Componentes funcionales sin `React.FC`.
   - Destructuring con valores por defecto para props opcionales.
   - Atributos ARIA para accesibilidad (`aria-label`, `role`).

3. **Validación de Edge Cases**:
   - Manejo de datos `null`, `undefined` o arreglos vacíos.
   - Estados de carga (Skeleton) y vacíos.
