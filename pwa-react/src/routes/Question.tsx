import React, { useState } from "react";

import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import AnswerBox from "../components/Question/AnswerBox";

import { MonthHeader, DaySelect } from "../styles/Question/Question";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import QuestionBox from "../components/Question/QuestionBox";

type Props = {};

const Question = (props: Props) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  // 이전 달로 가기
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

  // 다음 달로 가기
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
    <>
      <MonthHeader>
        <BurgerButton onClick={toggleNavigation} style={{ position: "fixed" }}>
          {isNavigationOpen ? "×" : "☰"}
        </BurgerButton>
        <Navbar isOpen={isNavigationOpen} />
        <DaySelect>
          <div className="subBox">
            <SlArrowLeft onClick={decreaseMonth}></SlArrowLeft>
            <div className="dayBox">
              {year}.{month.toString().padStart(2, "0")}
            </div>
            <SlArrowRight onClick={increaseMonth}></SlArrowRight>
          </div>
        </DaySelect>
      </MonthHeader>

      <QuestionBox />
      <AnswerBox show={isNavigationOpen} />
    </>
  );
};

export default Question;
