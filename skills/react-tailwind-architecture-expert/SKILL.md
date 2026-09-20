---
name: react-tailwind-architecture-expert
description: >-
  Audita, maquetación y estructura proyectos grandes de React + Vite con Tailwind CSS.
  Implementa componentes UI reutilizables con cn() (clsx + tailwind-merge), tematización dinámica con variables CSS y purga eficiente sin emojis.
---

# React Tailwind Architecture Expert Skill

Esta habilidad ayuda a auditar, abstraer componentes UI y tematizar proyectos frontend de gran escala construidos con React + Vite y Tailwind CSS.

---

## Metodología de Arquitectura Avanzada

### 1. Eliminación de Antipatrones (`@apply` y Valores Arbitrarios)
- Identificar y reemplazar clases arbitrarias `mt-[23px]` o `text-[#...]` agregando tokens a `tailwind.config.ts`.
- Reemplazar la directiva `@apply` en CSS creando componentes UI nativos en React (`Button.tsx`, `Card.tsx`, `Input.tsx`).

### 2. Implementación de la Utilidad `cn()`
- Garantizar que la combinación de clases utilitarias externas e internas en componentes UI pase por `cn(...inputs)` usando `clsx` y `tailwind-merge`.

### 3. Tematización con Variables CSS
- Configurar variables semánticas en `src/index.css` (`--color-bg`, `--color-text`) y mapearlas en `tailwind.config.ts` bajo la clave `theme.extend.colors`.

---

## Ejemplo de Componente UI Tematizado con `cn()`

```tsx
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export interface SurfaceCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function SurfaceCard({
  title,
  description,
  children,
  className,
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        'bg-theme-card text-theme-text border border-theme-border p-6 rounded-2xl shadow-sm transition-all hover:shadow-md',
        className
      )}
      {...props}
    >
      <h3 className="text-xl font-bold tracking-tight">{title}</h3>
      {description ? (
        <p className="text-sm opacity-80 mt-1 leading-relaxed">{description}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
```
