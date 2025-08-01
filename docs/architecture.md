# 🏗️ Arquitectura Hexagonal (Ports & Adapters) + Clean Architecture

## �️ Estructura Organizativa del Proyecto

### **�📁 Estructura Completa del Proyecto**

```
almuerzos-peru-back/
├── 🐳 docker/                              # Gestión Docker organizada
│   ├── compose/                            # Archivos docker-compose
│   │   ├── docker-compose.dev.yml         # Entorno desarrollo
│   │   └── docker-compose.prod.yml        # Entorno producción
│   ├── images/                             # Dockerfiles
│   │   ├── Dockerfile.dev                 # Imagen desarrollo
│   │   └── Dockerfile.prod                # Imagen producción
│   └── scripts/                            # Scripts de gestión
│       ├── docker-manage.sh               # Script Linux/macOS
│       └── docker-manage.bat              # Script Windows
│
├── ⚙️ config/                              # Configuración centralizada
│   └── environments/                      # Variables de entorno
│       ├── development.env                # Variables desarrollo local
│       ├── development.docker.env         # Variables específicas para Docker
│       ├── development.local.env          # Variables locales dev
│       ├── production.env                 # Variables producción
│       ├── production.local.env           # Variables locales prod
│       └── test.env                       # Variables testing
│
├──  docs/                               # Documentación
│   ├── architecture.md                    # Documentación de arquitectura
│   └── technologies.md                    # Tecnologías utilizadas
└── 📁 src/                                # Código fuente (arquitectura hexagonal)
```

### **📁 Estructura del Código Fuente (src/)**

```
src/
├── 📁 main.ts                      # Punto de entrada de la aplicación
├── 📁 app/                         # Configuración de la aplicación
│   └── app.module.ts               # Módulo principal de NestJS
├── 📁 common/                      # 🛠️ CAPA COMÚN - Elementos compartidos
│   ├── formatters/                 # Formateadores de datos
│   ├── interceptors/               # Interceptores globales (respuestas HTTP)
│   ├── middleware/                 # Middleware HTTP (logging)
│   └── polyfills/                  # Polyfills para compatibilidad
├── 📁 core/                        # 🟢 CAPA DE DOMINIO + 🔵 CAPA DE APLICACIÓN
│   ├── domain/                     # Entidades y reglas de negocio
│   │   └── repositories/           # Interfaces de repositorios (puertos)
│   │       └── user/
│   │           ├── user.entity.ts              # Entidad de dominio pura
│   │           └── user.repository.interface.ts # Puerto del repositorio
│   ├── services/                   # Servicios de dominio
│   │   └── HealthService.service.ts # Servicio de salud de la aplicación
│   └── use-cases/                  # Casos de uso (lógica de aplicación)
│       ├── health/                 # Casos de uso de salud
│       ├── hello/                  # Casos de uso de bienvenida
│       └── user/                   # Casos de uso de usuarios
│           └── user.use-cases.ts   # Lógica de negocio de usuarios
├── 📁 infrastructure/              # 🟡 CAPA DE INFRAESTRUCTURA
│   ├── config/                     # Configuraciones de infraestructura
│   │   └── database.config.ts      # Configuración de base de datos
│   ├── database/                   # Adaptadores de persistencia
│   │   ├── typeorm-user.repository.ts # Implementación del repositorio
│   │   └── entities/               # Entidades de TypeORM
│   │       └── user/
│   │           └── user.ts         # Entidad TypeORM (adaptador)
│   └── logger/                     # Sistema de logging
│       └── logger.ts               # Logger basado en Winston
└── 📁 interfaces/                  # 🟠 CAPA DE INTERFACES
    ├── controllers/                # Controladores REST
    │   ├── app/                    # Controlador principal
    │   │   └── app.controller.ts   # Endpoints de aplicación (/health, /)
    │   └── user/                   # Controlador de usuarios
    │       └── user.controller.ts  # API REST para usuarios (/users)
    └── dto/                        # Objetos de transferencia de datos
        └── user/
            └── user.dto.ts         # DTOs para operaciones de usuarios
```

## 🐳 Gestión Docker Mejorada

### **Entornos Separados**

