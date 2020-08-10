const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const { createServer } = require('http');
const server = createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

/**
 * handle parsing request body
 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Run Socket
io.on('connection', (socket) => {
  console.log('New ws Coonnection');
  // Welcome current user
  socket.emit('message', 'Wlcome to What The Gif ?!');
  // listen for msg from client
  socket.on('clientMsg', (msg) => {
    io.emit('message', formatMessage('USER', msg));
  });
});

// route handler to respond with main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`listening Server on ${PORT}`);
});
