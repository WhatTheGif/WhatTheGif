import React, { useState } from 'react';

const WinRound = () => {
  const [winningPhrase, setWinningPhrase] = useState('When your the only one in the zoom room');
  const [roundWinner, setRoundWinner] = useState('JEHO');

  return (
    <div>
      <h3>'{winningPhrase}' gets all the laughs! {roundWinner} won this round!</h3>
    </div>
  );
}

export default WinRound; 