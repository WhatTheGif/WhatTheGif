import React from "react";
import Submission from './Submission'

const AllInputs = () => {
  //fetch request to the server to get responses that each player submitted
  const input = [
    { name: "JEHO", input: "lalala" },
    { name: "JEHO", input: "lalala" },
  ];
  const inputs = [];

  for (let i = 0; i < input.length; i++) {
    const eachInput = input[i];
    inputs.push(<Submission key={`str-${i}`} input={eachInput.input} />);
  }
  return <div>{inputs}</div>;
};

export default AllInputs;
