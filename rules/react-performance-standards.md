# Estándares de Rendimiento y Optimización en React

Guías de optimización para garantizar aplicaciones fluidas, renderizados mínimos y cargas rápidas.

---

## 1. Reglas de Renderizado y Memoización

1. **Evitar Memoización Prematura**:
   - No envolver todos los componentes con `React.memo` ni todas las funciones con `useCallback`.
   - Memoizar únicamente cuando existan mediciones del Profiler de React que demuestren re-renders innecesarios en árboles complejos.

2. **Cálculos Costosos (`useMemo`)**:
   - Utilizar `useMemo` para operaciones iterativas pesadas (filtrados masivos, ordenamientos o transformaciones de grandes arreglos).

```tsx
// [CORRECTO] Memoizar solo cálculos computacionalmente pesados
const filteredProducts = useMemo(() => {
  return products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
}, [products, query]);
```

3. **Inestabilidad de Referencias de Objetos y Arreglos**:
   - Evitar definir objetos o funciones inline directamente dentro de las props si el componente hijo está optimizado o es pesado:

```tsx
// [INCORRECTO] Provoca re-renders en cada render del padre
<ExpensiveChart config={{ color: 'red', animate: true }} />

// [CORRECTO] Definir constantes fuera del componente o usar useMemo
const CHART_CONFIG = { color: 'red', animate: true };
<ExpensiveChart config={CHART_CONFIG} />
```

---

## 2. Code Splitting y Carga Perezosa (Lazy Loading)

1. **Lazy Loading de Rutas**:
   - Dividir el bundle principal cargando dinámicamente las páginas o vistas pesadas mediante `React.lazy` y `Suspense`.

```tsx
import { lazy, Suspense } from 'react';
import { PageLoader } from '@/components/ui/PageLoader';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  );
}
```

2. **Carga Dinámica de Componentes de Terceros**:
   - Modales pesados, editores WYSIWYG, gráficos o reproductores de video deben cargarse dinámicamente al interactuar el usuario.

---

## 3. Optimización de Listas Largas

- Para listas con más de 100 elementos, implementar Virtualización mediante librerías como `@tanstack/react-virtual` o `react-window`.
- Asegurar siempre una `key` única y estable (evitar usar el índice de arreglo `index` salvo que la lista sea estática y nunca cambie de orden).
