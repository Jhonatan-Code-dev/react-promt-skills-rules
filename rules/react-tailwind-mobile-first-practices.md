# Reglas de Ingeniería: Mejores Prácticas de Diseño Móvil con Tailwind CSS

Esta regla establece las directrices fundamentales para diseñar e implementar interfaces móviles de alta velocidad, usabilidad y adaptabilidad utilizando la metodología Utility-First de Tailwind CSS en proyectos React + Vite.

---

## 1. Enfoque Utility-First Responsivo desde el Núcleo

Toda interfaz móvil debe construirse utilizando clases predefinidas de Tailwind CSS en lugar de escribir CSS personalizado. La responsividad debe estructurarse desde el tamaño más pequeño (Mobile-First) agregando prefijos de breakpoint (`sm:`, `md:`, `lg:`, `xl:`) conforme aumenta la pantalla.

```tsx
// [CORRECTO] Mobile-First: 1 columna en móvil, 2 columnas en tablet (sm), 3 en desktop (lg)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
```

---

## 2. Layouts Fluidos con Flexbox y Grid

Los contenedores móviles deben adaptarse a pantallas estrechas y cambios de orientación (portrait/landscape):

- Usar `flex flex-col` para apilar elementos verticalmente en móviles.
- Usar `grid grid-cols-1` para tarjetas y listas, ajustando el número de columnas con `sm:grid-cols-2`.
- Mantener espacios proporcionales con utilidades `gap-4` o `space-y-4`.

---

## 3. Legibilidad Tipográfica e Interlineado Cómodo

En pantallas móviles, la lectura debe ser cómoda sin esfuerzo visual:

- **Tamaño de Fuente Base**: Usar `text-base` (`16px`) como estándar para párrafos en móviles.
- **Interlineado Amplio**: Aplicar `leading-relaxed` o `leading-7` para evitar que las líneas de texto se amontonen.
- **Espaciado de Letras**: Usar `tracking-wide` en encabezados para mejorar la distinción de caracteres.

```tsx
// [CORRECTO] Texto estructurado para máxima legibilidad en móvil
<p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
  Esta interfaz está optimizada con Tailwind CSS para ofrecer máxima claridad visual y comodidad de lectura en dispositivos móviles.
</p>
```

---

## 4. Control de Espaciados (Ritmo Visual sin Saturación)

Evitar llenar la pantalla de elementos apretados. Garantizar márgenes y rellenos que permitan respirar al contenido:

- Rellenos de Contenedor: `p-4` o `p-6`.
- Separación entre Secciones: `space-y-6` o `gap-6`.
- Márgenes Externos: `mb-4`, `mb-6`.

---

## 5. Objetivos Táctiles de Mínimo 44px (Touch Targets)

Los usuarios interactúan con los dedos. Todos los botones, enlaces y elementos interactivos MUST cumplir con las guías internacionales de usabilidad táctil:

- **Altura Mínima**: 44px de altura (`h-11` o `min-h-[44px]`).
- **Ancho Adecuado**: `w-full` en botones principales de formulario o `min-w-[120px]` en botones secundarios.
- **Bordes Redondeados**: `rounded-lg` o `rounded-xl` para facilitar la identificación visual del área cliqueable.
- **Estados de Interacción y Foco**: Incluir `hover:bg-indigo-700`, `focus:outline-none`, `focus:ring-4 focus:ring-indigo-400/50` y `active:scale-95` para proporcionar feedback táctil inmediato.

```tsx
// [CORRECTO] Botón móvil táctil optimizado a 44px de altura mínima
<button 
  type="button" 
  className="w-full h-11 min-h-[44px] px-5 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400/50 text-white font-medium rounded-lg shadow-sm transition-all touch-manipulation active:scale-95 flex items-center justify-center text-base"
>
  Empezar Ahora
</button>
```

---

## 6. Paletas de Color con Contraste Ambiental y Sombras Sutiles

Debido a la variabilidad de la luz solar en exteriores, la interfaz móvil requiere contraste claro:

- **Fondo y Texto**: Alto contraste mediante combinaciones como `bg-white text-slate-900` (Modo Claro) y `bg-slate-950 text-slate-100` (Modo Oscuro).
- **Profundidad y Sombras**: Usar sombras sutiles como `shadow-md` o `shadow-lg` para separar tarjetas sobre el fondo sin distraer.

---

## 7. Personalización y Pruebas en Dispositivos Reales

- Configurar colores, tipografías y breakpoints personalizados en `tailwind.config.js` cuando la identidad de la marca lo requiera.
- Realizar pruebas continuas en dispositivos móviles reales (iOS Safari y Android Chrome) para validar la fluidez del scroll y la ergonomía táctil.
