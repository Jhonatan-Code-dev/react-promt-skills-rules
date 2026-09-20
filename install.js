#!/usr/bin/env node

/**
 * Script de instalación de Rules y Skills para proyectos React.
 * Copia las reglas y habilidades desde este repositorio fuente a:
 *  - Carpeta de un proyecto destino: /path/to/project/.agents/
 *  - Configuración Global de la máquina: ~/.gemini/config/ (Usando --global o -g)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const isGlobal = args.includes('--global') || args.includes('-g');
const targetArgIndex = args.findIndex((arg) => !arg.startsWith('-'));
const customTarget = targetArgIndex !== -1 ? args[targetArgIndex] : null;

// Directorio de origen (raíz del paquete react-promt-skills-rules)
const sourceDir = __dirname;
const sourceRulesDir = path.join(sourceDir, 'rules');
const sourceSkillsDir = path.join(sourceDir, 'skills');

// Prevenir auto-instalación duplicada dentro de este mismo repositorio fuente
if (!isGlobal && !customTarget) {
  console.log('=== Instalador de React Rules & Skills ===');
  console.log('Te encuentras dentro del repositorio fuente (react-promt-skills-rules).');
  console.log('\nPara instalar en otro proyecto React, especifica la ruta del proyecto:');
  console.log('  node install.js /ruta/a/tu-proyecto-react\n');
  console.log('Para instalar globalmente en tu equipo:');
  console.log('  node install.js --global\n');
  process.exit(0);
}

// Determinar directorio de destino
let targetBaseDir;

if (isGlobal) {
  targetBaseDir = path.join(os.homedir(), '.gemini', 'config');
} else {
  targetBaseDir = path.resolve(customTarget, '.agents');
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

  console.log('\nInstalación completada con éxito.');
  console.log('Las reglas y habilidades ahora están activas en la ubicación destino.\n');
} catch (error) {
  console.error('Error durante la instalación:', error.message);
  process.exit(1);
}
