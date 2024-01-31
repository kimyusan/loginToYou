import * as React from "react";
import { AnswerContainer } from "../../styles/Question/AnswerBox";
import AnswerCard from "./AnswerCard";

type Props = { show: boolean };

const QuestionBox = ({ show }: Props) => {
  const a = [0, 0, 0, 0, 0];

  return (
    <>
      <AnswerContainer>
        {a.map((item, idx) => {
          return <AnswerCard key={idx} show={show} />;
        })}
      </AnswerContainer>
    </>
  );
};

export default QuestionBox;
