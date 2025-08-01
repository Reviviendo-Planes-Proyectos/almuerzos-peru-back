# 🛠️ Tecnologías Utilizadas

Este documento detalla las tecnologías utilizadas en el proyecto **Almuerzos Perú - Backend API v1.0.0**.

## 📋 Versiones Exactas Utilizadas

### 📚 Lenguajes y Runtime

- **Node.js**: 20.11.1 - Entorno de ejecución para JavaScript en el backend
- **npm**: 10.2.4 - Gestor de paquetes de Node.js
- **TypeScript**: 5.8.3 - Lenguaje de programación tipado que compila a JavaScript

### 🔧 Framework Principal

- **NestJS**: 11.1.5 - Framework para construir aplicaciones Node.js escalables y mantenibles
- **Express**: Integrado con NestJS - Servidor HTTP subyacente

### 🗄️ Base de Datos y ORM

- **PostgreSQL**: 15+ - Base de datos relacional utilizada para almacenar datos
- **TypeORM**: 0.3.25 - ORM para interactuar con la base de datos de manera eficiente
- **pg**: 8.16.3 - Driver de PostgreSQL para Node.js

### 🔐 Autenticación y Seguridad

- **Firebase Admin SDK**: 12.7.0 - Autenticación y servicios de Firebase
- **JWT**: 11.0.0 - Manejo de tokens JSON Web Token
- **Class-validator**: 0.14.2 - Biblioteca para validaciones automáticas en DTOs
- **Class-transformer**: 0.5.1 - Transformación de objetos y DTOs

### 📝 Documentación y API

- **Swagger/OpenAPI**: 11.2.0 - Documentación interactiva de la API
- **Swagger UI Express**: 5.0.1 - Interfaz web para Swagger

### 📊 Logging y Monitoring

- **Winston**: 3.17.0 - Biblioteca para logging configurable
- **Morgan**: 1.10.0 - Middleware de logging HTTP

### 🧪 Testing

- **Jest**: 29.7.0 - Framework de testing para JavaScript/TypeScript
- **Supertest**: 7.0.0 - Biblioteca para testing de APIs HTTP

### 🔧 Herramientas de Desarrollo

- **ESLint**: 8.57.1 - Analizador de código para detectar problemas de sintaxis y estilo
- **Prettier**: 3.4.2 - Formateador de código automático
- **Nodemon**: 3.1.12 - Utilidad para reinicio automático durante desarrollo
- **ts-node**: 10.10.0 - Ejecutor de TypeScript para desarrollo

### 🐳 Contenedores y DevOps

- **Docker**: Herramienta para crear y administrar contenedores
- **Docker Compose**: Orquestador para levantar múltiples servicios en contenedores
- **Fly.io**: Plataforma de despliegue en la nube
- **PostgreSQL 15-alpine**: Base de datos en contenedor optimizado

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Hexagonal (Clean Architecture)** con las siguientes capas:

### 📦 Estructura por Capas

#### 🟢 Capa de Aplicación (`src/app/`)

- **Módulos de Funcionalidad**: Organizados por dominio (authentication, etc.)
- **Configuración Global**: app.module.ts como punto de entrada

#### 🔵 Capa de Dominio (`src/core/`)

- **Entidades de Dominio**: Models y DTOs del negocio
- **Casos de Uso**: Lógica de negocio pura y reutilizable
- **Repositorios**: Interfaces para acceso a datos
- **Servicios de Dominio**: Servicios específicos del negocio

#### 🟡 Capa de Infraestructura (`src/infrastructure/`)

- **Configuración de Base de Datos**: TypeORM y entidades
- **Servicios Externos**: Firebase, APIs de terceros
- **Configuración de Logging**: Winston y formatters

#### 🔴 Capa de Interfaces (`src/interfaces/`)

- **Controladores REST**: Endpoints de la API
- **DTOs**: Objetos de transferencia de datos
- **Middleware**: Interceptors, guards, pipes

#### 🛠️ Capa Común (`src/common/`)

- **Utilidades Compartidas**: Helpers, formatters, polyfills
- **Configuración Transversal**: JWT, Firebase, interceptors

## 🌐 Configuración de Entornos

### Estructura de Variables

Las variables de entorno están organizadas por capa arquitectónica en `config/environments/`:

```
config/
└── environments/
    ├── README.md              # Documentación completa
    ├── development.env        # Variables de desarrollo
    ├── production.env         # Template de producción
    ├── test.env              # Variables de testing
    └── *.local.env           # Archivos locales (no versionados)
```

### Variables por Capa

- **🟢 Aplicación**: `NODE_ENV`, `PORT`, `LOG_LEVEL`, `JWT_SECRET`
- **🔵 Infraestructura**: `DB_*`, `LOG_*`, configuraciones de servicios externos
- **🟡 Interfaces**: `FRONTEND_URL`, configuración de CORS y Swagger

## 📚 Características Principales

### ✅ Funcionalidades Implementadas

- **Autenticación JWT**: Sistema completo de login y autorización
- **Base de Datos**: Configuración con PostgreSQL y TypeORM
- **Documentación API**: Swagger/OpenAPI automático
- **Logging Centralizado**: Winston con formatters personalizados
- **Testing**: Jest configurado para unit y e2e tests
- **Linting y Formateo**: ESLint + Prettier
- **Dockerización**: Entornos de desarrollo y producción
- **Health Checks**: Endpoints de monitoreo

### 🔄 Flujo de Desarrollo

1. **Desarrollo Local**: Node.js + npm con hot-reload
2. **Desarrollo Docker**: Docker Compose con PostgreSQL
3. **Testing**: Jest con coverage reports
4. **Build**: Compilación TypeScript optimizada
5. **Producción**: Docker + PostgreSQL

## 🚀 Comandos Principales

```bash
# Desarrollo local
npm run start:dev

# Docker
npm run docker:dev

# Testing
npm run test

# Linting
npm run lint
```

## 📋 Estado del Proyecto

- ✅ **Configuración Base**: NestJS + TypeScript + PostgreSQL
- ✅ **Autenticación**: Firebase + JWT implementado
- ✅ **Documentación**: Swagger funcionando
- ✅ **Testing**: Jest configurado
- ✅ **Docker**: Desarrollo y producción
- ✅ **Logging**: Winston centralizado
- ✅ **Arquitectura**: Hexagonal implementada
- 🔄 **En Desarrollo**: Módulos de negocio específicos
