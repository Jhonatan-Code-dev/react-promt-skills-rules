# Reglas de Viewport Móvil, Prevención de Auto-Zoom en iOS PWA y Zonas Seguras

Esta regla establece los estándares de ingeniería y diseño en React + Vite con Tailwind CSS para eliminar al 100% el auto-zoom no deseado al enfocar campos de formulario en dispositivos móviles (iPhone iOS Safari, PWA instalada en pantalla de inicio, WebViews y Android Chrome), así como la gobernanza del viewport y la integración con las barras del sistema.

---

## 1. El Problema del Auto-Zoom en iPhone (Safari e iOS PWA)

### A. Mecanismo de Activación de WebKit
WebKit (el motor de renderizado de iOS Safari y de todas las aplicaciones PWA/WebView en iPhone) tiene una heurística interna estricta:
- Cuando el usuario toca cualquier campo de formulario (`<input>`, `<select>`, `<textarea>`) para comenzar a escribir, WebKit comprueba el tamaño de fuente computado (`computed font-size`).
- **Si el tamaño de fuente es estrictamente menor a `16px` (1rem / 12pt)**, iOS asume que el texto es ilegible y ejecuta un **zoom automático forzado** para centrar el campo.

### B. El Desastre del Auto-Zoom en PWAs Instaladas
En una página web común de Safari, el usuario puede realizar el gesto de pellizco (*pinch-to-zoom*) para alejar la pantalla. Sin embargo, en una **PWA instalada en la pantalla de inicio de iPhone** (`apple-mobile-web-app-capable="yes"`):
1. La barra de navegación de Safari está oculta.
2. Cuando se activa el auto-zoom al escribir, la pantalla queda desproporcionada y desplazada.
3. Al terminar de escribir y cerrar el teclado virtual, el viewport **permanece bloqueado con zoom**, descuadrando cabeceras fijas (`fixed`, `sticky`), barras inferiores de navegación (*Bottom Tabs*) y modales.
4. El usuario queda atrapado en una vista distorsionada y no intuitiva.

### C. Por Qué `user-scalable=no` y `maximum-scale=1.0` No Son Suficientes
A partir de iOS 10, Apple deshabilitó de manera intencional el bloqueo de zoom mediante `user-scalable=no` para cumplir con pautas de accesibilidad. Por lo tanto, aunque esté declarado en el metatag `viewport`, **Safari e iOS PWA seguirán haciendo zoom si la fuente es menor a 16px**.

---

## 2. Los 4 Pilares Oficiales de Prevención de Auto-Zoom

### Pilar 1: Regla Obligatoria de Tamaño de Fuente (`text-base` / `16px`)
En Tailwind CSS, todo campo de entrada interactivo debe declarar como clase base `text-base` (`16px`). Si en pantallas de escritorio se requiere un texto más compacto, se escala mediante prefijos responsivos (`sm:text-sm` o `md:text-sm`).

```tsx
// [INCORRECTO] Desencadena auto-zoom inmediato en iPhone al tocar para escribir
<input 
  type="text" 
  placeholder="Buscar producto..." 
  className="w-full text-xs p-2 border rounded" 
/>

// [INCORRECTO] 'text-sm' equivale a 14px (menor a 16px), provocando zoom automático
<input 
  type="email" 
  className="w-full text-sm p-3 border rounded-lg" 
/>

// [CORRECTO] text-base (16px) en móvil evita el zoom; sm:text-sm escala en desktop
<input 
  type="text" 
  placeholder="Buscar producto..." 
  className="w-full text-base sm:text-sm px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 touch-manipulation" 
/>
```

### Pilar 2: Salvaguarda Global en CSS (`index.css` / `globals.css`)
Para garantizar que ninguna librería de terceros o componente descuidado provoque auto-zoom, se debe incluir la siguiente regla global en la capa base de estilos del proyecto:

```css
/* ==========================================================================
   Prevención Definitiva de Auto-Zoom en iPhone (iOS Safari, PWA y WebViews)
   Garantiza font-size mínimo de 16px en campos interactivos sin alterar desktop
   ========================================================================== */
@supports (-webkit-touch-callout: none) {
  @media screen and (max-width: 767px) {
    input[type="text"],
    input[type="password"],
    input[type="email"],
    input[type="number"],
    input[type="tel"],
    input[type="url"],
    input[type="search"],
    select,
    textarea {
      font-size: 16px !important;
    }
  }
}
```

