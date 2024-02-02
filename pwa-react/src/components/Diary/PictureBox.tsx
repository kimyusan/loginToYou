import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import { useTheme } from "styled-components";

import {
  Pictures,
  PicItem,
  PicBox,
  PicContent,
  SelectBox,
  CreateDiary,
  GoCreateDiary,
} from "../../styles/Diary/PictureBox";
import {
  GalleryBox,
  PictureDetailBox,
  PictureBtnBox,
} from "../../styles/Diary/ShowGallery";
import { DaySelect } from "../../styles/Diary/Diary";
import { BurgerButton } from "../../styles/common/hamburger";

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import Navbar from "../Navbar";

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
}

interface Diary {
  diaryId: number | null;
  coupleId: number | null;
  originalName: String | null;
  registerDate: String | null;
  saveFolder: String | null;
  saveName: String | null;
  subject: String | null;
}

const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));

const StyledBox = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: 0,
  boxShadow: 24,
  borderRadius: "5px",
  p: 3,
};

const PictureBox = (props: Props) => {
  const { window } = props;
  const [x, setX] = useState(100);
  const navigate = useNavigate();
  const theme = useTheme();

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

  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const { coupleId, userId, name, nickname } = useUserStore();
  const { yourId, yourName, yourNickName } = useCoupleStore();

  // 오늘 날짜 자동 계산
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(0);
  const [selectDay, setSelectDay] = useState("");

  // 햄버거 네비게이션
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const decreaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 1) {
        setYear((prevYear) => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
    setX(100);
    setDay(0);
  };

  const increaseMonth = () => {
    setMonth((prevMonth) => {
      if (prevMonth === 12) {
        setYear((prevYear) => prevYear + 1);
        return 1;
      } else {
        return prevMonth + 1;
      }
    });
    setX(100);
    setDay(0);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen2(newOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // 로그인 된 사용자의 내용
  const changeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyContent(event.target.value);
  };

  // 날짜별 사진 불러오기
  useEffect(() => {
    axios
      .get(`${PATH}/diary/read`, {
        params: {
          coupleId,
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
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
        setMyContent("");
        setYourContent("");
        setOriginalId(data.length > 0 ? `${data[day]["diaryId"]}` : "");
      })
      .catch((error) => console.log(error));
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
  const openDetail = (id: String) => {
    setDiaryId(id);
    console.log(
      `${year.toString()}-${month.toString().padStart(2, "0")}-${selectDay
        .toString()
        .substr(4, 6)}`
    );
    axios
      .get(`${PATH}/diary/memo/get`, {
        params: {
          coupleId,
          registerDate: `${year.toString()}-${month
            .toString()
            .padStart(2, "0")}-${selectDay.toString().substr(4, 6)}`,
        },
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOpen(true);
        setMyMemoId(res.data[0].diaryMemoId);
        if (res.data[0].content) {
          setMyContent(res.data[0].content);
          setMyCom(true);
        } else {
          setMyCom(false);
        }

        if (res.data[1].content) {
          setYourContent(res.data[1].content);
          setYourCom(true);
        } else {
          setYourCom(false);
        }
      })
      .catch((error) => {
        console.log("작성된 다이어리 없음", error);
      });
  };

  // 개인 별 다이어리 작성
  const createDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(
        `${PATH}/diary/memo/regist`,
        {
          diaryMemoId: null,
          coupleId,
          userId,
          registerDate: null,
          content: myContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setDiaryOpen(0);
        setMyCom(true);
        console.log("다이어리 작성 성공", res.data);
      })
      .catch((error) => console.log(error));
  };

  // 개인 별 다이어리 업데이트
  const updateDiary = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .put(
        `${PATH}/diary/memo/update`,
        {
          diaryMemoId: myMemoId,
          coupleId,
          userId,
          registerDate: `${year.toString()}-${month
            .toString()
            .padStart(2, "0")}-${selectDay.toString().substr(4, 6)}`,
          content: myContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res: any) => {
        setDiaryOpen(0);
        console.log("다이어리 업데이트 성공", res.data);
      })
      .catch((error) => console.log(error));
  };

  // 대표 사진 체인지함수
  const changeThumbNail = () => {
    axios
      .put(
        `${PATH}/diary/thumbnail/update?diaryId=${originalId}&newDiaryId=${thumbNailId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log("대표사진 수정 성공", res.data);
        setCommit(!commit);
        setOpen4(false);
        setOpen2(false);
      })
      .catch((error) => console.log(error));
  };

  // 사진 삭제 함수
  const deletePicture = () => {
    axios
      .delete(`${PATH}/diary/delete?diaryId=${thumbNailId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log("사진 삭제 성공", res.data);
        setCommit(!commit);
        setOpen4(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ backgroundColor: theme.color.grey }}>
      {/* 네비바 */}
      <BurgerButton onClick={toggleNavigation}>
        {isNavigationOpen ? "×" : "☰"}
      </BurgerButton>

      <Navbar isOpen={isNavigationOpen} />

      {/* 날짜 선택 */}
      <DaySelect>
        <div className="subBox">
          <SlArrowLeft onClick={decreaseMonth}></SlArrowLeft>
          <div className="dayBox">
            {year}.{month.toString().padStart(2, "0")}.{selectDay.substr(4, 6)}
          </div>
          <SlArrowRight onClick={increaseMonth}></SlArrowRight>
        </div>
      </DaySelect>

      {/* 다이어리 캐러셀 */}
      {pictures.length > 0 ? null : (
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
      )}
      <Pictures>
        {pictures.length > 0 ? (
          <SlArrowLeft onClick={goLeft}></SlArrowLeft>
        ) : null}
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

        {/* 다이어리 작성시 모달 */}
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {diaryOpen === 0 ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IoCreateOutline
                    style={{ width: "20px", height: "20px" }}
                  ></IoCreateOutline>{" "}
                  미작성
                  <IoCreateOutline
                    style={{
                      color: theme.color.sub1,
                      marginLeft: "15px",
                      width: "20px",
                      height: "20px",
                    }}
                  ></IoCreateOutline>{" "}
                  작성
                </div>
              ) : (
                <div style={{ fontWeight: "bold" }}>
                  {diaryOpen === 1 ? (
                    <div>{nickname ? nickname : name} 님의 일기</div>
                  ) : null}
                  {diaryOpen === 2 ? (
                    <div>
                      {yourNickName ? yourNickName : yourName} 님의 일기
                    </div>
                  ) : null}
                </div>
              )}
              <MdOutlineClose
                onClick={() => (setOpen(false), setDiaryOpen(0))}
                style={{ width: "20px", height: "20px", marginBottom: "15px" }}
              ></MdOutlineClose>
            </div>

            {diaryOpen === 0 ? (
              <SelectBox>
                <div className="item" onClick={() => setDiaryOpen(1)}>
                  <div>{nickname ? nickname : name} 일기</div>
                  <IoCreateOutline
                    className={myCom ? "subItem complete" : "subItem"}
                  ></IoCreateOutline>
                </div>
                <div className="item" onClick={() => setDiaryOpen(2)}>
                  <div>{yourNickName ? yourNickName : yourName} 일기</div>
                  <IoCreateOutline
                    className={yourCom ? "subItem complete" : "subItem"}
                  ></IoCreateOutline>
                </div>
              </SelectBox>
            ) : null}
            {diaryOpen === 1 ? (
              <div>
                {myCom ? (
                  <div>
                    <CreateDiary onSubmit={updateDiary}>
                      <textarea value={myContent} onChange={changeContent} />
                      <button type="submit">일기 수정</button>
                    </CreateDiary>
                  </div>
                ) : (
                  <CreateDiary onSubmit={createDiary}>
                    <textarea value={myContent} onChange={changeContent} />
                    <button type="submit">일기 작성</button>
                  </CreateDiary>
                )}
              </div>
            ) : null}
            {diaryOpen === 2 ? (
              <div style={{ whiteSpace: "pre" }}>
                {yourContent ? yourContent : "아직 일기를 쓰지 않았어요 ㅠㅠ"}
              </div>
            ) : null}
          </Box>
        </Modal>
        {pictures.length > 0 ? (
          <SlArrowRight onClick={goRight}></SlArrowRight>
        ) : null}
      </Pictures>

      {/* 해당 날짜별 사진들 */}
      <Root style={{ zIndex: "-1" }}>
        <CssBaseline />
        <Global
          styles={{
            ".MuiDrawer-root > .MuiPaper-root": {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: "visible",
            },
          }}
        />
        <SwipeableDrawer
          container={container}
          anchor="bottom"
          open={open2}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          onClick={toggleDrawer(!open2)}
        >
          <StyledBox
            sx={{
              position: "absolute",
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: "visible",
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              {dayPictures.length}개의 사진들
            </Typography>
          </StyledBox>
          <GalleryBox>
            <div className="item" onClick={() => navigate("/camera")}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6388/6388838.png"
                alt="사진 추가 버튼"
              />
            </div>

            {dayPictures.map((item, idx) => {
              const url = `${PATH}/diary/getImg/${item["saveFolder"]}/${item["originName"]}/${item["saveName"]}`;
              return (
                <div
                  key={idx}
                  className="item"
                  onClick={() => (
                    setImgUrl(url),
                    setOpen4(true),
                    setThumbNailId(item["diaryId"])
                  )}
                >
                  <img src={url} alt="일별 사진들" />
                </div>
              );
            })}
          </GalleryBox>

          {/* 사진 크게 보는 모달 */}
          <Modal
            open={open4}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PictureDetailBox>
                <img src={imgUrl} alt="사진 크게 보기" />
              </PictureDetailBox>

              <PictureBtnBox>
                <button onClick={changeThumbNail} className="updateBtn">
                  대표 사진 등록
                </button>
                <div className="subBtns">
                  <button onClick={deletePicture} className="subBtn">
                    삭제
                  </button>
                  <button onClick={() => setOpen4(false)} className="subBtn">
                    닫기
                  </button>
                </div>
              </PictureBtnBox>
            </Box>
          </Modal>
        </SwipeableDrawer>
      </Root>
    </div>
  );
};

export default PictureBox;
