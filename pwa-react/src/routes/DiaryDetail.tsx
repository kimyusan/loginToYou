import React, { useEffect, useRef, useState } from "react";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";
import { axiosAuth } from "../util/token";

import { useLocation, useNavigate } from "react-router-dom";
import { DiaryInterface } from "../interface/DiaryInterface";
import useAuthStore from "../stores/AuthStore";
import {
  Wrapper,
  Image,
  Slide,
  Dotbox,
  ContentBox,
  Header,
  BgWhite,
} from "../styles/Diary/DiaryDetail";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IconContext } from "react-icons";
import DiaryView from "../components/Diary/DiaryView";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {};

function DiaryDetail({}: Props) {
  const PATH = useAuthStore.getState().PATH;
  const navigate = useNavigate();
  const { state } = useLocation();
  const [diary, setDiary] = useState<DiaryInterface>(state.diary);
  const [diaryImages, setDiaryImages] = useState<DiaryInterface[]>(
    state.images
  );
  const [now, setNow] = useState(0);
  const [mainIdx, setMainIdx] = useState(0);
  const [clickPosition, setClickPosition] = useState(0);
  const [mode, setMode] = useState("photo");
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  const DiaryImage = (item: DiaryInterface) => {
    return `${PATH}/diary/getImg/${item.saveFolder}/${item.originalName}/${item.saveName}`;
  };

  // 슬라이드 넘기는 함수
  const MouseDown = (e: React.TouchEvent<HTMLDivElement>) => {
    setClickPosition((prev) => e.changedTouches[0].pageX);
  };

  const MouseUp = (e: React.TouchEvent<HTMLDivElement>) => {
    let leavePosition = e.changedTouches[0].pageX;
    if (leavePosition > clickPosition) {
      setNow((prev) => {
        if (prev == 0) return prev;
        return prev - 1;
      });
    } else {
      setNow((prev) => {
        if (prev == diaryImages.length - 1) return prev;
        return prev + 1;
      });
    }
  };

  // 최초 접속 시 대표이미지로 이동
  useEffect(() => {
    setNow(diaryImages.indexOf(diary));
    setMainIdx(diaryImages.indexOf(diary));
  }, []);

  // 대표 사진 변경 함수
  const changeThumbNail = async () => {
    const newId = diaryImages[now].diaryId;

    try {
      const res = await axiosAuth.put(
        `/diary/thumbnail/update?diaryId=${diary.diaryId}&newDiaryId=${newId}`,
        {}
      );

      setDiary((prev) => diaryImages[now]);
      setMainIdx((prev) => now);
    } catch (err) {
      console.error(err);
    }
  };

  // 사진 삭제 함수
  const deletePicture = async () => {
    try {
      setDiaryImages((prev) =>
        diaryImages.filter((each) => {
          return each.saveName != diaryImages[now].saveName;
        })
      );
      if (diaryImages.length == 1) {
        navigate("/diary");
      } else {
        if (now == mainIdx) {
          setMainIdx(0);
        }
        setNow((prev) => {
          if (now == diaryImages.length - 1) {
            return prev - 1;
          } else {
            return prev;
          }
        });
      }
      const res = await axiosAuth.delete(
        `/diary/delete?diaryId=${diaryImages[now].diaryId}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BgWhite />
      <TokenCheker />
      <MenuSection />
      {/* 헤더 */}
      <Header>
        <div className="date">{diary.saveFolder}</div>
        <div className="tabbox">
          <div
            className={`tab ${mode == "photo" ? "selected" : undefined}`}
            onClick={() => {
              setMode("photo");
            }}
          >
            사진
          </div>
          <div
            className={`tab ${mode == "diary" ? "selected" : undefined}`}
            onClick={() => {
              setMode("diary");
            }}
          >
            다이어리
          </div>
        </div>
      </Header>
      {deleteModalOn ? (
        <Dialog
          open={deleteModalOn}
          onClose={() => {
            setDeleteModalOn(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"정말 삭제하시겠습니까?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              삭제된 사진은 복구할 수 없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setDeleteModalOn(false);
              }}
            >
              취소
            </Button>
            <Button
              onClick={() => {
                deletePicture();
                setDeleteModalOn(false);
              }}
              autoFocus
            >
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      {mode == "photo" ? (
        <Wrapper>
          {/* 슬라이드 */}
          <Slide
            $length={diaryImages.length}
            $height={window.innerWidth * 1.5}
            style={{ transform: `translateX(-${now * window.innerWidth}px)` }}
            onTouchStart={MouseDown}
            onTouchEnd={MouseUp}
          >
            {/* 갤러리 이미지 전체 */}
            {diaryImages.map((each: DiaryInterface, idx: number) => {
              return (
                <Image
                  key={idx}
                  $url={DiaryImage(each)}
                  $height={window.innerWidth * 1.5}
                />
              );
            })}
          </Slide>

          {/* 점 */}
          <Dotbox $height={window.innerWidth * 1.5}>
            {[...Array(diaryImages.length)]
              .map((_, i) => i)
              .map((dot, index) => {
                return (
                  <div
                    className={`dot ${index == now ? "selected" : undefined}`}
                  ></div>
                );
              })}
          </Dotbox>

          {/* 아래 내용 */}
          <ContentBox>
            {diaryImages[now] ? (
              <div className="content">{diaryImages[now].subject}</div>
            ) : (
              <div></div>
            )}
            <div className="iconBox">
              <IconContext.Provider value={{ size: "1.6rem" }}>
                {mainIdx == now ? (
                  <FaStar />
                ) : (
                  <FaRegStar
                    onClick={() => {
                      changeThumbNail();
                    }}
                  />
                )}
                <FaTrashCan
                  onClick={() => {
                    setDeleteModalOn(true);
                  }}
                />
              </IconContext.Provider>
            </div>
          </ContentBox>
        </Wrapper>
      ) : (
        <DiaryView date={diary.registerDate} />
      )}
    </>
  );
}

export default DiaryDetail;
