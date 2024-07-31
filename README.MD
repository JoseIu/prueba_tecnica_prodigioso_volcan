# Prueba técnica Prodigioso Volcán

## Tecnologías: React, JS, TS, SASS, Node.js, Express, MongoDB, Docker

1. Configura el archivo `.env`, elimina el `.example` del `.env.example` y reemplázalo con los datos proporcionados por email: `VITE_ID_CLIENT`, `CLIENT_ID` y `CLIENT_SECRET`.

2. Ejecuta `docker-compose up -d`.

3. Espera 10 segundos hasta que el backend se levante y se conecte a MongoDB.

4. Entra en [http://localhost:9778](http://localhost:9778).

# Descripción de la tarea

Esta aplicación cuenta con 2 formas de autenticarse por Google:

- La primera consiste en obtener el token desde la parte del cliente y enviarlo a la API para obtener los datos necesarios y guardarlos en la base de datos.
- La segunda consiste en obtener un código desde la parte del cliente y enviarlo a la API. Una vez la API obtiene el código, se encarga de hacer la petición a Google para obtener el token y extraer los datos necesarios para guardarlos en la base de datos.
