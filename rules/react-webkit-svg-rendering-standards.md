# Reglas de Renderizado de SVGs en iOS WebKit (Prevención del Colapso a 0x0 en Safari e iPhone)

Esta regla establece los estándares de ingeniería y gobernanza visual para componentes y gráficos SVG vectoriales en aplicaciones React (Vite / Next.js), garantizando compatibilidad idéntica entre motores de renderizado WebKit (iOS Safari / iPhone / WebViews) y Blink (Android Chrome / Desktop).

---

## 1. Causa Raíz y Diferencias entre Motores de Renderizado

### A. Comportamiento en Chrome y Android (Motor Blink)
Cuando un elemento `<svg>` inline carece de atributos explícitos `width`/`height` o clases CSS de tamaño (`w-full h-full`), el motor Blink calcula dinámicamente las dimensiones a partir del elemento contenedor Flexbox o Grid, respetando la relación de aspecto del `viewBox`.

### B. Comportamiento en iPhone y Safari (Motor WebKit)
WebKit aplica una regla estricta de cálculo de dimensiones para elementos vectoriales en el DOM. Si la etiqueta `<svg>` no cuenta con atributos explícitos `width="100%" height="100%"` ni clases de ancho y alto CSS aplicadas directamente en la etiqueta del SVG (`w-full h-full`), WebKit colapsa la caja contenedora del gráfico a un tamaño computado de **0px x 0px**.

Como resultado:
- El botón o contenedor externo mantiene su tamaño (por ejemplo, un recuadro o círculo blanco).
- El icono o gráfico interior desaparece por completo, mostrando un espacio transparente o en blanco.

---

## 2. Patrón Obligatorio para Componentes SVG en React

Todo componente icono o gráfico SVG personalizado en TypeScript DEBE seguir la siguiente estructura de blindaje:

### A. Código Prohibido (Vulnerable a WebKit)

```tsx
// INCORRECTO: Si className no especifica ancho y alto explicitos, WebKit en iOS colapsa el SVG a 0x0
const GoogleMapsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn(className)} viewBox="0 0 48 48">
        <path fill="#ea4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.66 0 6.7 5.38 2.69 13.22l7.98 6.19C12.6 13.43 17.82 9.5 24 9.5z" />
    </svg>
);
```

### B. Código Estándar Obligatorio (100% Compatible WebKit y Blink)

```tsx
// CORRECTO: Fusiona clases de tamaño por defecto (w-full h-full) y asigna atributos de dimensionamiento nativos
const GoogleMapsIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("w-full h-full", className)} 
        viewBox="0 0 48 48" 
        width="100%" 
        height="100%"
    >
        <path fill="#ea4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.66 0 6.7 5.38 2.69 13.22l7.98 6.19C12.6 13.43 17.82 9.5 24 9.5z" />
    </svg>
);
```

---

## 3. Directivas de Gobernanza de Componentes SVG

1. **Atributos Nativos Obligatorios:** Todos los elementos `<svg>` inline deben incluir explícitamente `width="100%"` y `height="100%"`.
2. **Dimensiones CSS por Defecto:** Al invocar la utilidad `cn()`, la cadena base de clases debe comenzar con `"w-full h-full"`, permitiendo que clases externas pasadas via `className` extiendan o modifiquen el comportamiento sin dejar el SVG sin tamaño.
3. **Preservación del Aspect Ratio:** Mantener siempre el atributo `viewBox` adecuado (ej. `viewBox="0 0 48 48"`) para asegurar la escala correcta.
4. **Contenedores de Dimensionamiento:** Los botones o contenedores padres deben controlar el tamaño del icono (ejemplo: `<div className="w-6 h-6"><GoogleMapsIcon /></div>` o `<GoogleMapsIcon className="w-6 h-6" />`).

---

## 4. Checklist de Verificación de Calidad

- [ ] ¿El elemento `<svg>` incluye `width="100%"` y `height="100%"`?
- [ ] ¿La prop `className` utiliza `cn("w-full h-full", className)` para evitar un valor `undefined` o vacio?
- [ ] ¿Se verificó la compilación mediante `npx tsc --noEmit` sin errores de tipo?
- [ ] ¿El componente funciona de forma idéntica en Safari iOS (iPhone) y Chrome (Android)?
