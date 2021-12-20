const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

// Set Static Folder
app.use(express.static(path.join(__dirname + '/public')));

//Run When Client Connects
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('New User Connected');

  //Run When Client Disconnects
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  //Run When Client Sends Message
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  //Run When Client Sends Message
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
