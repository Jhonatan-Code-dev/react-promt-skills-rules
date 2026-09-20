# Reglas de Arquitectura Frontend: Feature-Sliced Design (FSD) + Clean Architecture

Esta regla define el estándar arquitectónico definitivo para aplicaciones Frontend en React / TypeScript de alta escala (decenas a miles de carpetas), garantizando que las modificaciones en la UI o en la lógica de negocio nunca rompan la aplicación de forma en cascada.

---

## 1. Concepto Fundamental: Capas Jerárquicas (Layers)

La aplicación debe estructurarse en 6 capas estandarizadas. Cada capa tiene una responsabilidad única y un nivel de abstracción específico:

```text
src/
├── app/         # 1. Configuración global (Routing, Providers, Estilos globales, Store raíz)
├── pages/       # 2. Vistas y páginas completas compuestas de widgets y features
├── widgets/     # 3. Bloques independientes complejos de UI (Header, Sidebar, UserProfileCard)
├── features/    # 4. Acciones de usuario con valor de negocio (auth-by-email, add-to-cart, filter-products)
├── entities/    # 5. Entidades y modelos del dominio de negocio (user, product, order, invoice)
└── shared/      # 6. Código agnóstico y reutilizable (UI Kit base, API Client, utils, helpers)
```

---

## 2. La Regla de Oro: Dependencia Unidireccional Estricta

Para evitar dependencias circulares y acoplamiento espagueti, se aplica la Regla de Inyección Descendente:

> [ADVERTENCIA] Una capa solo puede importar elementos de las capas estrictamente INFERIORES a ella.

### Matriz de Dependencias Permitidas

| Capa Origen | Puede Importar de: | NUNCA puede importar de: |
| :--- | :--- | :--- |
| `app/` | `pages`, `widgets`, `features`, `entities`, `shared` | *(Ninguna - Es la capa más alta)* |
| `pages/` | `widgets`, `features`, `entities`, `shared` | `app` |
| `widgets/` | `features`, `entities`, `shared` | `app`, `pages`, `widgets` (del mismo nivel) |
| `features/` | `entities`, `shared` | `app`, `pages`, `widgets`, `features` (de otra feature) |
| `entities/` | `shared` | `app`, `pages`, `widgets`, `features`, `entities` (de otra entidad) |
| `shared/` | Solo utilidades neutras externas | `app`, `pages`, `widgets`, `features`, `entities` |

---

## 3. Estructura Interna de un Slice: Desacoplamiento UI ↔ Lógica

Cada funcionalidad dentro de `entities/` o `features/` se conoce como Slice. 
Dentro de un slice, el código se divide en segmentos técnicos para aislar la interfaz gráfica de la lógica:

```text
src/entities/user/
├── api/          # Peticiones HTTP puras (React Query / Axios / Fetch)
│   └── userApi.ts
├── model/        # Lógica de Negocio y Estado (Zustand / Reducers / Types / Zod Schemas)
│   ├── useUserStore.ts
│   └── userTypes.ts
├── ui/           # Componentes puramente visuales (DUMMY UI / Presentational)
│   ├── UserCard.tsx
│   └── UserAvatar.tsx
└── index.ts      # PUBLIC API del Slice (Único punto de acceso externo)
```

### Reglas de Desacoplamiento:
1. **La UI no conoce los detalles de la infraestructura**: Los componentes en `ui/` consumen hooks exponenciados por `model/` o `api/`.
2. **Si cambia el diseño visual** (Tailwind, HTML, CSS), modifica únicamente `ui/`. `model/` y `api/` no se tocan.
3. **Si cambia el Backend o el Payload de la API**, modifica únicamente `api/` y `model/`. Los componentes `ui/` siguen recibiendo las mismas props.

---

## 4. Encapsulamiento Mediante Public API (`index.ts`)

Cada Slice MUST tener un archivo `index.ts` que actúe como una puerta de enlace (Gatekeeper).

```typescript
// [INCORRECTO]: Importación profunda cruzada entre módulos
import { UserAvatar } from '@/entities/user/ui/UserAvatar';
import { useUserStore } from '@/entities/user/model/useUserStore';

// [CORRECTO]: Importación exclusivamente desde la Public API
import { UserAvatar, useUserStore } from '@/entities/user';
```

### Ejemplo de `src/entities/user/index.ts`:

```typescript
// Re-exportar solo lo que debe ser público para otras capas
export { UserAvatar } from './ui/UserAvatar';
export { UserCard } from './ui/UserCard';
export { useUserStore } from './model/useUserStore';
export type { User } from './model/userTypes';
```

---

## 5. Ejemplo de Código Completo de un Slice

### `entities/user/model/userTypes.ts`
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
```

### `entities/user/ui/UserCard.tsx`
```tsx
import type { User } from '../model/userTypes';

export interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <h4 className="font-bold text-md">{user.name}</h4>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      {onEdit && (
        <button
          onClick={() => onEdit(user)}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Editar
        </button>
      )}
    </div>
  );
}
```

---

## 6. Resumen de Lista de Verificación (Checklist) FSD

- [ ] ¿El nuevo código pertenece a `app`, `pages`, `widgets`, `features`, `entities` o `shared`?
- [ ] ¿No se están importando componentes de capas superiores ni del mismo nivel?
- [ ] ¿La lógica de estado y llamadas API está en `model/` y `api/` separada de la `ui/`?
- [ ] ¿Se expuso únicamente lo necesario a través de `index.ts`?
- [ ] ¿Se usaron alias de ruta absolutos (ej: `@/entities/user` en lugar de `../../../../entities/user`)?
