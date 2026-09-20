# Reglas de Ingeniería: Tematización con Variables CSS, Purga y Linting con Tailwind CSS

Esta regla establece las normas para la gestión de temas dinámicos (modo claro/oscuro), eliminación de CSS no utilizado (purga), integración de ESLint y eliminación de valores arbitrarios en aplicaciones React + Vite creadas con Tailwind CSS.

---

## 1. Purga Inteligente y Optimización de Producción

Para garantizar que el bundle final de CSS contenga únicamente las utilidades utilizadas en el proyecto, la propiedad `content` del archivo `tailwind.config.ts` debe incluir explícitamente todos los archivos donde se consuman clases:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class', // Habilitar modo oscuro por clase '.dark'
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
```

---

## 2. Tematización Dinámica y Modo Oscuro con Variables CSS

Para cambiar de tema o adaptar la interfaz entre modo claro y oscuro sin tocar el código JSX ni modificar la estructura del DOM, se deben declarar variables semánticas en CSS y mapearlas en la configuración de Tailwind.

### A. Declaración de Variables Semánticas (`src/index.css`)
```css
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: #0f172a;
  --color-surface-card: #f8fafc;
  --color-border-subtle: #e2e8f0;
}

.dark {
  --color-bg-primary: #090d16;
  --color-text-primary: #f8fafc;
  --color-surface-card: #111827;
  --color-border-subtle: #1f2937;
}
```

### B. Mapeo en `tailwind.config.ts`
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--color-bg-primary)',
          text: 'var(--color-text-primary)',
          card: 'var(--color-surface-card)',
          border: 'var(--color-border-subtle)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### C. Uso en JSX
```tsx
// [CORRECTO] Uso de colores tematizados dinámicamente
export function ThemeCard() {
  return (
    <div className="bg-theme-card text-theme-text border border-theme-border p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-bold">Tarjeta Tematizada</h3>
      <p className="text-sm opacity-80 mt-2">
        El color de fondo y de texto cambia automáticamente según la variable CSS activa.
      </p>
    </div>
  );
}
```

---

## 3. Prohibición de Valores Mágicos Arbitrarios (`[...]`)

El uso indiscriminado de clases arbitrarias como `mt-[23px]` o `bg-[#123abc]` rompe la escala del sistema de diseño y genera inconsistencia.

- **Regla Estricta**: No usar corchetes arbitrarios para espaciados o colores repetitivos.
- **Solución**: Registrar el valor numérico o semántico dentro de `theme.extend` en `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      colors: {
        'brand-primary': '#4f46e5',
        'brand-secondary': '#10b981',
      },
    },
  },
};
```

---

## 4. Linting de Clases con ESLint (`eslint-plugin-tailwindcss`)

Para mantener la base de código libre de clases mal escritas o inexistentes, el proyecto debe contar con el plugin `eslint-plugin-tailwindcss` configurado en el archivo linter:

```javascript
// .eslintrc.cjs
module.exports = {
  plugins: ['tailwindcss'],
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
  },
};
```

---

## 5. Lista de Verificación (Checklist) de Tematización

- [ ] ¿El archivo `tailwind.config.ts` tiene restringidas las rutas en `content` a los archivos reales de la carpeta `src/`?
- [ ] ¿Los colores del sistema están basados en variables CSS (`var(--color-...)`) para permitir la conmutación de temas?
- [ ] ¿Se eliminaron las clases arbitrarias como `bg-[#...]` o `p-[...px]` reemplazándolas por tokens en `tailwind.config.ts`?
- [ ] ¿Está instalado y activo el linter `eslint-plugin-tailwindcss`?
