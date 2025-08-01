# 📋 Changelog

## [Unreleased] - 2025-07-31

### 🚀 Nuevas funcionalidades

- **Configuración de entornos completa**: Implementación de archivos de configuración específicos para diferentes entornos:
  - `config/environments/development.env` - Configuración para desarrollo local
  - `config/environments/development.docker.env` - Configuración para desarrollo con Docker
  - `config/environments/production.env` - Configuración para producción
  - `config/environments/test.env` - Configuración para testing
- **Scripts de gestión Docker avanzados**:
  - Script multiplataforma `docker-manage.sh` (Linux/Mac) y `docker-manage.bat` (Windows)
  - Soporte para desarrollo y producción con Docker Compose
  - Comandos automatizados para build, start, stop, logs y cleanup
- **Configuración Docker optimizada**:
  - Separación de `Dockerfile.dev` y `Dockerfile.prod` en `docker/images/`
  - Docker Compose específicos: `docker-compose.dev.yml` y `docker-compose.prod.yml`
  - `.dockerignore` mejorado para optimizar el contexto de build
- **Unificación de autenticación social (Google y Facebook)**:
  - Lógica unificada para autenticación social usando Firebase como proveedor único
  - Método renombrado de `createUserFromGoogle` a `createUserFromFirebase`
  - Nueva ruta única `POST /auth/social` para autenticación con cualquier proveedor social
  - Controlador reorganizado para reflejar la estrategia social unificada

### 🔧 Actualizaciones

- Establecidos los requisitos del motor Node.js a >=20.11.0 y npm a >=10.0.0 en `package.json`.
- Firebase-admin degradado a la versión ^12.7.0.
- Reflect-metadata actualizado a la versión ^0.2.2.
- Actualizadas dependencias de desarrollo, incluyendo:
  - `@nestjs/cli`
  - `@nestjs/schematics`
- ESLint y paquetes relacionados actualizados a versiones recientes.
- TypeScript actualizado a la versión ^5.8.3.
- **Configuración mejorada de Fly.io**: Agregada configuración de build con Dockerfile específico en `fly.toml`

### 🐛 Correcciones

- Corregida la ruta de importación para `AuthenticationModule` en `app.module.ts`.
- Corregida la ruta de importación para `AppModule` en archivo de prueba E2E.
- Eliminado código duplicado entre las implementaciones de Google y Facebook.
- Corregidas validaciones específicas por proveedor en el caso de uso `CreateUserFromSocialProviderUseCase`.
- **Corregido error en hook de pre-commit**: Cambiado `npx run precommit` por `npm run precommit` en `.husky/pre-commit` para resolver error de módulo no encontrado.
- **Refactorización de scripts de base de datos**: Simplificada la conexión a la base de datos y testing de TypeORM en herramientas auxiliares.

### 🧪 Mejoras

- Mejoradas las pruebas del middleware del registrador con métodos de simulación adicionales.
- Simplificada la arquitectura de autenticación social al centralizar la lógica en una única ruta y método.
- Refactorizados los tests unitarios relacionados con autenticación social para reflejar los cambios en estructura y nombres.
- **Optimizado `.gitignore`**:
  - Removido `.nyc_output` (no se usa NYC para coverage, se usa Jest)
  - Removido `*.sublime-workspace` (no se usa Sublime Text)
  - Removido `.parcel-cache` (no se usa Parcel bundler)
  - Removido `.vercel` y `.netlify` (se usa Fly.io para deployment)
  - Agregadas nuevas exclusiones para archivos de configuración local
- **Documentación completa actualizada**:
  - **README.md**: Eliminada sección redundante "🚀 Quick Start con Docker", agregadas opciones para desarrollo en tiempo real con Docker, mejorada la estructura y claridad
  - **docs/architecture.md**: Actualizada para reflejar cambios en la estructura del proyecto y versiones
  - **docs/technologies.md**: Documentación ampliada con nuevas tecnologías y herramientas integradas
- **Reorganización de estructura de proyecto**:
  - Movimiento de archivos Docker a estructura organizada bajo `docker/`
  - Configuraciones de entorno centralizadas en `config/environments/`
  - Eliminación de archivos obsoletos como `.env.example` y `docker-compose.yml` raíz

## [1.1.3] - 2025-07-30

### ✨ Nuevas funcionalidades

- **Autenticación con Google y JWT**: Ahora los usuarios pueden registrarse o iniciar sesión utilizando su cuenta de Google mediante la nueva ruta `POST /auth/google`.  
  Además, se integró **JWT (NestJS)** para la emisión de tokens seguros tras la autenticación.

