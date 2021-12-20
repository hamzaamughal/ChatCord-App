const chatForm = document.getElementById('chat-form');

const socket = io();

socket.on('chat', (message) => {
  console.log(message);
  outPutMessage(message);

  //Scroll down
  const chatMessages = document.querySelector('.chat-messages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
  const li = document.createElement('li');
  li.innerHTML = `<strong>${message.from}:</strong> ${message.text}`;
  document.querySelector('#messages').appendChild(li);
});

//Message Submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit('chat', msg);
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

//Output Message to DOM
function outPutMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
