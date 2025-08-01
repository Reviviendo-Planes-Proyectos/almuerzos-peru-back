@echo off
REM =================================================================
REM SCRIPT DE GESTIÓN DOCKER - ALMUERZOS PERÚ (WINDOWS)
REM =================================================================

setlocal enabledelayedexpansion

REM Variables
set PROJECT_ROOT=%~dp0..\..
set DOCKER_DIR=%PROJECT_ROOT%\docker
set COMPOSE_DIR=%DOCKER_DIR%\compose

REM Función para mostrar ayuda
if "%1"=="help" goto :show_help
if "%1"=="" goto :show_help
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help

REM Función para obtener el archivo compose según el entorno
if "%2"=="prod" set COMPOSE_FILE=%COMPOSE_DIR%\docker-compose.prod.yml
if "%2"=="production" set COMPOSE_FILE=%COMPOSE_DIR%\docker-compose.prod.yml
if "%2"=="dev" set COMPOSE_FILE=%COMPOSE_DIR%\docker-compose.dev.yml
if "%2"=="development" set COMPOSE_FILE=%COMPOSE_DIR%\docker-compose.dev.yml
if "%2"=="" set COMPOSE_FILE=%COMPOSE_DIR%\docker-compose.dev.yml

REM Validar entorno
if not exist "%COMPOSE_FILE%" (
    echo Entorno no válido: %2
    echo Entornos disponibles: dev, prod
    exit /b 1
)

echo Ejecutando en entorno: %2
echo Compose file: %COMPOSE_FILE%

cd /d "%PROJECT_ROOT%"

REM Comandos principales
if "%1"=="up" goto :up
if "%1"=="down" goto :down
if "%1"=="restart" goto :restart
if "%1"=="build" goto :build
if "%1"=="logs" goto :logs
if "%1"=="status" goto :status

echo Comando no reconocido: %1
echo.
goto :show_help

:up
echo Iniciando servicios en entorno: %2
docker-compose -f "%COMPOSE_FILE%" up -d
echo Servicios iniciados
exit /b 0

:down
echo Deteniendo servicios en entorno: %2
docker-compose -f "%COMPOSE_FILE%" down
echo Servicios detenidos
exit /b 0

:restart
echo Reiniciando servicios en entorno: %2
docker-compose -f "%COMPOSE_FILE%" restart
echo Servicios reiniciados
exit /b 0

:build
echo Construyendo imágenes para entorno: %2
docker-compose -f "%COMPOSE_FILE%" build --no-cache
echo Imágenes construidas
exit /b 0

:logs
echo Mostrando logs del entorno: %2
docker-compose -f "%COMPOSE_FILE%" logs -f
exit /b 0

:status
echo Estado de servicios en entorno: %2
docker-compose -f "%COMPOSE_FILE%" ps
exit /b 0

:show_help
echo ==================================================================
echo GESTIÓN DOCKER - ALMUERZOS PERÚ BACKEND
echo ==================================================================
echo.
echo Uso: %0 [COMANDO] [ENTORNO]
echo.
echo ENTORNOS DISPONIBLES:
echo   dev     - Desarrollo (puerto 3000)
echo   prod    - Producción (puerto 3001)
echo.
echo COMANDOS PRINCIPALES:
echo   up      - Iniciar servicios
echo   down    - Detener servicios
echo   restart - Reiniciar servicios
echo   build   - Construir imágenes
echo   logs    - Ver logs
echo   status  - Estado de servicios
echo.
echo EJEMPLOS:
echo   %0 up dev       # Iniciar desarrollo
echo   %0 logs prod    # Ver logs de producción
exit /b 0