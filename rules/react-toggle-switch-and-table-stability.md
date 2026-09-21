# Reglas de Toggle Switch Interactivo, Estabilidad de Tablas (Zero Layout Shift) y Control de Toasts

Esta regla define el estándar técnico obligatorio para la implementación de interruptores de estado (Toggle Switches) en tablas y listados de datos dentro de aplicaciones React con TypeScript estricto y Tailwind CSS. Su objetivo es eliminar el desplazamiento involuntario de columnas (Cumulative Layout Shift - CLS), evitar el desmontaje visual de datos por spinners globales y prevenir la saturación o apilamiento repetitivo de notificaciones emergentes (toasts).

---

## 1. Componente Obligatorio: Toggle Switch Deslizante

Para cualquier acción de activación o alternancia booleana (`activo`/`inactivo`, `habilitado`/`deshabilitado`) en una tabla:

- **Prohibido**: Emplear botones planos, botones con texto que simulen badges estáticos o botones rígidos con iconos sin retroalimentación fluida de estado.
- **Obligatorio**: Utilizar un **Toggle Switch accesible con transición horizontal**:
  - **Pista (Track)**: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`.
    - Activo: `bg-emerald-500 dark:bg-emerald-600`.
    - Inactivo: `bg-slate-300 dark:bg-slate-700`.
  - **Pomo Deslizante (Knob)**: `pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out`.
    - Activo: `translate-x-4`.
    - Inactivo: `translate-x-0`.
  - **Accesibilidad Semántica (WAI-ARIA - ISO/IEC 40500)**:
    - Atributo de rol obligatorio: `role="switch"`.
    - Estado booleano accesible: `aria-checked={item.activo}`.
    - Etiqueta descriptiva accesible: `aria-label={`Cambiar estado de ${item.nombre}`}`.

---

## 2. Prevención Estricta de Desplazamiento de Tabla (Anti-Layout Shift)

### A. Actualización Optimista en Memoria (Optimistic UI a 0ms)
- Al hacer clic en el switch, el estado local en React debe mutar de forma **inmediata (0 milisegundos)** en memoria antes de esperar la resolución de red.
- **Prohibido Terminantemente**: Invocar estados de carga global (`setLoading(true)`) o recargar toda la tabla mostrando esqueletos o spinners de carga al cambiar el estado de una fila. Desmontar la tabla causa parpadeos y saltos visuales destructivos para la experiencia de usuario.
- **Estrategia de Reversión**: En caso de fallo en la petición HTTP (`PATCH` o `PUT`), se revierte el estado local a su valor original y se emite la notificación de error correspondiente.

### B. Geometría Rígida de Columnas (`table-fixed`)
- La etiqueta `<table>` debe declarar obligatoriamente la clase `table-fixed`.
- Las cabeceras de columna (`<th>`) deben definir anchos explícitos en píxeles o porcentajes rígidos (por ejemplo: `w-[34%]`, `w-[26%]`, `w-[18%]`, `w-[12%]`, `w-[10%]`).

### C. Contenedor de Ancho Rígido para Textos Variables
- Los textos `"Activo"` (6 caracteres, ~36px) e `"Inactivo"` (8 caracteres, ~50px) poseen anchos dispares en cualquier tipografía proporcional.
- **Obligatorio**: El texto explicativo que acompaña al interruptor debe estar encapsulado en un contenedor de ancho estricto con alineación a la izquierda:
  ```tsx
  <span className="w-12 text-left text-xs font-semibold select-none">
    {item.activo ? 'Activo' : 'Inactivo'}
  </span>
  ```
- Este contenedor evita que la variación de caracteres empuje o contraiga el interruptor y desplace las columnas circundantes.

---

## 3. Prevención Estricta de Saturación de Notificaciones (Anti-Toast Stacking)

### A. Identificador Único Fijo en Toasts de Mutación
Toda notificación de éxito o error al alternar un estado debe incluir un `id` estático o parametrizado por módulo:
```typescript
toast.success(`Sucursal ${nuevoEstado ? 'activada' : 'desactivada'} correctamente`, {
  id: 'toast-toggle-estado',
});
```
- **Razón Técnica**: Si el usuario pulsa múltiples veces o de manera rápida, la librería de notificaciones (`react-hot-toast` o similar) actualiza la instancia existente en lugar de apilar una columna de 10 mensajes emergentes que cubran la interfaz.

### B. Bloqueo Temporal Anti-Doble Clic (`togglingId`)
- Al iniciar la petición asíncrona, registrar el identificador del elemento que se encuentra procesando (`setTogglingId(item.id)`).
- Deshabilitar el interruptor mientras esté en proceso (`disabled={item.esPrincipal || togglingId === item.id}`).
- Previene que clics en ráfaga envíen peticiones duplicadas o generen condiciones de carrera en el backend.

---

## 4. Implementación de Referencia en TypeScript

```tsx
// ============================================================================
// BLOQUE 1: IMPORTACIONES CATEGORIZADAS Y ORDENADAS
// ============================================================================
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