- **Desarrollo**: Puerto 3000, PostgreSQL en puerto 5432
- **Producción**: Puerto 3001, PostgreSQL en puerto 5433

### **Scripts de Gestión Multiplataforma**

```bash
# Linux/macOS
./docker/scripts/docker-manage.sh up dev
./docker/scripts/docker-manage.sh logs prod

# Windows
docker\scripts\docker-manage.bat up dev
docker\scripts\docker-manage.bat logs prod
```

### **Comandos de Desarrollo Disponibles**

```bash
# Desarrollo
npm run start:dev      # Iniciar desarrollo
npm run start:debug    # Desarrollo con debugging
npm run build          # Construir aplicación
npm run start:prod     # Iniciar producción

# Testing
npm test               # Ejecutar tests
npm run test:watch     # Tests en modo watch
npm run test:coverage  # Tests con coverage

# Código
npm run lint           # Verificar código
npm run format         # Formatear código
npm run typecheck      # Verificar tipos

# Docker
docker-compose up -d   # Servicios en desarrollo
docker-compose down    # Detener servicios
docker-compose logs -f # Ver logs
```

## 📁 Consolidación de Variables de Entorno

### **Antes de la Reorganización**

```
├── .env                    # ❌ Disperso en raíz
├── config/
│   ├── .env.development   # ❌ Disperso en config
│   └── .env.production    # ❌ Disperso en config
```

### **Después de la Reorganización**

```
├── config/environments/
│   ├── development.env         # ✅ Centralizado
│   ├── development.local.env   # ✅ Variables locales
│   ├── production.env          # ✅ Centralizado
│   ├── production.local.env    # ✅ Variables locales
│   └── test.env               # ✅ Testing
```

## 🎯 Principios de Arquitectura Hexagonal Aplicados

### **🟢 Capa de Dominio (Core)**

#### **Entidades de Dominio** (`core/domain/`)

- **Propósito**: Representan conceptos del negocio con sus reglas y comportamientos
- **Características**:
  - Sin dependencias externas
  - Contienen lógica de negocio pura
  - Inmutables cuando es posible
- **Configuración**: Variables con prefijo `APP_`
- **Ejemplo**: `UserEntity` con validaciones de email y reglas de negocio

#### **Interfaces de Repositorio** (`core/domain/repositories/`)

- **Propósito**: Define contratos (puertos) para acceso a datos
- **Características**:
  - Abstracciones puras (interfaces TypeScript)
  - Definen operaciones de persistencia
  - Independientes de la tecnología de base de datos

### **🔵 Capa de Aplicación (Use Cases)**

#### **Casos de Uso** (`core/use-cases/`)

- **Propósito**: Orquestan la lógica de negocio y coordinan entre capas
- **Características**:
  - Implementan funcionalidades específicas del sistema
  - Usan inyección de dependencias
  - Dependen solo de abstracciones (interfaces)
- **Ejemplo**: `UserUseCases` maneja CRUD de usuarios usando `IUserRepository`

### **🟡 Capa de Infraestructura**

#### **Repositorios Concretos** (`infrastructure/database/`)

- **Propósito**: Implementan los puertos definidos en el dominio
- **Características**:
  - Adaptadores que implementan interfaces del dominio
  - Contienen detalles específicos de persistencia (TypeORM)
  - Mapean entre entidades de dominio y entidades de base de datos
- **Configuración**: Variables con prefijo `DB_`, `JWT_`, etc.

#### **Configuraciones** (`infrastructure/config/`)

- **Propósito**: Configuraciones de servicios externos
- **Características**:
  - Variables de entorno
  - Configuración de base de datos
  - Configuración de servicios externos

#### **Logger** (`infrastructure/logger/`)

- **Propósito**: Sistema de logging centralizado
- **Características**:
  - Basado en Winston
  - Configurable para diferentes entornos
  - Formatos personalizados para desarrollo y producción

### **🟠 Capa de Interfaces**

#### **Controladores** (`interfaces/controllers/`)

- **Propósito**: Puntos de entrada HTTP para la aplicación
- **Características**:
  - Manejan requests/responses HTTP
  - Validan datos de entrada
  - Delegan lógica a casos de uso
