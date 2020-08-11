import React, { useState, useRef, useContext } from 'react';
// import SocketContext from '../context/SocketContext';

const SplashPage = () => {
  const [state, setState] = useState({ username: '' });
  const [nameData, setNameData] = useState([]);
  const onTextChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    // const newArr = [...nameData];
    // newArr.push(e.target.value);
    // // console.log(newArr);
    // setNameData(newArr);
  };
  const onSubmit = (e) => {
    const newArr = [...nameData];
    newArr.push(e);
    setNameData(newArr);
  };

  console.log(nameData);
  console.log(state.username);
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
        onClick={() => onSubmit(state.username)}
      >
        Enter The Danger Zone!
      </button>
    </div>
  );
};

export default SplashPage;
