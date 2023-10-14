# API de Usuarios y Administradores

![Estado del Proyecto](https://img.shields.io/badge/Estado-En%20Desarrollo-yellow)

Esta API te permite gestionar usuarios y administradores, permitiendo la autenticación, registro y gestión de usuarios. Proporciona una serie de endpoints que puedes utilizar para interactuar con la API de manera efectiva.

## Configuración Inicial

Sigue estos pasos para configurar y ejecutar la API en tu entorno local:

1. **Clonar el Repositorio:** Clona este repositorio en tu máquina local utilizando el siguiente comando:

   ```bash
   git clone https://github.com/juantoribiobaez/jwt-auth-api.git
   ```

2. **Instalar Dependencias:** Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno:** Crea un archivo `.env` en el directorio raíz del proyecto y configura las siguientes variables de entorno:

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

4. **Iniciar el Servidor:** Ejecuta el servidor utilizando el siguiente comando:

   ```bash
   npm start
   ```

## Endpoints

### Usuarios

1. **Registro de Usuario**

   - **Endpoint:** `/api/register`
   - **Método:** POST
   - **Body:**
     ```json
     {
         "username": "nombre_de_usuario",
         "password": "contraseña_del_usuario"
     }
     ```
   - **Respuesta:** Retorna el usuario registrado.

2. **Autenticación de Usuario**

   - **Endpoint:** `/api/login`
   - **Método:** POST
   - **Body:**
     ```json
     {
         "username": "nombre_de_usuario",
         "password": "contraseña_del_usuario"
     }
     ```
   - **Respuesta:** Si la autenticación es exitosa, retorna un token JWT.

3. **Información del Usuario Autenticado**

   - **Endpoint:** `/api/logincheck`
   - **Método:** GET
   - **Headers:** `Authorization: Bearer TU_TOKEN`
   - **Respuesta:** Retorna la información del usuario autenticado.

4. **Validar Conexión a la Base de Datos**

   - **Endpoint:** `/api/checkhealth`
   - **Método:** GET
   - **Respuesta:** Indica si la conexión a la base de datos es exitosa o no.

### Administradores

1. **Obtener todos los Usuarios**

   - **Endpoint:** `/api/admin/users`
   - **Método:** GET
   - **Headers:** `Authorization: Bearer TU_TOKEN_ADMIN`
   - **Respuesta:** Retorna una lista de todos los usuarios.

2. **Actualizar el Nombre de Usuario de un Usuario Específico**

   - **Endpoint:** `/api/users/:id/username`
   - **Método:** PUT
   - **Headers:** `Authorization: Bearer TU_TOKEN_ADMIN`
   - **Body:**
     ```json
     {
         "username": "nuevo_nombre_de_usuario"
     }
     ```
   - **Respuesta:** Retorna el usuario con el nombre actualizado.

3. **Actualizar la Contraseña de un Usuario Específico**

   - **Endpoint:** `/api/users/:id/password`
   - **Método:** PUT
   - **Headers:** `Authorization: Bearer TU_TOKEN_ADMIN`
   - **Body:**
     ```json
     {
         "newPassword": "nueva_contraseña",
         "confirmPassword": "confirmar_nueva_contraseña"
     }
     ```
   - **Respuesta:** Mensaje indicando que la contraseña ha sido actualizada con éxito.

4. **Actualizar el Rol de un Usuario Específico**

   - **Endpoint:** `/api/admin/users/:id/role`
   - **Método:** PUT
   - **Headers:** `Authorization: Bearer TU_TOKEN_ADMIN`
   - **Body:**
     ```json
     {
         "role": "nuevo_rol"
     }
     ```
   - **Respuesta:** Retorna el usuario con el rol actualizado.

5. **Eliminar un Usuario Específico**

   - **Endpoint:** `/api/admin/users/:id`
   - **Método:** DELETE
   - **Headers:** `Authorization: Bearer TU_TOKEN_ADMIN`
   - **Respuesta:** Mensaje indicando que el usuario ha sido eliminado con éxito.

## Ejemplos de Consultas con cURL

Aquí tienes ejemplos de cómo realizar algunas de las operaciones utilizando cURL:

1. **Registro de Usuario**

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"username": "juan", "password": "123456"}' http://localhost:8001/api/users/register
   ```

2. **Autenticación de Usuario**

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"username": "juan", "password": "123456"}' http://localhost:8001/api/users/login
   ```

3. **Obtener Información del Usuario Autenticado**

   ```bash
   curl -X GET -H "Authorization: Bearer TU_TOKEN" http://localhost:8001/api/users/logincheck
   ```

4. **Eliminar un Usuario**

   ```bash
   curl -X DELETE -H "Authorization: Bearer TU_TOKEN_ADMIN" http://localhost:8001/api/admin/users/ID_DEL_USUARIO
   ```


```
Asegúrate de personalizar esta plantilla según las necesidades específicas de tu proyecto, incluyendo detalles como la información de contacto y las instrucciones adicionales que puedan ser relevantes. Además, recuerda mantener tu README actualizado a medida que el proyecto evoluciona.
```