- **Configuración**: Variables con prefijo `PORT`, `API_`
- **Ejemplo**: `UserController` expone endpoints REST para gestión de usuarios

#### **DTOs** (`interfaces/dto/`)

- **Propósito**: Contratos de datos para comunicación externa
- **Características**:
  - Validaciones con class-validator
  - Transformaciones automáticas
  - Documentación con Swagger

### **🛠️ Capa Común**

#### **Utilidades Compartidas** (`common/`)

- **Propósito**: Funcionalidades transversales a toda la aplicación
- **Características**:
  - Middlewares, interceptores, formateadores
  - Polyfills para compatibilidad
  - Utilidades reutilizables
- **Configuración**: Variables transversales

## 📊 Beneficios de la Reorganización Arquitectónica

### ✅ **Organización y Mantenibilidad**

- Estructura clara y predecible siguiendo hexagonal clean architecture
- Separación completa de responsabilidades por capas
- Consolidación de archivos de configuración en ubicaciones lógicas
- Scripts de gestión multiplataforma para desarrollo y producción

### ✅ **Escalabilidad y Testing**

- Arquitectura hexagonal preparada para crecimiento del proyecto
- Capas bien definidas que facilitan el unit testing
- Inyección de dependencias que permite easy mocking
- Independencia del dominio respecto a frameworks externos

### ✅ **DevOps y Deployment**

- Docker completamente organizado en estructura de directorios lógica
- Entornos de desarrollo y producción completamente separados
- Scripts npm organizados para todas las operaciones de desarrollo
- Scripts multiplataforma (Linux/macOS/Windows) para gestión Docker

### ✅ **Seguridad y Configuración**

- Variables de entorno organizadas por capas arquitectónicas
- Archivos `.local.env` para configuraciones locales (en .gitignore)
- Configuración específica por entornos (desarrollo, producción, testing)
- Separación clara entre configuración pública y privada

&nbsp;

## 🔄 Flujo de Datos en la Arquitectura

```
1. HTTP Request → Controller (interfaces)
                     ↓
2. Controller → Use Case (core/use-cases)
                     ↓
3. Use Case → Repository Interface (core/domain)
                     ↓
4. Repository Implementation (infrastructure) → Database
                     ↓
5. Database → Repository → Use Case → Controller → HTTP Response
```

### **Ejemplo de Flujo Completo:**

```typescript
// 1. HTTP Request
POST /api/v1/users { name: "Juan", email: "juan@test.com" }

// 2. Controller recibe y valida
UserController.create(createUserDto: CreateUserDto)

// 3. Controller llama al caso de uso
userUseCases.create(createUserDto)

// 4. Caso de uso usa el repositorio
userRepository.create(userEntity)

// 5. Repositorio persiste en BD
typeOrmUserRepository.save(typeOrmEntity)

// 6. Respuesta de vuelta por las capas
HTTP 201 { id: 1, name: "Juan", email: "juan@test.com", isActive: true }
```

&nbsp;

## 🚀 Beneficios de la Arquitectura Actual

- ✅ **Testeable**: Fácil mocking de dependencias con interfaces
- ✅ **Mantenible**: Separación clara de responsabilidades por capas
- ✅ **Escalable**: Fácil agregar nuevos módulos siguiendo la misma estructura
- ✅ **Independiente**: Dominio sin dependencias de frameworks externos
- ✅ **SOLID**: Principios de diseño aplicados consistentemente
- ✅ **Flexible**: Fácil cambio de tecnologías de infraestructura
- ✅ **Documentado**: Código autodocumentado con Swagger/OpenAPI

&nbsp;

## 🛠️ Tecnologías

Para una lista completa y detallada de todas las tecnologías utilizadas con sus versiones exactas, consulta:

📖 **[Ver documentación completa de tecnologías](./technologies.md)**

**Resumen de las principales tecnologías:**

- **NestJS 11.1.5** - Framework principal
- **TypeScript 5.8.3** - Lenguaje de programación
- **Node.js 20.11.1** - Runtime de JavaScript
- **PostgreSQL 15+** - Base de datos
- **TypeORM 0.3.25** - ORM
- **Jest 29.7.0** - Testing framework
- **Docker** - Containerización

