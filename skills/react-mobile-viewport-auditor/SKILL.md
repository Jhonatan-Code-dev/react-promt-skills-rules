---
name: react-mobile-viewport-auditor
description: >-
  Audita y corrige componentes React para evitar auto-zoom al enfocar formularios en móviles (iOS/Android)
  y garantizar que la interfaz respete las zonas seguras (Safe Area Insets) de cámaras, notches y barras de gestos.
---

# React Mobile Viewport Auditor Skill

Esta habilidad ayuda a revisar y solucionar problemas de auto-zoom e interferencia con elementos físicos de dispositivos móviles en aplicaciones React + Vite.

---

## Metodología de Auditoría

### 1. Detección de Fuentes Pequeñas en Inputs (Causa de Auto-Zoom)
- Buscar cualquier `input`, `select` o `textarea` con clases de texto inferiores a `16px` (ej: `text-xs`, `text-sm` sin calificador responsivo).
- Solución: Cambiar la clase base a `text-base` (o agregar la regla CSS `font-size: 16px` en vista móvil) y escalar a `sm:text-sm` solo a partir de pantallas de escritorio.

### 2. Detección de Solapamiento con la Cámara o Notch Superior
- Inspeccionar componentes con `fixed top-0` o `sticky top-0`.
- Solución: Añadir padding superior seguro `pt-[env(safe-area-inset-top)]`.

### 3. Detección de Solapamiento con la Barra de Gestos Inferior
- Inspeccionar menús de navegación inferior (`bottom-nav`), modales o barras de acción fijas con `fixed bottom-0`.
- Solución: Añadir padding inferior seguro `pb-[env(safe-area-inset-bottom)]`.

---

## Ejemplo de Formulario Auditado y Corregido

```tsx
export function MobileLoginForm() {
  return (
    <form className="w-full max-w-sm mx-auto space-y-4 p-4">
      <div className="space-y-1">
        <label htmlFor="email" className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
          Correo Electrónico
        </label>
        {/* Usar text-base en móviles para evitar auto-zoom en iOS Safari */}
        <input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          className="w-full text-base sm:text-sm px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl touch-manipulation active:scale-98 transition-all"
      >
        Iniciar Sesión
      </button>
    </form>
  );
}
```
