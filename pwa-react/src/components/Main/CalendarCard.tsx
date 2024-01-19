import React from "react";
import { Card } from "../../styles/common/card";
import { useNavigate } from "react-router-dom";



const CalendarCard = () => {
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate("/calendar")}>
      <div>
        <h4 style={{ margin: 0 }}>캘린더 / 일정</h4>
        <hr />
      </div>
    </Card>
  );
};

export default CalendarCard;
