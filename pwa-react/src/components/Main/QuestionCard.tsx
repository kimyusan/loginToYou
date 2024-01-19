import React from "react";
import { Card } from "../../styles/common/card";

type Props = {};

const QuestionCard = (props: Props) => {
  return (
    <Card>
      <div>
        <h4 style={{ margin: 0 }}>오늘의 Q</h4>
        <hr />
      </div>
    </Card>
  );
};

export default QuestionCard;
