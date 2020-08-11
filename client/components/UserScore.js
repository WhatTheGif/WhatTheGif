import React from 'react';


const UserScore = (props) => {
  return (
    <div>
      <div> {props.userName}: </div>
      <div> {props.userScore} </div>
    </div>
  );
} 

export default UserScore; 