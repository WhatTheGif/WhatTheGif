import React, { useContext } from 'react';
import SocketContext from '../context/SocketContext';

const Submission = (props) => {
  const socket = useContext(SocketContext);

  const onChosen = () => {
    socket.emit('roundWinnerChosen', {
      winnerIndex: props.playerIndex,
      winningPhrase: props.input,
    });
  };

  return (
    <div className="response">
      <span id='input'>{props.input}</span>
      {props.isJudge && <button onClick={onChosen}>Give this your LOLs</button>}
    </div>
  );
};

export default Submission;
