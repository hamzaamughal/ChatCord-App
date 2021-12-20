const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);

// Set Static Folder
app.use(express.static(path.join(__dirname + '/public')));

const botName = 'ChatCord Bot';

//Run When Client Connects
const io = socketio(server);
io.on('connection', (socket) => {
  socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

  //Run When User Connects
  socket.broadcast.emit(
    'message',
    formatMessage(botName, 'A new user has joined the chat')
  );

  //Run When Client Disconnects
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  //Run When Client Sends Message
  socket.on('chat', (data) => {
    io.sockets.emit('chat', formatMessage('USER', data));
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
