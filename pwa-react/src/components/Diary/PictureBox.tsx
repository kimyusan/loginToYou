import React, { useState } from 'react';
import { Pictures, PicItem } from '../../styles/Diary/PictureBox';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const PictureBox = () => {
  const a = [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0];
  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-10 * (a.length - 3)) : setX(x + 100);
  };

  const goRight = () => {
    x === -10 * (a.length - 3) ? setX(0) : setX(x - 100);
  };

  return (
    <Pictures>
      <SlArrowLeft onClick={goLeft}></SlArrowLeft>
      <PicItem>
        {a.map((item, idx) => (
          <div key={idx} className='slide' style={{transform:`translateX(${x}%)`}}>
            하이하이 {idx+1}
          </div>
        ))}
      </PicItem>
      <SlArrowRight onClick={goRight}></SlArrowRight>
    </Pictures>
  );
};

export default PictureBox;
