import React from "react";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";
import { useShallow } from "zustand/react/shallow";

import { SelectBox, CreateDiary } from "../../styles/Diary/PictureBox";
import { useTheme } from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineClose } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

type Props = {
  open: boolean;
  modalStyle: object;
  diaryOpen: number;
  setOpen: (open: boolean) => void;
  setDiaryOpen: (num: number) => void;
  myContent: string;
  setMyContent: (content: string) => void;
  yourContent: string;
  myCom: boolean;
  yourCom: boolean;
  updateDiary: (event: React.FormEvent<HTMLFormElement>) => void;
  createDiary: (event: React.FormEvent<HTMLFormElement>) => void;
};

function DiaryModal({
  open,
  modalStyle,
  diaryOpen,
  setOpen,
  setDiaryOpen,
  myContent,
  setMyContent,
  yourContent,
  myCom,
  yourCom,
  updateDiary,
  createDiary,
}: Props) {
  const theme = useTheme();

  const { name, nickname } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      nickname: state.nickname,
    }))
  );
  const { yourName, yourNickName } = useCoupleStore(
    useShallow((state) => ({
      yourName: state.yourName,
      yourNickName: state.yourNickName,
    }))
  );

  // 로그인 된 사용자의 내용
  const changeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyContent(event.target.value);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
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
                <div>{yourNickName ? yourNickName : yourName} 님의 일기</div>
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
  );
}

export default DiaryModal;
