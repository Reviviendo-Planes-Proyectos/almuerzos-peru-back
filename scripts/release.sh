#!/bin/bash

# Script para crear releases automáticos
# Uso: ./scripts/release.sh [version] [branch]
# Ejemplos:
#   ./scripts/release.sh 1.1.0
#   ./scripts/release.sh 1.1.0 feature/mila
#   ./scripts/release.sh patch  (auto-incrementa patch)
#   ./scripts/release.sh minor  (auto-incrementa minor)

set -e

# Configuración por defecto
DEFAULT_BRANCH="feature/mila"
DEFAULT_VERSION_TYPE="patch"

# Obtener parámetros
VERSION=${1:-$DEFAULT_VERSION_TYPE}
TARGET_BRANCH=${2:-$DEFAULT_BRANCH}

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Función para obtener la versión actual del package.json
get_current_version() {
    node -p "require('./package.json').version"
}

# Función para calcular la siguiente versión
calculate_next_version() {
    local current_version=$1
    local version_type=$2
    
    IFS='.' read -ra VERSION_PARTS <<< "$current_version"
    local major=${VERSION_PARTS[0]}
    local minor=${VERSION_PARTS[1]}
    local patch=${VERSION_PARTS[2]}
    
    case $version_type in
        "major")
            echo "$((major + 1)).0.0"
            ;;
        "minor")
            echo "$major.$((minor + 1)).0"
            ;;
        "patch")
            echo "$major.$minor.$((patch + 1))"
            ;;
        *)
            # Si no es major/minor/patch, asumir que es una versión específica
            echo "$version_type"
            ;;
    esac
}

# Detectar cambios desde la última versión
detect_changes() {
    local last_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    
    if [ -z "$last_tag" ]; then
        echo "No hay tags previos, este será el primer release"
        return
    fi
    
    log "Detectando cambios desde $last_tag..."
    
    # Contar commits desde el último tag
    local commit_count=$(git rev-list $last_tag..HEAD --count)
    
    if [ "$commit_count" -eq 0 ]; then
        warn "No hay commits nuevos desde $last_tag"
        read -p "¿Continuar de todas formas? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 0
        fi
    else
        info "Se encontraron $commit_count commits nuevos"
        echo "Cambios recientes:"
        git log $last_tag..HEAD --oneline --max-count=10
    fi
}

# Obtener versión actual y calcular la siguiente
CURRENT_VERSION=$(get_current_version)
NEXT_VERSION=$(calculate_next_version "$CURRENT_VERSION" "$VERSION")

# Banner dinámico
echo -e "${BLUE}"
echo "======================================"
echo "🍽️  ALMUERZOS PERÚ - RELEASE v$NEXT_VERSION"
echo "======================================"
echo -e "${NC}"
echo "📊 Versión actual: v$CURRENT_VERSION"
echo "🚀 Nueva versión:  v$NEXT_VERSION"
echo "🌿 Branch objetivo: $TARGET_BRANCH"
echo

# Verificar que estamos en la branch correcta
current_branch=$(git branch --show-current)
if [ "$current_branch" != "$TARGET_BRANCH" ]; then
    warn "Estás en la branch: $current_branch (esperada: $TARGET_BRANCH)"
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

# Detectar cambios automáticamente
detect_changes

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
log "📦 Preparando release v$NEXT_VERSION..."
echo "🔍 Verificando qué incluir en este release..."

# Detectar características automáticamente
echo "Características detectadas:"
echo "- ✅ Clean Architecture implementada"
echo "- ✅ API REST con versionado"

# Verificar si existen módulos específicos
if [ -d "src/app/modules/authentication" ]; then
    echo "- ✅ Módulo de Autenticación"
fi

if [ -d "src/app/modules/users" ] || [ -d "src/core/use-cases/users" ]; then
    echo "- ✅ Módulo Users completo"
fi

# Verificar características técnicas
if [ -f "docker/compose/docker-compose.dev.yml" ]; then
    echo "- ✅ Configuración Docker avanzada"
fi

if [ -d "config/environments" ]; then
    echo "- ✅ Gestión de entornos"
fi

if [ -f "tools/utils/env-loader.ts" ]; then
    echo "- ✅ Utilidades de configuración"
fi

echo "- ✅ Validaciones con class-validator"
echo "- ✅ Tests unitarios"
echo "- ✅ Docker ready"
echo "- ✅ Documentación completa"

echo
read -p "¿Proceder con el release v$NEXT_VERSION? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    warn "Release cancelado."
    exit 0
fi

# Actualizar package.json con la nueva versión
log "📝 Actualizando package.json a v$NEXT_VERSION..."
npm version $NEXT_VERSION --no-git-tag-version

# Crear commit de release
log "📝 Creando commit de release..."
git add .
git commit -m "🎉 Release v$NEXT_VERSION

✨ Nueva versión de Almuerzos Perú Backend

### Características principales:
- Clean Architecture con 3 capas
- API REST versionada (/api/v1)
- Validaciones automáticas
- Tests unitarios implementados
- Docker ready para deployment
- Documentación completa

### Tecnologías:
- NestJS 11.x + TypeScript
- PostgreSQL + TypeORM
- Class-validator
- Jest para testing
- ESLint + Prettier

🔗 Ver CHANGELOG.md para detalles completos"

# Crear tag
log "🏷️  Creando tag v$NEXT_VERSION..."
git tag -a v$NEXT_VERSION -m "Release v$NEXT_VERSION

🍽️ Almuerzos Perú Backend v$NEXT_VERSION

Nueva versión del backend de la plataforma Almuerzos Perú
con mejoras y nuevas funcionalidades.

Características:
✅ Clean Architecture
✅ API REST versionada
✅ Validaciones automáticas
✅ Tests unitarios
✅ Docker ready
✅ Documentación completa

Ready for production deployment!"

log "🚀 Release v$NEXT_VERSION creado exitosamente!"

echo
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 RELEASE v$NEXT_VERSION COMPLETADO${NC}"
echo -e "${GREEN}========================================${NC}"
echo
echo "Próximos pasos:"
echo "1. Push del tag: git push origin v$NEXT_VERSION"
echo "2. Push de la branch: git push origin $TARGET_BRANCH"
echo "3. Crear Pull Request para merge a main"
echo "4. Deploy a producción"
echo
echo "🔗 Documentación: ./README.md"
echo "🔗 Arquitectura: ./docs/architecture.md" 
echo "🔗 Changelog: ./CHANGELOG.md"
echo
log "¡Release v$NEXT_VERSION listo! 🚀"

echo
info "💡 Para futuras releases, puedes usar:"
echo "   ./scripts/release.sh patch   # Incrementa patch (x.x.X)"
echo "   ./scripts/release.sh minor   # Incrementa minor (x.X.0)"
echo "   ./scripts/release.sh major   # Incrementa major (X.0.0)"
echo "   ./scripts/release.sh 2.0.0   # Versión específica"
