#!/bin/bash

echo "🔧 Configurando archivos de entorno..."
echo

# Función para crear archivo desde template
create_env_file() {
    local template=$1
    local target=$2

    if [ ! -f "$target" ]; then
        if [ -f "$template" ]; then
            cp "$template" "$target"
            echo "✅ Creado: $target"
        else
            echo "❌ Template no encontrado: $template"
        fi
    else
        echo "ℹ️  Ya existe: $target"
    fi
}

# Crear archivos locales desde templates
create_env_file "config/environments/development.env" "config/environments/development.local.env"
create_env_file "config/environments/development.docker.env" "config/environments/development.docker.local.env"
create_env_file "config/environments/production.env" "config/environments/production.local.env"

echo
echo "🔐 SIGUIENTE PASO: Configurar credenciales reales"
echo
echo "� Desarrollo local:     code config/environments/development.local.env"
echo "� Desarrollo Docker:    code config/environments/development.docker.local.env" 
echo "� Producción:           code config/environments/production.local.env"
echo
echo "🧪 Verificar configuración: npm run db:check"
