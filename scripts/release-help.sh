#!/bin/bash

# Script de ayuda para el sistema de releases

echo "📚 GUÍA DEL SISTEMA DE RELEASES - Almuerzos Perú Backend"
echo "========================================================"
echo

echo "🚀 COMANDO PRINCIPAL:"
echo "./scripts/release.sh [version] [branch]"
echo

echo "📝 EJEMPLOS COMUNES:"
echo
echo "# Release automático (patch: 1.0.0 → 1.0.1)"
echo "./scripts/release.sh"
echo
echo "# Nuevas características (minor: 1.0.0 → 1.1.0)"
echo "./scripts/release.sh minor"
echo
echo "# Cambios breaking (major: 1.0.0 → 2.0.0)"
echo "./scripts/release.sh major"
echo
echo "# Versión específica"
echo "./scripts/release.sh 2.1.3"
echo

echo "🔍 QUÉ HACE EL SCRIPT:"
echo
echo "1. ✅ Valida que estés en la branch correcta"
echo "2. ✅ Verifica que no hay cambios sin commitear"
echo "3. ✅ Detecta cambios desde el último tag"
echo "4. ✅ Ejecuta linting y formateo"
echo "5. ✅ Ejecuta tests unitarios"
echo "6. ✅ Ejecuta build del proyecto"
echo "7. ✅ Actualiza package.json con nueva versión"
echo "8. ✅ Detecta características automáticamente"
echo "9. ✅ Crea commit de release"
echo "10. ✅ Crea tag git con la nueva versión"
echo "11. ✅ Muestra instrucciones para next steps"
echo

echo "⚠️  REQUISITOS PREVIOS:"
echo
echo "- Git working tree limpio (sin cambios sin commitear)"
echo "- Todos los tests deben pasar"
echo "- El código debe pasar linting y formateo"
echo "- El proyecto debe compilar sin errores"
echo

echo "🎯 CASOS DE USO COMUNES:"
echo
echo "Bug fixes y patches:"
echo "  → ./scripts/release.sh patch"
echo
echo "Nuevas características:"
echo "  → ./scripts/release.sh minor"
echo
echo "Cambios breaking o rediseño:"
echo "  → ./scripts/release.sh major"
echo

echo "📋 VERSIONADO SEMÁNTICO:"
echo
echo "MAJOR.MINOR.PATCH (ej: 2.1.3)"
echo
echo "- MAJOR: Cambios incompatibles (breaking changes)"
echo "- MINOR: Nuevas funcionalidades (compatibles)"
echo "- PATCH: Bug fixes (compatibles)"
echo

current_version=$(node -p "require('./package.json').version" 2>/dev/null || echo "unknown")
echo "📊 ESTADO ACTUAL:"
echo "- Versión actual: v$current_version"
echo "- Branch actual: $(git branch --show-current 2>/dev/null || echo 'unknown')"
echo

echo "🚀 ¿Listo para hacer un release? Ejecuta:"
echo "./scripts/release.sh minor"
