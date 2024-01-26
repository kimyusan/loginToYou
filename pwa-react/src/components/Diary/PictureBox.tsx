import React, { useState } from "react";
import { Pictures, PicItem } from "../../styles/Diary/PictureBox";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const PictureBox = () => {
  const a = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    3, 3, 3, 3, 3,
  ];
  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 100 ? setX(100) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (a.length - 2) ? setX(-100 * (a.length - 2)) : setX(x - 100);
  };

  return (
    <Pictures>
      <SlArrowLeft onClick={goLeft}></SlArrowLeft>
      <PicItem>
        {a.map((item, idx) => {
          const middleIdx = -(x / 100) + 1;
          const className = idx === middleIdx ? "slide middle" : "slide";
          return (
            <div
              key={idx}
              className={className}
              style={
                className === "slide middle"
                  ? { transform: `translateX(${x}%) scale(1.7)` }
                  : { transform: `translateX(${x}%)` }
              }
            >
              {idx + 1}
            </div>
          );
        })}
      </PicItem>
      <SlArrowRight onClick={goRight}></SlArrowRight>
    </Pictures>
  );
};

export default PictureBox;
