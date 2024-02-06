import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { Pictures } from "../../styles/Diary/PictureBox";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import useUserStore from "../../stores/UserStore";

import DiaryModal from "./DiaryModal";
import PictureModal from "./PictureModal";
import DaySelection from "./DaySelection";
import ImageDrawer from "./ImageDrawer";
import Carousel from "./Carousel";
import { axiosAuth } from "../../util/token";
import NoDiary from "./NoDiary";
import useCoupleStore from "../../stores/CoupleStore";

export interface Diary {
  diaryId: number | null;
  coupleId: number | null;
  originalName: String | null;
  registerDate: String | null;
  saveFolder: String | null;
  saveName: String | null;
  subject: String | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "auto",
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  borderRadius: "5px",
  p: 3,
};

const PictureBox = () => {
  const [x, setX] = useState(100);

  // 날짜 별 사진 저장 변수
  const [pictures, setPictures] = useState<Diary[]>([]);

  // 일 별 사진 저장 변수
  const [dayPictures, setDayPictures] = useState([]);

  // 다이어리 작성 시 모달 오픈 변수
  const [open, setOpen] = useState(false);

  // 다이어리 작성 시 컴포넌트 분류하는 변수
  const [diaryOpen, setDiaryOpen] = useState(0);

  // 날짜 별 갤러리 오픈 변수
  const [open2, setOpen2] = useState(false);

  // 사진 자세히 보는 모달 오픈 변수
  const [open4, setOpen4] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  // 개인 별 다이어리 내용
  const [myContent, setMyContent] = useState("");
  const [yourContent, setYourContent] = useState("");

  // 개인 별 다이어리 작성 확인 변수
  const [myCom, setMyCom] = useState(false);
  const [yourCom, setYourCom] = useState(false);

  // 작성자 다이어리 아이디
  const [myMemoId, setMyMemoId] = useState("");

  // 공용 다이어리 아이디
  const [diaryId, setDiaryId] = useState<String>("");

  //썸네일 아이디 변수들
  const [originalId, setOriginalId] = useState("");
  const [thumbNailId, setThumbNailId] = useState("");
  const [commit, setCommit] = useState(true);

  const { coupleId, userId } = useUserStore(
    useShallow((state) => ({
      coupleId: state.coupleId,
      userId: state.userId,
    }))
  );

  const { yourId } = useCoupleStore(
    useShallow((state) => ({
      yourId: state.yourId,
    }))
  );

  // 오늘 날짜 자동 계산
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(0);
  const [selectDay, setSelectDay] = useState("");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen2(newOpen);
  };

  // 날짜별 사진 불러오기
  useEffect(() => {
    const callImage = async () => {
      try {
        const res = await axiosAuth.get("/diary/read", {
          params: { coupleId },
        });
        const data: Diary[] = [];

        for (let i = 1; i < 32; i++) {
          const thumbNail = res.data.filter(
            (item: any) =>
              "20" + item.saveFolder ===
              `${year}${month.toString().padStart(2, "0")}${i
                .toString()
                .padStart(2, "0")}`
          );
          if (thumbNail.length > 0) {
            data.push(
              thumbNail.filter((item: any) => item.isThumbnail === 1)[0]
            );
          }
        }
        setPictures(data);
        setSelectDay(
          data.length > 0
            ? `${data[day]["saveFolder"]}`
            : `${year.toString().substr(2, 4)}${month
                .toString()
                .padStart(2, "0")}01`
        );
        const Dp =
          data.length > 0
            ? res.data.filter(
                (item: any) => item.saveFolder === `${data[day]["saveFolder"]}`
              )
            : [];
        setDayPictures(Dp);
        setMyCom(false)
        setYourCom(false)
        setMyContent("");
        setYourContent("");
        setOriginalId(data.length > 0 ? `${data[day]["diaryId"]}` : "");
      } catch (err) {
        console.error(err);
      }
    };
    callImage();
  }, [day, month, year, commit]);

  // 캐러셀 css 계산
  const goLeft = () => {
    x === 100 ? setX(100) : setX(x + 100);
    day === 0 ? setDay(0) : setDay(day - 1);
  };

  const goRight = () => {
    x === -100 * (pictures.length - 2)
      ? setX(-100 * (pictures.length - 2))
      : setX(x - 100);
    day === pictures.length - 1 ? setDay(pictures.length - 1) : setDay(day + 1);
  };

  // 다이어리 모달 오픈 및 개인별 다이어리 조회
  const openDetail = async (id: string) => {
    setDiaryId(id);

    try {
      const res = await axiosAuth.get(`/diary/memo/get`, {
        params: {
          coupleId,
          registerDate: `${year.toString()}-${month
            .toString()
            .padStart(2, "0")}-${selectDay.toString().substr(4, 6)}`,
        },
      });
      console.log(res.data);

      setOpen(true);
      setMyMemoId(res.data[0].diaryMemoId);

      if (res.data[0].userId) {
        if (res.data[0].userId === userId) {
          setMyContent(res.data[0].content);
          setMyCom(true);
        } else {
          setYourContent(res.data[0].content);
          setYourCom(true);
        }
      }

      if (res.data[1].userId) {
        if (res.data[1].userId === yourId) {
          setYourContent(res.data[1].content);
          setYourCom(true);
        } else {
          setMyContent(res.data[1].content);
          setMyCom(true);
        }
      }

    } catch (err) {
      console.log("작성된 다이어리 없음", err);
    }
  };

  // 개인 별 다이어리 작성
  const createDiary = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axiosAuth.post("/diary/memo/regist", {
        diaryMemoId: null,
        coupleId,
        userId,
        registerDate: null,
        content: myContent,
      });
      setDiaryOpen(0);
      setMyCom(true);
      console.log("다이어리 작성 성공", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 개인 별 다이어리 업데이트
  const updateDiary = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await axiosAuth.put(`/diary/memo/update`, {
        diaryMemoId: myMemoId,
        coupleId,
        userId,
        registerDate: `${year.toString()}-${month
          .toString()
          .padStart(2, "0")}-${selectDay.toString().substr(4, 6)}`,
        content: myContent,
      });
      setDiaryOpen(0);
      console.log("다이어리 업데이트 성공", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 대표 사진 체인지함수
  const changeThumbNail = async () => {
    try {
      const res = await axiosAuth.put(
        `/diary/thumbnail/update?diaryId=${originalId}&newDiaryId=${thumbNailId}`,
        {}
      );
      console.log("대표사진 수정 성공", res.data);
      setCommit(!commit);
      setOpen4(false);
      setOpen2(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 사진 삭제 함수
  const deletePicture = async () => {
    try {
      const res = await axiosAuth.delete(
        `/diary/delete?diaryId=${thumbNailId}`
      );
      console.log("사진 삭제 성공", res.data);
      setCommit(!commit);
      setOpen4(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* 날짜 선택 */}
      <DaySelection
        year={year}
        month={month}
        selectDay={selectDay}
        setYear={setYear}
        setMonth={setMonth}
        setDay={setDay}
        setX={setX}
      />

      {/* 다이어리 캐러셀 */}
      {pictures.length > 0 ? null : (
        <NoDiary year={year} month={month} today={today} />
      )}
      <Pictures>
        {pictures.length > 0 ? <SlArrowLeft onClick={goLeft} /> : null}
        <Carousel openDetail={openDetail} pictures={pictures} x={x} goLeft={goLeft} goRight={goRight}/>

        {/* 다이어리 작성시 모달 */}
        <DiaryModal
          open={open}
          setOpen={setOpen}
          modalStyle={style}
          diaryOpen={diaryOpen}
          setDiaryOpen={setDiaryOpen}
          myContent={myContent}
          setMyContent={setMyContent}
          yourContent={yourContent}
          myCom={myCom}
          yourCom={yourCom}
          updateDiary={updateDiary}
          createDiary={createDiary}
        />

        {pictures.length > 0 ? (
          <SlArrowRight onClick={goRight}></SlArrowRight>
        ) : null}
      </Pictures>

      {/* 해당 날짜별 사진들 */}
      <ImageDrawer
        open={open2}
        toggleDrawer={toggleDrawer}
        dayPictures={dayPictures}
        setImgUrl={setImgUrl}
        setOpen4={setOpen4}
        setThumbNailId={setThumbNailId}
      />

      {/* 사진 크게 보기 모달 */}
      <PictureModal
        open={open4}
        style={style}
        imgUrl={imgUrl}
        setOpen={setOpen4}
        changeThumbNail={changeThumbNail}
        deletePicture={deletePicture}
      />
    </div>
  );
};

export default PictureBox;
