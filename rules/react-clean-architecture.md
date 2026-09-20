# Reglas de Arquitectura Limpia y Estructura en React

Estas reglas deben aplicarse al diseñar, estructurar y organizar código dentro de cualquier aplicación React.

---

## 1. Patrón Arquitectónico Principal: Feature-Sliced Design (FSD)

Para aplicaciones escalables de mediana y gran escala, el proyecto DEBE guiarse por las reglas detalladas en:
[rules/react-fsd-architecture.md](./react-fsd-architecture.md)

### Jerarquía de Capas FSD:
1. `app/`: Configuración global, proveedores y enrutador.
2. `pages/`: Vistas completas compuestas de widgets.
3. `widgets/`: Bloques complejos e independientes de interfaz.
4. `features/`: Acciones del usuario de valor de negocio (autenticación, carrito).
5. `entities/`: Modelos del dominio del negocio (Usuario, Producto, Pedido).
6. `shared/`: Componentes neutros y utilidades compartidas (UI Kit base, API Client).

---

## 2. Principios de Separación de Responsabilidades

1. **Separación de Lógica e Interfaz (Container / Presentational Pattern)**:
   - Los componentes visuales en `ui/` deben ser neutros y recibir props para su estado y eventos.
   - La lógica compleja de efectos, fetches o derivación de datos debe residir en `model/` (Custom Hooks, Zustand, React Query).

2. **Public API mediante Archivos Barrels (`index.ts`)**:
   - Cada slice debe exponer solo lo estrictamente necesario a través de su `index.ts`.
   - Evitar importaciones profundas cruzadas como `import { X } from '../../features/auth/ui/X'`. Utilizar `import { X } from '@/features/auth'`.

3. **Inmutabilidad y Funciones Puras**:
   - Nunca mutar directamente las props o el estado de React. Usar actualizaciones inmutables.
   - Mantener las funciones de utilidad en `shared/utils` como funciones puras sin efectos secundarios.

4. **Tratamiento Único de Errores y Estados de Carga**:
   - Todo componente o vista asíncrona debe contar con:
     - Estado de Carga (Skeletons o Spinners dedicados).
     - Estado Vacío (Empty State explicativo).
     - Estado de Error (Error Boundary o Fallback de UI explícito).
