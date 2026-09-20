# Reglas de Ingeniería: Arquitectura Responsiva Mobile-First y Breakpoints con Tailwind CSS

Esta regla establece la metodología para diseñar e implementar interfaces web adaptables (responsive) mediante la estrategia **Mobile-First** utilizando el sistema de breakpoints ascendentes de Tailwind CSS en aplicaciones React + Vite.

---

## 1. El Concepto Fundamental: Mobile-First

En la metodología Mobile-First, la maquetación se define pensando en primer lugar en los dispositivos móviles de pantalla pequeña (< 640px).

### A. Regla de la Clase Base Sin Prefijo
- Toda clase utilitaria aplicada sin prefijo responsivo (ej. `text-base`, `p-4`, `bg-white`, `block`) se aplica a **todas las dimensiones de pantalla**, empezando por los dispositivos móviles más pequeños.
- **Error Común**: Usar `sm:` creyendo que es para móviles. En Tailwind CSS, el prefijo `sm:` aplica únicamente para pantallas de 640px de ancho en adelante.

### B. Modificadores Ascendentes en Cascada
- Aplicar una clase con un prefijo responsivo (ej. `md:flex`) significa que ese estilo afectará a esa dimensión específica y a **todas las dimensiones superiores** (`md`, `lg`, `xl`, `2xl`), a menos que sea anulado o modificado en un breakpoint posterior.

---

## 2. Matriz de Breakpoints Predeterminados de Tailwind CSS

| Prefijo | Anchura Mínima de Pantalla | Dispositivo de Referencia |
| :--- | :--- | :--- |
| *(Sin prefijo)* | 0px en adelante | Móviles compactos (< 640px) |
| `sm:` | 640px en adelante | Móviles grandes en horizontal / Phablets |
| `md:` | 768px en adelante | Tablets en orientación vertical / Pantallas medianas |
| `lg:` | 1024px en adelante | Laptops y monitores estándar |
| `xl:` | 1280px en adelante | Monitores de escritorio de alta resolución |
| `2xl:` | 1536px en adelante | Monitores ultrapanortámicos o 4K |

---

## 3. Patrones Frecuentes de Maquetación Responsiva

### A. Escalado Tipográfico Responsivo
Aumentar proporcionalmente el tamaño del texto conforme se incrementa el espacio en pantalla:

```tsx
// [CORRECTO] Texto de 16px en móvil, 18px en tablet (md) y 20px en desktop (xl)
<h2 className="text-base md:text-lg xl:text-xl font-semibold text-slate-900 dark:text-slate-100">
  Encabezado Adaptable
</h2>
```

### B. Visibilidad Condicional por Tamaño de Pantalla
Ocultar o mostrar elementos según las dimensiones del dispositivo:

```tsx
// [CORRECTO] Oculto en vista móvil, visible en bloque desde pantallas medianas (768px+)
<aside className="hidden md:block w-64 p-4 border-r border-slate-200 dark:border-slate-800">
  Barra Lateral de Navegación
</aside>
```

### C. Transformación de Vista Plana Móvil a Tarjeta Flotante
En pantallas móviles pequeñas, los contenedores deben ocupar el 100% del ancho sin sombras ni bordes para aprovechar el espacio. A partir de `sm:` (640px), se transforma visualmente en una tarjeta centrada:

```tsx
// [CORRECTO] Adaptación limpia Mobile-First
<div className="w-full max-w-md p-4 mx-auto mt-4 bg-slate-100 dark:bg-slate-900 sm:bg-white sm:dark:bg-slate-900 sm:shadow-md sm:rounded-xl sm:p-6 md:bg-indigo-50/50 md:dark:bg-slate-900/80">
  <h2 className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
    Contenedor Adaptable
  </h2>
  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
    Este bloque ocupa todo el ancho en móviles pequeños y se convierte en tarjeta con bordes y sombras al detectar pantallas más amplias.
  </p>
</div>
```

---

## 4. Lista de Verificación (Checklist) Mobile-First

- [ ] ¿Los estilos base (sin prefijo) se diseñaron pensando primero en móviles pequeños?
- [ ] ¿Se verificó que los prefijos `sm:`, `md:`, `lg:` no contengan estilos que deberían aplicarse a la vista móvil?
- [ ] ¿Se ajustaron los tamaños de texto, rellenos (`padding`) y márgenes para crecer de forma proporcional?
- [ ] ¿Los elementos secundarios se ocultan en móvil con `hidden` y se muestran en pantallas más grandes con `md:block` o `md:flex`?
