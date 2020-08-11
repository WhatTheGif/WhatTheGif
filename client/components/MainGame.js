import React, { useState, useContext } from "react";
import Waiting from './Waiting';
import SoloInput from './SoloInput'
import WinRound from './WinRound'
import ScoreBoard from './ScoreBoard'
import AllInputs from './AllInputs'
import SocketContext from '../context/SocketContext';


//set a socket listener for 'newjudge',
// recieve a socketid of judge as paramter
// check if my socket id is the socketid of the judge
//if i am the judge, update state of being judge (which will conditionally render judge components)d
const MainGame = () => {
  const socket = useContext(SocketContext);

  const [isJudge, setIsJudge] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [viewInputs, setViewInputs] = useState(false);

  socket.on('newJudge', (judgeID) => {
    console.log(`The judge id is currently`, judgeID);
    if (judgeID === socket.id) {
      setIsJudge(true);
      setIsWaiting(true);
    } else {
      setIsJudge(false);
    }
  })
  let currentView;
  if (!isJudge) { // player
    if (!isWaiting && !viewInputs) {
      currentView = < SoloInput />;
    } else if (isWaiting) {
      currentView = <Waiting />
    } else if (viewInputs) {
      currentView = <AllInputs />
    }
  } else if (isJudge) { // judge
    if (isWaiting) {
      currentView = <Waiting />
    } else {
      currentView = <AllInputs />
    }
  }

  return (
    <div>
      <div>
        <iframe src="https://giphy.com/embed/YsTs5ltWtEhnq"></iframe>
      </div>
      <ScoreBoard />
      { currentView }
    </div>
  );
};

export default MainGame;
