# Reglas de Ética, Veracidad Absoluta, Orden Extremo y Estándares ISO en Frontend

Esta regla establece los principios de ingeniería, conducta técnica y orden que debe seguir todo desarrollador o asistente de inteligencia artificial dentro del proyecto.

---

## 1. Idioma y Claridad Absoluta

- **Comunicación en Español Claro**: Todas las explicaciones, documentos, comentarios descriptivos y resúmenes DEBEN redactarse en **Español claro, técnico, preciso y fácil de entender**.
- **Sin Ambigüedades**: Evitar términos vagos. Cada recomendación o explicación debe ser directa y fundamentada con ejemplos de código explícitos.

---

## 2. Principio de Veracidad Absoluta (Truthfulness)

1. **Nunca Asumir ni Inventar**:
   - Está prohibido inferir rutas de archivos, schemas de bases de datos o respuestas de APIs sin haber inspeccionado antes el código fuente real.
   - Si no se conoce la causa raíz de un error, se debe investigar empíricamente inspeccionando logs y trazas de error completas.
2. **Transparencia Ante Fallos**:
   - Nunca ocultar un error envolviéndolo en `try/catch` vacíos o retornos con datos falsos (dummy data).
   - Si un comando o build falla, debe informarse con total veracidad y corregirse la causa real subyacente.

---

## 3. Obsesión por el Orden Extremo y Prohibición de Emojis

Un proyecto profesional no tolera el desorden ni adornos innecesarios.

### A. Prohibición Estricta de Emojis
- Queda completamente prohibido el uso de emojis en explicaciones, respuestas, documentación, comentarios dentro del código fuente, mensajes de commit o nombres de archivos. Se debe mantener una estética austera y formal.

### B. Nomenclatura Estricta
- **Archivos y Carpetas**: Siempre en `kebab-case` (ej. `user-profile-card.tsx`, `use-auth-store.ts`).
- **Componentes React**: Siempre en `PascalCase` (ej. `UserProfileCard`).
- **Funciones y Hooks**: Siempre en `camelCase` (ej. `getUserById`, `useDebounce`).
- **Constantes Globales**: Siempre en `UPPER_SNAKE_CASE` (ej. `MAX_RETRY_ATTEMPTS`).

### C. Limpieza Quirúrgica del Código
- **Cero Código Muerto**: Eliminar importaciones no utilizadas, variables declaradas sin usar y funciones obsoletas.
- **Cero Comentarios Basura**: No dejar bloques de código comentados. Si algo no se usa, debe ser eliminado.
- **Cero `console.log` en Producción**: Usar un sistema de logging formal si es necesario o eliminar impresiones temporales de depuración antes de guardar.

---

## 4. Estándares ISO para Desarrollo Frontend

El desarrollo de software en Frontend debe alinearse rigurosamente con los estándares internacionales de calidad:

### A. ISO/IEC 25010 (Calidad del Producto de Software)
1. **Mantenibilidad**: Código modular (FSD), altamente cohesionado y débilmente acoplado.
2. **Eficiencia de Rendimiento**: Respuesta rápida, memoización consciente, imágenes optimizadas y bundles livianos.
3. **Seguridad**: Sanitización de entradas del usuario, prevención de XSS y manejo seguro de tokens.
4. **Portabilidad**: Diseño responsive ejecutable en navegadores modernos (Chrome, Firefox, Safari, Edge) y múltiples dispositivos (Móvil, Tablet, Desktop).

### B. ISO/IEC 40500 / W3C WCAG 2.1 AA (Accesibilidad Web - A11y)
1. **Semántica HTML5**: Utilizar etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) en lugar de divs anidados sin sentido.
2. **Accesibilidad por Teclado**: Todo elemento interactivo debe ser navegable mediante la tecla `Tab` y activable con `Enter` / `Space`.
3. **Atributos ARIA**: Usar `aria-label`, `aria-expanded`, `aria-hidden` y `role` cuando la semántica nativa de HTML no sea suficiente.
4. **Contraste de Color y Textos**: Garantizar una relación de contraste mínima de 4.5:1 para texto normal.
