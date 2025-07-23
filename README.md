# 🍽️ Almuerzos Perú - Backend API v1.0.0 🎉

[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://semver.org)
[![Node.js](https://img.shields.io/badge/node.js-18+-blue.svg)](https://nodejs.org)
[![NestJS](https://img.shields.io/badge/nestjs-10.x-red.svg)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/postgresql-15+-blue.svg)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://docker.com)

## 📋 Descripción

Sistema backend para la plataforma de almuerzos peruanos, desarrollado con **NestJS**, **TypeORM** y **PostgreSQL**. Implementa **Clean Architecture** con estructura modular para máxima escalabilidad y mantenibilidad.

### 🌟 Características Principales

- ✅ **Clean Architecture** con 3 capas bien definidas
- ✅ **API REST** con versionado automático (`/api/v1`)
- ✅ **Validaciones** automáticas con decoradores
- ✅ **Documentación** completa de arquitectura
- ✅ **Docker** ready para deployment
- ✅ **Tests** unitarios implementados
- ✅ **Logging avanzado con Winston**: Toda la app usa un logger propio basado en Winston, configurable para consola y archivos, con soporte de contexto y trazas, evitando el uso de `console.log` y permitiendo integración futura con sistemas externos.
- ✅ **CORS** configurado para frontend
- ✅ **TypeScript** con strict mode

## 📚 Tabla de Contenidos

- [📋 Descripción](#-descripción)
- [🏗️ Arquitectura](#️-arquitectura)
- [🚀 Tecnologías](./docs/technologies.md)
- [📂 Estructura del Proyecto](./docs/project-structure.md)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🌐 API Endpoints](#-api-endpoints)
- [🧪 Testing y Verificación](#-testing-y-verificación)
- [🐳 Docker](#-docker)
- [📊 Estado del Proyecto](#-estado-del-proyecto-v100)
- [🛠️ Solución de Problemas](#️-solución-de-problemas)

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Hexagonal (Ports & Adapters)** con estructura modular:

- **🟢 Domain Layer:** Entidades y lógica de negocio central
- **🔵 Application Layer:** Casos de uso y orquestación
- **🟡 Infrastructure Layer:** Adaptadores externos (controllers, repositories, entidades ORM)

La arquitectura hexagonal permite que el núcleo de negocio sea independiente de frameworks y tecnologías externas, facilitando la escalabilidad, testeo y mantenibilidad.

📖 **[Ver documentación completa de arquitectura](./docs/architecture.md)**

## 🚀 Tecnologías

- **Framework:** NestJS 10.x
- **Base de Datos:** PostgreSQL (AWS RDS)
- **ORM:** TypeORM 0.3.x
- **Lenguaje:** TypeScript
- **Validación:** Class-validator
- **Testing:** Jest
- **Linting:** ESLint + Prettier

## 📁 Estructura del Proyecto

```
src/
├── 📁 common/              # Elementos compartidos
├── 📁 config/              # Configuraciones
├── 📁 shared/              # DTOs, utils compartidos
├── 📁 modules/             # Módulos de dominio
│   └── 📁 users/           # Módulo de usuarios
│       ├── domain/         # Entidades y reglas de negocio
│       ├── application/    # Casos de uso y DTOs
│       └── infrastructure/ # Controllers y repositories
└── 📁 scripts/             # Scripts de utilidades
```

## ⚡ Instalación y Configuración

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

## 🌐 API Endpoints

### Usuarios

- `GET /users` - Listar todos los usuarios
- `GET /users/:id` - Obtener usuario por ID
- `POST /users` - Crear nuevo usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### Ejemplo de uso

````bash
# Listar usuarios
curl http://localhost:3000/users

## 🌐 API Endpoints

La API está disponible en: **`http://localhost:3000/api/v1`**

### 🏠 Endpoints Principales

#### Health Check
```bash
GET /api/v1/health
````

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

## 📊 Estado del Proyecto v1.0.0

### ✅ Completado

- [x] **Arquitectura:** Clean Architecture implementada
- [x] **API REST:** Endpoints con versionado `/api/v1`
- [x] **Base de Datos:** PostgreSQL + TypeORM configurado
- [x] **Validaciones:** Class-validator implementado
- [x] **Tests:** Unitarios para módulo Users
- [x] **Calidad:** ESLint + Prettier configurado
- [x] **Documentación:** README + Architecture.md completos
- [x] **Docker:** Dockerfile + docker-compose ready
- [x] **Logging:** Middleware HTTP + manejo de errores
- [x] **CORS:** Configurado para frontend
- [x] **TypeScript:** Strict mode habilitado

### 🔄 En Desarrollo (v1.1.0)

- [ ] Módulo de restaurantes
- [ ] Módulo de pedidos (orders)
- [ ] Sistema de autenticación JWT
- [ ] Swagger/OpenAPI documentation
- [ ] Rate limiting
- [ ] Pipeline CI/CD

### 📋 Roadmap Futuro

#### v1.2.0 - Features Avanzadas

- [ ] Módulo de menús y categorías
- [ ] Sistema de notificaciones
- [ ] Geolocalización
- [ ] Dashboard de administración

#### v2.0.0 - Enterprise

- [ ] Microservicios architecture
- [ ] Event sourcing
- [ ] Analytics y Business Intelligence
- [ ] Integración con sistemas de pago
- [ ] Integración con pasarelas de pago
- [ ] Dashboard administrativo
- [ ] Sistema de reviews

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

---

## 📝 Logging centralizado con Winston

El proyecto utiliza un logger personalizado basado en Winston, accesible desde cualquier parte del código:

```typescript
import { logger } from './common/logger/logger';

logger.log('Mensaje informativo', 'ContextoOpcional');
logger.error('Mensaje de error', 'traza opcional', 'ContextoOpcional');
logger.warn('Mensaje de advertencia', 'ContextoOpcional');
logger.debug('Mensaje debug', 'ContextoOpcional');
logger.verbose('Mensaje verbose', 'ContextoOpcional');
```

- En producción, los logs se guardan en archivos en la carpeta `logs/`.
- En desarrollo, los logs se muestran en consola a color.
- El logger es compatible con la interfaz de NestJS (`LoggerService`).
