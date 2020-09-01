import React, { useContext } from 'react';
import SocketContext from '../context/SocketContext';

const EndGame = (props) => {
  const socket = useContext(SocketContext);

  const restartGame = () => {
    window.location.href = '/';
  };

  return (
    <div className="page">
      <div>
        <img
          alt="logo"
          src="https://media2.giphy.com/media/3rUbeDiLFMtAOIBErf/giphy.gif?cid=ecf05e47dybklq8cp2aouytlnq9haq4q3xwhalt2y5ofem9u&rid=giphy.gif"
        />
      </div>
      <h3>
        <span className="underline purple-text">{props.winner}</span> WON!
        <br />
        <br />
        LETS GOOOOO
        <br />
        What A LEGEND!
      </h3>
      <button onClick={restartGame}>Ready to Get back in there!?</button>
    </div>
  );
};

export default EndGame;
