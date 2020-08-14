const express = require('express');

const app = express();
const path = require('path');

const PORT = 3333;
const { createServer } = require('http');

const server = createServer(app);
const socketio = require('socket.io');

const io = socketio(server);
const superagent = require('superagent');
const dotenv = require('dotenv').config();

/**
 * handle parsing request body
 */
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

const { API_KEY } = process.env;

let players = [];
let roundInputs = [];
let currentJudgeIndex = 0;
let currGif = '';

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
    currGif = res.body.data.image_url;
  });

// Run Socket
io.on('connection', (socket) => {

  // Welcome current user
  socket.emit('message', 'Welcome to What The Gif ?!');

  // Listen for the new player joining the game by inputing name on splash page
  socket.on('newPlayer', (name) => {
    // create new player and add them to array of players
    const player = { name, score: 0 };
    players.push(player);

    // Tell the new player's front end to rerender App to game page
    socket.emit('startGame');

    // Update user info in front end with player's inputed name and array index location
    socket.emit('updateUser', { name: player.name, index: players.length - 1 });

    // Update score board for all users
    io.emit('updateScores', players);

    // Tell all users who the judge is
    const currentJudge = players[currentJudgeIndex];
    io.emit('newJudge', {
      name: currentJudge.name,
      index: currentJudgeIndex,
      currGif,
    });
  });

  // Listen for user input for each game round
  socket.on('newInput', (userInput) => {
    // store input into roundInputs
    roundInputs.push(userInput);
    
    // Tell user's front end to wait for all other inputs
    socket.emit('waiting');

    // Check if all user inputs have been submitted
    if (roundInputs.length === players.length - 1) {
      io.emit('judgeTheRound', roundInputs);
    }
  });

  // Listen for when a judge chooses a winner for the round
  socket.on('roundWinnerChosen', (roundWinner) => {
    const winningPlayerObj = players[roundWinner.winnerIndex];
    winningPlayerObj.score += 1;
    const winningPlayer = winningPlayerObj.name;

    // Inform all players who won the round
    const winningInput = {
      player: winningPlayer,
      winningPhrase: roundWinner.winningPhrase,
    };
    io.emit('roundWinnerChosen', winningInput);

    // Update score board for all users
    io.emit('updateScores', players);

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
        currGif = res.body.data.image_url;
      });

    // Wait 10 seconds and set a new judge, or end game if winner reached 5 wins
    setTimeout(() => {
      if (winningPlayerObj.score >= 2) {
        io.emit('endGame', winningPlayer);
        players = [];
        roundInputs = [];
        currentJudgeIndex = 0;
      } else {
        roundInputs = [];
        currentJudgeIndex += 1;
        if (currentJudgeIndex > players.length - 1) currentJudgeIndex = 0;
        const currentJudge = players[currentJudgeIndex];
        io.emit('newJudge', {
          name: currentJudge.name,
          index: currentJudgeIndex,
          currGif,
        });
      }
    }, 5000);
  });
});

if (process.env.NODE_ENV) {
  // route handler to respond with main app
  app.use('/bundle.js', express.static(path.join(__dirname, '../dist/bundle.js')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`listening Server on ${PORT}`);
});
