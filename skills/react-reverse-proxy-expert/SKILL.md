---
name: react-reverse-proxy-expert
description: >-
  Audita, configura y soluciona problemas de Reverse Proxy en proyectos React + Vite conectados con Golang.
  Resuelve problemas de CORS, enrutamiento SPA, SSL, WebSockets y reenvío de cabeceras IP en Vite Dev Server, Nginx y Caddy sin emojis.
---

# React Reverse Proxy Expert Skill

Esta habilidad ayuda a auditar y configurar arquitecturas de Reverse Proxy para aplicaciones React + Vite conectadas con servidores backend en Golang tanto en desarrollo local como en servidores de producción.

---

## Metodología de Diagnóstico de Reverse Proxy

### 1. Diagnóstico de Errores de CORS en Desarrollo
- Síntoma: `Access-Control-Allow-Origin` missing o bloqueado en la consola del navegador.
- Solución: Verificar que las llamadas en React se realicen a rutas relativas `/api/...` y que `vite.config.ts` tenga configurado `server.proxy` apuntando a `http://localhost:8080`.

### 2. Diagnóstico de Error 404 al Recargar Rutas en Producción (SPA Routing)
- Síntoma: Al recargar `http://miaplicacion.com/dashboard`, Nginx responde `404 Not Found`.
- Solución: Añadir la directiva `try_files $uri $uri/ /index.html;` en el bloque `location /` de Nginx.

### 3. Verificación de Cabeceras IP en Golang
- Síntoma: Golang registra la IP `127.0.0.1` para todos los usuarios en lugar de la IP pública del cliente.
- Solución: Configurar Nginx/Caddy para inyectar `X-Real-IP` y `X-Forwarded-For`, y leerlas en los middlewares de Go.

---

## Ejemplo de Configuración Completa para `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
```
