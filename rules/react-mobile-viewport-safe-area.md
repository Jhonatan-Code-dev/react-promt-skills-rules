# Reglas de Viewport Móvil, Prevención de Auto-Zoom y Zonas Seguras (Safe Area Insets)

Esta regla establece los estándares de maquetación en React + Vite con Tailwind CSS para evitar el auto-zoom no deseado al enfocar campos de texto en dispositivos móviles (iOS Safari y Android Chrome) y garantizar que el contenido no sea tapado por la cámara frontal, notches, islas dinámicas o barras de gestos del sistema operativo.

---

## 1. Configuración Obligatoria del Viewport en `index.html`

El archivo `index.html` del proyecto Vite debe incluir el metatag de viewport configurado con `viewport-fit=cover` para permitir que la aplicación utilice toda la superficie disponible de la pantalla mientras se respetan las zonas seguras:

```html
<!-- [CORRECTO] Configuración de Viewport Móvil en index.html -->
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" 
/>
```

---

## 2. Prevención del Auto-Zoom al Enfocar Formularios

### A. Regla de Tamaño Mínimo de Fuente (16px / 1rem)
iOS Safari y navegadores móviles aplican un zoom automático molesto si el usuario toca un elemento `<input>`, `<select>` o `<textarea>` cuya fuente sea inferior a `16px`.

- **Regla Estricta**: Todo elemento de entrada debe tener un tamaño de fuente mínimo de `text-base` (`16px`) en móviles. Se puede ajustar en pantallas más grandes si es necesario:

```tsx
// [INCORRECTO] Provoca auto-zoom molesto en iPhones al hacer foco
<input type="text" className="text-xs p-2 border rounded" />

// [CORRECTO] Mantiene 16px en móviles para evitar auto-zoom y escala en desktop
<input 
  type="text" 
  className="w-full text-base sm:text-sm p-2.5 sm:p-2 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
/>
```

### B. Desactivación de Doble Tap Zoom en Elementos Interactivos
Para evitar retardo de click o acercamientos accidentales al presionar rápidamente un botón, se aplica la clase o propiedad CSS `touch-action: manipulation`:

```tsx
// [CORRECTO] Botón optimizado para toque móvil sin retardo ni doble-tap zoom
<button 
  type="button" 
  className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium touch-manipulation active:scale-95 transition-transform"
>
  Guardar Cambios
</button>
```

---

## 3. Respeto de Zonas Seguras (Safe Area Insets)

Los dispositivos móviles modernos cuentan con cortes físicos (muescas / notches, orificios de cámara, isla dinámica) en la parte superior y barras de navegación por gestos en la parte inferior.

### A. Encabezados Fijos y Pegajosos (Sticky / Fixed Header)
Todo componente de cabecera fijo o pegajoso debe incluir padding superior para la zona segura de la cámara:

```tsx
// [CORRECTO] Encabezado que respeta la cámara frontal y la isla dinámica
<header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md pt-[env(safe-area-inset-top)] border-b border-slate-200 dark:border-slate-800">
  <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
    <h1 className="text-lg font-bold">Título</h1>
  </div>
</header>
```

### B. Barras Inferiores Fijas (Bottom Navigation / Action Bar)
Todo panel o barra de acciones inferior fija debe incluir padding inferior para no solaparse con la barra de gestos de iOS/Android:

```tsx
// [CORRECTO] Barra inferior fija que respeta la barra de gestos del sistema
<div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] p-4 shadow-lg">
  <div className="max-w-md mx-auto flex items-center gap-3">
    <button type="button" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl touch-manipulation">
      Confirmar Pedido
    </button>
  </div>
</div>
```

---

## 4. Lista de Verificación (Checklist) para Móviles

- [ ] ¿El metatag `viewport-fit=cover` está configurado en `index.html`?
- [ ] ¿Todos los `<input>`, `<select>` y `<textarea>` tienen al menos `text-base` (`16px`) en vista móvil?
- [ ] ¿Los botones e interactivos tienen la clase `touch-manipulation`?
- [ ] ¿Los elementos fijos en la parte superior incluyen `pt-[env(safe-area-inset-top)]`?
- [ ] ¿Los elementos fijos en la parte inferior incluyen `pb-[env(safe-area-inset-bottom)]`?
