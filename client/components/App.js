import React, { useState, useRef, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import { Route, Switch, Link } from 'react-router-dom';
import Splash from './Splash';
import MainGame from './MainGame';
import EndGame from './EndGame';

const App = () => {
  const [gameOn, setGameOn] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);

  const socket = useContext(SocketContext);

  socket.on('redirect', function (destination) {
    // console.log('we in here', destination);
    // window.location.href = destination;
    if (destination === '/game') {
      setGameOn(true);
    }
  });

  if (gameOn) {
    return <MainGame />;
  }
  if (gameEnd) {
    return <EndGame />;
  }
  return <Splash />;
}

export default App;
