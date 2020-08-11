import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
// import SocketContext from '../context/SocketContext';

const EndGame = () => {
  //   const [state, setState] = useState({ username: '' });
  //   const onTextChange = (e) => {
  //     setState({ ...state, [e.target.name]: e.target.value });
  //   };
  //   const userList = Object.keys(state);
  //   console.log(userList);
  return (
    <div className="endGameMain">
      <img
        alt="logo"
        src="https://media2.giphy.com/media/3rUbeDiLFMtAOIBErf/giphy.gif?cid=ecf05e47dybklq8cp2aouytlnq9haq4q3xwhalt2y5ofem9u&rid=giphy.gif"
      />
      <h1>(USERNAME) WON! LETS GOOOOO</h1>
      <h2>What A LEGEND!</h2>
      <Link to={`/splash`}>
        <button className="restartGame">Ready to Get back in there!?</button>
      </Link>
    </div>
  );
};

export default EndGame;
