# Pre Entrega 1 - Backend Ecommerce

Este proyecto implementa un backend de ecommerce en Node.js con Express y MongoDB. Incluye:

- CRUD de usuarios
- Autenticación y autorización con Passport y JWT
- Encriptación de contraseñas con bcrypt

## Requisitos

- Node.js (v18 o superior recomendado)
- MongoDB local o Atlas

## Instalación

1. Clona el repositorio.
2. Entra a la carpeta `Ecommerce`.
3. Ejecuta: npm install
4. Crea un archivo .env en la raiz con el contenido: 
    PORT=8080
    MONGO_URL=mongodb://localhost:27017/preent1
    JWT_SECRET=TuClaveSuperSecreta 

    (Cambia la clave!)
5. Inicia el servidor: npm run dev