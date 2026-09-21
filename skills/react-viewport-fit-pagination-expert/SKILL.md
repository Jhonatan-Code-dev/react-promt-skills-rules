---
name: react-viewport-fit-pagination-expert
description: >-
  Asiste y audita la implementación del patrón Viewport-Fit con Scroll Interno Aislado y Paginación Fija
  (Sticky Bottom Pagination), anclando cabeceras y barras de paginación al 100% del viewport en módulos de gestión.
---

# React Viewport-Fit & Sticky Pagination Expert Skill

Esta habilidad guía al desarrollador y al asistente en el diseño, maquetación, auditoría y refactorización de pantallas administrativas de alta densidad de datos (como el módulo de Gestión de Sucursales, catálogos, pedidos y maestros). Asegura que el área de datos se adapte al 100% de la pantalla sin scroll exterior en la ventana, manteniendo el encabezado superior y la barra de paginación siempre accesibles e inamovibles.

---

## Metodología de Implementación y Diagnóstico

### 1. Diagnóstico del Contenedor Raíz
- **Problema Común**: La pantalla genera un scroll en la ventana global del navegador (`window`), lo que hace que la barra de paginación desaparezca bajo la línea de visión si hay muchos registros.
- **Acción Correctiva**:
  1. Verificar que el layout padre tenga `h-screen`, `h-[100dvh]` o `h-full` con `overflow-hidden`.
  2. Aplicar estructura Flexbox en columna: `flex flex-col h-full max-h-full overflow-hidden`.

### 2. Aislamiento del Área de Scroll Interno
- **Problema Común**: El listado de datos empuja el pie de página hacia abajo en lugar de mostrar su propia barra de scroll interna.
- **Acción Correctiva**:
  1. Asignar al contenedor de la tabla o grilla las clases `flex-1 min-h-0 overflow-y-auto overflow-x-auto`.
  2. **Regla de Oro**: La propiedad `min-h-0` es obligatoria en Flexbox para habilitar la contracción del hijo y el scroll interno.
  3. Fijar la cabecera de la tabla con `sticky top-0 z-10` y un color de fondo sólido o con blur para que los títulos de columna no se pierdan al desplazarse.

### 3. Anclaje de la Paginación al Fondo (Sticky Bottom)
- **Problema Común**: La barra de paginación cambia de posición vertical cuando se alternan filtros o se pasa a una página con pocas filas.
- **Acción Correctiva**:
  1. Colocar la barra de paginación fuera del área de scroll, con la clase `shrink-0`.
  2. Si se requiere protección adicional, añadir `sticky bottom-0 z-10`.
  3. Incorporar `pb-[env(safe-area-inset-bottom)]` para asegurar compatibilidad con la barra de gestos en dispositivos móviles y tabletas.

---

## Checklist de Validación Rápida

- [ ] ¿El contenedor principal tiene `flex flex-col` y `overflow-hidden`?
- [ ] ¿El área central con la tabla incluye `flex-1 min-h-0 overflow-y-auto`?
- [ ] ¿La cabecera de la tabla (`thead`) tiene `sticky top-0 z-10`?
- [ ] ¿La barra de paginación está anclada con `shrink-0` y visible de forma constante?
- [ ] ¿El contenedor con scroll tiene `tabIndex={0}` y `role="region"` para navegación por teclado?
- [ ] ¿Los botones de paginación respetan el tamaño táctil de al menos 44px (`min-h-[40px]` a `min-h-[44px] touch-manipulation`)?
- [ ] ¿Se utiliza `100dvh` o `h-full` en lugar del problemático `100vh`?

---

## Ejemplo de Transformación Rápida de un Componente

### [ANTES] Scroll global roto y paginación oculta
```tsx
// Incorrecto: La página entera hace scroll, perdiendo visibilidad de cabeceras y paginación
export function BrokenTableLayout({ data }: Props) {
  return (
    <div className="p-6">
      <h1>Gestión de Sucursales</h1>
      <table>...</table>
      <div className="mt-4 flex justify-between">
        {/* Paginación perdida al fondo de la pantalla */}
      </div>
    </div>
  );
}
```

### [DESPUÉS] Viewport-Fit con Scroll Aislado y Paginación Fija
```tsx
// Correcto: 100% de aprovechamiento del espacio, cabecera fija, scroll interno y paginación anclada
export function OptimizedTableLayout({ data }: Props) {
  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <header className="shrink-0 p-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-bold">Gestión de Sucursales</h1>
      </header>
      
      <main
        tabIndex={0}
        role="region"
        aria-label="Listado de sucursales"
        className="flex-1 min-h-0 overflow-y-auto overflow-x-auto"
      >
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900 border-b">
            {/* Cabecera persistente */}
          </thead>
          <tbody>
            {/* Filas con scroll interno */}
          </tbody>
        </table>
      </main>

      <footer className="shrink-0 sticky bottom-0 z-10 border-t bg-white dark:bg-slate-950 p-3 pb-[env(safe-area-inset-bottom)]">
        {/* Paginación permanente y accesible */}
      </footer>
    </div>
  );
}
```
