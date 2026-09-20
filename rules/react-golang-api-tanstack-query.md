# Reglas de Consumo de Backend Golang mediante TanStack Query

Esta regla establece los estándares para conectar una aplicación Frontend en React + Vite con un Backend en Golang a través de peticiones REST comprimidas en JSON, utilizando **TanStack Query (React Query)** para lograr rendimiento máximo, transparencia en inspección y latencia cero percibida.

---

## 1. Principios de Integración React ↔ Golang REST

- **Formato Legible e Inspeccionable**: La comunicación entre React y Golang se realiza mediante JSON tipado sobre HTTP/2.
- **Transparencia en DevTools**: Todo payload enviado y recibido debe ser 100% legible en la pestaña Network de las herramientas de desarrollador.
- **Manejo Centralizado de Errores**: Los handlers de Golang deben retornar respuestas estructuradas estándar:
  ```json
  {
    "success": false,
    "error": {
      "code": "USER_NOT_FOUND",
      "message": "El usuario solicitado no existe."
    }
  }
  ```

---

## 2. Estandarización de Claves de Consulta (Query Key Factories)

Para evitar colisiones y permitir una invalidación de caché quirúrgica, las claves de TanStack Query deben organizarse mediante objetos fábrica (*Query Key Factories*):

```typescript
// [CORRECTO] Fábrica de Query Keys por Dominio
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
};
```

---

## 3. Configuración de Caché para Latencia Cero (0ms)

Los hooks de consulta (`useQuery`) deben contar con tiempos de refresco inteligentes para evitar peticiones repetidas innecesarias al backend en Go:

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchUserById } from '../api/userApi';
import { userKeys } from './userKeys';

export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUserById(userId),
    staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
    gcTime: 10 * 60 * 1000,    // Se conservan en memoria por 10 minutos
    enabled: Boolean(userId),
    retry: 2,
  });
}
```

---

## 4. Mutaciones Optimistas (Optimistic Updates)

Para lograr una respuesta visual instantánea cuando el usuario realiza acciones de escritura (POST/PUT/DELETE) hacia Golang, se implementan mutaciones optimistas:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserApi } from '../api/userApi';
import { userKeys } from './userKeys';
import type { User } from '../model/userTypes';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserApi,
    onMutate: async (newUser) => {
      // Cancelar consultas salientes
      await queryClient.cancelQueries({ queryKey: userKeys.detail(newUser.id) });

      // Guardar el estado previo de la caché
      const previousUser = queryClient.getQueryData<User>(userKeys.detail(newUser.id));

      // Actualizar la caché en React inmediatamente de forma optimista
      queryClient.setQueryData<User>(userKeys.detail(newUser.id), (old) => ({
        ...old,
        ...newUser,
      }));

      return { previousUser };
    },
    onError: (_err, newUser, context) => {
      // Revertir los cambios si el servidor Golang retorna error
      if (context?.previousUser) {
        queryClient.setQueryData(userKeys.detail(newUser.id), context.previousUser);
      }
    },
    onSettled: (_data, _error, newUser) => {
      // Sincronizar la caché con la verdad del servidor Go
      queryClient.invalidateQueries({ queryKey: userKeys.detail(newUser.id) });
    },
  });
}
```
