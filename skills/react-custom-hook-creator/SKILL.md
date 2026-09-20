---
name: react-custom-hook-creator
description: >-
  Asiste en el diseño e implementación de Custom Hooks reutilizables en React,
  garantizando la encapsulación limpia de efectos y estado dentro del segmento model/ de FSD.
---

# React Custom Hook Creator Skill

Guía para construir Custom Hooks robustos y mantenibles.

---

## Principios para un Custom Hook Excepcional

1. **Prefijo `use` OBLIGATORIO**: Todo Custom Hook debe comenzar por `use` (`useDebounce`, `useLocalStorage`).
2. **Desacoplamiento**: El hook solo maneja lógica y estado; no debe retornar elementos JSX.
3. **Limpieza (Cleanup)**: Todo `useEffect` debe retornar una función de limpieza para prevenir fugas de memoria.
