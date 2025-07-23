# 📂 Estructura del Proyecto

Este documento describe la estructura del proyecto **Almuerzos Perú - Backend API** y explica el propósito de cada carpeta y archivo principal.

## 🌳 Árbol de Directorios

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

## 📁 Descripción de Carpetas

### `src/common`

Contiene interfaces y elementos compartidos entre diferentes partes del proyecto.

### `src/config`

Incluye configuraciones específicas del proyecto, como la configuración de la base de datos.

### `src/shared`

Contiene interceptores, middleware y otros elementos reutilizables.

### `src/modules`

Cada módulo representa un dominio específico del negocio. Por ejemplo, el módulo `users` gestiona todo lo relacionado con los usuarios.

#### Subcarpetas de un Módulo

- **`domain/`**: Contiene las entidades y reglas de negocio.
- **`application/`**: Implementa los casos de uso y DTOs.
- **`infrastructure/`**: Incluye controladores y repositorios.

### `src/scripts`

Scripts de utilidad para tareas específicas, como verificar la conexión a la base de datos o realizar pruebas.

## 🛠️ Otros Archivos Importantes

- `README.md`: Documentación principal del proyecto.
- `docker-compose.yml`: Configuración para levantar servicios con Docker.
- `jest.config.js`: Configuración de Jest para pruebas.
- `tsconfig.json`: Configuración de TypeScript.
