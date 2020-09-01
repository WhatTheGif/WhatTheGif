import React, { useState, useRef, useContext } from 'react';
import SocketContext from '../context/SocketContext';

const SplashPage = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const socket = useContext(SocketContext);

  const onRoomTextChange = (e) => {
    setRoom(e.target.value);
  };

  const onNameTextChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!room || !name) return;
    socket.emit('newPlayer', { room, name });
  };

  return (
    <div>
      <br />
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Create/Join Room" onChange={(e) => onRoomTextChange(e)} />
        <input type="text" placeholder="What's your name?" onChange={(e) => onNameTextChange(e)} />
        <button type="submit">Enter The Danger Zone!</button>
      </form>
    </div>
  );
};

export default SplashPage;
