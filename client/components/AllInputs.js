import React from 'react';
import Submission from './Submission';

const AllInputs = (props) => {
  const submissionInstances = [];
  for (let i = 0; i < props.inputs.length; i++) {
    const input = props.inputs[i];
    submissionInstances.push(
      <Submission
        key={`str-${i}`}
        input={input.input}
        playerIndex={input.index}
        isJudge={props.isJudge}
      />
    );
  }
  return <div>{submissionInstances}</div>;
};

export default AllInputs;
