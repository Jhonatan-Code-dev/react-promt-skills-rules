# Reglas de Ingeniería: Arquitectura y Gobernanza a Gran Escala con Tailwind CSS

Esta regla define los estándares de arquitectura de software para estructurar, escalar y mantener bases de código robustas en React + Vite utilizando Tailwind CSS, evitando la degradación del código y el desorden en proyectos empresariales.

---

## 1. Abstracción Inteligente en Componentes UI (Sin `@apply`)

El error más común al escalar Tailwind CSS es intentar replicar CSS tradicional mediante la directiva `@apply` en archivos `.css`. Esto incrementa el tamaño del bundle y anula la optimización del motor JIT.

- **Regla Estricta**: Prohibido usar la directiva `@apply` salvo casos de fuerza mayor al integrar librerías externas de terceros.
- **Solución**: Encapsular la lógica de diseño dentro de componentes UI reutilizables de React (`.tsx`) pasando props estandarizadas.

```tsx
// [CORRECTO] Abstracción de componente UI con variantes explícitas
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  className,
  variant = 'primary',
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 text-sm touch-manipulation';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
}
```

---

## 2. Gestión de Clases Condicionales con `cn()` (`clsx` + `tailwind-merge`)

Cuando un componente combina clases base con clases enviadas mediante la prop `className`, utilizar operadores ternarios nativos produce código ilegible y conflictos de especificidad (ej. `p-4` colisionando con `p-6`).

- **Regla Estricta**: Toda concatenación de clases dinámicas debe procesarse obligatoriamente con la función utilitaria `cn()`.

```typescript
// src/shared/utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina clases utilitarias de Tailwind resolviendo conflictos de especificidad.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

---

## 3. Gobernanza del Design System en `tailwind.config.ts`

Permitir que los desarrolladores escriban valores arbitrarios en el HTML (ej. `w-[342px]`, `text-[#123456]`) destruye la consistencia visual y la gobernanza del producto.

- **Prohibición de Valores Arbitrarios**: No utilizar clases cuadradas arbitrarias `[...]` para dimensiones o colores repetitivos.
- **Centralización de Tokens**: Registrar colores de marca, familias tipográficas y escalas de espaciado en `tailwind.config.ts`:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f46e5',
        },
        surface: {
          light: '#ffffff',
          dark: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 4. Ordenamiento Automático de Clases (Prettier Plugin)

Para evitar la fatiga técnica de leer clases desordenadas, el proyecto debe contar con `prettier-plugin-tailwindcss` instalado en `.prettierrc`.

### Jerarquía Estándar de Lectura:
1. **Disposición (Layout)**: `flex`, `grid`, `block`
2. **Posicionamiento**: `relative`, `absolute`, `top-0`
3. **Box Model**: `w-full`, `max-w-md`, `p-4`, `m-2`
4. **Tipografía**: `text-sm`, `font-bold`, `text-slate-900`
5. **Visuales**: `bg-white`, `rounded-lg`, `shadow-md`
6. **Modificadores**: `hover:bg-slate-50`, `focus:ring-2`, `dark:bg-slate-900`

---

## 5. Lista de Verificación (Checklist) de Gobernanza

- [ ] ¿Se evitó el uso de la directiva `@apply` en archivos CSS?
- [ ] ¿Toda concatenación dinámica de `className` pasa por la función `cn()`?
- [ ] ¿Los colores y dimensiones repetitivas están declarados como tokens en `tailwind.config.ts`?
- [ ] ¿El plugin de Prettier ordena las clases de forma transparente al guardar?
- [ ] ¿La propiedad `content` en `tailwind.config.ts` incluye todas las rutas de la carpeta `src/`?
