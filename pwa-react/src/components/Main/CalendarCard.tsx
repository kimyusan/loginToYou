import React from "react";
import { Card } from "../../styles/common/card";
<<<<<<< HEAD

type Props = {};

const CalendarCard = (props: Props) => {
  return (
    <Card>
=======
import { useNavigate } from "react-router-dom";



const CalendarCard = () => {
  const navigate = useNavigate()
  return (
    <Card onClick={() => navigate("/calendar")}>
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
      <div>
        <h4 style={{ margin: 0 }}>캘린더 / 일정</h4>
        <hr />
      </div>
    </Card>
  );
};

export default CalendarCard;
