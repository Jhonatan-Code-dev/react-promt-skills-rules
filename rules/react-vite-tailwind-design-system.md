# Reglas de Diseño Experto y Sistema de Estilos: React + Vite + Tailwind CSS

Esta regla define los estándares de maquetación, arquitectura visual y desarrollo de componentes para proyectos creados con React, Vite y Tailwind CSS.

---

## 1. Stack Tecnológico Base y Uso Exclusivo de Tailwind CSS

- **Framework y Bundler**: React + Vite + TypeScript.
- **Uso Exclusivo de Tailwind CSS**:
  - Queda estrictamente prohibida la creación de archivos CSS puros adicionales o el uso de estilos inline estáticos (`style={{ ... }}`).
  - Toda la interfaz visual, diseño responsive, animaciones y estados (hover, focus, active, disabled, dark) deben construirse utilizando al 100% clases utilitarias de Tailwind CSS.
  - Para clases compuestas o condicionales, utilizar utilidades tipo `clsx` o `tailwind-merge` (`twMerge`).

---

## 2. Diseño Responsivo Fluido (Ultra Mobile-First)

### A. Prohibición de Valores Fijos en Píxeles
- **Prohibido el uso de dimensiones fijas**: No utilizar clases arbitrarias de ancho o alto fijo en píxeles (ej. `w-[350px]` o `h-[500px]`).
- **Uso de Contenedores Fluidos**: Emplear dimensiones porcentuales y límites máximos (`w-full`, `max-w-screen-xl`, `max-w-7xl`, `max-w-md`, `min-h-screen`, `flex-1`).

### B. Cobertura desde Celulares Ultra Pequeños
- El diseño debe probarse y funcionar perfectamente en dispositivos móviles ultra pequeños (< 360px de ancho).
- Utilizar cuadrículas y flexbox adaptativos:
  ```tsx
  // [CORRECTO] Cuadrícula responsiva fluida
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6">
  ```

---

## 3. Tipografía Escalable y Elegante

### A. Fuentes Modernas de Primera Clase
- Configurar la tipografía del proyecto utilizando fuentes modernas, profesionales y legibles como Inter, Outfit, Plus Jakarta Sans o Roboto.

### B. Escala de Texto Responsiva
- El tamaño del texto debe escalar proporcionalmente según el tamaño de la pantalla:
  - Títulos Principales: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight`
  - Subtítulos: `text-lg sm:text-xl md:text-2xl font-semibold`
  - Cuerpo de Texto: `text-sm sm:text-base text-slate-600 dark:text-slate-300`
  - Textos Secundarios: `text-xs sm:text-sm text-slate-500 dark:text-slate-400`

---

## 4. Jerarquía HTML5 Semántica y Maquetación Experta

Toda vista o componente debe respetar una estricta jerarquía de contenedores de padre a hijo:

```tsx
// [CORRECTO] Jerarquía Semántica Profesional en React + Vite
export function ComponenteEjemplo() {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <header className="w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-bold text-xl">Marca</span>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section aria-labelledby="section-title" className="space-y-6">
          <h1 id="section-title" className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Título Principal de la Sección
          </h1>
          <article className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <p className="text-sm sm:text-base leading-relaxed">
              Contenido del artículo estructurado con precisión.
            </p>
          </article>
        </section>
      </main>

      <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Derechos Reservados
        </div>
      </footer>
    </div>
  );
}
```

---

## 5. Paletas de Colores Profesionales y Estética Humana Anti-IA

### A. Paletas Curadas (No Colores Genéricos)
- Prohibido el uso de colores primarios simples sin matizar (rojo puro, azul puro).
- Utilizar paletas HSL equilibradas de Tailwind:
  - Fondos: `bg-slate-50`, `bg-zinc-900`, `bg-neutral-950`.
  - Colores de Acento Primarios: `indigo-600` / `violet-600` / `emerald-600`.
  - Bordes y Separadores: `border-slate-200 dark:border-slate-800`.

### B. Prohibición Total de Emojis y Diseños AI-Kitsch
- Queda totalmente prohibido el uso de emojis dentro de botones, títulos, tarjetas o elementos de la interfaz.
- La interfaz debe transmitir sobriedad, profesionalismo y diseño diseñado por ingenieros humanos de alto nivel.
