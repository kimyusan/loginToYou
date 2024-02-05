import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { PictureDetailBox } from "../../styles/Diary/ShowGallery";
import { PictureBtnBox } from "../../styles/Diary/ShowGallery";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  style: object;
  imgUrl: string;
  changeThumbNail: () => void;
  deletePicture: () => void;
};

// 사진 크게 보는 모달
function PictureModal({
  open,
  style,
  imgUrl,
  setOpen,
  changeThumbNail,
  deletePicture,
}: Props) {
  return (
    <Modal
      open={open}
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
            <button onClick={() => setOpen(false)} className="subBtn">
              닫기
            </button>
          </div>
        </PictureBtnBox>
      </Box>
    </Modal>
  );
}

export default PictureModal;