#### Detalles técnicos

- Se integró **Firebase Auth** para la validación de tokens de Google.
- Se implementó el módulo **JWT de NestJS** para generar tokens de acceso firmados.
- Se creó un nuevo caso de uso dedicado a la autenticación con Google y su repositorio correspondiente.
- Se añadieron tests unitarios para la lógica de autenticación y generación de tokens.

## [1.1.2] - 2025-07-27

### ✨ Nuevas funcionalidades

- **Gestión completa de usuarios con arquitectura hexagonal**: Implementación completa del módulo de usuarios siguiendo principios de Clean Architecture.
- **Casos de uso (Use Cases)**: Lógica de negocio centralizada para operaciones CRUD de usuarios.
- **Controlador REST**: API endpoints versionados para gestión de usuarios (`/api/v1/users`).
- **DTOs y validaciones**: Contratos de datos con validaciones automáticas usando class-validator.
- **Interfaces de dominio**: Definición clara de puertos y contratos para el dominio de usuarios.
- **Adaptador TypeORM**: Implementación del patrón Repository con TypeORM como adaptador de persistencia.
- **Suite de tests completa**: Tests unitarios para todas las capas (dominio, aplicación, infraestructura).

#### Detalles técnicos

- Se implementó el patrón Ports & Adapters para el módulo de usuarios.
- Se agregaron interfaces para abstraer dependencias externas (repositorios).
- Se crearon DTOs para entrada y salida de datos con validaciones robustas.
- Se implementaron casos de uso para cada operación: crear, leer, actualizar, eliminar usuarios.
- Se añadieron tests unitarios con mocks apropiados para cada capa.
- Se aplicaron principios SOLID y Dependency Inversion en toda la implementación.

## [1.1.1] - 2025-07-27

### 🐛 Fixes y Mejoras Técnicas

- **Reorganización de estructura de archivos**: `main.ts` movido de `src/app/main.ts` a `src/main.ts` (ubicación estándar de NestJS).
- **Corrección de importaciones**: Todas las rutas absolutas (`src/...`) cambiadas a rutas relativas para compatibilidad con tests y bundlers.
- **Tests unitarios completamente funcionales**: 61 tests pasando correctamente en 10 test suites.
- **Mejoras en configuración de mocks**: Tests de logger middleware optimizados con mocks apropiados.
- **Estabilidad de la aplicación**: Aplicación corriendo sin errores en `http://localhost:3000` con todos los endpoints funcionales.

#### Detalles técnicos

- Se corrigieron las importaciones en archivos de test: `user.entity.spec.ts`, `user.use-cases.spec.ts`, `user.controller.spec.ts`, `typeorm-user.repository.spec.ts`, `logger.middleware.spec.ts`.
- Se estandarizó el uso de rutas relativas en toda la base de código para mejor mantenibilidad.
- Se mejoró la configuración de Jest para el manejo de módulos y mocks.

## [1.1.0] - 2025-07-24

### 🚀 Nuevas funcionalidades y mejoras

- Upgrade a **NestJS 11** y actualización de dependencias principales.
- Integración de **Swagger/OpenAPI** para documentación interactiva de la API (`/api/docs`).
- Refactor y mejoras en **Dockerfile** y configuración de despliegue (`fly.toml`).
- Mejoras en la configuración de **CORS** para soportar múltiples orígenes frontend.
- Integración y refactor de **Winston** como logger centralizado, con formateo personalizado y soporte para logs en archivos y consola.
- Mejoras en la estructura y scripts de base de datos.
- Integración de **SonarCloud** y mejoras en la configuración de calidad de código.
- Mejoras en los hooks de pre-commit y CI (test:ci, lint-staged, commitlint).
- Documentación ampliada: detalles de CORS, logging, estructura, ejemplos de uso y despliegue.
- Fixes y ajustes menores en configuración, scripts y documentación.

#### Detalles técnicos

- Se reorganizó la estructura de test y configuración para mayor claridad y mantenibilidad.
- Se mejoró la cobertura de tests y el manejo de errores en operaciones de base de datos y usuarios.
- Se ajustaron los scripts de Docker y CI para mayor robustez y compatibilidad.

## [1.0.1] - 2025-07-21

### 🛠️ Mejoras y Ajustes

