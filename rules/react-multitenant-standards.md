# Estándares Inviolables para Arquitecturas Multi-Tenant en Frontend React

Esta regla establece las directrices obligatorias de diseño, aislamiento de datos, usabilidad y marcas personalizadas (white-labeling) para aplicaciones React + TypeScript orientadas a entornos SaaS Multinquilino (Multi-Tenant).

---

## 1. Directivas de Aislamiento de Datos entre Inquilinos

1. **Header HTTP Obligatorio (`X-Tenant-ID`)**:
   - Toda solicitud enviada a endpoints backend debe incluir el identificador del inquilino activo.
   - Prohibido realizar consultas a APIs globales o compartidas sin validar el aislamiento del inquilino.
2. **Nomenclatura de Persistencia Local**:
   - Todo almacenamiento en `localStorage`, `sessionStorage` o `IndexedDB` debe incluir obligatoriamente el prefijo del tenant:
     ```typescript
     // [INCORRECTO] Riego de fuga entre inquilinos
     localStorage.setItem('user_session', token);

     // [CORRECTO] Clave aislada por inquilino
     localStorage.setItem(`${tenantId}_user_session`, token);
     ```

---

## 2. Detección Dinámica y Resiliencia

1. **Resolución Temprana**:
   - La resolución del inquilino debe ejecutarse **antes** de montar el árbol de componentes principal o renderizar rutas protegidas.
2. **Manejo de Errores de Inquilino Invalido**:
   - Si la resolución del inquilino falla (inquilino suspendido o inexistente), la aplicación debe presentar una vista clara de estado (404 Tenant Not Found) sin intentar cargar datos sensibles.

---

## 3. White-Labeling y Coherencia Visual

1. **CSS Custom Properties Dinámicas**:
   - La paleta de colores, logos e iconografía personalizada del inquilino deben inyectarse mediante variables CSS nativas (`--color-tenant-primary`, `--font-tenant-family`).
2. **Respeto a la Accesibilidad (WCAG 2.1 AA)**:
   - Toda combinación de colores personalizada por el inquilino debe pasar una validación mínima de contraste de 4.5:1 para garantizar la usabilidad.

---

## 4. Control de Funcionalidades por Suscripción (Feature Flags)

1. **Protección de Rutas**:
   - Si un inquilino no tiene contratado un módulo específico (ej. `enableBilling`), sus rutas correspondientes deben denegar el acceso dinámicamente y redirigir al panel principal.
2. **Ocultamiento Limpio en la Interfaz**:
   - Los elementos de navegación o botones correspondientes a características no contratadas no deben renderizarse en el DOM.
