---
name: react-safe-area-system-bars-expert
description: >-
  Audita, diagnostica y construye componentes e interfaces móviles en React que respetan estrictamente
  las Safe Areas (Zonas Seguras) y las barras del sistema (Status Bar, cámara frontal, notch, Isla Dinámica,
  batería y Wi-Fi) según Apple HIG (iOS) y Google Android 15 Edge-to-Edge.
---

# React Safe Area & System Bars Expert Skill

Esta habilidad guía a desarrolladores y asistentes de inteligencia artificial en la auditoría, prevención y corrección de solapamientos entre la interfaz gráfica de una aplicación web/móvil en React y los elementos de hardware y sistema operativo en iOS (Apple HIG) y Android (Material 3 / Edge-to-Edge).

---

## 1. Procedimiento de Auditoría y Diagnóstico

Al revisar cualquier componente de encabezado, barra de navegación, modal o vista móvil, se debe ejecutar la siguiente secuencia:

### Paso 1: Detección de Elementos Superiores con Coordenadas Rígidas
- **Patrón Vulnerable**: Clases como `fixed top-0`, `sticky top-0` o `absolute top-0` sin clases de relleno seguro.
- **Consecuencia**: El contenido (botones de regreso, títulos, logotipos) colisiona directamente con el orificio de la cámara, el notch, la Isla Dinámica, el reloj o los indicadores de batería y Wi-Fi.
- **Acción Correctiva**: Integrar la clase utilitaria `pt-[env(safe-area-inset-top)]` en el contenedor o aplicar la arquitectura de fondo sangrado con contenido protegido.

### Paso 2: Auditoría de Botones de Cierre en Modales
- **Patrón Vulnerable**: Botones de cierre posicionados con `absolute top-2 right-2` o `absolute top-4 right-4` en pantallas modales o *Drawers*.
- **Consecuencia**: En iPhone, el botón queda situado debajo del icono de batería o la señal de red; en Android, puede quedar sobre la cámara frontal o la barra de notificaciones.
- **Acción Correctiva**: Encapsular el botón de cierre en una barra de cabecera con altura estandarizada (mínimo `h-14`) que consuma `pt-[env(safe-area-inset-top)]`.

### Paso 3: Verificación de Dimensiones Táctiles y Distancia a Gestos
- **Patrón Vulnerable**: Botones con dimensiones inferiores a 44x44 píxeles o situados al ras del borde superior del marco.
- **Consecuencia**: El usuario no puede presionar el botón o el sistema operativo intercepta el toque como un gesto para desplegar el Centro de Control (iOS) o la persiana de notificaciones (Android).
- **Acción Correctiva**: Asignar `min-w-[44px] min-h-[44px]` (o `min-w-[48px] min-h-[48px]`) y la propiedad `touch-manipulation`.

### Paso 4: Comprobación de Configuración Base en `index.html`
- Verificar que el metatag de viewport contenga obligatoriamente `viewport-fit=cover`. Sin esta directiva, los navegadores desactivan `env(safe-area-inset-*)` y devuelven `0px`.

---

## 2. Implementación de Referencia: Hook `useSafeAreaInsets`

Para componentes dinámicos donde se requiera calcular valores numéricos o estilos en línea, se utiliza el siguiente hook estricto en TypeScript:

```ts
import { useState, useEffect } from 'react';

export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Hook para obtener y monitorear las dimensiones en píxeles de las Safe Areas del dispositivo.
 * Detecta valores computados de env(safe-area-inset-*) y reacciona ante cambios de orientación.
 */
export function useSafeAreaInsets(): SafeAreaInsets {
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    function computeInsets(): void {
      const div = document.createElement('div');
      div.style.position = 'fixed';
      div.style.left = '0';
      div.style.top = '0';
      div.style.visibility = 'hidden';
      div.style.paddingTop = 'env(safe-area-inset-top, 0px)';
      div.style.paddingBottom = 'env(safe-area-inset-bottom, 0px)';
      div.style.paddingLeft = 'env(safe-area-inset-left, 0px)';
      div.style.paddingRight = 'env(safe-area-inset-right, 0px)';
      document.body.appendChild(div);

      const style = window.getComputedStyle(div);
      const top = parseFloat(style.paddingTop) || 0;
      const bottom = parseFloat(style.paddingBottom) || 0;
      const left = parseFloat(style.paddingLeft) || 0;
      const right = parseFloat(style.paddingRight) || 0;

      document.body.removeChild(div);

      setInsets({ top, bottom, left, right });
    }

    computeInsets();
    window.addEventListener('resize', computeInsets);
    window.addEventListener('orientationchange', computeInsets);

    return () => {
      window.removeEventListener('resize', computeInsets);
      window.removeEventListener('orientationchange', computeInsets);
    };
  }, []);

  return insets;
}
```

---

## 3. Implementación de Contenedor Blindado de Pantalla Completa

Componente estructurado que garantiza visualización Edge-to-Edge pura en el fondo, aislando el contenido dentro de los márgenes seguros físicos:

```tsx
import { ReactNode } from 'react';

interface MobileScreenLayoutProps {
  headerContent?: ReactNode;
  children: ReactNode;
  footerContent?: ReactNode;
  className?: string;
}

export function MobileScreenLayout({
  headerContent,
  children,
  footerContent,
  className = '',
}: MobileScreenLayoutProps) {
  return (
    <div className={`min-h-screen w-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${className}`}>
      {/* Cabecera con fondo sangrado y contenido con relleno seguro */}
      {headerContent && (
        <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 pt-[env(safe-area-inset-top)] shrink-0">
          <div className="h-14 px-4 flex items-center justify-between">
            {headerContent}
          </div>
        </header>
      )}

      {/* Área de contenido con scroll aislado y respeto de rotación horizontal */}
      <main className="flex-1 min-h-0 overflow-y-auto pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
        {children}
      </main>

      {/* Barra inferior fija blindada contra la barra de gestos */}
      {footerContent && (
        <footer className="sticky bottom-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom)] shrink-0">
          <div className="p-3">
            {footerContent}
          </div>
        </footer>
      )}
    </div>
  );
}
```

---

## 4. Prompt de Verificación de Integridad para Desarrolladores

Para solicitar a un asistente la verificación exhaustiva de una vista móvil, usar el siguiente comando de instrucción:

```text
Audita esta vista móvil bajo la habilidad react-safe-area-system-bars-expert.
Verifica que:
1. Ningún botón, título o icono quede tapado por la cámara frontal, notch, Isla Dinámica o barra de batería/wifi.
2. Todo elemento en sticky/fixed top aplique pt-[env(safe-area-inset-top)].
3. Los objetivos de toque superior midan al menos 44x44px.
4. Los modales de pantalla completa protejan su botón de cierre.
5. El código sea 100% TypeScript estricto sin any.
```
