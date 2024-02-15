import React from "react";
import { DiaryInterface } from "../../interface/DiaryInterface";
import useAuthStore from "../../stores/AuthStore";
import { PhotoCard } from "../../styles/Diary/UI";
import { useNavigate } from "react-router-dom";

type Props = {
  diary: DiaryInterface;
};

function DiaryItem({ diary }: Props) {
  const PATH = useAuthStore.getState().PATH;
  const DiaryImage = `${PATH}/diary/getImg/${diary.saveFolder}/${diary.originalName}/${diary.saveName}`;
  const navigate = useNavigate();

  return (
    <PhotoCard>
      <div className="cardWrapper">
        <div className="date">{diary.saveFolder}</div>
        <img src={DiaryImage} className="image" />
        <div className="content">{diary.subject}</div>
      </div>
    </PhotoCard>
  );
}

export default DiaryItem;
