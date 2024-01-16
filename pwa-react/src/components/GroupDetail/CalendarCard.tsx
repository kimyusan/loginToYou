import React from "react";
import { Card } from "../../styles/common/card";

type Props = {};

const CalendarCard = (props: Props) => {
  return (
    <Card>
      <div>
        <h4 style={{ margin: 0 }}>예정된 일정</h4>
        <hr />
      </div>
    </Card>
  );
};

export default CalendarCard;
