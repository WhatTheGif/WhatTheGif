import React, { useState, useContext } from 'react';
import SocketContext from '../context/SocketContext';
import PlayerContext from '../context/PlayerContext';

const SoloInput = (props) => {
  const [input, setInput] = useState('');
  const socket = useContext(SocketContext);
  const player = useContext(PlayerContext);

  const onTextChange = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('newInput', { room: player.room, userInput: { input, index: player.index } });
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder={`Be funny, make ${props.judge} laugh!`}
        onChange={(e) => onTextChange(e)}
      />
      <button type="submit">Let's GO!</button>
    </form>
  );
};

export default SoloInput;
