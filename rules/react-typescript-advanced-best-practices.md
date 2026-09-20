# Reglas de Ingeniería: 20 Buenas Prácticas Avanzadas de TypeScript para React

Esta regla consolida los 20 principios esenciales de TypeScript de nivel experto para garantizar la máxima seguridad de tipos, legibilidad y mantenibilidad en proyectos React + Vite.

---

## 1. Comprobación Estricta de Tipos (`"strict": true`)
El archivo `tsconfig.json` MUST tener habilitada la propiedad `"strict": true` por defecto. Esto activa comprobaciones como `noImplicitAny`, `strictNullChecks` y `strictFunctionTypes`.

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## 2. Inferencia de Tipos
Dejar que el compilador de TypeScript infiera el tipo cuando sea evidente por la asignación inicial. Ser explícito únicamente en firmas de funciones o estructuras complejas.

```typescript
// [CORRECTO] Inferencia automática de tipo string
let userName = "John"; 

// [CORRECTO] Explícito en firma de función
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

---

## 3. Linters (ESLint Estricto)
Utilizar ESLint con las reglas oficiales `@typescript-eslint/recommended` para hacer cumplir un estilo de código consistente, prevenir variables no utilizadas y detectar errores comunes en tiempo de desarrollo.

---

## 4. Interfaces para Estructura de Objetos
Usar `interface` para definir contratos visuales y de datos de objetos y props en React. Las interfaces permiten extensión mediante `extends` y declaración múltiple.

```typescript
export interface User {
  name: string;
  age: number;
}

export interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}
```

---

## 5. Alias de Tipo (`type`) para Uniones e Intersecciones
Usar `type` para crear nombres personalizados de uniones complejas, primitivos, tuplas o intersecciones de tipos (`&`).

```typescript
export type Role = 'admin' | 'user' | 'guest';

export type AdminUser = User & {
  privileges: string[];
};
```

---

## 6. Uso de Tuplas
Representar arreglos de tamaño fijo con un orden y tipos de elementos específicos. Son ideales para retornos de Custom Hooks similares a `useState`.

```typescript
export type Coordinate = [number, number];
const point: Coordinate = [10, 20];
const [x, y] = point;
```

---

## 7. Prohibición y Control del Tipo `any`
El uso de `any` debilita la seguridad de tipos. Se prohíbe el uso de `any` en funciones o firmas públicas. En caso de integración con librerías de terceros sin tipos, aislar el valor con protectores de tipo o aserciones estrictas.

---

## 8. Uso Preferente del Tipo `unknown`
Utilizar `unknown` en lugar de `any` para valores cuyo tipo sea realmente desconocido. Obliga a comprobar el tipo mediante guards antes de realizar operaciones.

```typescript
function processInput(value: unknown) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log("No es una cadena de texto");
  }
}
```

---

## 9. Tipo `never` para Excepciones y Exhaustividad
Utilizar `never` para funciones que nunca retornan (lanzan errores) o para comprobar la exhaustividad en sentencias `switch/case`.

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function assertNever(x: never): never {
  throw new Error(`Elemento no esperado: ${JSON.stringify(x)}`);
}
```

---

## 10. Operador `keyof` para Claves Seguras
Utilizar `keyof` para extraer las claves permitidas de un objeto o interfaz, garantizando que solo se pasen propiedades válidas.

```typescript
export interface Product {
  id: string;
  name: string;
  price: number;
}

function getProductProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

---

## 11. Uso de Enums
Nombrar los `enum` en PascalCase y en singular. Preferir enums de cadenas de texto para facilitar la inspección en tiempo de ejecución.

```typescript
export enum OrderStatus {
  Pending = "PENDING",
  Processing = "PROCESSING",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}
```

---

## 12. Espacios de Nombres y Módulos
Utilizar importaciones y exportaciones de módulos ES6 (`export`, `import`). Reservar los `namespace` únicamente para agrupación de tipos globales o archivos de definición `.d.ts`.

---

## 13. Uso de Tipos de Utilidad (`Pick`, `Omit`, `Partial`, `Required`)
Aprovechar los tipos utilitarios integrados de TypeScript para crear variaciones de tipos existentes sin duplicar código:

```typescript
export type UserPreview = Pick<User, "name">;
export type UserWithoutAge = Omit<User, "age">;
export type EditableUser = Partial<User>;
```

---

## 14. Inmutabilidad con `Readonly` y `ReadonlyArray`
Proteger objetos y arreglos contra mutaciones accidentales utilizando `Readonly<T>` o `ReadonlyArray<T>`.

```typescript
const CONFIG: Readonly<{ apiPath: string }> = { apiPath: "/api/v1" };
const NUMBERS: ReadonlyArray<number> = [1, 2, 3];
```

---

## 15. Protectores de Tipo Personalizados (Type Guards)
Crear funciones de comprobación de tipo utilizando el predicado `x is T` para permitir que el compilador reduzca los tipos dentro de bloques condicionales.

```typescript
export function isUser(object: unknown): object is User {
  return typeof object === "object" && object !== null && "name" in object && "age" in object;
}
```

---

## 16. Uso de Genéricos (`T`, `K extends keyof T`)
Escribir componentes, funciones e interfaces reutilizables que puedan trabajar con cualquier tipo sin perder la seguridad de compilación.

```typescript
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

---

## 17. Palabra Clave `infer` en Tipos Condicionales
Utilizar `infer` para deducir o extraer tipos dentro de evaluaciones condicionales de tipo.

```typescript
export type UnpackArray<T> = T extends (infer U)[] ? U : T;
export type ItemType = UnpackArray<string[]>; // string
```

---

## 18. Tipos Condicionales
Expresar relaciones de tipo complejas donde la estructura resultante depende de una condición evaluada en tiempo de compilación.

```typescript
export type IsString<T> = T extends string ? true : false;
```

---

## 19. Tipos Mapeados (`[P in keyof T]`)
Crear nuevos tipos aplicando una transformación iterativa sobre las propiedades de un tipo existente.

```typescript
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

---

## 20. Decoradores y Metadatos
Utilizar decoradores (`@decorator`) cuando sea necesario añadir funcionalidades o metadatos en tiempo de ejecución a clases o métodos, habilitando `"experimentalDecorators": true` en `tsconfig.json`.
