---
name: react-multitenant-architecture
description: >-
  Guía experta para la implementación de arquitecturas Multi-tenant (SaaS multinquilino) en Frontend React + TypeScript.
  Incluye resolución dinámica de tenants (subdominios, headers, rutas), aislamiento de estado, personalización temática (white-labeling), i18n global y usabilidad extrema.
---

# React Multi-Tenant Architecture Skill

Esta habilidad guía en el diseño e implementación de aplicaciones frontend multinquilino (Multi-Tenant SaaS) en React + TypeScript. Garantiza el aislamiento total de datos entre inquilinos, resolución dinámica en tiempo de ejecución, soporte para marcas personalizadas (white-labeling), control de módulos por suscripción e internacionalización global (i18n).

---

## 1. Detección y Resolución Dinámica de Tenant

Existen tres estrategias principales para resolver el inquilino activo. Esta habilidad recomienda la detección por subdominio o parámetro de URL con fallback a encabezado HTTP:

```typescript
// src/shared/lib/tenant-resolver.ts

export interface TenantDomainInfo {
  tenantSlug: string | null;
  isCustomDomain: boolean;
}

/**
 * Resuelve el slug del tenant basado en el hostname del navegador.
 * Ejemplo: cliente1.app.com -> 'cliente1'
 */
export function resolveTenantFromHostname(hostname: string, baseDomain: string): TenantDomainInfo {
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const params = new URLSearchParams(window.location.search);
    return {
      tenantSlug: params.get('tenant') ?? 'demo',
      isCustomDomain: false,
    };
  }

  if (hostname.endsWith(`.${baseDomain}`)) {
    const subdomains = hostname.replace(`.${baseDomain}`, '').split('.');
    return {
      tenantSlug: subdomains[subdomains.length - 1] || null,
      isCustomDomain: false,
    };
  }

  return {
    tenantSlug: hostname,
    isCustomDomain: true,
  };
}
```

---

## 2. Tipado Estricto del Contexto de Tenant

Definir la estructura completa de configuración de un inquilino:

```typescript
// src/entities/tenant/model/tenant-types.ts

export interface TenantBranding {
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily?: string;
}

export interface TenantFeatureMap {
  enableBilling: boolean;
  enableCrm: boolean;
  enableAnalytics: boolean;
  maxUsers: number;
}

export interface TenantConfig {
  id: string;
  slug: string;
  name: string;
  locale: string;
  currency: string;
  branding: TenantBranding;
  features: TenantFeatureMap;
}

export interface TenantContextState {
  tenant: TenantConfig | null;
  isLoading: boolean;
  error: Error | null;
  switchTenant: (newTenantSlug: string) => Promise<void>;
  hasFeature: (featureKey: keyof TenantFeatureMap) => boolean;
}
```

---

## 3. Inyección Temática Dinámica (White-Labeling)

Aplicar las variables de diseño del inquilino directamente en el documento HTML (`:root`) para adaptar componentes en tiempo real:

```typescript
// src/entities/tenant/lib/apply-tenant-branding.ts

import type { TenantBranding } from '../model/tenant-types';

export function applyTenantBranding(branding: TenantBranding): void {
  const root = document.documentElement;

  root.style.setProperty('--color-tenant-primary', branding.primaryColor);
  root.style.setProperty('--color-tenant-secondary', branding.secondaryColor);
  root.style.setProperty('--color-tenant-accent', branding.accentColor);

  if (branding.fontFamily) {
    root.style.setProperty('--font-tenant-family', branding.fontFamily);
  }

  const favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (favicon && branding.faviconUrl) {
    favicon.href = branding.faviconUrl;
  }
}
```

---

## 4. Proveedor de Contexto Multi-Tenant (`TenantProvider`)

```tsx
// src/entities/tenant/ui/tenant-provider.tsx

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { applyTenantBranding } from '../lib/apply-tenant-branding';
import type { TenantConfig, TenantContextState, TenantFeatureMap } from '../model/tenant-types';

const TenantContext = createContext<TenantContextState | undefined>(undefined);

export interface TenantProviderProps {
  children: ReactNode;
  initialTenantSlug: string;
}

export function TenantProvider({ children, initialTenantSlug }: TenantProviderProps) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTenantData() {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/v1/tenants/resolve/${initialTenantSlug}`);
        if (!response.ok) {
          throw new Error(`Inquilino no encontrado (${response.status})`);
        }
        const data: TenantConfig = await response.json();

        if (isMounted) {
          setTenant(data);
          applyTenantBranding(data.branding);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Error al cargar inquilino'));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadTenantData();

    return () => {
      isMounted = false;
    };
  }, [initialTenantSlug]);

  const switchTenant = async (newTenantSlug: string): Promise<void> => {
    window.location.search = `?tenant=${newTenantSlug}`;
  };

  const hasFeature = (featureKey: keyof TenantFeatureMap): boolean => {
    if (!tenant) return false;
    return Boolean(tenant.features[featureKey]);
  };

  return (
    <TenantContext.Provider value={{ tenant, isLoading, error, switchTenant, hasFeature }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextState {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant debe utilizarse dentro de un TenantProvider');
  }
  return context;
}
```

---

## 5. Interceptor HTTP de Aislamiento Multi-Tenant

Garantizar que **cada petición HTTP al backend** incluya el encabezado `X-Tenant-ID`:

```typescript
// src/shared/api/multitenant-http-client.ts

export async function multitenantFetch<T>(
  endpoint: string,
  tenantId: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Tenant-ID': tenantId,
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} en inquilino ${tenantId}`);
  }

  return response.json();
}
```

---

## 6. Componente de Cambio Dinámico de Tenant (Tenant Switcher)

Componente de interfaz con usabilidad de nivel superior para cambiar de inquilino de forma intuitiva:

```tsx
// src/features/tenant-switcher/ui/tenant-switcher.tsx

import { useCallback, useState } from 'react';
import { useTenant } from '@/entities/tenant';

export function TenantSwitcher() {
  const { tenant, switchTenant } = useTenant();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleTenantSelect = useCallback(
    (slug: string) => {
      setIsOpen(false);
      void switchTenant(slug);
    },
    [switchTenant]
  );

  if (!tenant) return null;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        <span>{tenant.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Cambiar de Inquilino
          </div>
          <button
            type="button"
            onClick={() => handleTenantSelect('demo')}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100"
          >
            Inquilino Demo
          </button>
          <button
            type="button"
            onClick={() => handleTenantSelect('empresa-global')}
            className="w-full text-left px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-100"
          >
            Empresa Global Corp
          </button>
        </div>
      )}
    </div>
  );
}
```

---

## 7. Buenas Prácticas Inviolables

1. **Nunca almacenar datos de distintos inquilinos en la misma clave de LocalStorage**:
   - Usar siempre prefijos: `localStorage.getItem(\`${tenant.id}_auth_token\`)`.
2. **Cero fugas de información temática**:
   - Limpiar variables CSS dinámicas al desmontar o cambiar de inquilino.
3. **Validación de Permisos de Módulos**:
   - Proteger rutas completas usando `hasFeature('enableCrm')` antes de renderizar vistas del inquilino.
