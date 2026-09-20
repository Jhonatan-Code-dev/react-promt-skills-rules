---
name: react-typescript-expert
description: >-
  Audita, diseña y refactoriza tipos en proyectos React + Vite aplicando las 20 buenas prácticas avanzadas de TypeScript.
  Garantiza el uso estricto de comprobación de tipos, genéricos, type guards, utility tipos e inmutabilidad sin emojis.
---

# React TypeScript Expert Skill

Esta habilidad ayuda a revisar, estructurar y refactorizar cualquier módulo de React + TypeScript para asegurar el cumplimiento estricto de las 20 buenas prácticas de ingeniería de tipos.

---

## Metodología de Auditoría de Tipos

### 1. Verificación de Modo Estricto y Eliminación de `any`
- Confirmar que `"strict": true` está habilitado.
- Reemplazar cualquier instancia de `any` por `unknown`, interfaces concretas o genéricos (`T`).

### 2. Estructuración con Interfaces y Types
- Usar `interface` para Props de componentes y estructuras de objetos.
- Usar `type` para uniones discriminadas, alias y tuplas.

### 3. Implementación de Inmutabilidad y Type Guards
- Proteger configuraciones globales con `Readonly<T>` o `ReadonlyArray<T>`.
- Crear funciones con predicados `x is T` para estrechar los tipos en bloques condicionales.

---

## Ejemplo de Componente Auditado con Tipado Avanzado

```tsx
import type { ReactNode } from 'react';

export interface DataListProps<T> {
  items: ReadonlyArray<T>;
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

export function DataList<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No hay elementos disponibles',
}: DataListProps<T>) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-500 py-4 text-center">{emptyMessage}</p>;
  }

  return (
    <ul className="divide-y divide-slate-200 dark:divide-slate-800 w-full">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="py-3">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
```
