# Gobernanza Oficial de Zonas Seguras (Safe Area), Barra de Estado y Barras del Sistema para iOS y Android

Esta regla establece los estándares de ingeniería e interfaz de usuario para aplicaciones React + Vite con Tailwind CSS, garantizando el cumplimiento estricto de las directrices oficiales de **Apple Human Interface Guidelines (HIG)** para iOS/iPadOS y las especificaciones de **Google Material Design 3 / Android 15 Edge-to-Edge**. 

El objetivo es impedir de manera absoluta que elementos interactivos o informativos (botones de retroceso, logotipos, títulos, barras de búsqueda, botones de cierre en modales) queden solapados, tapados o inutilizados por recortes físicos de pantalla (sensores de cámara frontal, muescas / *notches*, Isla Dinámica, orificios *punch-hole*) o elementos del sistema operativo (reloj, notificaciones, indicador de batería, estado de señal Wi-Fi y red celular).

---

## 1. Fundamentos y Especificaciones Oficiales de Plataforma

### A. Apple iOS / iPadOS (Apple Human Interface Guidelines)
1. **Definición de Safe Area**: El área segura delimita el espacio visual que no queda oscurecido por la carcasa de sensores, esquinas redondeadas del dispositivo ni la barra de indicadores de inicio (*Home indicator*).
2. **Dimensiones de la Barra de Estado**:
   - Dispositivos con Isla Dinámica (iPhone 14 Pro, iPhone 15, iPhone 16 y variantes): La barra de estado superior ocupa entre 54pt y 59pt de altura.
   - Dispositivos con muesca (*notch*) tradicional (iPhone X a iPhone 14 estándar): La barra de estado superior ocupa entre 44pt y 47pt.
   - Dispositivos clásicos con botón físico: Ocupa 20pt.
3. **Distribución del Sistema en la Barra de Estado**:
   - **Lado Izquierdo**: Reloj del sistema y estado de localización.
   - **Zona Central**: Carcasa de sensores físicos, cámara frontal TrueDepth o Isla Dinámica interactiva.
   - **Lado Derecho**: Indicador de señal celular (5G/LTE), icono de conexión Wi-Fi, estado e icono de batería porcentual.
4. **Zonas de Conflicto de Gestos del Sistema Operativo**:
   - El deslizamiento descendente desde la esquina superior derecha activa el **Centro de Control** (*Control Center*).
   - El deslizamiento descendente desde la parte central o izquierda activa el **Centro de Notificaciones** (*Notification Center*).
   - Cualquier botón colocado a menos de 44pt del borde físico superior corre el riesgo de perder el evento táctil a favor del gesto nativo de iOS.

### B. Google Android (Material Design 3 y Android 15 Edge-to-Edge)
1. **Mandato Edge-to-Edge en Android 15 (API 35)**: Android 15 exige de manera forzosa la visualización de borde a borde (*Edge-to-Edge*). Las barras del sistema (*Status Bar* superior y *Gesture Navigation Bar* inferior) son transparentes de forma predeterminada.
2. **Recortes de Pantalla (*Display Cutouts*)**:
   - Teléfonos Android modernos (Google Pixel, Samsung Galaxy, Xiaomi, Motorola, etc.) incorporan orificios de cámara frontal (*punch-hole*) centrados o descentrados en la parte superior.
3. **Barras del Sistema (*System Bars*)**:
   - **Superior (Status Bar)**: Hora a la izquierda; notificaciones del sistema en el centro; intensidad de señal Wi-Fi, red móvil, Bluetooth y porcentaje de batería a la derecha.
   - **Inferior (Navigation Bar)**: Barra de gestos delgada o botones de tres acciones.
4. **Dimensiones Mínimas de Contacto Táctil**: Material Design 3 estipula un área táctil mínima de 48x48dp para cualquier control interactivo ubicado en cabeceras o barras de herramientas.

---

## 2. Configuración Esencial del Documento HTML (`index.html`)

Para que el motor de renderizado del navegador (WebKit en iOS, Chromium en Android) exponga las variables de entorno `env(safe-area-inset-*)`, el metatag `viewport` DEBE contener obligatoriamente el atributo `viewport-fit=cover`.

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    
    <!-- [OBLIGATORIO] Habilita el cálculo de Safe Areas completas en iOS y Android -->
    <meta 
      name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" 
    />

    <!-- [OBLIGATORIO] Configuración de Web App independiente para iOS Safari -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

    <!-- [OBLIGATORIO] Coherencia cromática con la barra de estado en Android Chrome -->
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />

    <title>Aplicación React Segura</title>
  </head>
  <body class="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 3. Patrón Arquitectónico Fundamental: "Bleed Background, Inset Content"

