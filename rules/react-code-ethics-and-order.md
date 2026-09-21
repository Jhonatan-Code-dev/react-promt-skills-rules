# Regla Indispensable: Orden Extremo, Estructura Quirúrgica y Ética de Código en React + TypeScript

Esta regla establece los estándares inviolables de orden, limpieza, estructura interna y disciplina técnica para todo archivo `.ts` y `.tsx` dentro del proyecto. Queda terminantemente prohibido el código desorganizado, improvisado o con elementos innecesarios.

---

## 1. Anatomía Quirúrgica de un Archivo (`.tsx` / `.ts`)

Cada archivo del proyecto debe seguir una estructura idéntica e innegociable de 5 bloques ordenados secuencialmente:

1. **Bloque 1: Importaciones Categorizadas y Ordenadas**
2. **Bloque 2: Definiciones de Tipos e Interfaces (`interface` / `type`)**
3. **Bloque 3: Constantes Locales del Módulo**
4. **Bloque 4: Componente React Principal (o Función Principal del Módulo)**
5. **Bloque 5: Funciones Auxiliares Puras (Helpers)**

---

## 2. Orden Estricto de Importaciones

Las importaciones se deben agrupar obligatoriamente en 4 bloques separados por un salto de línea. Dentro de cada bloque, las líneas se ordenan **alfabéticamente por el nombre del módulo**:

```typescript
// Grupo 1: Módulos externos de React y librerías de terceros
import { useCallback, useEffect, useId, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { ArrowRight, Check, Trash2 } from 'lucide-react';

// Grupo 2: Capas internas de arquitectura (FSD: entities, features, widgets, shared)
import { useAuthStore } from '@/entities/session';
import { Button } from '@/shared/ui/button';
import { formatDate } from '@/shared/lib/formatters';

// Grupo 3: Componentes y utilidades relativas locales
import { UserCardHeader } from './user-card-header';
import { UserCardItem } from './user-card-item';

// Grupo 4: Tipos, estilos y assets
import type { UserProfileProps } from './user-card.types';
import styles from './user-card.module.css';
```

---

## 3. Jerarquía Interna del Componente React

Dentro del cuerpo de un componente React, las declaraciones deben seguir siempre la siguiente jerarquía de arriba a abajo:

1. **Hooks Nativos de React y Custom Hooks**:
   - `useId`, `useContext`, `useRef`
   - State: `useState`
   - Custom Hooks: `useAuthStore`, `useQuery`, `useParams`, etc.
2. **Selectores y Valores Derivados (Memoización)**:
   - `useMemo`, constantes calculadas.
3. **Efectos Secundarios (`useEffect` / `useLayoutEffect`)**:
   - Efectos declarados con su array de dependencias explícito.
4. **Manejadores de Eventos (Event Handlers) y Callbacks**:
   - `useCallback`, funciones `handle...` (ej. `handleSubmit`, `handleDeleteClick`).
5. **Renderizado Condicional Previo / Guardias (Early Returns)**:
   - Retornos anticipados de carga (`isLoading`), error (`isError`) o nulos.
6. **Retorno Principal JSX Semántico**:
   - Estructura HTML5 limpia y semántica (`<header>`, `<main>`, `<section>`, `<footer>`, etc.).

---

## 4. Ejemplo Comparativo: Código Desordenado vs Código Quirúrgico

### [INCORRECTO] Código desordenado, sin tipos limpios, mezcla de lógica y comentarios basura

```tsx
// Mal orden de imports, uso de any, console.logs, funciones sueltas mezcladas
import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { useEffect } from 'react';

export function user_card(props: any) {
  // console.log(props);
  const [data, setData] = useState(null);
  
  function onClick() {
    alert("click");
  }

  useEffect(() => {
    // TODO: arreglar esto
    fetch('/api/user').then(res => res.json()).then(d => setData(d));
  }, []);

  const name = props.name || "Sin nombre";

  // const oldVar = 123;

  return (
    <div onClick={onClick}>
      <h1>{name}</h1>
      <Button label="Click" />
    </div>
  );
}
```

### [CORRECTO] Código quirúrgicamente ordenado y sobrio

```tsx
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';

export interface UserCardProps {
  userId: string;
  initialName?: string;
  onSelectUser?: (userId: string) => void;
}

interface UserDataResponse {
  id: string;
  name: string;
  email: string;
}

const DEFAULT_USER_NAME = 'Usuario no registrado';

export function UserCard({
  userId,
  initialName = DEFAULT_USER_NAME,
  onSelectUser,
}: UserCardProps) {
  const [user, setUser] = useState<UserDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data: UserDataResponse = await response.json();
        if (isMounted) {
          setUser(data);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleCardClick = useCallback(() => {
    if (onSelectUser) {
      onSelectUser(userId);
    }
  }, [onSelectUser, userId]);

  if (isLoading) {
    return (
      <div className="p-4 rounded-lg bg-slate-100 animate-pulse text-sm text-slate-500">
        Cargando perfil de usuario...
      </div>
    );
  }

  const displayName = user?.name ?? initialName;

  return (
    <article
      onClick={handleCardClick}
      className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-indigo-500 transition-colors cursor-pointer"
    >
      <header className="mb-2">
        <h3 className="text-base font-semibold text-slate-900">
          {displayName}
        </h3>
      </header>
      {user?.email && (
        <p className="text-sm text-slate-600">
          {user.email}
        </p>
      )}
      <footer className="mt-4 flex justify-end">
        <Button variant="primary" size="sm">
          Ver Detalles
        </Button>
      </footer>
    </article>
  );
}
```

---

## 5. Reglas Inviolables de Limpieza y Nomenclatura (Zero Noise)

1. **Cero Código Muerto y Comentarios Basura**:
   - Prohibido dejar bloques de código comentados (`// const x = ...`). Si una función o variable no se utiliza, debe ser eliminada.
   - Prohibidos los comentarios `// TODO`, `// FIXME` o `// TEMP`. Todo el código enviado debe ser una solución final funcional.
2. **Cero `console.log`**:
   - Todo rastro de impresiones temporales de consola debe eliminarse antes de finalizar la tarea.
3. **Prohibición Total de Emojis**:
   - Cero emojis en explicaciones, comentarios de código, documentación, mensajes de commit o nombres de archivos. Se mantiene una estética 100% austera, sobria y profesional.
4. **Nomenclatura Quirúrgica**:
   - **Archivos y Directorios**: `kebab-case` (ej. `user-card.tsx`, `use-user-profile.ts`).
   - **Componentes React e Interfaces**: `PascalCase` (ej. `UserCard`, `UserCardProps`).
   - **Funciones, Custom Hooks y Propiedades**: `camelCase` (ej. `useUserProfile`, `handleCardClick`).
   - **Constantes Globales**: `UPPER_SNAKE_CASE` (ej. `DEFAULT_USER_NAME`, `MAX_RETRY_COUNT`).

---

## 6. Cumplimiento de Estándares ISO

- **ISO/IEC 25010 (Mantenibilidad y Alta Cohesión)**: Cada componente debe tener una única responsabilidad. Si un componente supera las 150 líneas, debe refactorizarse extrayendo custom hooks o subcomponentes.
- **ISO/IEC 40500 (Accesibilidad Semántica - WCAG 2.1 AA)**: Uso obligatorio de elementos semánticos de HTML5 (`<article>`, `<header>`, `<main>`, `<nav>`, `<button>`) y atributos `aria-*` correspondientes.
