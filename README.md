# API de Usuarios y Administradores

## Descripción

Esta API proporciona una plataforma robusta para gestionar usuarios y administradores. Permite operaciones tales como autenticación, registro, modificación de detalles del usuario y administración de usuarios.

---

## Tabla de Contenido

- [API de Usuarios y Administradores](#api-de-usuarios-y-administradores)
  - [Descripción](#descripción)
  - [Tabla de Contenido](#tabla-de-contenido)
  - [Configuración Inicial](#configuración-inicial)
    - [1. Clonar el Repositorio](#1-clonar-el-repositorio)
    - [2. Instalar Dependencias](#2-instalar-dependencias)
    - [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
    - [4. Iniciar el Servidor](#4-iniciar-el-servidor)
  - [Endpoints](#endpoints)
    - [Usuarios](#usuarios)
    - [Administradores](#administradores)
  - [Ejemplos de Consultas con curl](#ejemplos-de-consultas-con-curl)

---

## Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/juantoribiobaez/jwt-auth-api.git
```

### 2. Instalar Dependencias

```bash
cd jwt-auth-api
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en el directorio raíz y establece las siguientes variables:

```env
SECRET_KEY=
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
APP_PORT=
APP_IP_ADDRESS=
```

### 4. Iniciar el Servidor

```bash
npm start
```

---

## Endpoints

### Usuarios

**1. Registro de Usuario**  
   `POST` `/api/register`

**2. Autenticación de Usuario**  
   `POST` `/api/login`

**3. Información del Usuario Autenticado**  
   `GET` `/api/logincheck`

**4. Validar Conexión a la Base de Datos**  
   `GET` `/api/checkhealth`

### Administradores

**1. Obtener Todos los Usuarios**  
   `GET` `/api/admin/users`

**2. Actualizar el Nombre de Usuario**  
   `PUT` `/api/users/:id/username`

**3. Actualizar la Contraseña de un Usuario**  
   `PUT` `/api/users/:id/password`

**4. Actualizar el Rol de un Usuario**  
   `PUT` `/api/admin/users/:id/role`

**5. Eliminar un Usuario**  
   `DELETE` `/api/admin/users/:id`

---

## Ejemplos de Consultas con curl

**1. Registro de Usuario**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "juan", "password": "123456"}' http://localhost:8001/api/register
```

**2. Autenticación de Usuario**

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "juan", "password": "123456"}' http://localhost:8001/api/login
```

**3. Obtener Información del Usuario Autenticado**

```bash
curl -X GET -H "Authorization: Bearer TU_TOKEN" http://localhost:8001/api/logincheck
```

**4. Eliminar un Usuario**

```bash
curl -X DELETE -H "Authorization: Bearer TU_TOKEN_ADMIN" http://localhost:8001/api/admin/users/ID_DEL_USUARIO
```

---

_Este proyecto está en desarrollo activo. Si tienes alguna sugerencia o encuentras algún problema, no dudes en abrir un issue o enviar un pull request._

---