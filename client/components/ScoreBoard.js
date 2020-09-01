import React, { useState, useContext } from 'react';
import UserScore from './UserScore';
import SocketContext from '../context/SocketContext';

const ScoreBoard = () => {
  const socket = useContext(SocketContext);
  const [playersScores, setPlayersScores] = useState([]);

  socket.on('updateScores', (players) => {
    setPlayersScores(players);
  });

  const userScores = [];
  for (let i = 0; i < playersScores.length; i += 1) {
    const player = playersScores[i];
    userScores.push(
      <UserScore key={`UserName-${i}`} userName={player.name} userScore={player.score} />
    );
  }

  return (
    <div id="scoreboard">
      <h3 className="green">Scoreboard</h3>
      {userScores}
    </div>
  );
};

export default ScoreBoard;
