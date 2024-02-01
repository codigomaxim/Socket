
Implementación Básica de Socket.io con Express
Este repositorio contiene una aplicación Node.js que utiliza Express y Socket.io para establecer una conexión básica de Socket.io y emitir un mensaje cuando un nuevo cliente se conecta al servidor.

Para la configuracion inicial:

Instala las dependencias: npm install
Inicia el servidor: node app.js
En el navegador visita: http://localhost:3000

Ejercicio 2: Comunicación Bidireccional con Socket.io
Ampliamos la conexión para permitir la comunicación bidireccional. Se ha implementado un evento en el cliente para enviar mensajes al servidor y otro en el servidor para retransmitir esos mensajes a todos los clientes.

Ejercicio 3: Sala de Chat con Socket.io
Ahora los clientes pueden ingresar un nombre de usuario y enviar mensajes que se mostrarán a todos los usuarios conectados.

Ejercicio 4: Seguimiento de Usuarios Conectados
Ahora, el servidor realiza un seguimiento de los usuarios conectados y envía la lista actualizada a todos los clientes cada vez que alguien se une o sale del chat.
Pueden conectarse varios clientes y se puede ver cómo la lista de usuarios conectados se actualiza automáticamente.

Ejercicio 5: Mensajes Privados con Socket.io
Se ha creado un evento para manejar los mensajes privados y se ha actualizado la interfaz del cliente para mostrarlos.
