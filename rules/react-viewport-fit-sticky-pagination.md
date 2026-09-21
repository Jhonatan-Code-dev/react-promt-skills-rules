# Reglas de Viewport-Fit con Scroll Interno Aislado y Paginación Fija (Sticky Bottom Pagination)

Esta regla define la arquitectura de maquetación e interfaz para módulos de gestión de datos administrativos (como el módulo de Gestión de Sucursales) en React con Tailwind CSS y TypeScript estricto. Garantiza que la pantalla aproveche el 100% de la altura visible disponible sin generar scroll exterior en la ventana del navegador, anclando de forma permanente la barra de paginación y la cabecera de datos.

---

## 1. Definición y Fundamentos del Patrón

### A. Nomenclatura Oficial en la Industria
- **Sticky Bottom Pagination / Fixed Footer Pagination** (*Paginación Fija al Fondo*): Técnica de anclaje de la barra de controles de navegación entre páginas al pie visible de la pantalla o contenedor maestro, permaneciendo inamovible ante cualquier volumen de datos.
- **Viewport-Fit con Scroll Interno Aislado** (*Contained Viewport-Fit Layout*): Técnica donde la ventana global del navegador (`window` / `body`) no presenta barra de desplazamiento. La altura total se ajusta milimétricamente al 100% del viewport dinámico (`100dvh`), delegando el desplazamiento vertical y horizontal de manera exclusiva al contenedor intermedio del listado o grilla de datos.

### B. Justificación de Experiencia de Usuario (UX) y Rendimiento
En interfaces empresariales de alta densidad de información (ERP, CRM, paneles de administración):
1. **Eliminación del Salto de Layout (CLS - Cumulative Layout Shift)**: Si la paginación está suelta al pie de la tabla, una página con 3 registros coloca los botones arriba, y una con 50 registros los envía cientos de píxeles abajo, obligando al operador a desplazarse constantemente.
2. **Visibilidad Continua de Controles y Métricas**: El usuario siempre visualiza el selector de filas por página, el total de registros encontrados y los botones de cambio de página sin requerir scroll previo.
3. **Persistencia del Contexto de Columnas**: Las cabeceras (`thead`) se mantienen pegajosas (`sticky top-0`), permitiendo identificar a qué sucursal, código o estado pertenece cada celda.

---

## 2. Anatomía Flexbox para el Patrón Viewport-Fit

El contenedor principal debe gobernarse bajo un esquema vertical estricto. En Flexbox, el elemento scrollable requiere imperativamente la propiedad `min-h-0` para cancelar el valor predeterminado `min-height: auto` que de otro modo desbordaría el contenedor padre:

```text
+-------------------------------------------------------------------+
|  1. Cabecera del Módulo (Título, Acciones, Buscador)  [shrink-0]   |
+-------------------------------------------------------------------+
|  2. Contenedor de Datos con Scroll Aislado [flex-1 min-h-0]       |
|     +-----------------------------------------------------------+ |
|     | Cabecera de Tabla Pegajosa (thead)      [sticky top-0]    | |
|     +-----------------------------------------------------------+ |
|     | Filas de Registros con Scroll Vertical (tbody)            | |
|     | ...                                                       | |
|     | ...                                                       | |
|     +-----------------------------------------------------------+ |
+-------------------------------------------------------------------+
|  3. Barra de Paginación Fija al Fondo [shrink-0 / sticky bottom-0] |
+-------------------------------------------------------------------+
```

---

## 3. Clases de Tailwind CSS Obligatorias

| Sección | Clases Clave de Tailwind | Propósito Técnico |
| :--- | :--- | :--- |
| **Contenedor Raíz del Módulo** | `flex flex-col h-full max-h-full overflow-hidden` o `h-[100dvh]` | Bloquea el desborde en el viewport y fuerza dirección columnar. |
| **Barra Superior de Filtros** | `shrink-0 p-4 border-b border-slate-200 dark:border-slate-800` | Mantiene dimensiones fijas sin encogerse ante compresión. |
| **Área Central de Scroll** | `flex-1 min-h-0 overflow-y-auto overflow-x-auto` | Permite scroll independiente interno; `min-h-0` previene desborde. |
| **Cabecera de Tabla (`thead`)** | `sticky top-0 z-10 bg-slate-50 dark:bg-slate-900 backdrop-blur-sm` | Mantiene visibles los nombres de las columnas al bajar en la tabla. |
| **Barra de Paginación Fija** | `shrink-0 sticky bottom-0 z-10 border-t pb-[env(safe-area-inset-bottom)]` | Anclaje inamovible y compatibilidad con barra de gestos en móviles. |

---

## 4. Estándar de Accesibilidad (ISO/IEC 40500 - WCAG 2.1 AA)

1. **Navegación por Teclado en el Contenedor Desplazable**:
   - El elemento con `overflow-y-auto` debe disponer de `tabIndex={0}` y `role="region"` junto con un `aria-label` descriptivo (ej. `aria-label="Listado de sucursales"`), permitiendo que usuarios con lectores de pantalla o navegación por teclado naveguen por el contenido desplazable.
2. **Semántica de Paginación**:
   - Envolver los botones de paginación en una etiqueta `<nav role="navigation" aria-label="Paginación de resultados">`.
   - Indicar la página activa con `aria-current="page"`.
   - Incluir `aria-disabled="true"` o la propiedad nativa `disabled` en botones de avance/retroceso bloqueados.
3. **Área Táctil Mínima**:
   - Todo botón interactivo debe contar con al menos `44px` de alto y ancho (`min-h-[44px] min-w-[44px] touch-manipulation`).

