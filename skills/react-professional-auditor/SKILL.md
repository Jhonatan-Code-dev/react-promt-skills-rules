---
name: react-professional-auditor
description: >-
  Audita código de React con rigor extremo y veracidad absoluta en Español.
  Evalúa el cumplimiento de estándares ISO/IEC 25010 (Calidad), ISO/IEC 40500 (Accesibilidad WCAG),
  orden extremo de archivos y limpieza total de código basura y emojis.
---

# React Professional Auditor Skill

Esta habilidad permite al asistente realizar una auditoría técnica implacable y profesional sobre cualquier archivo o carpeta del proyecto Frontend.

---

## Metodología de Auditoría Extrema

Al auditar un proyecto o componente, evalúa los siguientes 4 Pilares de Calidad:

### 1. Nivel de Orden Extremo y Limpieza de Emojis
- [ ] ¿Los nombres de archivo siguen estrictamente `kebab-case`?
- [ ] ¿El archivo carece por completo de emojis en comentarios o código?
- [ ] ¿Existen `console.log` o código comentado que deba ser eliminado de inmediato?
- [ ] ¿Hay importaciones no utilizadas o variables huérfanas?

### 2. Cumplimiento de Veracidad y Tipado
- [ ] ¿Existe algún uso de `any` en TypeScript? (Debe reemplazarse por tipos concretos o `unknown`).
- [ ] ¿Los datos de la API están validados con Schemas (Zod)?
- [ ] ¿Se manejan de forma transparente los estados de error y carga sin ocultar excepciones?

### 3. Alineación con Normas ISO Frontend
- [ ] **ISO 25010 (Mantenibilidad)**: ¿El componente respeta la arquitectura FSD y la Public API (`index.ts`)?
- [ ] **ISO 40500 (Accesibilidad WCAG 2.1 AA)**: ¿Se utilizan etiquetas HTML5 semánticas y atributos ARIA donde corresponde?

---

## Formato del Reporte de Auditoría

El reporte emitido debe ser en Español transparente, directo, austero y estructurado:

```markdown
# Reporte de Auditoría de Calidad y Orden

## Hallazgos que violan el Orden Extremo
- [Archivo/Línea]: Descripción de la falla (ej: Código comentado, uso de `any`, presencia de emojis).

## Riesgos de Mantenibilidad (ISO 25010)
- [Archivo/Línea]: Componente demasiado grande o acoplado que debe dividirse en `ui/` y `model/`.

## Acciones Recomendadas de Refactorización
1. Acción 1...
2. Acción 2...
```
