# 🍽️ Almuerzos Perú - Backend API v1.1.2 🎉

[![Version](https://img.shields.io/badge/version-1.1.2-green.svg)](https://semver.org)
[![Node.js](https://img.shields.io/badge/node.js-18+-blue.svg)](https://nodejs.org)
[![NestJS](https://img.shields.io/badge/nestjs-11.x-red.svg)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/postgresql-15+-blue.svg)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://docker.com)
[![Tests](https://img.shields.io/badge/tests-61%20passing-green.svg)](https://jestjs.io)

&nbsp;

## 📋 Descripción

API REST para la plataforma de almuerzos peruanos, desarrollado con **NestJS 11**, **TypeORM** y **PostgreSQL**. Implementa **Arquitectura Hexagonal** para máxima escalabilidad y mantenibilidad.

### 🌟 Características Principales

- ✅ **Arquitectura Hexagonal** con separación clara de capas
- ✅ **API REST** con versionado automático (`/api/v1`)
- ✅ **Validaciones** automáticas con decoradores
- ✅ **Documentación** completa de arquitectura
- ✅ **Docker** ready para deployment
- ✅ **61 Tests unitarios** implementados y pasando
- ✅ **Logging avanzado con Winston**: Toda la app usa un logger propio basado en Winston, configurable para consola y archivos, con soporte de contexto y trazas, evitando el uso de `console.log` y permitiendo integración futura con sistemas externos.
- ✅ **CORS** configurado para frontend
- ✅ **TypeScript** con strict mode

&nbsp;

## 📚 Tabla de Contenidos

- [📋 Descripción](#-descripción)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Tecnologías](./docs/technologies.md)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🌐 API Endpoints](#-api-endpoints)
- [📝 Documentación interactiva (Swagger)](#-documentación-interactiva-swagger)
- [🧪 Testing y Verificación](#-testing-y-verificación)
- [🐳 Docker](#-docker)
- [🚀 Despliegue en Fly.io](#-deploy-flyio)
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

- **Framework:** NestJS 11.x
- **Base de Datos:** PostgreSQL (AWS RDS)
- **ORM:** TypeORM 0.3.x
- **Lenguaje:** TypeScript
- **Validación:** Class-validator
- **Testing:** Jest
- **Linting:** ESLint + Prettier

&nbsp;

## ⚡ Instalación y Configuración

### Configuración de CORS (Frontend-Backend)

Para permitir solicitudes desde el frontend (local y producción), configura los orígenes permitidos en el archivo `.env`:

```env
FRONTEND_URL=http://localhost:4200,http://localhost:3000,https://almuerzos-peru-front.vercel.app
```

El backend leerá esta variable y habilitará CORS automáticamente para esos orígenes.

**En producción**, asegúrate de incluir la URL de tu frontend desplegado (por ejemplo, Vercel):

```env
FRONTEND_URL=https://almuerzos-peru-front.vercel.app
```

No es necesario modificar el código para agregar/quitar orígenes, solo actualiza la variable de entorno y reinicia el backend.

#### Test rápido de CORS desde el frontend

Puedes probar la conexión con el backend usando fetch o axios desde el frontend:

```js
fetch('https://almuerzos-peru.fly.dev/api/v1/users')
  .then((res) => res.json())
  .then((data) => console.log(data));
```

Si recibes datos correctamente y no hay errores de CORS en la consola del navegador, la configuración es exitosa.

### 1. Clonar repositorio

```bash
git clone https://github.com/Reviviendo-Planes-Proyectos/almuerzos-peru-back.git
cd almuerzos-peru-back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
 .env

# Editar con tus datos de base de datos
DB_HOST=your-database-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_NAME=your-database-name
DB_SSL=true

NODE_ENV=development
PORT=3000
```

### 4. Verificar conexión a base de datos

```bash
npm run db:check
```

&nbsp;

## 🔧 Scripts Disponibles

### Desarrollo

```bash
# Modo desarrollo con watch
npm run start:dev

# Modo desarrollo normal
npm run start

# Modo producción
npm run start:prod
```

### Base de Datos

```bash
# Verificar conexión
npm run db:check

# Probar funcionalidad completa
npm run db:test
```

### Calidad de Código

```bash
# Formatear código
npm run format

# Linting
npm run lint

# Construir proyecto
npm run build
```

### Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e
```

&nbsp;

## 📝 Documentación interactiva (Swagger)

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

### Desarrollo con Docker Compose

```bash
# Levantar toda la aplicación
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar servicios
docker-compose down
```

### Build para producción

```bash
# Construir imagen
docker build -t almuerzos-peru-api .

# Ejecutar contenedor
docker run -p 3000:3000 \
  -e DB_HOST=your-db-host \
  -e DB_PASSWORD=your-password \
  almuerzos-peru-api
```

&nbsp;

## 🚀 Despliegue en Fly.io

Para desplegar la aplicación en Fly.io se debe considerar lo siguiente:

- El despliegue utiliza el archivo `fly.toml` para la configuración de la app, puertos y servicios.
- Las variables sensibles deben gestionarse mediante `fly secrets` y nunca versionarse.
- El build se realiza usando Docker, por lo que cualquier cambio en dependencias o entorno debe reflejarse en el `Dockerfile`.
- El entorno de producción puede diferir del local, validar siempre las variables y configuraciones antes de desplegar.
- Los logs y errores pueden consultarse desde la CLI de Fly.io para diagnóstico.
- Archivos clave:
  - `fly.toml`: Configuración principal de la app en Fly.io.
  - `Dockerfile`: Imagen utilizada para el despliegue.
  - `.env` (no versionado): Variables de entorno locales.

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
