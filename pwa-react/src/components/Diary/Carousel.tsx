import React from "react";
import { PicItem, PicBox, PicContent } from "../../styles/Diary/PictureBox";
import { Diary } from "./PictureBox";
import useAuthStore from "../../stores/AuthStore";

type Props = {
  pictures: Diary[];
  x: number;
  openDetail: (id: string) => void;
};

function Carousel({ pictures, x, openDetail }: Props) {
  const PATH = useAuthStore.getState().PATH;

  return (
    <PicItem>
      {pictures.map((item, idx) => {
        const middleIdx = -(x / 100) + 1;
        const className = idx === middleIdx ? "slide middle" : "slide";
        let url = "";
        let Id = "";
        let subject = "";
        if (item) {
          url = `${PATH}/diary/getImg/${item["saveFolder"]}/${item["originalName"]}/${item["saveName"]}`;
          Id = `${item["diaryId"]}`;
          subject = `${item["subject"]}`;
        }
        return (
          <div
            key={idx}
            className={className}
            style={
              className === "slide middle"
                ? { transform: `translateX(${x}%) scaleX(2.1) scaleY(1.5)` }
                : { transform: `translateX(${x}%)` }
            }
            onClick={() => openDetail(Id)}
          >
            <PicBox>
              <img src={url} alt="zz" />
            </PicBox>
            <PicContent>{subject}</PicContent>
          </div>
        );
      })}
    </PicItem>
  );
}

export default Carousel;
