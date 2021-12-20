const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin } = require('./utils/users');

const app = express();
const server = http.createServer(app);

// Set Static Folder
app.use(express.static(path.join(__dirname + '/public')));

const botName = 'ChatCord Bot';

//Run When Client Connects
const io = socketio(server);
io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    //Join Chatroom
    socket.join(user.room);

    //Welcome Message
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    //Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );
  });

  //Run When Client Sends Message
  socket.on('chat', (data) => {
    io.sockets.emit('chat', formatMessage('USER', data));
  });

  //Run When Client Disconnects
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
