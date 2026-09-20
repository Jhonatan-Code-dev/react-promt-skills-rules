# Reglas de Desarrollo para el Repositorio de Rules & Skills de React

Este repositorio contiene el paquete centralizado de reglas y habilidades reutilizables de React.

---

## 1. Directivas de Conducta y Comunicación

1. **Idioma Español Garantizado**: Todas las interacciones, explicaciones, documentación y comentarios DEBEN realizarse en **Español claro, técnico, profesional y fácil de comprender**.
2. **Veracidad Absoluta**: Nunca inventar soluciones, asumir comportamientos no verificados ni ocultar errores técnicos. La transparencia es obligatoria.
3. **Obsesión por el Orden Extremo**: Mantener pulcritud quirúrgica en la nomenclatura (`kebab-case` en archivos, `PascalCase` en componentes), cero código muerto y cero comentarios inutilizados.
4. **Prohibición Estricta de Emojis**: Queda estrictamente prohibido el uso de emojis en cualquier explicación, documentación, comentarios de código, nombres de archivos o salidas de consola. La estética debe ser 100% sobria, profesional y austera.
5. **Cumplimiento ISO**: Respetar siempre las directrices ISO/IEC 25010 (Calidad y Mantenibilidad) e ISO/IEC 40500 (Accesibilidad Web).

---

## 2. Compatibilidad Antigravity / AGY

- Todos los archivos dentro de `rules/` y `skills/` deben mantener rutas relativas e inmutabilidad estructural para permitir su copiado automático mediante el script `install.js`.
