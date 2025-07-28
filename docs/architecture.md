# 🏗️ Arquitectura Hexagonal (Ports & Adapters) + Clean Architecture

## 📁 Estructura del Proyecto Actual

```
src/
├── � main.ts                      # Punto de entrada de la aplicación
├── 📁 app/                         # Configuración de la aplicación
│   └── app.module.ts               # Módulo principal de NestJS
├── 📁 common/                      # Elementos compartidos entre módulos
│   ├── formatters/                 # Formateadores de datos
│   ├── interceptors/               # Interceptores globales (respuestas HTTP)
│   ├── middleware/                 # Middleware HTTP (logging)
│   └── polyfills/                  # Polyfills para compatibilidad
├── 📁 core/                        # 🟢 CAPA DE DOMINIO
│   ├── domain/                     # Entidades y reglas de negocio
│   │   └── repositories/           # Interfaces de repositorios (puertos)
│   │       └── user/
│   │           ├── user.entity.ts              # Entidad de dominio pura
│   │           └── user.repository.interface.ts # Puerto del repositorio
│   ├── services/                   # Servicios de dominio
│   │   └── HealthService.service.ts # Servicio de salud de la aplicación
│   └── use-cases/                  # 🔵 CAPA DE APLICACIÓN - Casos de uso
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

&nbsp;

## 🎯 Principios de Arquitectura Hexagonal Aplicados

### **🟢 Capa de Dominio (Core)**

#### **Entidades de Dominio** (`core/domain/`)

- **Propósito**: Representan conceptos del negocio con sus reglas y comportamientos
- **Características**:
  - Sin dependencias externas
  - Contienen lógica de negocio pura
  - Inmutables cuando es posible
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
- **Ejemplo**: `UserController` expone endpoints REST para gestión de usuarios

#### **DTOs** (`interfaces/dto/`)

- **Propósito**: Contratos de datos para comunicación externa
- **Características**:
  - Validaciones con class-validator
  - Transformaciones automáticas
  - Documentación con Swagger

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

## � Tecnologías y Herramientas

### **Framework y Core**

- **NestJS 11**: Framework principal con decoradores y DI
- **TypeScript**: Tipado estático y características avanzadas
- **Class-validator**: Validaciones automáticas en DTOs

### **Base de Datos**

- **PostgreSQL**: Base de datos principal (AWS RDS)
- **TypeORM**: ORM para mapeo objeto-relacional
- **Migrations**: Control de versiones de base de datos

### **Calidad y Testing**

- **Jest**: Framework de testing unitario
- **ESLint + Prettier**: Linting y formateo de código
- **Husky**: Hooks de pre-commit para calidad
- **SonarCloud**: Análisis de calidad de código

### **DevOps y Deployment**

- **Docker**: Containerización de la aplicación
- **Fly.io**: Plataforma de deployment
- **Winston**: Sistema de logging avanzado
- **Swagger/OpenAPI**: Documentación de API

&nbsp;

## 📋 Comandos Útiles

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

&nbsp;

---

© 2025 Almuerzos Perú
