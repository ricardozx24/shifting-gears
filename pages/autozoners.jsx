import React from "react";
import AutozonersRenderProps from "../src/components/AutozonersRenderProps";

const Autozoners = () => {
  return (
    <AutozonersRenderProps>
      {({ autozoners }) => {
        return (
          <div>
            {autozoners.map(({ imageSrc, name }) => {
              return (
                <img
                  src={`images/${imageSrc}.jpg`}
                  alt={name}
                  key={imageSrc}
                ></img>
              );
            })}
          </div>
        );
      }}
    </AutozonersRenderProps>
  );
};

export default Autozoners;