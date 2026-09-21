#!/usr/bin/env node

/**
 * Script de instalación de Rules y Skills para proyectos React.
 * Soporta ejecución directa mediante NPX, GitHub, Node.js o CLI global.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const targetArgIndex = args.findIndex((arg) => !arg.startsWith('-'));
const customTarget = targetArgIndex !== -1 ? args[targetArgIndex] : null;

// Directorio de origen (raíz del paquete ejecutable)
const sourceDir = __dirname;
const sourceRulesDir = path.join(sourceDir, 'rules');
const sourceSkillsDir = path.join(sourceDir, 'skills');

// Directorio de ejecución del usuario (dónde se lanzó la terminal)
const workingDir = process.cwd();

// Determinar el directorio de destino
let targetBaseDir;

if (isGlobal) {
  targetBaseDir = path.join(os.homedir(), '.gemini', 'config');
} else if (customTarget) {
  targetBaseDir = path.resolve(customTarget, '.agents');
} else if (workingDir !== sourceDir) {
  // Ejecutado desde npx o fuera del propio repositorio fuente
  targetBaseDir = path.join(workingDir, '.agents');
} else {
  // Ejecutado dentro de la raíz del propio repositorio sin parámetros
  console.log('=== Instalador de React Rules & Skills ===\n');
  console.log('Modos de instalación súper sencillos:\n');
  console.log('1. En el proyecto activo (vía NPX):');
  console.log('   npx react-promt-skills-rules\n');
  console.log('2. En un proyecto específico:');
  console.log('   node install.js /ruta/a/tu-proyecto-react\n');
  console.log('3. Globalmente en tu equipo:');
  console.log('   node install.js --global\n');
  process.exit(0);
}

console.log('=== Instalador de React Rules & Skills ===');
console.log(`Origen: ${sourceDir}`);
console.log(`Destino: ${targetBaseDir}\n`);

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

try {
  if (fs.existsSync(sourceRulesDir)) {
    const destRules = path.join(targetBaseDir, 'rules');
    copyRecursiveSync(sourceRulesDir, destRules);
    console.log(`Reglas copiadas exitosamente en: ${destRules}`);
  }

  if (fs.existsSync(sourceSkillsDir)) {
    const destSkills = path.join(targetBaseDir, 'skills');
    copyRecursiveSync(sourceSkillsDir, destSkills);
    console.log(`Habilidades copiadas exitosamente en: ${destSkills}`);
  }

  // Copiar directivas maestras GEMINI.md y AGENTS.md
  ['GEMINI.md', 'AGENTS.md'].forEach((docFile) => {
    const srcDoc = path.join(sourceDir, docFile);
    if (fs.existsSync(srcDoc)) {
      const destDoc = path.join(targetBaseDir, docFile);
      fs.copyFileSync(srcDoc, destDoc);
      console.log(`Directiva maestra copiada en: ${destDoc}`);
    }
  });

  console.log('\nInstalación completada con éxito.');
  console.log('Las reglas y habilidades ahora están activas en la ubicación destino.\n');
} catch (error) {
  console.error('Error durante la instalación:', error.message);
  process.exit(1);
}
