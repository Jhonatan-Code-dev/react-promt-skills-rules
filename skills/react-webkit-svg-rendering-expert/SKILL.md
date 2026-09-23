---
name: react-webkit-svg-rendering-expert
description: >-
  Audita, diagnostica y refactoriza componentes e iconos SVG inline en React para evitar
  el colapso a 0x0 píxeles e invisibilidad en navegadores iOS Safari / WebKit en iPhone.
---

# React WebKit SVG Rendering Expert Skill

Esta habilidad guía a desarrolladores y asistentes de inteligencia artificial en el diagnóstico, auditoría y corrección de problemas de renderizado en componentes SVG inline dentro de aplicaciones React, previniendo la invisibilidad de iconos por colapso de dimensiones en iOS WebKit (Safari / iPhone).

---

## 1. Procedimiento de Auditoría y Diagnóstico

Al detectar iconos vectoriales que se despliegan correctamente en Android / Chrome pero se muestran en blanco, invisibles o transparentes en iPhone / Safari, ejecutar el siguiente flujo de trabajo:

### Paso 1: Inspección del Elemento SVG
- **Patrón de Falla:** El componente `<svg>` no define `width` ni `height` nativos y utiliza únicamente `className={cn(className)}` o carece de clases de tamaño base.
- **Consecuencia en WebKit:** Safari colapsa el gráfico a `0px x 0px` al no poder resolver las dimensiones dentro de contenedores Flexbox/Grid sin valores explícitos.
- **Acción Correctiva:** Añadir los atributos `width="100%"` y `height="100%"` directamente en la etiqueta `<svg>`, e incorporar `"w-full h-full"` como clase inicial en `cn()`.

### Paso 2: Verificación de Contenedores Padres
- Asegurarse de que el contenedor padre (ejemplo: `<button>`, `<div>` o `<span>`) posea dimensiones definidas explícitamente (ej. `w-8 h-8` o `w-10 h-10`).
- Verificar que el contenedor no tenga un estilo `display` que anule el flujo de renderizado del SVG.

### Paso 3: Validación con Analizador de Tipos
- Ejecutar la comprobación estricta de tipos de TypeScript sin emitir archivos JavaScript para confirmar la ausencia de regresiones:
  ```bash
  npx tsc --noEmit
  ```

---

## 2. Ejemplos de Refactorización Técnica

### Ejemplo 1: Icono Personalizado de Google Maps

```tsx
// ❌ INCORRECTO: Invisible en iPhone (WebKit colapsa el grafico a 0x0)
export const GoogleMapsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn(className)} viewBox="0 0 48 48">
        <path fill="#48b564" d="M35.76 14.7L24 3.19 12.24 14.7A16.48 16.48 0 007.5 26.37C7.5 36.6 15.17 44.8 24 44.8s16.5-8.2 16.5-18.43a16.48 16.48 0 00-4.74-11.67z" />
    </svg>
);

// ✅ CORRECTO: Blindado contra colapso en WebKit (iOS Safari) y Blink (Android Chrome)
export const GoogleMapsIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("w-full h-full", className)} 
        viewBox="0 0 48 48" 
        width="100%" 
        height="100%"
    >
        <path fill="#48b564" d="M35.76 14.7L24 3.19 12.24 14.7A16.48 16.48 0 007.5 26.37C7.5 36.6 15.17 44.8 24 44.8s16.5-8.2 16.5-18.43a16.48 16.48 0 00-4.74-11.67z" />
    </svg>
);
```

---

## 3. Directiva de Prompt para Asistentes AI

Para solicitar una auditoría completa de componentes SVG en un módulo React, utilizar la siguiente instrucción:

```text
Audita todos los componentes SVG inline en este archivo bajo la habilidad react-webkit-svg-rendering-expert.
Garantiza que:
1. Todos los elementos <svg> incluyan width="100%" height="100%".
2. Las clases utilitarias usen cn("w-full h-full", className) para prevenir el colapso a 0x0 en iOS WebKit.
3. El codigo sea 100% TypeScript estricto, sin any, sin @ts-ignore y sin React.FC.
4. Se ejecute la comprobacion mediante npx tsc --noEmit.
```
