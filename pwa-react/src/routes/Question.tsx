import React, { useState } from "react";
import { DaySelect } from "../styles/Question/Question";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

type Props = {};

const Question = (props: Props) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const decreaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const increaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      } else {
        return prevMonth + 1;
      }
    });
  };

  return (
    <div>
      <DaySelect>
        <div className="subBox">
          <SlArrowLeft onClick={decreaseMonth}></SlArrowLeft>
          <div className="dayBox">
            {year}.{month.toString().padStart(2, "0")}
          </div>
          <SlArrowRight onClick={increaseMonth}></SlArrowRight>
        </div>
      </DaySelect>
    </div>
  );
};

export default Question;
