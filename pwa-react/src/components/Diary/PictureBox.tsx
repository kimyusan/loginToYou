import React, { useState, useEffect } from "react";
import axios from "axios";

import { Pictures, PicItem, PicBox, PicContent, SelectBox } from "../../styles/Diary/PictureBox";
import { GalleryBox } from '../../styles/Diary/ShowGallery';

import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdOutlineClose } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

import useAuthStore from '../../stores/AuthStore';
import useUserStore from '../../stores/UserStore';
import useCoupleStore from "../../stores/CoupleStore";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

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

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

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

const PictureBox = (props: Props) => {
  const { window } = props;
  const [pictures, setPictures] = useState([]);
  const [dayPictures, setDayPictures] = useState<Diary[]>([]);
  const [open, setOpen] = useState(false);
  const [diaryOpen, setDiaryOpen] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [myContent, setMyContent] = useState("");
  const [yourContent, setYourContent] = useState("");
  const [myCom, setMyCom] = useState(false);
  const [yourCom, setYourCom] = useState(false);

  const { PATH } = useAuthStore();
  const { coupleId, userId, name, nickname } = useUserStore();
  const { yourId, yourName, yourNickName } = useCoupleStore();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  const card = new Array(today.getDate()).fill(0);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen2(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    axios.get(`${PATH}/diary/read?coupleId=${coupleId}`)
      .then((res) => {
        const data: Diary[] = [];
        for (let i=1; i < card.length+1; i++) {
          const dayData = res.data.filter((item: any) => "20" + item.saveFolder === `${year}${(month).toString().padStart(2, "0")}${i.toString().padStart(2, "0")}`)
          if (dayData) {
            data.push(dayData[0])
          }
        }
        setDayPictures(data);
        setPictures(res.data.filter((item: any) => "20" + item.saveFolder === `${year}${(month).toString().padStart(2, "0")}${day}`))
      })
      .catch((error) => console.log(error))
  }, [day])

  const [x, setX] = useState(-100 * (card.length - 2));

  const goLeft = () => {
    x === 100 ? setX(100) : setX(x + 100);
    if (x !== 100) {
      setDay(day - 1)
    }
  };

  const goRight = () => {
    x === -100 * (card.length - 2) ? setX(-100 * (card.length - 2)) : setX(x - 100);
    if (x !== -100 * (card.length - 2)) {
      setDay(day + 1)
    }
  };

  const openDetail = (id: String) => {
    setOpen(true)

    axios.get(`${PATH}/diary/memo/get`,{
      params: {
        userIdA: userId,
        userIdB: yourId,
        diaryId: id,
      }
    })
      .then((res) => {
        console.log(res.data)
        if (res.data[0].content && (res.data[0].userId === userId)) {
          setMyContent(res.data[0].content)
          setMyCom(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <div>
      <Pictures >
        <SlArrowLeft onClick={goLeft}></SlArrowLeft>
        <PicItem>
          {dayPictures.map((item, idx) => {
            const middleIdx = -(x / 100) + 1;
            const className = idx === middleIdx ? "slide middle" : "slide";
            let url = ""
            let Id = ""
            if (item) {
              url = `${PATH}/diary/getImg/${item["saveFolder"]}/${item["originalName"]}/${item["saveName"]}`;
              Id = `${item["diaryId"]}`
            } else {
              url = "https://www.morget.co.kr/shop/img/no_image.gif"
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
                  <img src={url} alt="일별 이미지" />
                </PicBox>
                <PicContent>{today.getFullYear()}.{(today.getMonth() + 1).toString().padStart(2, "0")}.{idx+1}</PicContent>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center"}}>
                <IoCreateOutline style={{ width: "20px", height: "20px"}}></IoCreateOutline> : 미작성
                <IoCreateOutline style={{ color: "#f68da2", marginLeft: "15px", width: "20px", height: "20px"}}></IoCreateOutline> : 작성
              </div>

              <MdOutlineClose onClick={() => setOpen(false)} style={{ width: "20px", height: "20px", marginBottom: "15px" }}></MdOutlineClose>
            </div>

            {diaryOpen === 0 ? <SelectBox>
              <div className="item">
                <div className={myCom ? "subItem complete" : "subItem"}>{nickname ? nickname : name} 일기</div>
                <IoCreateOutline className="subItem"></IoCreateOutline>
              </div>
              <div className="item">
                <div className={yourCom ? "subItem complete" : "subItem"}>{yourNickName ? yourNickName : yourName} 일기</div>
                <IoCreateOutline className="subItem"></IoCreateOutline>
              </div>
            </SelectBox> : null}

            {diaryOpen === 1 ? <div></div> : null}
            {diaryOpen === 2 ? <div></div> : null}
          </Box>
        </Modal>
        <SlArrowRight onClick={goRight}></SlArrowRight>
      </Pictures>

      <Root style={{ zIndex: "-1" }}>
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
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
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
            }}
          >
            <Puller />
            <Typography sx={{ p: 2, color: 'text.secondary' }}>{pictures.length}개의 사진들</Typography>
          </StyledBox>
          <GalleryBox>
            {pictures.length === 0 ? <div className='noPic'>사진 없음</div> : null}
            {pictures.map((item, idx) => {
              const url = `${PATH}/diary/getImg/${item["saveFolder"]}/${item["originName"]}/${item["saveName"]}`
              return (
                <div key={idx} className='item'>
                  <img src={url} alt="일별 사진들" />
                </div>
              )
            })}
          </GalleryBox>
        </SwipeableDrawer>
      </Root>
    </div>
  );
};

export default PictureBox;
