# Reglas de Ingeniería: Arquitectura de Reverse Proxy (Vite Dev Server, Nginx y Golang)

Esta regla define la configuración experta de **Reverse Proxy** para conectar aplicaciones Frontend en React + Vite con un Backend en Golang, tanto en entornos de desarrollo local como en despliegues de producción (Nginx / Caddy), eliminando problemas de CORS, garantizando la seguridad de cabeceras y asegurando el reenvío de la IP real del cliente.

---

## 1. Reverse Proxy en Desarrollo con Vite (`vite.config.ts`)

En desarrollo local, el servidor de desarrollo de Vite debe actuar como Reverse Proxy hacia el backend de Golang. Esto elimina completamente las restricciones de CORS al permitir que el navegador envíe las peticiones al mismo origen del frontend (`http://localhost:5173/api`).

### Configuración Estándar en `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Reenviar todas las peticiones que inicien con /api hacia el servidor Golang
      '/api': {
        target: 'http://localhost:8080', // Puerto donde escucha el servidor Go
        changeOrigin: true,
        secure: false,
        ws: true, // Habilitar soporte para WebSockets / SSE
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // Reescritura opcional de versión
      },
    },
  },
});
```

---

## 2. Reverse Proxy en Producción con Nginx

En producción, Nginx actúa como el servidor web principal encargándose de servir la aplicación SPA compilada (`dist/`) y de redirigir el tráfico de API hacia la aplicación compilada en Golang.

### A. Plantilla de Configuración de Nginx (`nginx.conf`)

```nginx
server {
    listen 80;
    server_name miaplicacion.com;

    root /var/www/react-app/dist;
    index index.html;

    # Compresión Gzip para alto rendimiento
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # 1. Servir la Single Page Application (React SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 2. Reverse Proxy para el Backend Golang
    location /api/ {
        proxy_pass http://127.0.0.1:8080/api/;
        proxy_http_version 1.1;

        # Cabeceras críticas para transmitir la IP real del cliente al backend Go
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Soporte para WebSockets en producción
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # Tiempos de espera
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # 3. Cabeceras de Seguridad HTTP Estándar
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

---

## 3. Reverse Proxy en Producción con Caddy (Alternativa Moderna)

Caddy permite la emisión y renovación automática de certificados SSL/TLS (HTTPS) con una sintaxis minimalista:

### Plantilla de `Caddyfile`:

```caddy
miaplicacion.com {
    # Servir archivos estáticos del frontend React
    root * /var/www/react-app/dist
    file_server
    try_files {path} /index.html

    # Reverse Proxy hacia Golang
    handle_path /api/* {
        reverse_proxy 127.0.0.1:8080 {
            header_up Host {host}
            header_up X-Real-IP {remote}
            header_up X-Forwarded-For {remote}
            header_up X-Forwarded-Proto {scheme}
        }
    }
}
```

---

## 4. Obtención de la IP Real del Cliente en Golang

Para que Golang lea correctamente la dirección IP del cliente a través del Reverse Proxy, el handler de Go debe inspeccionar las cabeceras `X-Real-IP` o `X-Forwarded-For`:

```go
// [CORRECTO] Ejemplo en Go para obtener la IP del cliente detrás de Reverse Proxy
func GetClientIP(r *http.Request) string {
    // 1. Verificar X-Real-IP asignada por el Reverse Proxy
    if ip := r.Header.Get("X-Real-IP"); ip != "" {
        return ip
    }
    // 2. Verificar X-Forwarded-For
    if ip := r.Header.Get("X-Forwarded-For"); ip != "" {
        return ip
    }
    // 3. Fallback a RemoteAddr
    return r.RemoteAddr
}
```

---

## 5. Lista de Verificación (Checklist) de Reverse Proxy

- [ ] ¿Está configurada la propiedad `server.proxy` en `vite.config.ts` para desarrollo local?
- [ ] ¿La regla `try_files $uri $uri/ /index.html` está presente en la configuración del servidor web para evitar errores 404 al recargar rutas en la SPA?
- [ ] ¿Se están enviando las cabeceras `X-Real-IP` y `X-Forwarded-For` hacia Golang?
- [ ] ¿El proxy en producción soporta WebSockets con las cabeceras `Upgrade` y `Connection` si la aplicación lo requiere?
- [ ] ¿Están configuradas las cabeceras de seguridad HTTP básicas en el Reverse Proxy?
