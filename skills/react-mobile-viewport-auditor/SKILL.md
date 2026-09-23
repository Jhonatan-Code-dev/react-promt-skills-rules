---
name: react-mobile-viewport-auditor
description: >-
  Audita, detecta y soluciona problemas de auto-zoom forzado en iPhone (iOS Safari, PWA y WebViews)
  al interactuar con formularios, garantizando tamaños de fuente mínimos de 16px, touch-manipulation y estabilidad de viewport.
---

# React Mobile Viewport & Auto-Zoom Auditor Skill

Esta habilidad asiste a desarrolladores y asistentes de inteligencia artificial en la auditoría y corrección definitiva del comportamiento de auto-zoom involuntario en dispositivos Apple iPhone (iOS Safari, aplicaciones PWA instaladas en pantalla de inicio y WebViews), así como la optimización táctil de formularios interactivos.

---

## 1. Procedimiento de Auditoría Paso a Paso

Al analizar cualquier formulario, vista de autenticación, buscador o pantalla interactiva en React, ejecutar las siguientes comprobaciones:

### Paso 1: Búsqueda de Fuentes Menores a 16px en Campos de Formulario
- **Diagnóstico**: Buscar cualquier etiqueta `<input>`, `<select>` o `<textarea>` con clases como `text-xs` (12px) o `text-sm` (14px) aplicadas sin prefijo de breakpoint de escritorio (`sm:`, `md:`).
- **Causa Raíz**: WebKit en iOS detecta cualquier fuente computada inferior a 16px al recibir el foco (`focus`) e inicia un zoom automático que deforma la maquetación.
- **Solución Obligatoria**:
  - Cambiar la clase base a `text-base` (`16px`).
  - Si en pantallas grandes se requiere fuente más pequeña, usar `text-base sm:text-sm`.

### Paso 2: Detección de Retardos Táctiles y Doble Tap
- **Diagnóstico**: Elementos interactivos (botones, pestañas, selectores) sin la propiedad `touch-action: manipulation`.
- **Solución**: Incorporar la clase de Tailwind `touch-manipulation`.

### Paso 3: Verificación de Salvaguarda Global en CSS
- **Diagnóstico**: Comprobar si `src/index.css` o la hoja de estilos global cuenta con la salvaguarda `@supports (-webkit-touch-callout: none)`.
- **Solución**: Si no existe, agregar la regla en el archivo CSS global para proteger todos los campos de forma preventiva.

---

## 2. Componente de Referencia: `MobileFormInput`

Componente estricto en TypeScript que garantiza 0% de auto-zoom en iPhone e interfaces móviles:

```tsx
import { forwardRef, InputHTMLAttributes } from 'react';

export interface MobileFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/**
 * Campo de texto optimizado para iOS Safari y PWA.
 * Aplica text-base (16px) como estilo base móvil para erradicar el auto-zoom de WebKit.
 */
export const MobileFormInput = forwardRef<HTMLInputElement, MobileFormInputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        <label 
          htmlFor={inputId} 
          className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`w-full text-base sm:text-sm px-3.5 py-2.5 bg-white dark:bg-slate-900 border ${
            error 
              ? 'border-rose-500 focus:ring-rose-500' 
              : 'border-slate-300 dark:border-slate-800 focus:ring-indigo-500'
          } rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 touch-manipulation transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-rose-500 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

MobileFormInput.displayName = 'MobileFormInput';
```

---

## 3. Prompt de Invocación Directa para Auditoría

Para exigir a cualquier asistente o modelo la auditoría de auto-zoom en un archivo o componente específico, utilizar el siguiente comando:

```text
Aplica la habilidad react-mobile-viewport-auditor sobre este formulario.
Asegúrate de:
1. Reemplazar toda clase text-xs o text-sm en inputs/selects/textareas por text-base en móvil (text-base sm:text-sm).
2. Añadir touch-manipulation en todos los elementos interactivos.
3. Asegurar que no ocurra auto-zoom en iOS Safari ni en PWA instalada en iPhone.
4. Mantener TypeScript 100% estricto sin any ni comentarios en desuso.
```
