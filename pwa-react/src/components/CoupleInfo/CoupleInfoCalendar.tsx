import React, { useState } from "react";
import { CalendarInput, Wrapper } from "../../styles/CoupleInfo/UI";
import useCoupleStore from "../../stores/CoupleStore";


type Props = {
  start: string | null;
  setStart: (date: string) => void;
};

function CoupleInfoCalendar({ start, setStart }: Props) {
  const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value);
  };
  const today = new Date().toISOString().split("T")[0];
  const {startDate} = useCoupleStore()

  return (
    <Wrapper>
      <label>우리 사랑이 시작된 날은</label>
      {startDate ? (
        <CalendarInput
          disabled
          type="date"
          value={start ? start?.split(" ")[0] : ""}
          onChange={changeDate}
          InputProps={{ inputProps: { min: "1900-01-01", max: today } }}
        />
      ) : (
        <CalendarInput
          type="date"
          value={start ? start?.split(" ")[0] : ""}
          onChange={changeDate}
          InputProps={{ inputProps: { min: "1900-01-01", max: today } }}
        />
      )}
    </Wrapper>
  );
}

export default CoupleInfoCalendar;
