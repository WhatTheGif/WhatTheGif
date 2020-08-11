import React from 'react';
import UserScore from './UserScore'

const ScoreBoard = () => {
  //fetch request to backend, for array of all players and their scores
  const playerScores = [{name: 'JEHO', score: 5}, {name: 'Cyn', score: 6}, {name: 'Besik', score: 6}, {name: 'Roseanne', score: 4},];
  
  const userScores = [];
  for(let i = 0; i < playerScores.length; i += 1){
    const player = playerScores[i];
    userScores.push(<UserScore key={`UserName-${i}`} userName={player.name} userScore={player.score}/>) 
  }
  
  return (
    <div>
      { userScores } 
    </div>
  );
};

export default ScoreBoard;