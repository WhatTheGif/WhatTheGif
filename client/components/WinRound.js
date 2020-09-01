import React, { useState } from 'react';

const WinRound = (props) => {
  return (
    <div>
      <h3>
        <span className="teal-text">
          <i>'{props.winningPhrase}'</i>
        </span>{' '}
        gets all the laughs!
        <br /> <span className="purple-text underline">{props.roundWinner}</span> won this round!
      </h3>
    </div>
  );
};

export default WinRound;
