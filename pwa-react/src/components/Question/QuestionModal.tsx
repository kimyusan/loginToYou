import React, { useEffect, useState } from "react";
import { QModal, AnswerInput } from "../../styles/Question/QuestionModal";
import { SaveButton } from "../../styles/Question/Question";
import axios from "axios";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import useQuestionStore from "../../stores/QuestionStore";
import { useShallow } from "zustand/react/shallow";

type Props = {
  question: string;
  todayToString: () => string;
  isOpen: boolean;
  todayMonth: string;
  todayDate: string;
  handleModal: () => void;
};

// {
//    "coupleTodayQuestionId" : null,
//    "coupleId" : 2,
//    "userId" : 16,
//    "todayQuestionId" : 2,
//    "userAnswer" : "주먹밥",
//    "registerDate" : 20240130
//   }

const QuestionModal = ({
  question,
  todayToString,
  isOpen,
  handleModal,
  todayMonth,
  todayDate,
}: Props) => {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const user = useUserStore();
  const { isEdit, EditMode } = useQuestionStore();

  const [answer, setAnswer] = useState("");

  const saveAnswer = () => {
    axios.post(
      `${PATH}/question/save`,
      {
        coupleTodayQuestionId: null,
        coupleId: user.coupleId,
        userId: user.userId,
        todayQuestionId: todayToString(),
        userAnswer: answer,
        registerDate: todayToString(),
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    handleModal();
  };

  return (
    <>
      <QModal
        isOpen={isOpen}
        onRequestClose={handleModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <p className="today">
          {todayMonth}/{todayDate}
        </p>
        <p className="question">{question}</p>
        <AnswerInput
          className="answer"
          multiline
          rows={4}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <SaveButton
          variant="contained"
          onClick={saveAnswer}
          style={{ marginTop: "10%" }}
        >
          {isEdit ? "수정하기" : "제출하기"}
        </SaveButton>
      </QModal>
    </>
  );
};

export default QuestionModal;
