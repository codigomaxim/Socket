const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const usuariosConectados = {};

function enviarListaUsuarios() {
  io.emit('usuariosConectados', Object.values(usuariosConectados));
}

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  socket.on('ingresarUsuario', (usuario) => {
    usuariosConectados[socket.id] = usuario;
    enviarListaUsuarios();
    io.emit('mensajeSistema', `${usuario} se ha unido a la sala`);
  });

  socket.on('enviarMensaje', (mensaje) => {
    const usuario = usuariosConectados[socket.id];
    io.emit('mensaje', { usuario, mensaje });
  });

  socket.on('mensajePrivado', ({ destinatario, mensaje }) => {
    const remitente = usuariosConectados[socket.id];
    const destinatarioSocketId = Object.keys(usuariosConectados).find(
      (id) => usuariosConectados[id] === destinatario
    );

    if (destinatarioSocketId) {
      // Enviar el mensaje privado al destinatario
      io.to(destinatarioSocketId).emit('mensajePrivado', { remitente, mensaje });
      // También enviar el mensaje al remitente para que aparezca en su propia interfaz
      socket.emit('mensajePrivado', { remitente, mensaje });
    } else {
      // Informar al remitente que el destinatario no está conectado
      socket.emit('mensajeSistema', `El usuario ${destinatario} no está conectado.`);
    }
  });

  socket.on('disconnect', () => {
    const usuarioDesconectado = usuariosConectados[socket.id];
    delete usuariosConectados[socket.id];
    enviarListaUsuarios();
    io.emit('mensajeSistema', `${usuarioDesconectado} ha abandonado la sala`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
