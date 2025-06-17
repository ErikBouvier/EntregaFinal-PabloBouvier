# Backend Ecommerce

Este proyecto es un backend para una aplicación de ecommerce desarrollado con Node.js, Express y MongoDB. Proporciona funcionalidades esenciales para la gestión de usuarios, productos, carritos de compra y autenticación segura.

## Características

- **Gestión de usuarios:** CRUD completo para usuarios.
- **Autenticación y autorización:** Implementación de Passport y JWT.
- **Seguridad:** Encriptación de contraseñas con bcrypt.
- **Gestión de productos:** CRUD para productos.
- **Carrito de compras:** Funcionalidades para añadir productos y realizar compras.

## Requisitos

- **Node.js:** Versión 18 o superior.
- **MongoDB:** Base de datos local o en la nube (Atlas).

## Uso

- **Endpoints disponibles:**
  - `/api/sessions`: Registro y login de usuarios.
  - `/api/users`: Gestión de usuarios.
  - `/api/password`: Recuperación y actualización de contraseñas.
  - `/api/cart`: Gestión de carritos de compra.
  - `/api/products`: Gestión de productos.

## Actualizaciones recientes

- **Frontend básico:** Se agregó un archivo HTML para probar los endpoints principales desde el navegador.
- **Gestión de carritos:** Mejoras en la lógica de compra, incluyendo la actualización del stock de productos y la generación de tickets.
- **Autorización:** Middleware actualizado para restringir accesos según roles (`admin` y `user`).

## Endpoints principales

### Autenticación

- `POST /api/sessions/register`: Registro de usuarios.
- `POST /api/sessions/login`: Inicio de sesión.
- `GET /api/sessions/current`: Obtener información del usuario autenticado.

### Usuarios

- `GET /api/users`: Obtener todos los usuarios.
- `GET /api/users/:id`: Obtener un usuario por ID.
- `PUT /api/users/:id`: Actualizar un usuario (solo `admin`).
- `DELETE /api/users/:id`: Eliminar un usuario (solo `admin`).

### Productos

- `GET /api/products`: Obtener todos los productos.
- `POST /api/products`: Crear un producto (solo `admin`).
- `PUT /api/products/:id`: Actualizar un producto (solo `admin`).
- `DELETE /api/products/:id`: Eliminar un producto (solo `admin`).

### Carrito

- `GET /api/cart`: Obtener el carrito del usuario autenticado.
- `POST /api/cart`: Agregar productos al carrito.
- `POST /api/cart/:cid/purchase`: Finalizar compra y generar ticket.

### Contraseña

- `POST /api/password/forgot-password`: Enviar correo para recuperación de contraseña.
- `POST /api/password/reset-password`: Restablecer contraseña mediante un token.

## Cómo correr el proyecto

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```
2. **Instalar dependencias:**

   Navega al directorio del proyecto y ejecuta:

   ```bash
   npm install
   ```
3. **Configurar las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   PORT=8080
   MONGO_URL=mongodb://localhost:27017/preent1
   JWT_SECRET=MiClavePabloBouvier
   EMAIL_USER=tu_correo@gmail.com
   EMAIL_PASS=tu_contraseña
   ```

   Reemplaza `tu_correo@gmail.com` y `tu_contraseña` con tus credenciales reales.
4. **Iniciar el servidor:**

   Ejecuta el siguiente comando:

   ```bash
   npm run dev
   ```
5. **Probar los endpoints:**

   - Usa herramientas como Postman o el archivo `frontend.html` incluido en el proyecto para probar las funcionalidades.

---

**Nota:** Asegúrate de tener MongoDB ejecutándose en tu máquina o configurado en la nube (Atlas).

**Desarrollado por:** Pablo Bouvier
