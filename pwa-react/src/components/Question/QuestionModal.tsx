import React from "react";
import { QModal } from "../../styles/Question/QuestionModal";

type Props = {
  isOpen: boolean;
  handleModal: () => void;
};

const QuestionModal = ({ isOpen, handleModal }: Props) => {
  return (
    <>
      <QModal
        isOpen={isOpen}
        onRequestClose={handleModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        QuestionModal
      </QModal>
    </>
  );
};

export default QuestionModal;
