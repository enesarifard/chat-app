const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3001;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

//server (emit) -> client (receive) - countUpdated
//client (emit) -> server (recieve) - increment

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.emit('message', 'welcome');

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });
});
server.listen(port, () => {
  console.log(`Server is running on port ${port} ...`);
});
