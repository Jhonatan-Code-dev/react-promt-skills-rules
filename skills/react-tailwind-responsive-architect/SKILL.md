---
name: react-tailwind-responsive-architect
description: >-
  Audita, maqueta y refactoriza interfaces web en React + Vite aplicando la metodología Mobile-First y el sistema de breakpoints ascendentes de Tailwind CSS (sm, md, lg, xl, 2xl) sin emojis.
---

# React Tailwind Responsive Architect Skill

Esta habilidad guía en la auditoría y maquetación de interfaces adaptables en React + Vite utilizando el enfoque Mobile-First estricto con Tailwind CSS.

---

## Metodología de Maquetación Mobile-First

### 1. Auditoría de Clases Base
- Confirmar que las clases sin prefijo contengan los valores pensados para teléfonos móviles de pantalla reducida (< 640px).
- Remover prefijos redundantes (ej. reemplazar `sm:text-sm` por `text-sm` si ese es el estilo que se desea desde móvil).

### 2. Aplicación de Breakpoints Ascendentes
- Usar `sm:` (640px) para adaptar el diseño a phablets o móviles apaisados.
- Usar `md:` (768px) para introducir estructuras de dos columnas en tablets.
- Usar `lg:` (1024px) y `xl:` (1280px) para desplegar barras laterales, menús extensos e interfaces de escritorio.

---

## Ejemplo de Componente Adaptable Auditado

```tsx
export function ResponsiveBannerExample() {
  return (
    <section className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-slate-900 text-white rounded-none sm:rounded-2xl shadow-none sm:shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
            Diseño Adaptable en Todos los Dispositivos
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Construido mediante la metodología Mobile-First de Tailwind CSS. Comienza sin prefijos en móviles pequeños y se expande en pantallas grandes.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
          <button
            type="button"
            className="w-full sm:w-auto h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg touch-manipulation active:scale-95 transition-all text-base"
          >
            Explorar
          </button>
        </div>
      </div>
    </section>
  );
}
```
