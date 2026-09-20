---
name: react-golang-integration
description: >-
  Asiste en la integración y consumo de APIs REST de Golang desde React + Vite utilizando TanStack Query.
  Implementa hooks de consulta, mutaciones optimistas, manejo de tokens JWT y tipado estricto.
---

# React Golang Integration Skill

Esta habilidad guía en la creación de servicios HTTP y custom hooks de consulta para conectar React + Vite con servidores Golang de forma rápida y segura.

---

## Metodología de Integración

### 1. Definición del Cliente HTTP Ligero
Crear una instancia base de `fetch` o `ky` con interceptores para enviar el token JWT en el encabezado `Authorization`:

```typescript
// src/shared/api/httpClient.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export async function httpClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || `Error HTTP ${response.status}`);
  }

  return response.json();
}
```

### 2. Definición de la Capa de API del Dominio
```typescript
// src/features/auth/api/authApi.ts
import { httpClient } from '@/shared/api/httpClient';
import type { LoginRequest, LoginResponse } from '../model/authTypes';

export function loginApi(credentials: LoginRequest): Promise<LoginResponse> {
  return httpClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}
```

### 3. Creación del Custom Hook con TanStack Query
```typescript
// src/features/auth/model/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../api/authApi';

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
    },
  });
}
```
