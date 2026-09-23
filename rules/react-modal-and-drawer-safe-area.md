# Gobernanza Oficial de Modales, Diálogos y Paneles Deslizables con Zonas Seguras (Safe Area Insets)

Esta regla define los estándares de ingeniería para la construcción y refactorización de ventanas modales, diálogos emergentes, hojas deslizables (*Bottom Sheets*) y paneles laterales (*Side Drawers*) en React + Vite con Tailwind CSS. 

Su propósito es erradicar de forma definitiva los defectos donde los modales se abren invadiendo u ocultándose detrás de la cámara frontal (notch, orificio *punch-hole*, Isla Dinámica), la barra de estado (reloj, notificaciones, batería, señal Wi-Fi) o la barra de gestos inferior en dispositivos móviles Apple (iOS) y Google (Android).

---

## 1. El Origen del Fallo en Modales: El Escape del Portal (`createPortal`)

La mayoría de modales en aplicaciones React se renderizan fuera de la jerarquía normal del DOM mediante `createPortal(children, document.body)`. 

Al montarse directamente sobre el elemento `<body>`:
1. El modal pierde cualquier relleno (*padding*) o margen de seguridad definido en los contenedores de página (`<main>` o `<div className="pt-safe">`).
2. Si el contenedor del modal define `fixed inset-0` con una barra superior fijada en `top: 0`, los controles superiores (el título, el botón de regreso o la 'X' de cierre) quedan situados a 0 píxeles físicos del borde superior de la pantalla.
3. En un iPhone 14 Pro, 15 o 16 (con Isla Dinámica de 59px de altura) o en teléfonos Android modernos (con orificios de cámara de 35px a 45px), **los controles superiores quedan aplastados, ilegibles e imposibles de pulsar**.

---

## 2. Los 4 Arquetipos de Modales y su Anatomía Obligatoria

Toda interfaz emergente debe clasificarse en uno de los siguientes 4 arquetipos y aplicar de forma estricta sus clases estructurales:

---

### Arquetipo A: Modal a Pantalla Completa (*Full-Screen Mobile Modal*)

Frecuente en flujos de captura de cámara, formularios extensos, asistentes de configuración (*onboarding*) o selecciones complejas en móvil.

#### Reglas Estructurales Obligatorias:
1. El contenedor raíz debe ocupar toda la pantalla (`fixed inset-0 z-50 flex flex-col`).
2. El fondo debe sangrar hasta el borde físico superior e inferior (*Edge-to-Edge*).
3. La barra de cabecera debe aplicar relleno superior obligatorio: `pt-[env(safe-area-inset-top)]`.
4. La cabecera interactiva debe tener una altura mínima de `h-14` (56px) para garantizar que los botones y títulos queden holgadamente distanciados de la Isla Dinámica y la cámara.
5. El área de contenido debe aplicar `flex-1 min-h-0 overflow-y-auto` para aislar el desplazamiento vertical.
6. El pie de página o barra de acciones fija debe aplicar `pb-[env(safe-area-inset-bottom)]`.

```tsx
// [CORRECTO] Modal a Pantalla Completa Blindado contra Safe Areas
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerActions?: ReactNode;
}

export function FullScreenModal({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
}: FullScreenModalProps) {
  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 select-none animate-in fade-in duration-200"
    >
      {/* Cabecera Segura con Fondo Sangrado y Padding Superior */}
      <header className="sticky top-0 z-10 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 pt-[env(safe-area-inset-top)] shrink-0">
        <div className="h-14 px-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 touch-manipulation active:scale-90 transition-all cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      {/* Contenido con Scroll Interno Aislado */}
      <main className="flex-1 min-h-0 overflow-y-auto p-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
        {children}
      </main>

      {/* Barra de Acciones Inferior con Protección de Home Indicator */}
      {footerActions && (
        <footer className="sticky bottom-0 z-10 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] p-4 shrink-0">
          {footerActions}
        </footer>
      )}
    </div>,
    document.body
  );
}
```

---

### Arquetipo B: Diálogo Centrado Flotante (*Floating Centered Dialog*)

