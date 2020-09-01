const express = require('express');

const app = express();
const path = require('path');

const PORT = 3333;
const { createServer } = require('http');

const server = createServer(app);
const socketio = require('socket.io');

const io = socketio(server);
const superagent = require('superagent');
require('dotenv').config();

/**
 * handle parsing request body
 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

const { API_KEY } = process.env;

const rooms = {};

const tags = [
  'party',
  'awkward',
  'cringe',
  'funny',
  'embarrassed',
  'pets',
  'excited',
  'dancing',
  'crying',
  'scared',
];
let randomTag = Math.floor(Math.random() * tags.length);

// Run Socket
io.on('connection', (socket) => {
  // Welcome current user
  socket.emit('message', 'Welcome to What The Gif ?!');

  // Listen for the new player joining the game by inputing name on splash page
  socket.on('newPlayer', ({ room, name }) => {
    socket.join(room);

    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        roundInputs: [],
        currentJudgeIndex: 0,
        currGif: 'https://fontmeme.com/permalink/200828/63aa3360d314a150b1ec8ebf65a1f942.png',
      };
      superagent
        .get('api.giphy.com/v1/gifs/random')
        .query({
          api_key: API_KEY,
          tag: tags[randomTag],
        })
        .end((err, res) => {
          if (err) {
            return console.log('err', err);
          }
          rooms[room].currGif = res.body.data.image_url;
        });
    }

    const currRoom = rooms[room];

    // create new player and add them to array of players
    const player = { name, score: 0, socketid: socket.id };
    currRoom.players.push(player);

    // Tell the new player's front end to rerender App to game page
    socket.emit('startGame');

    // Update user info in front end with player's inputed name and array index location
    socket.emit('updateUser', { name: player.name, index: currRoom.players.length - 1, room });

    // Update score board for all users
    io.to(room).emit('updateScores', currRoom.players);

    // Tell all users who the judge is
    const currentJudge = currRoom.players[currRoom.currentJudgeIndex];
    io.to(room).emit('newJudge', {
      name: currentJudge.name,
      index: currRoom.currentJudgeIndex,
      currGif: currRoom.currGif,
    });
  });

  // Listen for user input for each game round
  socket.on('newInput', ({ room, userInput }) => {
    const currRoom = rooms[room];
    // store input into roundInputs
    currRoom.roundInputs.push(userInput);

    // Tell user's front end to wait for all other inputs
    socket.emit('waiting');

    // Check if all user inputs have been submitted
    if (currRoom.roundInputs.length === currRoom.players.length - 1) {
      io.to(room).emit('judgeTheRound', currRoom.roundInputs);
    }
  });

  // Listen for when a judge chooses a winner for the round
  socket.on('roundWinnerChosen', ({ room, winnerIndex, winningPhrase }) => {
    const currRoom = rooms[room];
    const winningPlayerObj = currRoom.players[winnerIndex];
    winningPlayerObj.score += 1;
    const winningPlayer = winningPlayerObj.name;

    // Inform all players who won the round
    const winningInput = {
      player: winningPlayer,
      winningPhrase,
    };
    io.to(room).emit('roundWinnerChosen', winningInput);

    // Update score board for all users
    io.to(room).emit('updateScores', currRoom.players);

    randomTag = Math.floor(Math.random() * tags.length);

    superagent
      .get('api.giphy.com/v1/gifs/random')
      .query({
        api_key: API_KEY,
        tag: tags[randomTag],
      })
      .end((err, res) => {
        if (err) {
          return console.log('err', err);
        }
        currRoom.currGif = res.body.data.image_url;
      });

    // Wait 10 seconds and set a new judge, or end game if winner reached 5 wins
    setTimeout(() => {
      if (winningPlayerObj.score >= 4) {
        io.to(room).emit('endGame', winningPlayer);
        delete rooms[room];
      } else {
        currRoom.roundInputs = [];
        currRoom.currentJudgeIndex += 1;
        if (currRoom.currentJudgeIndex > currRoom.players.length - 1) {
          currRoom.currentJudgeIndex = 0;
        }
        const currentJudge = currRoom.players[currRoom.currentJudgeIndex];
        io.to(room).emit('newJudge', {
          name: currentJudge.name,
          index: currRoom.currentJudgeIndex,
          currGif: currRoom.currGif,
        });
      }
    }, 5000);
  });

  // // Listen for when someone resets the game
  socket.on('resetGame', (room) => {
    delete rooms[room];
    io.to(room).emit('resetGame');
  });

  // Listen for when player leaves room
  socket.on('disconnect', () => {
    // reset game if one player leaves
    const roomNames = Object.keys(rooms);
    for (let i = 0; i < roomNames.length; i += 1) {
      const roomPlayers = rooms[roomNames[i]].players;
      for (let j = 0; j < roomPlayers.length; j += 1) {
        if (roomPlayers[j].socketid === socket.id) {
          delete rooms[roomNames[i]];
          io.to(roomNames[i]).emit('resetGame');
          return;
        }
      }
    }
  });
});

// route handler to respond with main app
app.use('/bundle.js', express.static(path.join(__dirname, '../dist/bundle.js')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`listening Server on ${PORT}`);
});
