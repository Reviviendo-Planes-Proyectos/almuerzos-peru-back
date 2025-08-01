# 🍽️ Almuerzos Perú - Backend API v1.0.0 🎉

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://semver.org)
[![Node.js](https://img.shields.io/badge/node.js-20.11.1-blue.svg)](https://nodejs.org)
[![NPM](https://img.shields.io/badge/npm-10.2.4-blue.svg)](https://npmjs.com)
[![NestJS](https://img.shields.io/badge/nestjs-11.1.5-red.svg)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/typescript-5.8.3-blue.svg)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/postgresql-15+-blue.svg)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://docker.com)
[![Tests](https://img.shields.io/badge/tests-jest-green.svg)](https://jestjs.io)

&nbsp;

## 📋 Descripción

API REST para la plataforma de almuerzos peruanos, desarrollado con **NestJS 11.1.5**, **TypeORM 0.3.25** y **PostgreSQL**. Implementa **Arquitectura Hexagonal** para máxima escalabilidad y mantenibilidad.

### 🌟 Características Principales

- ✅ **Arquitectura Hexagonal** con separación clara de capas
- ✅ **API REST** con versionado automático (`/api/v1`)
- ✅ **Validaciones** automáticas con decoradores
- ✅ **Documentación** completa de arquitectura
- ✅ **Docker** ready para deployment
- ✅ **Testing** con Jest y cobertura completa
- ✅ **Logging avanzado** con Winston integrado
- ✅ **CORS** configurado para frontend
- ✅ **TypeScript** con strict mode
- ✅ **Firebase Admin SDK** para autenticación
- ✅ **Swagger/OpenAPI** para documentación de API

&nbsp;

## 📚 Tabla de Contenidos

- [📋 Descripción](#-descripción)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Tecnologías](./docs/technologies.md)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🌐 API Endpoints](#-api-endpoints)
- [🧪 Testing y Verificación](#-testing-y-verificación)
- [🐳 Docker](#-docker)
- [🚀 Despliegue en Fly.io](#-despliegue-en-flyio)
- [🛠️ Solución de Problemas](#️-solución-de-problemas)

&nbsp;

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Hexagonal (Ports & Adapters)** con estructura modular:

- **🟢 Domain Layer:** Entidades y lógica de negocio central
- **🔵 Application Layer:** Casos de uso y orquestación
- **🟡 Infrastructure Layer:** Adaptadores externos (controllers, repositories, entidades ORM)

La arquitectura hexagonal permite que el núcleo de negocio sea independiente de frameworks y tecnologías externas, facilitando la escalabilidad, testeo y mantenibilidad.

📖 **[Ver documentación completa de arquitectura](./docs/architecture.md)**

&nbsp;

## 🚀 Tecnologías

- **Framework:** NestJS 11.1.5
- **Base de Datos:** PostgreSQL (AWS RDS)
- **ORM:** TypeORM 0.3.25
- **Lenguaje:** TypeScript 5.8.3
- **Validación:** Class-validator 0.14.2
- **Testing:** Jest 29.7.0
- **Linting:** ESLint + Prettier
- **Logger:** Winston 3.17.0
- **Autenticación:** Firebase Admin SDK 12.7.0
- **Documentación:** Swagger/OpenAPI
- **Contenedores:** Docker

&nbsp;

## ⚡ Instalación y Configuración

### 🎯 Opción 1: Docker (Recomendado)

**Prerequisitos:**

- [Docker Desktop](https://docker.com/get-started) instalado

**Pasos:**

```bash
# 1. Clonar repositorio
git clone https://github.com/Reviviendo-Planes-Proyectos/almuerzos-peru-back.git
cd almuerzos-peru-back

# 2. Levantar con Docker
npm run docker:dev              # Desarrollo normal
# O para desarrollo en tiempo real:
npm run docker:dev:build

# 3. Verificar funcionamiento
curl http://localhost:3000/api/v1/health
```

### 💻 Opción 2: Desarrollo Local

**Prerequisitos:**

- Node.js 20.11.1 y npm 10.2.4 ([instalar con NVM](https://github.com/nvm-sh/nvm))
- PostgreSQL 15+ instalado localmente

**Pasos:**

```bash
# 1. Clonar e instalar dependencias
git clone https://github.com/Reviviendo-Planes-Proyectos/almuerzos-peru-back.git
cd almuerzos-peru-back
npm ci

# 2. Configurar variables de entorno
cp config/environments/development.env config/environments/development.local.env
# Editar development.local.env con tu configuración de PostgreSQL local

# 3. Iniciar desarrollo
npm run start:dev
```

## 🔧 Scripts Disponibles

### 🚀 Desarrollo

```bash
npm run start:dev         # Desarrollo local con hot-reload
npm run start:debug       # Desarrollo con debugging
npm run build             # Construir para producción
npm run start:prod        # Iniciar aplicación en producción
```

### 🐳 Docker

```bash
npm run docker:dev        # Levantar PostgreSQL + API
npm run docker:dev:build   # Reconstruir y levantar
npm run docker:dev:logs   # Ver logs en tiempo real
npm run docker:dev:down   # Parar todos los servicios
```

### 🧪 Testing

```bash
npm test                  # Ejecutar tests unitarios
npm run test:watch        # Tests en modo watch
npm run test:coverage     # Tests con reporte de cobertura
npm run test:e2e          # Tests end-to-end
```

### 🔍 Calidad de Código

```bash
npm run lint              # Verificar y corregir código
npm run format            # Formatear código con Prettier
npm run typecheck         # Verificar tipos TypeScript
```

### 🗄️ Base de Datos

```bash
npm run db:check          # Verificar conexión a BD
npm run db:test           # Test completo de TypeORM
```

&nbsp;

## Documentación interactiva (Swagger)

La API cuenta con documentación interactiva generada automáticamente con Swagger/OpenAPI.

- Accede a la documentación y prueba los endpoints desde:

  👉 **http://localhost:3000/api/docs**

- Todos los endpoints y modelos están documentados y actualizados automáticamente.
- Puedes probar peticiones directamente desde la interfaz web.

&nbsp;

## 🌐 API Endpoints

La API está disponible en: **`http://localhost:3000/api/v1`**

### 🏠 Endpoints Principales

#### Health Check

```bash
GET /api/v1/health
```

#### Información de la API

```bash
GET /api/v1
```

### 👥 Usuarios (CRUD Completo)

#### Listar todos los usuarios

```bash
GET /api/v1/users
```

#### Obtener usuario por ID

```bash
GET /api/v1/users/:id
```

#### Crear nuevo usuario

```bash
POST /api/v1/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+51999888777"
}
```

#### Actualizar usuario

```bash
PUT /api/v1/users/:id
Content-Type: application/json

{
  "name": "Juan Carlos Pérez",
  "phone": "+51987654321"
}
```

#### Eliminar usuario

```bash
DELETE /api/v1/users/:id
```

### 📝 Formato de Respuesta

Todas las respuestas siguen el formato estándar:

```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    /* datos de respuesta */
  },
  "timestamp": "2025-07-21T16:40:30.263Z",
  "path": "/api/v1/users"
}
```

&nbsp;

## 🔬 Ejemplos de Uso

### Crear usuario con validaciones

```bash
# Crear usuario
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "phone": "+51999888777"
  }'

# Respuesta exitosa
{
  "success": true,
  "message": "Operación exitosa",
  "data": {
    "email": "juan@ejemplo.com",
    "name": "Juan Pérez",
    "phone": "+51999888777",
    "isActive": true
  },
  "timestamp": "2025-07-21T16:40:30.263Z",
  "path": "/api/v1/users"
}
```

### Manejo de errores

```bash
# Email inválido
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "email-invalido",
    "phone": "+51999888777"
  }'

# Respuesta de error
{
  "statusCode": 400,
  "message": ["El email debe tener un formato válido"],
  "error": "Bad Request"
}
```

&nbsp;

## 🧪 Testing y Verificación

### Tests Unitarios

```bash
# Ejecutar todos los tests
npm test

# Tests con watch mode
npm run test:watch

# Tests con cobertura
npm run test:cov
```

### Test de funcionalidad completa

```bash
npm run db:test
```

Este comando ejecuta una prueba completa que:

- ✅ Verifica conexión a base de datos
- ✅ Crea usuarios de prueba
- ✅ Realiza operaciones CRUD
- ✅ Valida reglas de negocio

### Verificación manual de la API

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Listar usuarios
curl http://localhost:3000/api/v1/users

# Información de la API
curl http://localhost:3000/api/v1
```

&nbsp;

## 🐳 Docker

### 📋 Estructura de Docker

```
docker/
├── compose/
│   ├── docker-compose.dev.yml     # Desarrollo
│   └── docker-compose.prod.yml    # Producción
└── images/
    ├── Dockerfile.dev             # Imagen desarrollo
    └── Dockerfile.prod            # Imagen producción
```

### 🚀 Comandos Docker

#### Usando scripts npm (Recomendado)

```bash
npm run docker:dev           # Levantar desarrollo
npm run docker:dev:build     # Reconstruir y levantar
npm run docker:dev:logs      # Ver logs en tiempo real
npm run docker:dev:down      # Parar servicios
```

#### Comandos Docker directos

```bash
# Desarrollo
docker-compose -f docker/compose/docker-compose.dev.yml up -d
docker-compose -f docker/compose/docker-compose.dev.yml logs -f
docker-compose -f docker/compose/docker-compose.dev.yml down

# Producción
docker-compose -f docker/compose/docker-compose.prod.yml up -d
docker-compose -f docker/compose/docker-compose.prod.yml down
```

### 📊 Servicios en Desarrollo

| Servicio       | Puerto | URL                                 | Descripción      |
| -------------- | ------ | ----------------------------------- | ---------------- |
| **API NestJS** | 3000   | http://localhost:3000/api/v1        | API principal    |
| **PostgreSQL** | 5432   | localhost:5432                      | Base de datos    |
| **Swagger**    | 3000   | http://localhost:3000/api/docs      | Documentación    |
| **Health**     | 3000   | http://localhost:3000/api/v1/health | Estado de la API |

### ✅ Verificación

```bash
# Ver estado de contenedores
docker ps

# Probar la API
curl http://localhost:3000/api/v1/health

# Conectar a PostgreSQL
docker exec -it almuerzos-postgres psql -U postgres -d db_almuerzos_dev
```

### 🔧 Solución de Problemas

**Puerto ocupado:**

```bash
docker stop $(docker ps -q)
```

**Problemas de permisos:**

```bash
npm run docker:clean
npm run docker:dev:build
```

**Base de datos no conecta:**

```bash
docker logs almuerzos-postgres
docker logs almuerzos-api
```

### 🏭 Producción con Docker

```bash
# Configurar variables de producción
cp config/environments/production.env config/environments/production.local.env
# Editar production.local.env con credenciales reales

# Levantar en producción
npm run docker:prod
```

### 📁 Variables de Entorno

```
config/environments/
├── development.env         # Desarrollo local
├── development.docker.env  # Docker (incluido)
├── production.env          # Template producción
├── test.env               # Testing
└── *.local.env            # Archivos personales (no versionados)
```

**Principales variables:**

- `NODE_ENV`, `PORT` - Configuración de aplicación
- `DB_*` - Conexión a base de datos
- `JWT_SECRET` - Clave para autenticación
- `FRONTEND_URL` - URLs permitidas para CORS

&nbsp;

### ⚡ Verificación Rápida

Una vez levantados los servicios, verifica que todo funcione:

```bash
# Health check
curl http://localhost:3000/api/v1/health

# Información de la API
curl http://localhost:3000/api/v1

# Abrir documentación
# Windows: start http://localhost:3000/api/docs
# macOS: open http://localhost:3000/api/docs
# Linux: xdg-open http://localhost:3000/api/docs
```

### 🛠️ Solución de Problemas Docker

#### Puerto en uso

```bash
# Ver qué está usando el puerto 3000
netstat -tulpn | grep :3000  # Linux
netstat -ano | findstr :3000 # Windows

# Cambiar puerto en docker-compose.yml si es necesario
ports:
  - '3001:3000'  # Host:Container
```

#### Problemas de permisos (Windows)

```bash
# Ejecutar PowerShell como administrador
# O usar Docker Desktop con permisos de administrador
```

#### Reconstruir tras cambios en dependencias

```bash
# Parar, limpiar y reconstruir
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

&nbsp;

## 🚀 Despliegue en Fly.io

Para desplegar la aplicación en Fly.io se debe considerar lo siguiente:

- El despliegue utiliza el archivo `fly.toml` para la configuración de la app, puertos y servicios.
- Las variables sensibles deben gestionarse mediante `fly secrets` y nunca versionarse.
- El build se realiza usando Docker, por lo que cualquier cambio en dependencias o entorno debe reflejarse en el `Dockerfile.prod`.
- El entorno de producción puede diferir del local, validar siempre las variables y configuraciones antes de desplegar.
- Los logs y errores pueden consultarse desde la CLI de Fly.io para diagnóstico.
- Archivos clave:
  - `fly.toml`: Configuración principal de la app en Fly.io.
  - `docker/images/Dockerfile.prod`: Imagen utilizada para el despliegue.
  - Variables de entorno: Gestionadas mediante `fly secrets`.

### Comandos útiles

Consultar el archivo package.json para ver los scripts disponibles para Fly.io.

&nbsp;

## 🛠️ Solución de Problemas

### Error de crypto

Si encuentras errores relacionados con `crypto is not defined`:

```bash
# El proyecto incluye un polyfill automático
# Verificar que esté importado en main.ts
import './crypto-polyfill';
```

### Problemas de conexión BD

```bash
# Verificar variables de entorno
npm run db:check

# Revisar logs de conexión
npm run start:dev
```

### Errores de formato

```bash
# Formatear automáticamente
npm run format

# Corregir linting
npm run lint
```

&nbsp;

## 📝 Logging centralizado con Winston

El proyecto utiliza un logger personalizado basado en Winston, accesible desde cualquier parte del código:

```typescript
import { logger } from './infrastructure/logger/logger';

logger.log('Mensaje informativo', 'ContextoOpcional');
logger.error('Mensaje de error', 'traza opcional', 'ContextoOpcional');
logger.warn('Mensaje de advertencia', 'ContextoOpcional');
logger.debug('Mensaje debug', 'ContextoOpcional');
logger.verbose('Mensaje verbose', 'ContextoOpcional');
```

- En producción, los logs se guardan en archivos en la carpeta `logs/`.
- En desarrollo, los logs se muestran en consola a color.
- El logger es compatible con la interfaz de NestJS (`LoggerService`).

&nbsp;

---

© 2025 Almuerzos Perú