Bajo la filosofía *Edge-to-Edge*, los contenedores nunca deben recortarse abruptamente con márgenes vacíos (barras negras o blancas artificiales) por encima de la cabecera. La técnica oficial consiste en dos capas:

1. **Capa Externa (Fondo Sangrado / *Bleed*)**: Se extiende físicamente hasta `top: 0` para rellenar el área detrás de la cámara y los iconos del sistema con el color de fondo, gradiente o efecto de desenfoque (`backdrop-blur`).
2. **Capa Interna (Contenido Protegido / *Inset*)**: Aplica un relleno superior (`padding-top`) correspondiente a `env(safe-area-inset-top)` para distanciar todos los textos, títulos y botones de la zona ocupada por el hardware y los indicadores del sistema.

### Comparativa Visual de Implementación

```tsx
// [INCORRECTO] El contenido se solapa con la cámara, la hora y los iconos de batería/wifi
<header className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center justify-between px-4">
  <button type="button">Atrás</button>
  <h1>Perfil de Usuario</h1>
  <button type="button">Guardar</button>
</header>

// [CORRECTO] El fondo sangra hasta el borde físico, pero el contenido respeta la zona segura
<header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 pt-[env(safe-area-inset-top)]">
  <div className="h-14 px-4 flex items-center justify-between max-w-7xl mx-auto">
    <button 
      type="button" 
      aria-label="Regresar a la pantalla anterior"
      className="min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation text-slate-700 dark:text-slate-200 active:scale-95 transition-transform"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate px-2">
      Perfil de Usuario
    </h1>
    <div className="min-w-[44px] min-h-[44px] flex items-center justify-center">
      {/* Botón de acción o espaciador para centrado simétrico del título */}
    </div>
  </div>
</header>
```

---

## 4. Gobernanza en Modales de Pantalla Completa, Drawers y Hojas Inferiores

### A. Modales a Pantalla Completa (*Full-Screen Modals*)
Un error crítico recurrente es posicionar el botón de cierre (`X`) con coordenadas absolutas fijas como `top-4 right-4`. En un iPhone o dispositivo Android, esto sitúa la `X` exactamente debajo del porcentaje de batería o sobre el orificio de la cámara.

**Regla Estricta**: Todo modal a pantalla completa debe estructurar una barra de control superior con relleno seguro:

```tsx
// [CORRECTO] Modal a pantalla completa blindado contra la barra de estado y cámara
export function FullScreenModal({ isOpen, onClose, title, children }: FullScreenModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]"
    >
      {/* Barra de cabecera del modal */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana emergente"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 touch-manipulation active:scale-95"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contenido con scroll interno independiente */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
}
```

### B. Paneles Laterales Deslizables (*Side Drawers*)
Cuando un menú o panel deslizable proviene de la izquierda o la derecha, su cabecera interna DEBE incluir `pt-[env(safe-area-inset-top)]` para que la lista de enlaces o el botón de cerrar menú no queden mutilados por la cámara o la Isla Dinámica.

---

## 5. Rotación de Dispositivo (Modo Horizontal / *Landscape*)

Al girar el dispositivo móvil de posición vertical a horizontal:
1. La muesca de la cámara o la Isla Dinámica se ubica físicamente en el **lateral izquierdo** o en el **lateral derecho**.
2. Por consiguiente, los insets horizontales `env(safe-area-inset-left)` y `env(safe-area-inset-right)` pasan a tener valores positivos (aproximadamente entre 44px y 59px).
3. **Regla de Adaptabilidad**: Los componentes que abarquen el ancho completo de la pantalla deben incluir salvaguardas para ambos lados:
   ```tsx
   <div className="w-full px-4 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
     {/* Contenido protegido de recortes laterales */}
   </div>
   ```

---

## 6. Sincronización Cromática y Contraste de la Barra de Estado

Para que los iconos del sistema (batería, wifi, hora) sean legibles, el contraste debe ser óptimo:

| Fondo de la Cabecera | Requisito de Iconos del Sistema | Configuración Recomendada |
| :--- | :--- | :--- |
| **Claro (Blanco / Slate-50)** | Iconos Oscuros (Negros/Grises) | Metatag `theme-color` en `#ffffff` / iOS `content="default"` |
| **Oscuro (Slate-900 / Negro)** | Iconos Claros (Blancos) | Metatag `theme-color` en `#0f172a` / iOS `content="black-translucent"` |

En aplicaciones React con soporte dinámico para modo oscuro/claro, se debe sincronizar dinámicamente el valor del metatag `theme-color` al cambiar el tema:

```ts
export function syncSystemThemeColor(isDark: boolean): void {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
  }
}
```

---

## 7. Componente Reutilizable Estricto: `MobileSafeHeader`

