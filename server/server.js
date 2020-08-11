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

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));
const players = [];
// Run Socket
io.on('connection', (socket) => {
  console.log('New WS Connection LETS GO');
  // Welcome current user
  socket.emit('message', 'Welcome to What The Gif ?!');
  // listen for msg from client
  // socket.on('message', ({ name, message }) => {
  //   io.emit('message', { name, message });
  // });
  socket.on('newPlayer', (name) => {
    let player = {name: name, score: 0, socketid: socket.id};
    players.push(player);
    console.log(players)
    console.log(socket.id)
    socket.emit('redirect', '/game')
    io.emit('newJudge', players[0].socketid);
  })
});

// route handler to respond with main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`listening Server on ${PORT}`);
});
