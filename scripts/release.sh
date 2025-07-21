#!/bin/bash

# Script para crear release de versión 1.0.0
# Este script automatiza el proceso de versionado y release

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Banner
echo -e "${BLUE}"
echo "======================================"
echo "🍽️  ALMUERZOS PERÚ - RELEASE v1.0.0"
echo "======================================"
echo -e "${NC}"

# Verificar que estamos en la branch correcta
current_branch=$(git branch --show-current)
if [ "$current_branch" != "feature/mila" ]; then
    warn "Estás en la branch: $current_branch"
    read -p "¿Continuar con el release? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Verificar que no hay cambios sin commitear
if [[ -n $(git status --porcelain) ]]; then
    error "Hay cambios sin commitear. Por favor, commit o stash los cambios antes del release."
    git status --short
    exit 1
fi

log "Ejecutando checks de calidad..."

# Ejecutar linting
log "🔍 Ejecutando ESLint..."
npm run lint:check || {
    error "ESLint falló. Corrígelos con: npm run lint"
    exit 1
}

# Ejecutar formateo check
log "💅 Verificando formato de código..."
npm run format:check || {
    error "Formato de código incorrecto. Corrígelo con: npm run format"
    exit 1
}

# Ejecutar type checking
log "🔧 Verificando tipos TypeScript..."
npm run typecheck || {
    error "Type checking falló."
    exit 1
}

# Ejecutar tests
log "🧪 Ejecutando tests..."
npm test || {
    error "Tests fallaron."
    exit 1
}

# Build del proyecto
log "🔨 Construyendo proyecto..."
npm run build || {
    error "Build falló."
    exit 1
}

log "✅ Todos los checks pasaron exitosamente!"

# Confirmar release
echo
log "📦 Preparando release v1.0.0..."
echo "Cambios incluidos en este release:"
echo "- ✅ Clean Architecture implementada"
echo "- ✅ API REST con versionado"
echo "- ✅ Módulo Users completo"
echo "- ✅ Validaciones con class-validator"
echo "- ✅ Tests unitarios"
echo "- ✅ Docker ready"
echo "- ✅ Documentación completa"

echo
read -p "¿Proceder con el release v1.0.0? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    warn "Release cancelado."
    exit 0
fi

# Crear commit de release
log "📝 Creando commit de release..."
git add .
git commit -m "🎉 Release v1.0.0

✨ Primera versión estable de Almuerzos Perú Backend

### Características principales:
- Clean Architecture con 3 capas
- API REST versionada (/api/v1)
- Módulo Users con CRUD completo
- Validaciones automáticas
- Tests unitarios implementados
- Docker ready para deployment
- Documentación completa

### Tecnologías:
- NestJS 10.x + TypeScript
- PostgreSQL + TypeORM
- Class-validator
- Jest para testing
- ESLint + Prettier

### Endpoints disponibles:
- GET /api/v1/health
- GET /api/v1/users
- POST /api/v1/users
- PUT /api/v1/users/:id
- DELETE /api/v1/users/:id

🔗 Ver CHANGELOG.md para detalles completos"

# Crear tag
log "🏷️  Creando tag v1.0.0..."
git tag -a v1.0.0 -m "Release v1.0.0 - Primera versión estable

🍽️ Almuerzos Perú Backend v1.0.0

Esta es la primera versión estable del backend de la plataforma 
Almuerzos Perú, implementando Clean Architecture y todas las 
funcionalidades básicas para gestión de usuarios.

Características:
✅ Clean Architecture
✅ API REST versionada
✅ Módulo Users completo
✅ Validaciones automáticas
✅ Tests unitarios
✅ Docker ready
✅ Documentación completa

Ready for production deployment!"

log "🚀 Release v1.0.0 creado exitosamente!"

echo
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 RELEASE v1.0.0 COMPLETADO${NC}"
echo -e "${GREEN}========================================${NC}"
echo
echo "Próximos pasos:"
echo "1. Push del tag: git push origin v1.0.0"
echo "2. Push de la branch: git push origin feature/mila"
echo "3. Crear Pull Request para merge a main"
echo "4. Deploy a producción"
echo
echo "🔗 Documentación: ./README.md"
echo "🔗 Arquitectura: ./ARCHITECTURE.md" 
echo "🔗 Changelog: ./CHANGELOG.md"
echo
log "¡Release v1.0.0 listo! 🚀"
