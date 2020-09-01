import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import Splash from './Splash';
import MainGame from './MainGame';
import EndGame from './EndGame';
import PlayerContext from '../context/PlayerContext';
import GoogleOAuth from './GoogleOAuth';

const App = () => {
  const [player, setPlayer] = useState({ name: '', index: undefined, room: '' });
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

  socket.on('adjustIndex', (judgeIndex) => {
    if (player.index > judgeIndex) {
      setPlayer((prevPlayer) => {
        return { name: prevPlayer.name, index: prevPlayer.index - 1 };
      });
    }
  });

  socket.on('endGame', (winner) => {
    setWinner(winner);
    setGameOn(false);
    setGameEnd(true);
  });

  const resetGame = () => {
    socket.emit('resetGame', player.room);
  };

  socket.on('resetGame', () => {
    window.location.href = '/';
  });

  let currentView;
  if (gameOn) {
    currentView = <MainGame />;
  } else if (gameEnd) {
    currentView = <EndGame winner={winner} />;
  } else {
    // currentView = <Splash />;
    // currentView = <GoogleOAuth />
  }

  return (
    <PlayerContext.Provider value={player}>
      <div>
        <div id="header">
          {gameOn && (
            <button id="reset" onClick={resetGame}>
              RESET GAME
            </button>
          )}
          <img
            id="logo"
            alt="logo"
            src="https://fontmeme.com/permalink/200812/494bb6ee41bd84762de732c77da6bd2f.png"
          />
          <h1>Gif(gif) OR Gif(jif) Edition!!</h1>
          {!gameOn && !gameEnd && <Splash />}
          {/* {!gameOn && !gameEnd && <GoogleOAuth />} */}
        </div>
        {currentView}
      </div>
    </PlayerContext.Provider>
  );
};

export default App;
