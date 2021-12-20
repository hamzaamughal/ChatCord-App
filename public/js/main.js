const chatForm = document.getElementById('chat-form');

const socket = io();

//Message Submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit('chat', msg);
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});