Utilizado para alertas, confirmaciones, modales de inicio de sesión o cuadros de diálogo estándar.

#### El Defecto Típico:
Muchos desarrolladores definen:
```tsx
// [INCORRECTO] En móviles con pantalla reducida o contenido extenso, la tarjeta invade la barra de estado
<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] relative">
    <button className="absolute top-4 right-4">X</button>
```
`p-4` (16px) es drásticamente menor a la altura de la barra de estado de iOS (59px). Si el diálogo se expande en altura, el borde superior de la tarjeta blanca penetra en la zona negra de la Isla Dinámica o la cámara, tapando el botón 'X'.

#### Reglas Estructurales Obligatorias:
1. El contenedor exterior de centrado debe aplicar un relleno superior dinámico que considere la zona segura:
   `pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))]` y `pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))]`.
2. La tarjeta interna debe limitar su altura máxima dinámica:
   `max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)]`.
3. El botón de cierre 'X' no debe colisionar con las esquinas redondeadas ni con márgenes insuficientes.

```tsx
// [CORRECTO] Diálogo Centrado Flotante con Blindaje Superior e Inferior
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface CenteredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function CenteredDialog({ isOpen, onClose, title, children }: CenteredDialogProps) {
  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))] pb-[max(1rem,calc(env(safe-area-inset-bottom)+0.5rem))] animate-in fade-in duration-200">
      {/* Telón de Fondo (Backdrop) */}
      <div 
        onClick={onClose}
        aria-hidden="true" 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Tarjeta de Diálogo Blindada en Altura */}
      <div 
        role="dialog" 
        aria-modal="true" 
        className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)] overflow-hidden"
      >
        {/* Cabecera del Diálogo */}
        <div className="h-14 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 truncate pr-2">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana emergente"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 touch-manipulation active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cuerpo con Scroll Aislado */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 text-sm text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
```

---

### Arquetipo C: Hoja Deslizable Inferior (*Bottom Sheet Modal*)

Muy popular en dispositivos móviles para selectores de opciones, menús de compartir o detalles de transacción.

#### Reglas Estructurales Obligatorias:
1. Si la hoja se despliega ocupando casi la totalidad de la pantalla (`max-h-[90dvh]` o `max-h-[95dvh]`), debe respetar un tope superior de seguridad:
   `top-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))]`.
2. La manija de arrastre táctil (*Drag Handle*) debe situarse dentro del margen seguro, nunca al ras del borde.
3. El pie de la hoja DEBE incluir obligatoriamente relleno inferior para la barra de gestos del sistema:
   `pb-[max(1rem,env(safe-area-inset-bottom))]`.

```tsx
// [CORRECTO] Bottom Sheet con Protección Superior e Inferior
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        aria-hidden="true" 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
      />

      {/* Contenedor de la Hoja */}
      <div 
        role="dialog" 
        aria-modal="true" 
        className="relative z-10 w-full max-w-xl mx-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl shadow-2xl flex flex-col max-h-[calc(100dvh-env(safe-area-inset-top)-1rem)] pb-[max(1rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300"
      >
        {/* Manija de Arrastre Visual */}
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-3 shrink-0" />

        {/* Cabecera */}
        <div className="h-12 px-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 touch-manipulation active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
```

---

### Arquetipo D: Panel Lateral Deslizable (*Side Drawer*)

Paneles que entran desde la izquierda o derecha de la pantalla (menús de navegación, filtros de búsqueda, carritos de compras laterales).

#### Reglas Estructurales Obligatorias:
1. La barra de cabecera interna del drawer DEBE aplicar `pt-[env(safe-area-inset-top)]`.
2. El pie de acciones del drawer DEBE aplicar `pb-[env(safe-area-inset-bottom)]`.
3. Al rotar el teléfono a modo horizontal (*Landscape*), el lateral correspondiente debe aplicar `pl-[env(safe-area-inset-left)]` o `pr-[env(safe-area-inset-right)]` para que la cámara no corte el contenido lateral.

---

## 3. La Prohibición Estricta del Botón de Cierre con Posicionamiento Ciego

