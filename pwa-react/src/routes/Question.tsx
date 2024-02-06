import React, { useEffect, useState } from "react";

import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import AnswerBox from "../components/Question/AnswerBox";

import { MonthHeader, DaySelect } from "../styles/Question/Question";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import QuestionBox from "../components/Question/QuestionBox";
import useQuestionStore from "../stores/QuestionStore";
import QuestionModal from "../components/Question/QuestionModal";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";

type Props = {};

const Question = (props: Props) => {
  const { isOpen, handleModal } = useQuestionStore();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [month]);

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
      <TokenCheker />
      <MenuSection />
      <MonthHeader>
        <DaySelect>
          <div className="subBox">
            <SlArrowLeft onClick={decreaseMonth}></SlArrowLeft>
            <div className="dayBox">
              {year} - {month.toString().padStart(2, "0")}
            </div>
            {todayYear > year || todayMonth > month ? (
              <SlArrowRight onClick={increaseMonth}></SlArrowRight>
            ) : null}
          </div>
        </DaySelect>
      </MonthHeader>

      {todayYear === year && todayMonth === month ? <QuestionBox /> : null}
      <AnswerBox year={year} month={month} />
      <QuestionModal
        // question={question}
        // todayToString={todayToString}
        isOpen={isOpen}
        handleModal={handleModal}
      />
    </>
  );
};

export default Question;
