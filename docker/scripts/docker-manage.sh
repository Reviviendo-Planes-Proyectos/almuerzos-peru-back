#!/bin/bash

# Docker management script for Almuerzos Perú
# Usage: ./docker/scripts/docker-manage.sh [command] [environment]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Variables
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
DOCKER_DIR="$PROJECT_ROOT/docker"
COMPOSE_DIR="$DOCKER_DIR/compose"

# Help function
show_help() {
    echo -e "${BLUE}Docker Management - Almuerzos Perú Backend${NC}"
    echo ""
    echo -e "${GREEN}Uso:${NC} $0 [COMANDO] [ENTORNO]"
    echo ""
    echo -e "${GREEN}ENTORNOS DISPONIBLES:${NC}"
    echo "  dev     - Desarrollo (puerto 3000)"
    echo "  prod    - Producción (puerto 3001)"
    echo ""
    echo -e "${GREEN}COMANDOS PRINCIPALES:${NC}"
    echo "  up      - Iniciar servicios"
    echo "  down    - Detener servicios"
    echo "  restart - Reiniciar servicios"
    echo "  build   - Construir imágenes"
    echo "  logs    - Ver logs"
    echo "  status  - Estado de servicios"
    echo ""
    echo -e "${GREEN}COMANDOS DE LIMPIEZA:${NC}"
    echo "  clean   - Limpiar contenedores e imágenes no utilizadas"
    echo "  reset   - Reset completo (eliminar volúmenes)"
    echo ""
    echo -e "${GREEN}COMANDOS DE UTILIDAD:${NC}"
    echo "  db-shell   - Conectar a PostgreSQL"
    echo "  app-shell  - Conectar al contenedor de la app"
    echo "  health     - Verificar health checks"
    echo ""
    echo -e "${GREEN}EJEMPLOS:${NC}"
    echo "  $0 up dev       # Iniciar desarrollo"
    echo "  $0 logs prod    # Ver logs de producción"
    echo "  $0 db-shell dev # Conectar a BD de desarrollo"
}

# Función para obtener el archivo compose según el entorno
get_compose_file() {
    local env=${1:-dev}
    case $env in
        dev|development)
            echo "$COMPOSE_DIR/docker-compose.dev.yml"
            ;;
        prod|production)
            echo "$COMPOSE_DIR/docker-compose.prod.yml"
            ;;
        *)
            echo -e "${RED}❌ Entorno no válido: $env${NC}"
            echo -e "${YELLOW}Entornos disponibles: dev, prod${NC}"
            exit 1
            ;;
    esac
}

# Función para ejecutar comando docker-compose
run_compose() {
    local env=$1
    local cmd=$2
    shift 2
    local compose_file=$(get_compose_file $env)
    
    echo -e "${BLUE}🐳 Ejecutando en entorno: ${GREEN}$env${NC}"
    echo -e "${BLUE}📁 Compose file: ${GREEN}$compose_file${NC}"
    
    cd "$PROJECT_ROOT"
    docker-compose -f "$compose_file" $cmd "$@"
}

# Comandos principales
case "${1:-help}" in
    up)
        env=${2:-dev}
        echo -e "${GREEN}🚀 Iniciando servicios en entorno: $env${NC}"
        run_compose $env up -d
        echo -e "${GREEN}✅ Servicios iniciados${NC}"
        ;;
    
    down)
        env=${2:-dev}
        echo -e "${YELLOW}🛑 Deteniendo servicios en entorno: $env${NC}"
        run_compose $env down
        echo -e "${GREEN}✅ Servicios detenidos${NC}"
        ;;
    
    restart)
        env=${2:-dev}
        echo -e "${YELLOW}🔄 Reiniciando servicios en entorno: $env${NC}"
        run_compose $env restart
        echo -e "${GREEN}✅ Servicios reiniciados${NC}"
        ;;
    
    build)
        env=${2:-dev}
        echo -e "${BLUE}🔨 Construyendo imágenes para entorno: $env${NC}"
        run_compose $env build --no-cache
        echo -e "${GREEN}✅ Imágenes construidas${NC}"
        ;;
    
    logs)
        env=${2:-dev}
        service=${3:-}
        echo -e "${BLUE}📋 Mostrando logs del entorno: $env${NC}"
        if [[ -n "$service" ]]; then
            run_compose $env logs -f $service
        else
            run_compose $env logs -f
        fi
        ;;
    
    status)
        env=${2:-dev}
        echo -e "${BLUE}📊 Estado de servicios en entorno: $env${NC}"
        run_compose $env ps
        ;;
    
    clean)
        echo -e "${YELLOW}🧹 Limpiando contenedores e imágenes no utilizadas...${NC}"
        docker system prune -f
        echo -e "${GREEN}✅ Limpieza completada${NC}"
        ;;
    
    reset)
        env=${2:-dev}
        echo -e "${RED}⚠️  RESET COMPLETO del entorno: $env${NC}"
        echo -e "${RED}Esto eliminará todos los datos de la base de datos.${NC}"
        read -p "¿Estás seguro? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            run_compose $env down -v
            docker system prune -f
            echo -e "${GREEN}✅ Reset completado${NC}"
        else
            echo -e "${YELLOW}❌ Reset cancelado${NC}"
        fi
        ;;
    
    db-shell)
        env=${2:-dev}
        echo -e "${BLUE}🗄️  Conectando a PostgreSQL ($env)...${NC}"
        if [[ "$env" == "dev" ]]; then
            docker exec -it almuerzos-postgres psql -U postgres -d db_almuerzos_dev
        else
            docker exec -it almuerzos-postgres-prod psql -U postgres -d db_almuerzos_prod
        fi
        ;;
    
    app-shell)
        env=${2:-dev}
        echo -e "${BLUE}🐚 Conectando al contenedor de la aplicación ($env)...${NC}"
        if [[ "$env" == "dev" ]]; then
            docker exec -it almuerzos-api bash
        else
            docker exec -it almuerzos-api-prod bash
        fi
        ;;
    
    health)
        env=${2:-dev}
        echo -e "${BLUE}🏥 Verificando health checks ($env)...${NC}"
        if [[ "$env" == "dev" ]]; then
            curl -f http://localhost:3000/api/v1/health || echo -e "${RED}❌ API no responde${NC}"
        else
            curl -f http://localhost:3001/api/v1/health || echo -e "${RED}❌ API no responde${NC}"
        fi
        ;;
    
    help|--help|-h)
        show_help
        ;;
    
    *)
        echo -e "${RED}❌ Comando no reconocido: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_help() {
    echo -e "${BLUE}🐳 Gestión de Docker - Almuerzos Perú${NC}"
    echo ""
    echo "Comandos disponibles:"
    echo ""
    echo -e "${GREEN}DESARROLLO:${NC}"
    echo "  dev-up      - Levantar servicios de desarrollo"
    echo "  dev-down    - Parar servicios de desarrollo"
    echo "  dev-logs    - Ver logs de desarrollo"
    echo "  dev-restart - Reiniciar servicios de desarrollo"
    echo "  dev-build   - Reconstruir imágenes de desarrollo"
    echo ""
    echo -e "${YELLOW}PRODUCCIÓN:${NC}"
    echo "  prod-up     - Levantar servicios de producción"
    echo "  prod-down   - Parar servicios de producción"
    echo "  prod-logs   - Ver logs de producción"
    echo "  prod-build  - Reconstruir imágenes de producción"
    echo ""
    echo -e "${BLUE}UTILIDADES:${NC}"
    echo "  status      - Estado de contenedores"
    echo "  clean       - Limpiar contenedores y volúmenes"
    echo "  db-shell    - Conectar a PostgreSQL"
    echo "  app-shell   - Conectar al contenedor de la app"
    echo ""
}

