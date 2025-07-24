# 🏗️ Clean Architecture + Modular Structure

## 📁 Estructura del Proyecto

```
src/
├── 📁 common/              # Elementos compartidos entre módulos
├── 📁 config/              # Configuraciones globales
├── 📁 shared/              # DTOs, interfaces, utils compartidos
└── 📁 modules/             # Módulos de dominio (Clean Architecture)
    └── 📁 users/           # Módulo Users
        ├── 📁 domain/          # 🟢 Capa de Dominio
        │   ├── user.entity.ts                    # Entidad de dominio
        │   └── user.repository.interface.ts      # Puerto del repositorio
        ├── 📁 application/     # 🔵 Capa de Aplicación
        │   ├── dto/
        │   │   └── user.dto.ts                   # DTOs
        │   └── users.use-cases.ts                # Casos de uso
        └── 📁 infrastructure/ # 🟡 Capa de Infraestructura
            ├── controllers/
            │   └── users.controller.ts           # Controlador REST
            ├── entities/
            │   └── user.entity.ts               # Entidad TypeORM
            └── repositories/
                └── typeorm-user.repository.ts   # Implementación del repositorio
```

&nbsp;

## 🎯 Principios Aplicados

### **🟢 Domain Layer (Dominio)**

- **Entidades:** Reglas de negocio puras
- **Interfaces:** Puertos para comunicación externa
- **Sin dependencias:** No conoce capas externas

### **🔵 Application Layer (Aplicación)**

- **Casos de Uso:** Orquestación de la lógica de negocio
- **DTOs:** Contratos de datos
- **Inyección de dependencias:** Usa interfaces del dominio

### **🟡 Infrastructure Layer (Infraestructura)**

- **Controllers:** Entrada HTTP
- **Repositories:** Persistencia de datos
- **Entities:** Mapping con base de datos

&nbsp;

## 🔄 Flujo de Datos

```
HTTP Request → Controller → Use Case → Repository → Database
                   ↓           ↓          ↓
                  DTO    Domain Entity  TypeORM Entity
```

&nbsp;

## 🚀 Beneficios

- ✅ **Testeable:** Fácil mocking de dependencias
- ✅ **Mantenible:** Separación clara de responsabilidades
- ✅ **Escalable:** Fácil agregar nuevos módulos
- ✅ **Independiente:** Dominio sin dependencias externas
- ✅ **SOLID:** Principios de diseño aplicados

&nbsp;

## 📋 Comandos Útiles

```bash
# Verificar conexión BD
npm run db:check

# Probar funcionalidad completa
npm run db:test

# Iniciar servidor desarrollo
npm run start:dev

# Construir proyecto
npm run build
```

&nbsp;

## 🔧 Endpoints Disponibles

- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario
- `POST /users` - Crear usuario
- `PUT /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

&nbsp;

---

© 2025 Almuerzos Perú
