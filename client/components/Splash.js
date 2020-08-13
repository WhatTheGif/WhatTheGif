import React, { useState, useRef, useContext } from 'react';
import SocketContext from '../context/SocketContext';

const SplashPage = () => {
  const [name, setName] = useState('');
  const socket = useContext(SocketContext);

  const onTextChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = () => {
    socket.emit('newPlayer', name);
  };

  return (
    <div className="splash-container">
      <img
        alt="logo"
        src="https://fontmeme.com/permalink/200812/494bb6ee41bd84762de732c77da6bd2f.png"
        width="100%"
      />
      <h1 id="subheader">Gif(gif) OR Gif(jif) Edition!!</h1>
      <h2>Enter Username:</h2>
      <div id="splashUser">
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => onTextChange(e)}
        />
        <button className="enterUsername" onClick={onSubmit}>
          Enter The Danger Zone!
        </button>
      </div>
    </div>
  );
};

export default SplashPage;