- Migración completa a **Arquitectura Hexagonal (Ports & Adapters)** en código y documentación.
- **Biome** adoptado como herramienta principal de linting y formato, reemplazando ESLint/Prettier en scripts y configuración.
- Scripts de Biome y tooling actualizados para compatibilidad total en **Windows y Linux**.
- Documentación de arquitectura y estructura de carpetas mejorada y alineada con la nueva arquitectura.
- Se mantiene la cobertura de tests y la calidad de código (unitarios, typecheck, validaciones, polyfills).
- Roadmap y próximas versiones actualizados en la documentación y changelog.

#### Detalles técnicos

- Se refactorizó la estructura de `src/` para reflejar los principios de Ports & Adapters.
- Se actualizaron los scripts de pre-commit y release para usar Biome y comandos multiplataforma.
- Se mejoró la documentación de uso de CORS, variables de entorno y despliegue en Docker/Fly.io.
- Se revisaron y mejoraron los ejemplos de uso, formato de respuesta y manejo de errores en la API.

#### Roadmap actualizado

- Próximos módulos: Restaurantes, Pedidos, Autenticación JWT, Menús, Notificaciones.
- Mejoras técnicas: CI/CD con GitHub Actions, logging centralizado con Winston, métricas con Prometheus, documentación Swagger/OpenAPI.
- Futuro: Microservicios, geolocalización, integración con pagos, dashboard administrativo, sistema de reviews.

## [1.0.0] - 2025-07-21 🎉

### 🚀 Primera Versión Estable

#### Arquitectura

- ✅ Clean Architecture implementada completamente
- ✅ Estructura modular escalable
- ✅ Separación en 3 capas (Domain, Application, Infrastructure)
- ✅ Dependency Inversion Pattern aplicado
- ✅ Repository Pattern implementado

#### API REST

- ✅ Versionado de API (v1)
- ✅ Prefijo global `/api`
- ✅ Validaciones con class-validator
- ✅ Transformación automática de tipos
- ✅ Interceptor global para respuestas consistentes
- ✅ Middleware de logging HTTP
- ✅ Manejo de errores robusto
- ✅ CORS configurado

#### Base de Datos

- ✅ Conexión a PostgreSQL (AWS RDS)
- ✅ Configuración de TypeORM
- ✅ Soporte para SSL
- ✅ Scripts de verificación de conexión
- ✅ Auto-carga de entidades

#### Módulo Users

- ✅ Entidad de dominio con reglas de negocio
- ✅ Repository pattern con interfaces
- ✅ Casos de uso (Use Cases) implementados
- ✅ API REST completa (CRUD)
- ✅ DTOs con validaciones completas
- ✅ Tests unitarios implementados
- ✅ Manejo de errores HTTP específicos

#### Calidad de Código

- ✅ ESLint + Prettier configurado
- ✅ TypeScript strict mode
- ✅ Tests unitarios con Jest
- ✅ Scripts de formateo y linting
- ✅ Validación de tipos (typecheck)
- ✅ Polyfill para crypto en Node.js

#### DevOps y Deployment

- ✅ Dockerfile multi-stage optimizado
- ✅ docker-compose para desarrollo
- ✅ .dockerignore configurado
- ✅ Variables de entorno completas
- ✅ Scripts de pre-commit
- ✅ Configuración de producción

#### Documentación

- ✅ README completo con guías
- ✅ Documentación de arquitectura (ARCHITECTURE.md)
- ✅ Ejemplos de uso y configuración
- ✅ Guías de instalación y desarrollo
- ✅ Changelog detallado

### 📊 Métricas de la Versión 1.0.0

- **Endpoints API:** 6 (Users CRUD + Health)
- **Cobertura de Tests:** Módulo Users completamente testeado
- **Documentación:** 100% completa
- **Arquitectura:** Clean Architecture ✅
- **Docker Ready:** ✅
- **Production Ready:** ✅

---

## [Unreleased] - Próximas Versiones

### 🔄 En Desarrollo

#### Próximas Funcionalidades v1.1.0

- [ ] Módulo de Restaurantes
- [ ] Módulo de Pedidos (Orders)
- [ ] Sistema de Autenticación JWT
- [ ] Módulo de Menús y Categorías
- [ ] Sistema de Notificaciones

#### Mejoras Técnicas v1.2.0

- [ ] Pipeline CI/CD con GitHub Actions
- [ ] Rate limiting y throttling
- [ ] Logging centralizado con Winston
- [ ] Health checks avanzados
- [ ] Métricas con Prometheus
- [ ] Documentación API con Swagger/OpenAPI

#### Funcionalidades Avanzadas v2.0.0

- [ ] Sistema de Geolocalización
- [ ] Integración con pasarelas de pago
- [ ] Sistema de Reviews y Rating
- [ ] Dashboard de administración
- [ ] Microservicios architecture
