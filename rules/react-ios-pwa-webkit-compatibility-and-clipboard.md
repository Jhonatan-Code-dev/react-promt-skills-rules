# Reglas de Compatibilidad iOS WebKit Safari, Portapapeles PWA y Dimensionamiento SVG

Esta regla establece los estándares de ingeniería, compatibilidad y gobernanza para aplicaciones React (Vite / Next.js) y PWAs instaladas en la pantalla de inicio de iPhone (iOS Safari / WebKit Standalone), eliminando errores de renderizado de SVGs, fallos de lectura del portapapeles y descuadres por rotación de pantalla.

---

## 1. Reglas de Renderizado de SVGs en iOS WebKit (Prevención del Colapso a 0x0)

### A. El Mecanismo de Colapso en Safari / WebKit
A diferencia de Chrome (Android/Desktop), donde el motor Blink infiere las dimensiones relativas de un `<svg>` con `viewBox` dentro de un contenedor `flex`, **iOS WebKit exige explícitamente clases de tamaño CSS o atributos `width`/`height`**.

Si un componente SVG inline no define dimensiones o si su prop `className` viene `undefined`, WebKit colapsa la etiqueta `<svg>` a un tamaño computado de `0px x 0px`, tornando el icono **completamente invisible (cuadro transparente/blanco vacante)**.

### B. Patrón Obligatorio para Componentes SVG Inline

Todo icono o componente SVG inline en React debe incluir **dimensiones fallback por defecto** tanto en sus atributos de SVG como en su asignación de clases con `cn()`:

```tsx
// ❌ [INCORRECTO] Si className viene undefined o vacio, WebKit en iOS lo colapsa a 0x0
const GoogleMapsIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={cn(className)} viewBox="0 0 48 48">
        <path fill="#48b564" d="..." />
    </svg>
);

// ✅ [CORRECTO] Define "w-full h-full" por defecto y atributos 100% compatibles con iOS WebKit
const GoogleMapsIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn("w-full h-full", className)} 
        viewBox="0 0 48 48" 
        width="100%" 
        height="100%"
    >
        <path fill="#48b564" d="..." />
    </svg>
);
```

---

## 2. Reglas del Portapapeles (Clipboard API) en iOS PWA Standalone

### A. Limitaciones Estrictas de Apple WebKit
1. **Sin Permisos Persistentes:** iOS Safari **NO implementa** `navigator.permissions.query({ name: 'clipboard-read' })`. No es posible solicitar ni verificar permisos de forma preventiva.
2. **User Activation Obligatorio:** `navigator.clipboard.readText()` **solo tiene éxito si es invocado sincrónicamente** en el contexto de ejecución del evento `onClick` / `onTouch` directo del usuario.
3. **Pérdida de Activación por Sandbox:** Al cambiar de app (ir a Maps y volver a la PWA), iOS congela la PWA y suele invalidar la API de JavaScript `readText()`.

### B. Arquitectura de Doble Respaldo (Dual Fallback Pattern)

Para garantizar que el pegado de texto o coordenadas funcione siempre en iPhone, se debe implementar una estrategia combinada:

```tsx
// 1. Escuchador de Evento Nativo de HTML5 en el Input (Pegar desde menú del teclado de iOS)
const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // En iOS Safari, clipboardData síncrono suele venir vacío por privacidad.
    // Dejar que WebKit inserte el texto nativamente en el DOM y leerlo en el siguiente tick:
    setTimeout(() => {
        const domVal = inputRef.current?.value || "";
        if (domVal && domVal.trim().length > 0) {
            setSearchQuery(domVal);
            processCoordinates(domVal);
        }
    }, 40);
};

// 2. Botón Personalizado de Acción Directa con Respaldo de Enfoque
const handleDirectPaste = async () => {
    try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.readText) {
            const text = await navigator.clipboard.readText();
            if (text && text.trim().length > 0) {
                setSearchQuery(text);
                processCoordinates(text);
                return;
            }
        }
    } catch (err) {
        // En caso de bloqueo por iOS / Ajustes de privacidad:
        // Enfocar el input inmediatamente y sugerir el pegado nativo
        inputRef.current?.focus();
        toast("En tu iPhone: Mantén presionado este campo y toca 'Pegar'", {
            icon: "💡",
            duration: 5000,
        });
    }
};
```

---

## 3. Gobernanza de la Orientación de Pantalla en iOS PWA

### A. Restricción del Sistema Operativo iOS
* Apple **ignora la propiedad `"orientation": "portrait"` del `manifest.json`** en PWAs instaladas desde Safari.
* La API `screen.orientation.lock()` **lanza `NotSupportedError` en iOS Safari**.
* El navegador girará la ventana si el usuario rota físicamente el iPhone a menos que la app maneje el evento.

### B. Patrón de Bloqueo Visual de Orientación (Orientation Lock Overlay)

Para evitar que la interfaz se desfigure en modo horizontal (*landscape*), se debe usar un componente guardián global que despliegue un overlay bloqueante (`z-[999999]`) al detectar pantallas móviles en horizontal:

```tsx
// Detección de Mobile Landscape (Teléfonos en horizontal)
const isLandscape = window.matchMedia("(orientation: landscape)").matches;
const isMobile = (window.matchMedia("(max-device-width: 932px)").matches || window.innerHeight < 550) && isLandscape;

// Overlay de Bloqueo de Pantalla Completa
if (isMobile) {
    return (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-neutral-950 text-white p-6 touch-none">
            <Smartphone className="w-12 h-12 animate-pulse text-emerald-400 mb-4" />
            <h2 className="text-base font-bold">Gira tu dispositivo a Vertical</h2>
            <p className="text-xs text-neutral-400 mt-2 text-center">
                Esta aplicación está optimizada para usarse únicamente en posición vertical (Portrait).
            </p>
        </div>
    );
}
```

---

## 4. Checklist de Verificación para Desarrolladores

- [ ] ¿Todos los componentes `<svg>` inline tienen `width="100%" height="100%"` y `className={cn("w-full h-full", ...)}`?
- [ ] ¿El pegado en inputs soporta el evento `onPaste` nativo con `setTimeout(..., 40)` como fallback para iOS?
- [ ] ¿El botón de pegado por código captura `NotAllowedError` y le da foco automático al `<input>`?
- [ ] ¿La PWA cuenta con un guardián de orientación para bloquear el uso en modo horizontal en iPhones?
