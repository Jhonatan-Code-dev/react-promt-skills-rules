---
name: react-refactor-optimizer
description: >-
  Audita y refactoriza componentes o ficheros de React para mejorar su rendimiento,
  legibilidad, seguridad de tipos en TypeScript y adherencia a la arquitectura FSD.
---

# React Refactor & Optimizer Skill

Metodología paso a paso para auditar y transformar código legacy o ineficiente en React.

---

## Metodología de Auditoría

1. **Detección de Prop Drilling**: Identificar props pasadas en profundidad y refactorizar con composición o estado en `model/`.
2. **Auditoría FSD**: Verificar si el componente viola la regla de inyección descendente o si oculta su interfaz detrás de `index.ts`.
3. **Simplificación de Estados**: Extraer lógica de estado a Custom Hooks en `model/`.
