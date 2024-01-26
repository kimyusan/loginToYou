import React, { useState } from "react";
import { CalendarInput, Wrapper } from "../../styles/CoupleInfo/UI";

type Props = {
  startDate: string;
  setStartDate: (date: string) => void;
};

function CoupleInfoCalendar({ startDate, setStartDate }: Props) {
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  return (
    <Wrapper>
      <label>우리 사랑이 시작된 날은</label>
      <CalendarInput type="date" value={startDate} onChange={changeDate} />
    </Wrapper>
  );
}

export default CoupleInfoCalendar;