### Pilar 3: Técnica de Transformación Escalar (Para Textos Visualmente Pequeños)
Si el equipo de diseño exige de forma intransigente que un input se visualice con texto de 12px o 14px en móvil, no se debe reducir el `font-size`. En su lugar, se aplica el patrón de transformación escalar:

```tsx
// [CORRECTO] WebKit lee font-size de 16px y NO hace zoom, pero visualmente se reduce
<div className="w-full overflow-hidden">
  <input
    type="text"
    className="w-[114.3%] text-base origin-top-left scale-[0.875] py-2 px-3 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</div>
```

### Pilar 4: Desactivación de Retardos Táctiles con `touch-action: manipulation`
Para evitar acercamientos accidentales al tocar rápidamente controles, botones o entradas, se aplica la clase `touch-manipulation` (`touch-action: manipulation`):

```tsx
<button
  type="submit"
  className="w-full py-3 text-base font-semibold text-white bg-indigo-600 rounded-xl touch-manipulation active:scale-[0.98] transition-transform"
>
  Confirmar
</button>
```

---

## 3. Configuración del Metatag Viewport en `index.html`

El archivo `index.html` debe declarar los atributos recomendados para aplicaciones web modernas y PWA:

```html
<!-- [OBLIGATORIO] Configuración de Viewport con soporte Safe Area y ajuste de teclado -->
<meta 
  name="viewport" 
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content" 
/>
```

> [!NOTE]
> `interactive-widget=resizes-content` indica al navegador que el teclado virtual en pantalla debe redimensionar la caja de contenido visible en lugar de desplazarla violentamente.

---

## 4. Gobernanza de Zonas Seguras (Safe Area Insets)

Para la directiva exhaustiva sobre cómo impedir que la cámara frontal (notch, orificio punch-hole, Isla Dinámica), la barra de estado y los indicadores de batería/wifi tapen el diseño, consultar la regla especializada:
- [react-mobile-system-bars-and-safe-areas.md](./react-mobile-system-bars-and-safe-areas.md)

---

## 5. Lista de Verificación (Checklist) para Formularios Móviles

Toda pantalla que contenga formularios o inputs debe verificar los siguientes puntos:

- [ ] ¿El archivo `index.html` incluye `viewport-fit=cover` e `interactive-widget=resizes-content`?
- [ ] ¿Todos los inputs, selects y textareas tienen `text-base` (`16px`) en móvil?
- [ ] ¿La hoja de estilos base incluye la salvaguarda CSS `@supports (-webkit-touch-callout: none)` con `font-size: 16px`?
- [ ] ¿Los botones y campos interactivos cuentan con la clase `touch-manipulation`?
- [ ] ¿Al tocar un campo de texto en un iPhone real o simulador de Safari, la pantalla permanece fija sin hacer zoom?
- [ ] ¿Al cerrar el teclado virtual, el layout de la pantalla se mantiene 100% alineado sin desplazamientos horizontales?

---

## 6. Prompt Maestro Oficial: Prevención de Auto-Zoom en iPhone / iOS PWA

```text
DIRECTIVA DE GOBERNANZA: ELIMINACIÓN TOTAL DE AUTO-ZOOM EN IPHONE (SAFARI, PWA Y WEBVIEW)

Queda estrictamente prohibido generar campos de formulario (<input>, <select>, <textarea>) que provoquen auto-zoom al recibir foco en iPhone (iOS Safari, PWA instalada en Home Screen o WebViews).

REGLAS OBLIGATORIAS:
1. Tamaño Mínimo de 16px: Todo input, select y textarea DEBE tener la clase 'text-base' (16px) como estilo base para móviles. Solo está permitido reducir a 'sm:text-sm' o 'md:text-sm' a partir de pantallas de escritorio (sm: o md:).
2. Prohibición de Fuentes Menores a 16px en Móvil: Queda prohibido el uso de 'text-xs' (12px) o 'text-sm' (14px) directamente en campos de entrada móviles sin prefijo responsivo.
3. Clase touch-manipulation: Todos los botones, campos de entrada y controles interactivos deben incluir 'touch-manipulation' para evitar el retardo táctil de 300ms y el doble-tap zoom.
4. Salvaguarda CSS Global: Asegurar en la capa de estilos base la regla '@supports (-webkit-touch-callout: none)' forzando font-size: 16px en max-width: 767px.
5. Código 100% TypeScript estricto, sin any, sin @ts-ignore y con accesibilidad WCAG 2.1 AA.
```
