import React from "react";
import { Card } from "../../styles/common/card";

type Props = {};

const QuestionCard = (props: Props) => {
  return (
    <>
      <Card className="question_card">
        <div className="question">
          <p>오늘의</p>
          <p>A에 대해서 어떻게 생각해?</p>
        </div>
        <div className="answer">
          <div>
            <p>나의 답변</p>
          </div>
          <div>
            <p>상대의 답변</p>
          </div>
        </div>
        <div className="q">Q</div>
      </Card>
    </>
  );
};

export default QuestionCard;
