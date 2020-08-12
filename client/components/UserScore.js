import React from 'react';

const UserScore = (props) => {
  return (
    <div className="score">
      <div> {props.userName}: </div>
      <div> {props.userScore} </div>
    </div>
  );
};

export default UserScore;
