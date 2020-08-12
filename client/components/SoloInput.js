import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import PlayerContext from '../context/PlayerContext';

const SoloInput = () => {
  const [input, setInput] = useState('');
  const socket = useContext(SocketContext);
  const player = useContext(PlayerContext);

  const onTextChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    socket.emit('newInput', { input, index: player.index });
  };

  return (
    <div>
      <input type="text" placeholder="Be Funny!" onChange={(e) => onTextChange(e)} />
      <button onClick={onSubmit}>Let's GO!</button>
    </div>
  );
};

export default SoloInput;
