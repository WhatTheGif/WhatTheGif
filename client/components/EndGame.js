import React, { useContext } from 'react';
import SocketContext from '../context/SocketContext';

const EndGame = (props) => {
  const socket = useContext(SocketContext);

  const restartGame = () => {
    window.location.href = '/';
  };

  return (
    <div className="endGameMain">
      <img
        alt="logo"
        src="https://media2.giphy.com/media/3rUbeDiLFMtAOIBErf/giphy.gif?cid=ecf05e47dybklq8cp2aouytlnq9haq4q3xwhalt2y5ofem9u&rid=giphy.gif"
        height= '500px'
        width= '700px'
      />
      <h1>{props.winner} WON! LETS GOOOOO</h1>
      <h2>What A LEGEND!</h2>
      <button className="restartGame" onClick={restartGame}>
        Ready to Get back in there!?
      </button>
    </div>
  );
};

export default EndGame;