A continuación se define la implementación de referencia en TypeScript 100% estricto que cumple con todas las cláusulas de esta regla:

```tsx
import { ReactNode } from 'react';

interface MobileSafeHeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  className?: string;
}

export function MobileSafeHeader({
  title,
  subtitle,
  leftAction,
  rightAction,
  className = '',
}: MobileSafeHeaderProps) {
  return (
    <header 
      className={`sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 pt-[env(safe-area-inset-top)] ${className}`}
    >
      <div className="h-14 px-3 flex items-center justify-between max-w-7xl mx-auto gap-2">
        {/* Zona de Acción Izquierda: Tamaño mínimo 44x44px */}
        <div className="min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
          {leftAction}
        </div>

        {/* Zona Central de Título y Subtítulo: Protegida contra desbordamiento */}
        <div className="flex-1 min-w-0 text-center px-1">
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </p>
          )}
        </div>

        {/* Zona de Acción Derecha: Tamaño mínimo 44x44px */}
        <div className="min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0">
          {rightAction}
        </div>
      </div>
    </header>
  );
}
```

---

## 8. Lista de Verificación (Checklist) de Auditoría Obligatoria

Toda pantalla o componente móvil nuevo o refactorizado debe pasar sin excepciones la siguiente auditoría:

- [ ] ¿El archivo `index.html` incluye `viewport-fit=cover` en la etiqueta `meta name="viewport"`?
- [ ] ¿Los encabezados fijos (`sticky` o `fixed`) en la parte superior cuentan con `pt-[env(safe-area-inset-top)]`?
- [ ] ¿El color de fondo o desenfoque de la cabecera sangra hasta el borde físico superior (`top: 0`) sin generar bandas artificiales blancas o negras?
- [ ] ¿Los botones de retroceso, cierre, menú y acciones superiores poseen un área de pulsación de al menos `44x44px` (Apple) y `48x48px` (Android)?
- [ ] ¿Los botones de acción superior están a suficiente distancia del borde superior para no disparar el Centro de Control ni el Centro de Notificaciones?
- [ ] ¿Los modales de pantalla completa y *Drawers* laterales aplican relleno seguro superior e inferior para evitar solapamientos con la cámara y la barra de navegación?
- [ ] ¿Se contempla la rotación en modo horizontal mediante `pl-[env(safe-area-inset-left)]` y `pr-[env(safe-area-inset-right)]`?
- [ ] ¿Existe contraste visual óptimo entre los iconos del sistema (batería, wifi, reloj) y el fondo de la aplicación?

---

## 9. Prompt Maestro Oficial de Inyección Directa

El siguiente bloque puede suministrarse directamente a cualquier asistente de inteligencia artificial o incluirse en instrucciones de repositorio para exigir el cumplimiento incondicional de esta norma:

```text
DIRECTIVA ESTRICTA DE GOBERNANZA MÓVIL: RESPETO ABSOLUTO DE BARRAS DE SISTEMA Y SAFE AREAS (iOS / ANDROID)

Se exige el cumplimiento riguroso de las directrices Apple Human Interface Guidelines (iOS) y Google Material Design 3 (Android 15 Edge-to-Edge). Queda terminantemente prohibido generar interfaces móviles donde los elementos visuales, títulos, botones de retroceso, logotipos, campos de búsqueda o acciones queden tapados, recortados o solapados por la cámara frontal (notch, orificio punch-hole, Isla Dinámica), barra de estado del sistema (reloj, notificaciones), o indicadores de batería y señal Wi-Fi.

REGLAS DE OBLIGATORIO CUMPLIMIENTO:
1. En index.html es mandatorio el metatag: <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />.
2. Arquitectura 'Bleed Background, Inset Content': El fondo o desenfoque de la cabecera debe sangrar hasta el borde físico superior (top: 0), pero todos los elementos interactivos e informativos deben tener padding-top estricto mediante pt-[env(safe-area-inset-top)].
3. Modales y Paneles Deslizables: Ningún modal a pantalla completa o drawer lateral puede posicionar botones de cierre ('X') con coordenadas absolutas sin considerar safe-area-inset-top. Todo modal debe poseer una barra de control con relleno seguro.
4. Tamaños Táctiles Mínimos: Todo control interactivo ubicado en barras superiores debe medir al menos 44x44px para evitar colisión con los gestos del sistema (Centro de Control en iOS, Notificaciones en Android).
5. Rotación Horizontal: Respetar recortes laterales de cámara mediante pl-[env(safe-area-inset-left)] y pr-[env(safe-area-inset-right)].
6. Código 100% TypeScript estricto, sin any, sin @ts-ignore, sin React.FC y con clases Tailwind validadas.
```
