# Regla Indispensable: Prohibición Total de JavaScript y Obligatoriedad Exclusiva de TypeScript (100% .ts / .tsx)

Esta regla establece como norma categórica e inviolable la exclusión total de JavaScript plano dentro de proyectos frontend en React + Vite. Todo el código sin excepción debe estar escrito en TypeScript estricto.

---

## 1. Prohibición Categórica de Archivos `.js` y `.jsx`

- **Prohibido Crear o Mantener Archivos JavaScript**: Queda estrictamente prohibida la presencia de archivos con extensión `.js` o `.jsx` dentro de la carpeta `src/` o en cualquier módulo del proyecto.
- **Formato Obligatorio para Componentes React**: Todo componente visual debe crearse en archivos con extensión `.tsx`.
- **Formato Obligatorio para Lógica y Utilidades**: Todo custom hook, servicio de API, store, función utilitaria o definición de tipos debe crearse en archivos con extensión `.ts`.

---

## 2. Configuración del Proyecto en TypeScript

Incluso los archivos de configuración de las herramientas del proyecto MUST estar definidos en TypeScript:

- `vite.config.ts` (en lugar de `vite.config.js`)
- `tailwind.config.ts` (en lugar de `tailwind.config.js`)
- `eslint.config.ts` / `.eslintrc.cjs` con parser de TypeScript

---

## 3. Cero Tolerancia a la Desactivación de Tipos

- **Prohibido `@ts-ignore` o `@ts-nocheck`**: Está terminantemente prohibido suprimir comprobaciones del compilador de TypeScript mediante comentarios de desactivación.
- **Prohibido el Tipo `any`**: Cualquier valor no tipado debe declararse con `unknown` o tiparse mediante interfaces y genéricos explícitos.
- **Comprobación Estricta Activa**: El archivo `tsconfig.json` debe mantener `"strict": true` sin excepciones.

```typescript
// [INCORRECTO] Archivo .jsx o uso de JavaScript sin tipos
export function UserButton(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}

// [CORRECTO] Archivo .tsx con interfaces explícitas en TypeScript
export interface UserButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function UserButton({ label, onClick, disabled = false }: UserButtonProps) {
  return (
    <button 
      type="button" 
      disabled={disabled}
      onClick={onClick} 
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium touch-manipulation disabled:opacity-50"
    >
      {label}
    </button>
  );
}
```
