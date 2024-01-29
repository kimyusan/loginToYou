import React from "react";
import { QModal, AnswerInput } from "../../styles/Question/QuestionModal";
import { SaveButton } from "../../styles/Question/Question";

type Props = {
  isOpen: boolean;
  todayMonth: string;
  todayDate: string;
  handleModal: () => void;
};

const QuestionModal = ({
  isOpen,
  handleModal,
  todayMonth,
  todayDate,
}: Props) => {
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
        <p className="question">A에 대해서 어떻게 생각해?</p>
        <AnswerInput className="answer" multiline rows={4} />
        <SaveButton
          variant="contained"
          onClick={handleModal}
          style={{ marginTop: "10%"}}
        >
          저장하기
        </SaveButton>
      </QModal>
    </>
  );
};

export default QuestionModal;
