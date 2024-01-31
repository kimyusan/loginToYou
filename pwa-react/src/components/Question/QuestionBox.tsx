import React, { useEffect, useState } from "react";
import axios from "axios";
import { QBox, SaveButton } from "../../styles/Question/Question";
import QuestionModal from "./QuestionModal";
import useAuthStore from "../../stores/AuthStore";
import { useShallow } from "zustand/react/shallow";
import { getUniqueDomId } from "@fullcalendar/core/internal";

type Props = {};

const QuestionBox = (props: Props) => {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");
  const todayToString = () => {
    return todayYear + todayMonth + todayDate;
  };

  const [isOpen, setIsOpen] = useState(false);

  const [question, setQuestion] = useState("");

  // 답변 작성하기 모달 핸들
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const getQuestion = () => {
    axios
      .get(`${PATH}/question/get`, {
        params: { dateString: todayToString() },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuestion();
  }, []);

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
