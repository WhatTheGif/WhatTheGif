import React, { useContext } from 'react';
import SocketContext from '../context/SocketContext';
import PlayerContext from '../context/PlayerContext';

const Submission = (props) => {
  const socket = useContext(SocketContext);
  const player = useContext(PlayerContext);

  const onChosen = () => {
    socket.emit('roundWinnerChosen', {
      room: player.room,
      winnerIndex: props.playerIndex,
      winningPhrase: props.input,
    });
  };

  return (
    <div className="submission">
      <div className="green">{props.input}</div>
      {props.isJudge && <button onClick={onChosen}>Give this your LOLs</button>}
    </div>
  );
};

export default Submission;
