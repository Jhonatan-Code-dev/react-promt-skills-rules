# Estándares y Reglas de TypeScript para React

Reglas estrictas para el tipado de componentes, props, eventos y estado en aplicaciones React con TypeScript.

---

## 1. Tipado de Componentes y Props

- **Componentes Funcionales**: Definir el tipo de Props mediante una `interface` o `type` dedicada por componente.
- **Evitar `React.FC` o `React.FunctionComponent`**: Tipar directamente los argumentos de la función para mejor inferencia de autocompletado y genéricos.

```tsx
// [INCORRECTO] Desaconsejado
export const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick}>{children}</button>
);

// [CORRECTO] Recomendado
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size}`}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
}
```

---

## 2. Tipado de Eventos DOM

Utilizar siempre los tipos sintéticos de eventos proveídos por React:

- `React.ChangeEvent<HTMLInputElement>` (Inputs de texto, checkbox, radio)
- `React.ChangeEvent<HTMLSelectElement>` (Selects)
- `React.FormEvent<HTMLFormElement>` (Envío de formularios)
- `React.MouseEvent<HTMLButtonElement>` (Clicks en botones)
- `React.KeyboardEvent<HTMLInputElement>` (Eventos de teclado)

---

## 3. Prohibición de `any` y Manejo de `unknown`

- **Prohibido el uso de `any`**: Usar `unknown`, tipos explícitos o genéricos (`T`).
- **Validación con Type Guards / Zod**: Para datos provenientes de APIs externas, utilizar parseo dinámico con librerías como `zod` antes de asertar el tipo.

```typescript
// [CORRECTO] Validación segura de API con Zod
import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
```

---

## 4. Uso de Discriminated Unions para Estado Asíncrono

Representar los estados de peticiones HTTP utilizando uniones discriminadas para garantizar la seguridad en tiempo de compilación:

```typescript
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```