Queda terminantemente prohibido posicionar botones de cierre ('X') con estilos como:
```tsx
// [PROHIBIDO] Coloca la 'X' directamente debajo de la batería o de la cámara
<button className="absolute top-4 right-4 text-white">
  <X />
</button>
```

**Estándares Autorizados para Botones de Cierre**:
1. **Opción Recomendada**: Colocar el botón dentro de la cabecera del modal (`header` de `h-14` con `pt-[env(safe-area-inset-top)]`).
2. **Opción Flotante Absoluta (solo en visores multimedia o cámaras a pantalla completa)**:
   Aplicar la fórmula matemática de offset seguro:
   ```tsx
   <button 
     className="absolute top-[calc(env(safe-area-inset-top,0px)+0.75rem)] right-[calc(env(safe-area-inset-right,0px)+0.75rem)] z-30 min-w-[44px] min-h-[44px] flex items-center justify-center bg-black/60 text-white rounded-full touch-manipulation active:scale-90"
     onClick={onClose}
   >
     <X className="w-5 h-5" />
   </button>
   ```

---

## 4. Lista de Verificación (Checklist) de Auditoría para Modales

Antes de considerar aprobado un modal o drawer, validar la siguiente lista:

- [ ] ¿El modal fue renderizado mediante un portal a `document.body` y cuenta con sus propias clases de Safe Area?
- [ ] Si es un modal a pantalla completa, ¿la cabecera tiene `pt-[env(safe-area-inset-top)]` y al menos `h-14` de altura de control?
- [ ] Si es un diálogo flotante centrado, ¿el contenedor padre tiene `pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))]` y la tarjeta limita su `max-h-[calc(100dvh-...)]`?
- [ ] Si es un *Bottom Sheet*, ¿la altura máxima está acotada para no chocar con la cámara y el pie tiene `pb-[env(safe-area-inset-bottom)]`?
- [ ] ¿El botón de cierre ('X') está libre de colisión con la cámara, la Isla Dinámica, la hora y el porcentaje de batería?
- [ ] ¿El botón de cierre mide como mínimo 44x44px y tiene `touch-manipulation`?
- [ ] ¿El cuerpo del modal tiene scroll interno independiente (`overflow-y-auto flex-1 min-h-0`)?

---

## 5. Prompt Maestro Oficial: Auditoría y Blindaje de Modales con Safe Area

```text
DIRECTIVA DE GOBERNANZA: BLINDAJE ESTRICTO DE MODALES, DIÁLOGOS Y DRAWERS CON SAFE AREAS

Se exige que todo modal, diálogo emergente, Bottom Sheet o panel lateral (Drawer) en React respete incondicionalmente las zonas seguras (Safe Area Insets) de hardware y sistema en iOS y Android.

REGLAS OBLIGATORIAS:
1. Modales a Pantalla Completa: Obligatorio 'pt-[env(safe-area-inset-top)]' en cabecera fija de al menos h-14, 'pb-[env(safe-area-inset-bottom)]' en pie y scroll interno en main con 'flex-1 min-h-0 overflow-y-auto'.
2. Diálogos Centrados Flotantes: El contenedor exterior debe usar 'pt-[max(1rem,calc(env(safe-area-inset-top)+0.5rem))]' y la tarjeta debe limitar su altura con 'max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-2rem)]' para impedir que invada la Isla Dinámica o la cámara frontal.
3. Bottom Sheets: La altura máxima no debe superar 'calc(100dvh-env(safe-area-inset-top)-1rem)' y el pie debe incluir 'pb-[max(1rem,env(safe-area-inset-bottom))]'.
4. Prohibición de 'absolute top-4 right-4': Queda terminantemente prohibido posicionar botones de cierre ('X') con coordenadas absolutas fijas sin desplazamiento de safe-area-inset-top. El botón debe estar dentro de la cabecera segura o usar 'top-[calc(env(safe-area-inset-top)+0.75rem)]'.
5. Botones Interactivos: Tamaño mínimo de 44x44px con clase 'touch-manipulation' para evitar la interceptación de gestos del sistema.
6. Código 100% TypeScript estricto, sin any, sin @ts-ignore, sin React.FC y con atributos aria-modal="true" y role="dialog".
```