case $1 in
    "dev-up")
        echo -e "${GREEN}🚀 Levantando servicios de desarrollo...${NC}"
        docker-compose up -d
        echo -e "${GREEN}✅ Servicios iniciados${NC}"
        echo -e "${BLUE}📚 API: http://localhost:3000/api/v1${NC}"
        echo -e "${BLUE}📝 Docs: http://localhost:3000/api/docs${NC}"
        ;;
    "dev-down")
        echo -e "${YELLOW}⏹️  Parando servicios de desarrollo...${NC}"
        docker-compose down
        echo -e "${GREEN}✅ Servicios detenidos${NC}"
        ;;
    "dev-logs")
        echo -e "${BLUE}📋 Logs de desarrollo...${NC}"
        docker-compose logs -f
        ;;
    "dev-restart")
        echo -e "${YELLOW}🔄 Reiniciando servicios de desarrollo...${NC}"
        docker-compose down
        docker-compose up -d
        echo -e "${GREEN}✅ Servicios reiniciados${NC}"
        ;;
    "dev-build")
        echo -e "${BLUE}🔨 Reconstruyendo imágenes de desarrollo...${NC}"
        docker-compose down
        docker-compose up --build -d
        echo -e "${GREEN}✅ Imágenes reconstruidas${NC}"
        ;;
    "prod-up")
        echo -e "${GREEN}🚀 Levantando servicios de producción...${NC}"
        if [ ! -f config/environments/production.local.env ]; then
            echo -e "${RED}❌ Archivo config/environments/production.local.env no encontrado${NC}"
            echo -e "${YELLOW}💡 Copia config/environments/production.env a production.local.env y configura las variables${NC}"
            exit 1
        fi
        docker-compose -f docker-compose.prod.yml up -d
        echo -e "${GREEN}✅ Servicios de producción iniciados${NC}"
        ;;
    "prod-down")
        echo -e "${YELLOW}⏹️  Parando servicios de producción...${NC}"
        docker-compose -f docker-compose.prod.yml down
        echo -e "${GREEN}✅ Servicios de producción detenidos${NC}"
        ;;
    "prod-logs")
        echo -e "${BLUE}📋 Logs de producción...${NC}"
        docker-compose -f docker-compose.prod.yml logs -f
        ;;
    "prod-build")
        echo -e "${BLUE}🔨 Reconstruyendo imágenes de producción...${NC}"
        docker-compose -f docker-compose.prod.yml down
        docker-compose -f docker-compose.prod.yml up --build -d
        echo -e "${GREEN}✅ Imágenes de producción reconstruidas${NC}"
        ;;
    "status")
        echo -e "${BLUE}📊 Estado de contenedores:${NC}"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        ;;
    "clean")
        echo -e "${RED}🧹 Limpiando contenedores y volúmenes...${NC}"
        docker-compose down -v
        docker-compose -f docker-compose.prod.yml down -v
        docker system prune -f
        echo -e "${GREEN}✅ Limpieza completada${NC}"
        ;;
    "db-shell")
        echo -e "${BLUE}🗄️  Conectando a PostgreSQL...${NC}"
        docker exec -it almuerzos-postgres psql -U postgres -d db_almuerzos_dev
        ;;
    "app-shell")
        echo -e "${BLUE}💻 Conectando al contenedor de la app...${NC}"
        docker exec -it almuerzos-api bash
        ;;
    *)
        print_help
        ;;
esac
