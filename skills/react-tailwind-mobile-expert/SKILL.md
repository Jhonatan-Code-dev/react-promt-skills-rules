---
name: react-tailwind-mobile-expert
description: >-
  Asiste en el diseño, maquetación y auditoría de componentes móviles eficientes en React + Vite utilizando Tailwind CSS.
  Aplica objetivos táctiles de 44px, layouts fluidos con grid/flex, interlineados amplios y sombras sutiles sin emojis.
---

# React Tailwind Mobile Expert Skill

Esta habilidad guía en la creación y optimización de interfaces móviles de alto rendimiento y usabilidad táctil con Tailwind CSS.

---

## Metodología de Maquetación Móvil

### 1. Verificación del Área Táctil (Mínimo 44px)
- Comprobar que botones, enlaces e inputs tengan una altura mínima de 44px (`h-11` o `min-h-[44px]`).
- Garantizar que incluyan feedback visual de foco (`focus:ring-4`) y animación activa (`active:scale-95`).

### 2. Estructuración de Grid y Flex Responsivos
- Iniciar con `grid-cols-1` para dispositivos móviles.
- Escalar a `sm:grid-cols-2` en tablets y `lg:grid-cols-3` en pantallas grandes.

### 3. Ajuste de Legibilidad y Espaciado
- Usar `text-base` en párrafos y `leading-relaxed` o `leading-7`.
- Mantener paddings limpios (`p-4` o `p-6`) sin saturar la pantalla.

---

## Ejemplo de Tarjeta Móvil Eficiente

```tsx
export function MobileCardExample() {
  return (
    <article className="w-full max-w-sm mx-auto bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden p-6 transition-shadow hover:shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-3 text-slate-900 dark:text-slate-100 tracking-wide">
        Bienvenido a Mi App
      </h2>
      <p className="text-base text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
        Esta interfaz está creada con Tailwind CSS para ofrecer la máxima claridad, velocidad y funcionalidad en dispositivos móviles.
      </p>
      <button
        type="button"
        className="w-full h-11 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 text-white font-medium px-5 rounded-lg shadow transition-all active:scale-95 touch-manipulation flex items-center justify-center text-base"
      >
        Empezar Ahora
      </button>
    </article>
  );
}
```
