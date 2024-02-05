import React, { useState } from "react";

import { DaySelect } from "../../styles/Diary/Diary";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

type Props = {
  year: number;
  month: number;
  selectDay: string;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setDay: React.Dispatch<React.SetStateAction<number>>;
  setX: React.Dispatch<React.SetStateAction<number>>;
};

function DaySelection({
  setYear,
  setMonth,
  setX,
  setDay,
  year,
  month,
  selectDay,
}: Props) {
  const decreaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
    setX(100);
    setDay(0);
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
    setX(100);
    setDay(0);
  };

  return (
    <DaySelect>
      <div className="subBox">
        <SlArrowLeft onClick={decreaseMonth}></SlArrowLeft>
        <div className="dayBox">
          {year}.{month.toString().padStart(2, "0")}.{selectDay.substr(4, 6)}
        </div>
        <SlArrowRight onClick={increaseMonth}></SlArrowRight>
      </div>
    </DaySelect>
  );
}

export default DaySelection;
