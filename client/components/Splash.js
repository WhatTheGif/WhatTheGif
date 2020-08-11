import React, { useState, useRef, useContext } from 'react';
import SocketContext from '../context/SocketContext';

const SplashPage = () => {
  const [name, setName] = useState('');
  // const [nameData, setNameData] = useState([]);
  const socket = useContext(SocketContext);
  

  const onTextChange = (e) => {
    setName(e.target.value)
  };
  
  const onSubmit = () => {
    socket.emit('newPlayer', name);
    console.log(socket.id)
  };

  // console.log(nameData);
  console.log(name);
  return (
    <div className="SplashMain">
      <img alt="logo" src="../assets/img/whatthegif.png" />
      <h2>Gif(gif) OR Gif(jif) Edition!!</h2>
      <label>Enter Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        onChange={(e) => onTextChange(e)}
      />
      <button
        className="enterUsername"
        onClick={onSubmit}
      >
        Enter The Danger Zone!
      </button>
    </div>
  );
};

export default SplashPage;