&nbsp;

## 📋 Comandos Útiles

### **Prerequisitos de Desarrollo**

Para trabajar con este proyecto necesitas:

```bash
# Node.js 20.11.1 (usar NVM recomendado)
# Windows: https://github.com/coreybutler/nvm-windows/releases
nvm install 20.11.1
nvm use 20.11.1

# Verificar versiones
node -v  # v20.11.1
npm -v   # 10.2.4
```

### **Comandos de Desarrollo**

```bash
# Desarrollo
npm run start:dev          # Servidor con watch mode
npm run start              # Servidor normal
npm run start:prod         # Servidor de producción

# Calidad de código
npm run build              # Construir proyecto
npm run lint               # Ejecutar linting
npm run format             # Formatear código
npm run typecheck          # Verificar tipos TypeScript

# Testing
npm test                   # Tests unitarios
npm run test:watch         # Tests en modo watch
npm run test:cov           # Tests con cobertura
npm run test:e2e           # Tests end-to-end

# Base de datos
npm run db:check           # Verificar conexión BD
npm run db:test            # Probar funcionalidad completa
```

&nbsp;

## 🌐 API Endpoints Disponibles

### **Aplicación Principal**

- `GET /api/v1` - Información de la API
- `GET /api/v1/health` - Estado de salud de la aplicación

### **Gestión de Usuarios**

- `GET /api/v1/users` - Listar todos los usuarios
- `GET /api/v1/users/:id` - Obtener usuario por ID
- `POST /api/v1/users` - Crear nuevo usuario
- `PUT /api/v1/users/:id` - Actualizar usuario existente
- `DELETE /api/v1/users/:id` - Eliminar usuario

### **Documentación**

- `GET /api/docs` - Swagger UI con documentación interactiva

&nbsp;

## 🔮 Próximos Módulos Planificados

```
src/core/
└── use-cases/
    ├── restaurant/          # Gestión de restaurantes
    ├── order/              # Gestión de pedidos
    ├── menu/               # Gestión de menús
    ├── auth/               # Autenticación y autorización
    └── notification/       # Sistema de notificaciones
```

Cada nuevo módulo seguirá la misma estructura de arquitectura hexagonal, manteniendo la consistencia y escalabilidad del proyecto.

## 🚀 Validación de la Nueva Estructura

### **1. Validar entorno de desarrollo**

```bash
docker-compose up -d    # Iniciar servicios de desarrollo
curl http://localhost:3000/health  # Verificar salud de los servicios
```

### **2. Ejecutar suite de tests**

```bash
npm test              # Ejecutar tests unitarios
npm run test:e2e      # Ejecutar tests end-to-end
npm run test:coverage # Tests con cobertura
```

### **3. Verificar entorno de producción**

```bash
docker-compose -f docker/compose/docker-compose.prod.yml up -d
curl http://localhost:3000/health  # Verificar salud de los servicios
```

### **4. Comandos de gestión Docker**

```bash
# Desarrollo
docker-compose logs -f        # Ver logs de desarrollo
docker-compose exec app bash  # Conectar al contenedor

# Producción
docker-compose -f docker/compose/docker-compose.prod.yml logs -f
docker-compose -f docker/compose/docker-compose.prod.yml exec app bash

# Utilidades
docker system prune -f        # Limpiar contenedores no utilizados
docker-compose down -v        # Reset completo (eliminar volúmenes)
```

## 📝 Archivos Principales de la Reorganización

- ✅ `package.json` - Scripts npm organizados
- ✅ `docker/compose/docker-compose.dev.yml` - Configuración desarrollo
- ✅ `docker/compose/docker-compose.prod.yml` - Configuración producción
- ✅ `docker/scripts/docker-manage.sh` - Script gestión Linux/macOS
- ✅ `docker/scripts/docker-manage.bat` - Script gestión Windows
- ✅ `config/environments/` - Variables de entorno consolidadas
- ✅ `.gitignore` - Organizado por capas arquitectónicas

&nbsp;

---

© 2025 Almuerzos Perú
