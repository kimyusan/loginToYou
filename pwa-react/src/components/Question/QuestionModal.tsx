import React, { useEffect, useState } from "react";
import { QModal, AnswerInput } from "../../styles/Question/QuestionModal";
import { SaveButton } from "../../styles/Question/Question";
import axios from "axios";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import useQuestionStore from "../../stores/QuestionStore";
import { useShallow } from "zustand/react/shallow";
import { axiosAuth } from "../../util/token";

type Props = {
  // question: string | null;
  // todayToString: () => string;
  isOpen: boolean;
  // todayMonth: string;
  // todayDate: string;
  handleModal: () => void;
};

const QuestionModal = ({
  // question,
  // todayToString,
  isOpen,
  handleModal,
}: Props) => {
  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const user = useUserStore();
  const { isEdit, editAnswer, modalQuestion, dateString } = useQuestionStore();

  const [answer, setAnswer] = useState<string | null>(null);

  const saveAnswer = () => {
    axios
      .post(
        `${PATH}/question/save`,
        {
          coupleTodayQuestionId: null,
          coupleId: user.coupleId,
          userId: user.userId,
          todayQuestionId: dateString,
          userAnswer: answer,
          registerDate: dateString,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        axiosAuth.post(`${PATH}/challenge/add/progress?userId=${user.userId}&type=today_question`)
          .then((res) => console.log(res.data, "출석체크 성공"))
          .catch((error) => console.log(error.response))
        handleModal();
      });
  };

  useEffect(() => {
    setAnswer(isEdit ? editAnswer : "");
  }, [isOpen]);

  return (
    <>
      <QModal
        isOpen={isOpen}
        onRequestClose={handleModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <p className="question">{modalQuestion}</p>
        <AnswerInput
          className="answer"
          multiline
          rows={4}
          defaultValue={isEdit ? editAnswer : ""}
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
