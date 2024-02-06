import React from "react";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";
import { useShallow } from "zustand/react/shallow";

import { SelectBox, CreateDiary } from "../../styles/Diary/PictureBox";
import { useTheme } from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdOutlineClose } from "react-icons/md";

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

  const { name, nickname, profileImage } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      nickname: state.nickname,
      profileImage: state.profileImage,
    }))
  );

  const { yourName, yourNickName, yourProfileImage } = useCoupleStore(
    useShallow((state) => ({
      yourName: state.yourName,
      yourNickName: state.yourNickName,
      yourProfileImage: state.yourProfileImage,
    }))
  );

  // 로그인 된 사용자의 내용
  const changeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (myContent.length > 100) {
      setMyContent(myContent.substr(0,100))
      return
    }
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
          <div></div>
          <MdOutlineClose
            onClick={() => (setOpen(false), setDiaryOpen(0))}
            style={{ width: "20px", height: "20px", marginBottom: "15px" }}
          ></MdOutlineClose>
        </div>

        {diaryOpen === 0 ? (
          <SelectBox>
            <div className="item" onClick={() => setDiaryOpen(1)}>
              <div className="name"><img src={profileImage} alt="나의 프로필 이미지"/>{nickname ? nickname : name} 님의 일기 <span>diary</span></div>
              <div className="content">
                {myCom && myContent !== "" ? <div className="yes">{myContent}</div> : <div className="no">아직 일기를 작성하지 않았어요</div>}
              </div>
            </div>
            <div className="item">
              <div className="name"><img src={yourProfileImage} alt="상대의 프로필 이미지"/>{yourNickName ? yourNickName : yourName} 님의 일기 <span>diary</span></div>
              <div className="content">
                {yourCom && yourContent !== "" ? <div className="yes">{yourContent}</div> : <div className="no">아직 일기를 작성하지 않았어요</div>}
              </div>
            </div>
          </SelectBox>
        ) : null}
        {diaryOpen === 1 ? (
          <div>
            {myCom ? (
              <div>
                <CreateDiary onSubmit={updateDiary}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "30%"}}>
                      <img src={profileImage} alt="프로필"></img>
                    </div>
                    <textarea value={myContent} onChange={changeContent} rows={10} cols={20} wrap="hard" maxLength={100} placeholder="일기를 작성해 보세요!"/>
                    <div style={{ textAlign: "end"}}>{myContent.length}/100</div>
                  </div>
                  <div>
                    <button type="submit">일기 수정</button>
                  </div>
                </CreateDiary>
              </div>
            ) : (
              <CreateDiary onSubmit={createDiary}>
                <div>
                  <textarea value={myContent} onChange={changeContent} rows={10} cols={20} wrap="hard" maxLength={100} placeholder="일기를 작성해 보세요!"/>
                  <div style={{ textAlign: "end"}}>{myContent.length}/100</div>
                </div>
                <div>
                  <button type="submit">일기 작성</button>
                </div>
              </CreateDiary>
            )}
          </div>
        ) : null}
      </Box>
    </Modal>
  );
}

export default DiaryModal;
