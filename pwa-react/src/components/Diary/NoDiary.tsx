import React from "react";
import { GoCreateDiary } from "../../styles/Diary/PictureBox";

type Props = {
  year: number;
  month: number;
  today: Date;
};

function NoDiary({ year, month, today }: Props) {
  return (
    <GoCreateDiary style={{ marginTop: "50%" }}>
      {Number(year.toString() + month.toString().padStart(2, "0")) !==
      Number(
        today.getFullYear().toString() +
          (today.getMonth() + 1).toString().padStart(2, "0")
      ) ? (
        <p>일기를 쓸 수 없어요</p>
      ) : (
        <p>일기가 없어요</p>
      )}
    </GoCreateDiary>
  );
}

export default NoDiary;
