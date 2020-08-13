import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import Splash from './Splash';
import MainGame from './MainGame';
import EndGame from './EndGame';
import PlayerContext from '../context/PlayerContext';
import GoogleOAuth from './GoogleOAuth';

const App = () => {
  const [player, setPlayer] = useState({ name: '', index: undefined });
  const [gameOn, setGameOn] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [winner, setWinner] = useState('');

  const socket = useContext(SocketContext);

  socket.on('startGame', () => {
    setGameOn(true);
  });

  socket.on('updateUser', (playerInfo) => {
    setPlayer({ ...playerInfo });
  });
  //socket.emit('updateUser', { name: player.name, index: players.length - 1 });
  socket.on('endGame', (winner) => {
    setWinner(winner);
    setGameOn(false);
    setGameEnd(true);
  });

  let currentView;
  if (gameOn) {
    currentView = (
      <div>
        <img
          alt="logo"
          src="https://fontmeme.com/permalink/200812/494bb6ee41bd84762de732c77da6bd2f.png"
          width="80%"
        />
        <MainGame />
      </div>
    );
  } else if (gameEnd) {
    currentView = <EndGame winner={winner} />;
  } else {
    // currentView = <Splash />;
    currentView = <GoogleOAuth />;
  }

  return (
    <PlayerContext.Provider value={player}>
      <div>{currentView}</div>
    </PlayerContext.Provider>
  );
};

export default App;
