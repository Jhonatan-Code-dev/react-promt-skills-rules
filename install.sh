#!/usr/bin/env bash
# Script de Instalación de React Rules & Skills para Linux / macOS

SOURCE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
GLOBAL=false
TARGET_PATH=""

for arg in "$@"; do
    case $arg in
        -g|--global)
            GLOBAL=true
            shift
            ;;
        *)
            TARGET_PATH="$arg"
            shift
            ;;
    esac
done

if [ "$GLOBAL" = true ]; then
    TARGET_BASE="$HOME/.gemini/config"
elif [ -n "$TARGET_PATH" ]; then
    TARGET_BASE="$(cd "$TARGET_PATH" && pwd)/.agents"
else
    TARGET_BASE="$(pwd)/.agents"
fi

echo "=== Instalador de React Rules & Skills (Bash) ==="
echo "Origen: $SOURCE_DIR"
echo "Destino: $TARGET_BASE"
echo ""

if [ -d "$SOURCE_DIR/rules" ]; then
    mkdir -p "$TARGET_BASE/rules"
    cp -r "$SOURCE_DIR/rules/"* "$TARGET_BASE/rules/"
    echo "Reglas instaladas en: $TARGET_BASE/rules"
fi

if [ -d "$SOURCE_DIR/skills" ]; then
    mkdir -p "$TARGET_BASE/skills"
    cp -r "$SOURCE_DIR/skills/"* "$TARGET_BASE/skills/"
    echo "Habilidades instaladas en: $TARGET_BASE/skills"
fi

echo ""
echo "Instalación completada con éxito."
