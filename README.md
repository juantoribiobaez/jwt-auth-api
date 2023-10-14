
# JSON Web Token Auth API

Breve descripción de lo que hace tu API.

## 🚀 Comenzando

Estas instrucciones te proporcionarán una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### 📋 Pre-requisitos

- Node.js v14.x.x o superior
- PostgreSQL v12.x.x o superior
- npm v6.x.x o superior

### 🔧 Instalación

1. Clona el repositorio a tu máquina local.
```bash
git clone https://github.com/juantoribiobaez/jwt-auth-api.git
```

2. Instala las dependencias.
```bash
cd jwt-auth-api
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias (por ejemplo, la clave secreta, las credenciales de la base de datos, etc.).

4. Ejecuta el servidor.
```bash
npm start
```

## 📦 Endpoints

### 1. Registro de Usuario

**Endpoint:** `/users`

**Método:** POST

**Cuerpo de la solicitud (Body):**
```json
{
    "username": "nombre_de_usuario",
    "password": "contraseña_del_usuario"
}
```

**Respuesta:** Retorna el usuario registrado.

### 2. Autenticación de Usuario

**Endpoint:** `/users/login`

**Método:** POST

**Cuerpo de la solicitud (Body):**
```json
{
    "username": "nombre_de_usuario",
    "password": "contraseña_del_usuario"
}
```

**Respuesta:** Si la autenticación es exitosa, retorna un token JWT.

### 3. Obtener Información del Usuario Autenticado

**Endpoint:** `/users/me`

**Método:** GET

**Headers:** Debes incluir el token JWT en los headers bajo la clave `authorization`.

**Respuesta:** Retorna la información del usuario autenticado.

### 4. Validar Conexión a la Base de Datos

**Endpoint:** `/checkhealth`

**Método:** GET

**Respuesta:** Indica si la conexión a la base de datos es exitosa o no.

## 🛠️ Herramientas de Desarrollo

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [bcrypt](https://www.npmjs.com/package/bcrypt)

## 📌 Versionado

Recomendamos que uses [SemVer](http://semver.org/) para el versionado.

## 📄 Licencia

Este proyecto está bajo la Licencia (Tu Licencia) - mira el archivo [LICENSE.md](LICENSE.md) para detalles.

---

Puedes copiar y pegar el contenido anterior en tu archivo `README.md` y hacer las modificaciones necesarias para adaptarlo a tu proyecto. ¡Espero que te sea útil! Si tienes alguna otra pregunta o inquietud, no dudes en hacérmelo saber.