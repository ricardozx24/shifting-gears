import React from "react";
import withData from "../src/components/withData";

const Autozoners = ({ autozoners }) => {
  return (
    <div>
      {autozoners.map(({ imageSrc, name }) => {
        return (
          <img src={`images/${imageSrc}.jpg`} alt={name} key={imageSrc}></img>
        );
      })}
    </div>
  );
};

export default withData(2)(Autozoners);