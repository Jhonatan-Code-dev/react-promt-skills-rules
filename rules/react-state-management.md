# Guía y Reglas para la Gestión de Estado en React

Reglas claras sobre dónde y cómo almacenar el estado dentro de una aplicación React.

---

## 1. Jerarquía de Almacenamiento de Estado

1. **Estado Local del Componente (`useState`)**:
   - Usar estrictamente para UI efímera que no necesita compartirse con otros componentes (inputs, modales abiertos/cerrados, pestañas activas).

2. **Estado Servidor (`TanStack Query / React Query`)**:
   - **NUNCA** guardar datos que provienen de APIs de servidor en Redux/Zustand manualmente.
   - Usar React Query (o SWR) para gestionar el almacenamiento en caché, re-intentos, invalidación y refetching de peticiones HTTP.

3. **Estado Global del Cliente (`Zustand / Redux Toolkit`)**:
   - Usar para datos que deben persistirse globalmente en la sesión del usuario (tema visual, datos del usuario autenticado, carrito de compras, configuración de preferencias).
   - Preferir Zustand por su ligereza y simplicidad salvo que el proyecto requiera Redux explícitamente.

4. **Estado en la URL (`SearchParams / React Router / Next Query`)**:
   - Filtros de búsqueda, números de página, ordenamientos y modales profundos deben reflejarse en la URL para permitir compartir enlaces directos.

---

## 2. Buenas Prácticas con Zustand

- Crear stores pequeños y especializados por dominio (ej: `useAuthStore`, `useCartStore`, `useThemeStore`).
- Utilizar selectores atómicos para evitar re-renderizados globales innecesarios:

```typescript
// [INCORRECTO] Provoca re-render si CUALQUIER propiedad del store cambia
const store = useAuthStore();

// [CORRECTO] Solo re-renderiza cuando cambia la propiedad 'user'
const user = useAuthStore((state) => state.user);
```
