import React, { useState } from 'react';

const WinRound = (props) => {
  return (
    <div>
      <h3>
        '{props.winningPhrase}' gets all the laughs! {props.roundWinner} won this round!
      </h3>
    </div>
  );
};

export default WinRound;
