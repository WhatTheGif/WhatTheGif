import React, { useState, useContext } from 'react';
import Waiting from './Waiting';
import SoloInput from './SoloInput';
import WinRound from './WinRound';
import ScoreBoard from './ScoreBoard';
import AllInputs from './AllInputs';
import SocketContext from '../context/SocketContext';
import PlayerContext from '../context/PlayerContext';

const MainGame = () => {
  const socket = useContext(SocketContext);
  const player = useContext(PlayerContext);

  const [currGif, setCurrGif] = useState('');
  const [currJudge, setCurrJudge] = useState('');
  const [submittedInputs, setSubmittedInputs] = useState([]);
  const [roundWinner, setRoundWinner] = useState({ winningPhrase: '', player: '' });

  const [isJudge, setIsJudge] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [viewInputs, setViewInputs] = useState(false);
  const [isInputing, setIsInputing] = useState(false);

  // Listen for updates about who the judge of round is
  socket.on('newJudge', (judge) => {
    // Update judge's name on screen
    setCurrJudge(judge.name);
    // Update Gif on screen
    setCurrGif(judge.currGif);

    // Reset and update state according to if user is the current judge
    if (judge.index === player.index) {
      setIsJudge(true);
      setIsInputing(false);
      setIsWaiting(true);
      setViewInputs(false);
    } else {
      setIsJudge(false);
      setIsInputing(true);
      setIsWaiting(false);
      setViewInputs(false);
    }
  });

  // Listen for being told to wait
  socket.on('waiting', () => {
    setIsInputing(false);
    setIsWaiting(true);
  });

  // Listen for all players done submitting inputs
  socket.on('judgeTheRound', (allInputs) => {
    setSubmittedInputs(allInputs);
    setIsWaiting(false);
    setViewInputs(true);
  });

  // Listen for when a winner is chosen for a round
  socket.on('roundWinnerChosen', (winner) => {
    setRoundWinner({ ...winner });
    setViewInputs(false);
  });

  // Update the view based on if player is the judge or not
  // Update the view based on if player is waiting or not
  let currentView;
  if (isWaiting) {
    currentView = <Waiting />;
  } else if (viewInputs) {
    currentView = <AllInputs inputs={submittedInputs} isJudge={isJudge} />;
  } else if (isInputing) {
    currentView = <SoloInput />;
  } else {
    currentView = (
      <WinRound winningPhrase={roundWinner.winningPhrase} roundWinner={roundWinner.player} />
    );
  }

  return (
    <div>
      <div>
        <h1>The Legendary {player.name}</h1>
        <img className="gif" src={currGif}></img>
        <h2>Current Judge: {currJudge}</h2>
      </div>
      <ScoreBoard />
      {currentView}
    </div>
  );
};

export default MainGame;