// ============================================================================
// BLOQUE 2: DEFINICIONES DE TIPOS E INTERFACES
// ============================================================================
export interface BranchEntity {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly isActive: boolean;
  readonly isMain: boolean;
}

export interface BranchStatusToggleProps {
  readonly branch: BranchEntity;
  readonly isProcessing: boolean;
  readonly onToggle: (id: string, nextStatus: boolean) => Promise<void>;
}

// ============================================================================
// BLOQUE 3: CONSTANTES LOCALES DEL MÓDULO
// ============================================================================
const TOAST_ID_STATUS = 'toast-branch-status-toggle';

// ============================================================================
// BLOQUE 4: COMPONENTE REACT PRINCIPAL
// ============================================================================
export function BranchStatusToggle({
  branch,
  isProcessing,
  onToggle,
}: BranchStatusToggleProps) {
  const isDisabled = branch.isMain || isProcessing;

  const handleClick = useCallback(async () => {
    if (isDisabled) {
      return;
    }

    const nextStatus = !branch.isActive;

    try {
      await onToggle(branch.id, nextStatus);
      toast.success(
        `Sucursal ${nextStatus ? 'activada' : 'desactivada'} correctamente`,
        { id: TOAST_ID_STATUS }
      );
    } catch {
      toast.error('Error al actualizar el estado de la sucursal', {
        id: TOAST_ID_STATUS,
      });
    }
  }, [branch.id, branch.isActive, isDisabled, onToggle]);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={branch.isActive}
        aria-label={`Cambiar estado de ${branch.name}`}
        disabled={isDisabled}
        onClick={handleClick}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
          branch.isActive
            ? 'bg-emerald-500 dark:bg-emerald-600'
            : 'bg-slate-300 dark:bg-slate-700'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            branch.isActive ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>

      {/* Contenedor rígido para eliminar el Layout Shift */}
      <span className="w-14 text-left text-xs font-semibold select-none text-slate-700 dark:text-slate-300">
        {branch.isActive ? 'Activo' : 'Inactivo'}
      </span>
    </div>
  );
}

// ============================================================================
// BLOQUE 5: FUNCIONES AUXILIARES PURAS (HELPERS)
// ============================================================================
// (Espacio reservado para validadores o transformadores puros del módulo)
```

---

## 5. Anti-Patrones Prohibidos

1. **Re-renderizado destructivo con Spinners de Tabla**:
   - Reemplazar toda la grilla por un spinner o esqueleto durante el cambio de un switch booleano.
2. **Textos sin ancho fijo junto al switch**:
   - Provoca vibración horizontal de las columnas cada vez que se alterna entre palabras de distinta longitud.
3. **Toasts sin identificador estático**:
   - Provoca la saturación de la pantalla con múltiples mensajes idénticos apilados.
4. **Ausencia del atributo semántico `role="switch"`**:
   - Degrada la accesibilidad del sistema impidiendo que los lectores de pantalla reconozcan el elemento como un interruptor binario.
