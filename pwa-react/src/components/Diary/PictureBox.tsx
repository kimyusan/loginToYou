import React, { useState, useEffect } from "react";
import axios from "axios";

import { Pictures, PicItem, PicBox, PicContent, SelectBox } from "../../styles/Diary/PictureBox";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import useAuthStore from '../../stores/AuthStore';
import useUserStore from '../../stores/UserStore';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useCoupleStore from "../../stores/CoupleStore";
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: 0,
  boxShadow: 24,
  borderRadius: "5px",
  p: 3,
};

const PictureBox = () => {
  const [pictures, setPictures] = useState([]);
  const [open, setOpen] = useState(false);

  const { PATH } = useAuthStore();
  const { coupleId,userId } = useUserStore();
  const { fuserId,suserId } = useCoupleStore();

  const today = new Date();
  const card = new Array(today.getDate()).fill(0);

  useEffect(() => {
    axios.get(`${PATH}/diary/read?coupleId=${coupleId}`)
      .then((res) => {
        setPictures(res.data.filter((item: any) => "20" + item.saveFolder.substr(0, 4) === `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, "0")}`))
      })
      .catch((error) => console.log(error))
  }, [])

  const [x, setX] = useState(-100 * (card.length - 2));

  const goLeft = () => {
    x === 100 ? setX(100) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (card.length - 2) ? setX(-100 * (card.length - 2)) : setX(x - 100);
  };

  const openDetail = (idx: number) => {
    setOpen(true)
  }

  return (
    <Pictures >
      <SlArrowLeft onClick={goLeft}></SlArrowLeft>
      <PicItem>
        {card.map((item, idx) => {
          const middleIdx = -(x / 100) + 1;
          const className = idx === middleIdx ? "slide middle" : "slide";
          return (
            <div
              key={idx}
              className={className}
              style={
                className === "slide middle"
                  ? { transform: `translateX(${x}%) scaleX(2.1) scaleY(1.5)` }
                  : { transform: `translateX(${x}%)` }
              }
              onClick={() => openDetail(idx + 1)}
            >
              <PicBox></PicBox>
              <PicContent>{today.getFullYear()}.{(today.getMonth() + 1).toString().padStart(2, "0")}.{today.getDate()}</PicContent>
            </div>
          );
        })}
      </PicItem>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <MdOutlineClose onClick={() => setOpen(false)} style={{width: "20px", height: "20px", marginBottom: "15px"}}></MdOutlineClose>
          </div>

          <SelectBox>
            <div className="item">
              <div className="subItem">나의 일기</div>
              <IoCreateOutline className="subItem"></IoCreateOutline>
            </div>
            <div className="item">
              <div className="subItem">나의 일기</div>
              <IoCreateOutline className="subItem"></IoCreateOutline>
            </div>
          </SelectBox>

          {}
        </Box>
      </Modal>
      <SlArrowRight onClick={goRight}></SlArrowRight>
    </Pictures>
  );
};

export default PictureBox;
