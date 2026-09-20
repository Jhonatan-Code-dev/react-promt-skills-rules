---
name: react-ui-design-expert
description: >-
  Asiste en la construcción y maquetación de interfaces de usuario premium en React + Vite utilizando 100% Tailwind CSS.
  Aplica diseño responsivo ultra mobile-first, tipografía escalable, semántica HTML5 experta y paletas profesionales anti-IA.
---

# React UI Design Expert Skill

Esta habilidad guía al asistente en el diseño y construcción de interfaces de usuario excepcionales en React + Vite + Tailwind CSS.

---

## Principios de Diseño Experto

### 1. Maquetación 100% Tailwind CSS sin CSS Puro
- Toda propiedad visual debe resolverse mediante clases de Tailwind.
- Utilizar `twMerge` o `clsx` para concatenación limpia de clases dinámicas.

### 2. Responsividad Adaptativa Fluida (Ultra Mobile a 4K)
- No fijar valores en píxeles.
- Usar `w-full`, `max-w-*`, `flex-1` y grids adaptativos (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).

### 3. Semántica HTML5 de Nivel Experto
- Usar las etiquetas semánticas apropiadas (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
- Incluir un único `<h1>` por página y mantener una estructura de jerarquía clara.

### 4. Estética Sobria y Cero Emojis
- Utilizar paletas de colores profesionales de Tailwind (slate, zinc, neutral, indigo, emerald).
- Prohibida la inclusión de emojis en botones, títulos o tarjetas.

---

## Ejemplo de Componente de Tarjeta Profesional

```tsx
import type { HTMLAttributes } from 'react';

export interface ProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  email: string;
  avatarUrl?: string;
}

export function ProfileCard({
  name,
  role,
  email,
  avatarUrl,
  className = '',
  ...rest
}: ProfileCardProps) {
  return (
    <article
      className={`w-full max-w-sm p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
      {...rest}
    >
      <div className="flex items-center space-x-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`Foto de perfil de ${name}`}
            className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-lg">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
            {name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {role}
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {email}
        </span>
        <button
          type="button"
          className="px-3 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg transition-colors"
        >
          Contactar
        </button>
      </div>
    </article>
  );
}
```
