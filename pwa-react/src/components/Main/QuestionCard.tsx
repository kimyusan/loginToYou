import React from "react";
import { Card } from "../../styles/common/card";
import { useNavigate } from "react-router-dom";

type Props = {};

const QuestionCard = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="question_card" onClick={() => navigate("/question")}>
        <div className="question">
          <p className="todays">오늘의</p>
          <div className="questionDetail">
            <p>A에 대해서 어떻게 생각해?</p>
            <p className="goToAns">답변하러 가기＞ </p>
          </div>
        </div>
        {/* <div className="answer">
          <div>
            <p>나의 답변</p>
          </div>
          <div>
            <p>상대의 답변</p>
          </div>
        </div> */}
        <div className="q">Q</div>
      </Card>
    </>
  );
};

export default QuestionCard;
