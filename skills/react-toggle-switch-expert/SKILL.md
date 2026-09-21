---
name: react-toggle-switch-expert
description: >-
  Audita e implementa interruptores deslizantes (Toggle Switches) accesibles en tablas y listados,
  garantizando actualización optimista inmediata (0ms), cero desplazamiento de columnas (Anti-Layout Shift)
  y control estricto de notificaciones (Anti-Toast Stacking).
---

# React Toggle Switch & Table Stability Expert Skill

Esta habilidad asiste y audita la implementación de botones interruptores deslizantes (Toggle Switches) en tablas de datos de aplicaciones React con TypeScript y Tailwind CSS, eliminando saltos de diseño (Cumulative Layout Shift) y saturación de notificaciones.

---

## 1. Prompt Reutilizable de Activación

Utiliza el siguiente prompt estandarizado en tus interacciones para exigir la implementación correcta de este componente:

```text
Implementa para la columna de Estado un Toggle Switch interactivo (interruptor deslizante de izquierda a derecha con role="switch"). Debe cumplir estrictamente los siguientes tres estándares de estabilidad:
1. Actualización Optimista (0ms): Cambia el switch en memoria de inmediato; no actives spinners de carga (setLoading) que desmonten la tabla ni generen parpadeo.
2. Cero Movimiento en Tabla (Anti-Layout Shift): La tabla debe llevar table-fixed con anchos definidos en <th>. El texto ('Activo' / 'Inactivo') debe estar dentro de un contenedor de ancho fijo (ej. w-14 text-left) para que la diferencia de letras no mueva las columnas.
3. Anti-Toast Stacking & Anti-Doble Clic: Usa un identificador fijo en el toast (toast.success('...', { id: 'toast-toggle-estado' })) para que nunca se apilen mensajes repetidos, y deshabilita el switch mientras procesa la petición de esa fila (togglingId).
```

---

## 2. Metodología de Auditoría e Implementación

### Paso 1: Diagnóstico de la Tabla y Anti-Layout Shift
- Comprobar que la etiqueta `<table>` incluya `table-fixed`.
- Verificar que todas las cabeceras `<th>` posean anchos definidos (porcentaje o píxeles).
- Revisar que el texto adyacente al interruptor se encuentre dentro de un contenedor con ancho rígido (ejemplo: `w-14 text-left`) para absorber la diferencia de caracteres entre "Activo" e "Inactivo".

### Paso 2: Interfaz Optimista sin Desmontaje (0ms)
- Aplicar la mutación de estado inmediatamente en la memoria del cliente.
- Prohibir el uso de `isLoading` o spinners globales que desmonten o congelen la tabla.
- Capturar excepciones en el bloque `catch` para revertir el estado en caso de fallo de red.

### Paso 3: Control de Notificaciones y Clics en Ráfaga
- Comprobar que toda llamada a `toast.success` o `toast.error` contenga `{ id: 'toast-identificador-fijo' }`.
- Controlar el bloqueo mediante un estado de fila activa (ej. `togglingId === item.id`), inhabilitando el botón mientras se ejecuta la mutación asíncrona.

---

## 3. Checklist de Verificación Rápida

- [ ] ¿El interruptor cuenta con `role="switch"` y `aria-checked`?
- [ ] ¿La tabla tiene la clase `table-fixed`?
- [ ] ¿El texto "Activo" / "Inactivo" está contenido en un `<span>` con ancho fijo (`w-12` o `w-14`)?
- [ ] ¿El switch actualiza la UI de forma instantánea sin mostrar spinners que desmonten la tabla?
- [ ] ¿Los toasts de éxito y error incluyen un `id` único para evitar su acumulación?
- [ ] ¿Se deshabilita el interruptor durante el procesamiento de la fila para evitar doble clic?
