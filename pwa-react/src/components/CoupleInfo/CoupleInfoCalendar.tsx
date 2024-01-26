import React from "react";
import { CalendarInput } from "../../styles/CoupleInfo/UI";

type Props = {};

function CoupleInfoCalendar({}: Props) {
  return (
    <div>
      <CalendarInput type="date" />
    </div>
  );
}

export default CoupleInfoCalendar;
