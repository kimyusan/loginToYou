import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { DayBox } from "../../styles/Diary/UI";

type Props = {
  year: number;
  month: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
};

function DaySelection({ year, month, setYear, setMonth }: Props) {
  const checkToday = () => {
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getMonth() + 1;

    return thisYear == year && thisMonth == month;
  };

  return (
    <DayBox>
      <SlArrowLeft
        onClick={() => {
          if (month > 1) {
            setMonth((prev) => prev - 1);
          } else {
            setYear((prev) => prev - 1);
            setMonth(12);
          }
        }}
      />
      <div
        className="container"
        style={checkToday() ? { marginRight: "31px" } : undefined}
      >
        <div className="year">{year}</div>
        <div className="month">{String(month).padStart(2, "0")}</div>
      </div>
      {checkToday() ? null : (
        <SlArrowRight
          onClick={() => {
            if (month < 12) {
              setMonth((prev) => prev + 1);
            } else {
              setYear((prev) => prev + 1);
              setMonth(1);
            }
          }}
        />
      )}
    </DayBox>
  );
}

export default DaySelection;