---

## 5. Implementación de Referencia: Módulo de Gestión de Sucursales

El siguiente ejemplo sigue la anatomía quirúrgica de 5 bloques, TypeScript estricto y la arquitectura Viewport-Fit:

```tsx
// ============================================================================
// BLOQUE 1: IMPORTACIONES CATEGORIZADAS Y ORDENADAS
// ============================================================================
import { useCallback, useId, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';

// ============================================================================
// BLOQUE 2: DEFINICIONES DE TIPOS E INTERFACES
// ============================================================================
export interface BranchItem {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly address: string;
  readonly city: string;
  readonly phone: string;
  readonly status: 'ACTIVE' | 'INACTIVE';
}

export interface BranchManagementLayoutProps {
  readonly branches: readonly BranchItem[];
  readonly isLoading?: boolean;
}

// ============================================================================
// BLOQUE 3: CONSTANTES LOCALES DEL MÓDULO
// ============================================================================
const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

// ============================================================================
// BLOQUE 4: COMPONENTE REACT PRINCIPAL
// ============================================================================
export function BranchManagementModule({
  branches,
  isLoading = false,
}: BranchManagementLayoutProps) {
  // Hooks de estado y accesibilidad
  const searchInputId = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);

  // Filtrado y cálculos derivados
  const filteredBranches = useMemo(() => {
    if (!searchTerm.trim()) {
      return branches;
    }
    const query = searchTerm.toLowerCase();
    return branches.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.code.toLowerCase().includes(query) ||
        b.city.toLowerCase().includes(query)
    );
  }, [branches, searchTerm]);

  const totalRecords = filteredBranches.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBranches.slice(startIndex, startIndex + pageSize);
  }, [filteredBranches, currentPage, pageSize]);

  // Manejadores de eventos
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  return (
    <section className="flex flex-col h-full max-h-full w-full overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* 1. Encabezado y Filtros (Fijo Superior - shrink-0) */}
      <header className="shrink-0 p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Gestión de Sucursales</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Administración de puntos de venta y centros de distribución.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <label htmlFor={searchInputId} className="sr-only">
              Buscar sucursal
            </label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
            <input
              id={searchInputId}
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar por código, nombre o ciudad..."
              className="w-full pl-9 pr-4 py-2 text-base sm:text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </header>

      {/* 2. Cuerpo de Tabla con Scroll Interno Aislado (flex-1 min-h-0) */}
      <main
        tabIndex={0}
        role="region"
        aria-label="Listado desplazable de sucursales"
        className="flex-1 min-h-0 overflow-y-auto overflow-x-auto focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
      >
        <table className="w-full text-left border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <tr>
              <th scope="col" className="py-3.5 px-4">Código</th>
              <th scope="col" className="py-3.5 px-4">Nombre de Sucursal</th>
              <th scope="col" className="py-3.5 px-4">Ciudad</th>
              <th scope="col" className="py-3.5 px-4">Dirección</th>
              <th scope="col" className="py-3.5 px-4">Teléfono</th>
              <th scope="col" className="py-3.5 px-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  Cargando información de sucursales...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                  No se encontraron sucursales registradas con los filtros seleccionados.
                </td>
              </tr>
            ) : (
              paginatedData.map((branch) => (
                <tr key={branch.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-300">{branch.code}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">{branch.name}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{branch.city}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{branch.address}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{branch.phone}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        branch.status === 'ACTIVE'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                      }`}
                    >
                      {branch.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>

      {/* 3. Barra de Paginación Fija al Fondo (Sticky Bottom - shrink-0) */}
      <footer
        className="shrink-0 sticky bottom-0 z-10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 py-3 pb-[env(safe-area-inset-bottom)]"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Mostrar</span>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              aria-label="Registros por página"
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span>por página</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="hidden sm:inline">
              Total de registros: <strong className="font-semibold text-slate-900 dark:text-slate-100">{totalRecords}</strong>
            </span>
          </div>

          <nav role="navigation" aria-label="Paginación de sucursales" className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(1)}
              aria-label="Primera página"
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation"
            >
              <ChevronsLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Página anterior"
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <span className="px-3 py-1 font-medium text-slate-900 dark:text-slate-100" aria-current="page">
              Página {currentPage} de {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Página siguiente"
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
              aria-label="Última página"
              className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 disabled:opacity-40 disabled:pointer-events-none transition-colors touch-manipulation"
            >
              <ChevronsRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </footer>
    </section>
  );
}

// ============================================================================
// BLOQUE 5: FUNCIONES AUXILIARES PURAS (HELPERS)
// ============================================================================
// (Si se requieren formateadores o helpers puros, se ubican aquí sin mutaciones)
```

---

## 6. Anti-Patrones Estrictamente Prohibidos

1. **Omisión de `min-h-0`**:
   - Declarar `flex-1 overflow-y-auto` sin `min-h-0` provoca que en Firefox y WebKit el contenido continúe expandiendo la ventana exterior.
2. **Scroll Global en el `body` de la Ventana**:
   - Permitir que el scroll de la página mueva el encabezado o la paginación fuera de la vista está vetado en módulos de gestión administrativa.
3. **Uso de `100vh` en vez de `100dvh` o `h-full`**:
   - `100vh` genera desbordamiento vertical en navegadores móviles cuando se despliega u oculta la barra de navegación del explorador.
4. **Paginación Flotante sin Anclaje**:
   - Paginación colocada dentro del área desplazable de la tabla obliga al usuario a scrollear hasta la última fila para cambiar de página.
