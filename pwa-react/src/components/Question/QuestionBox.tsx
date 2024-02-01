import React, { useEffect, useState } from "react";
import axios from "axios";
import { QBox, SaveButton } from "../../styles/Question/Question";
import QuestionModal from "./QuestionModal";
import useAuthStore from "../../stores/AuthStore";
import useQuestionStore from "../../stores/QuestionStore";
import { useShallow } from "zustand/react/shallow";

type Props = {};

const QuestionBox = (props: Props) => {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const {
    isEdit,
    EditMode,
    isOpen,
    handleModal,
    setEditAnswer,
    dateString,
    setDateString,
    setModalQuestion,
  } = useQuestionStore();

  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");
  const todayToString = () => {
    return todayYear + todayMonth + todayDate;
  };

  const [question, setQuestion] = useState("");

  const getQuestion = () => {
    axios
      .get(`${PATH}/question/get`, {
        params: { dateString: todayToString() },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setQuestion(res.data);
      })
      .catch((err) => console.log(err));
  };

  const openCreateModal = () => {
    setEditAnswer(null);
    setDateString(todayYear + todayMonth + todayDate);
    setModalQuestion(question);
    if (isEdit) {
      EditMode();
    }
    handleModal();
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      <QBox>
        <div>
          <p className="date">
            {todayMonth}/{todayDate} 오늘의 질문
          </p>
          <p>{question}</p>
        </div>
        <div className="btn_container">
          <SaveButton variant="contained" onClick={openCreateModal}>
            답변 작성하기
          </SaveButton>
        </div>
      </QBox>

      {/* <QuestionModal
        question={question}
        todayToString={todayToString}
        isOpen={isOpen}
        handleModal={handleModal}
        todayMonth={todayMonth}
        todayDate={todayDate}
      /> */}
    </>
  );
};

export default QuestionBox;
