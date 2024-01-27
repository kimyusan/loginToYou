import React, { useEffect, useState } from "react";
import { QBox, SaveButton } from "../../styles/Question/Question";
import QuestionModal from "./QuestionModal";

type Props = {};

const QuestionBox = (props: Props) => {
  const today = new Date();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");

  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <QBox>
        <p className="question">
          {todayMonth}/{todayDate} 오늘의 질문
        </p>
        <p>A에 대해서 어떻게 생각해?</p>
        <div className="btn_container">
          <SaveButton variant="contained" onClick={handleModal}>
            답변 작성하기
          </SaveButton>
        </div>
        <QuestionModal
          isOpen={isOpen}
          handleModal={handleModal}
          todayMonth={todayMonth}
          todayDate={todayDate}
        />
      </QBox>
    </>
  );
};

export default QuestionBox;
