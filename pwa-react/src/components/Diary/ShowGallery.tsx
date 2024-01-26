import { useState, useEffect } from 'react';

import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import useAuthStore from '../../stores/AuthStore';
import useUserStore from '../../stores/UserStore';
import axios from 'axios';

import { GalleryBox } from '../../styles/Diary/ShowGallery';

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
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

export default function ShowGallery(props: Props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const [pictures, setPictures] = useState([]);

  const { PATH } = useAuthStore();
  const { coupleId } = useUserStore();

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    axios.get(`${PATH}/diary/read?coupleId=${coupleId}`)
      .then((res) => {
        console.log(res.data)
        setPictures(res.data.filter((item: any) => "20" + item.saveFolder.substr(0,4) === `${year}${month.toString().padStart(2, "0")}`))
      })
      .catch((error) => console.log(error))
  }, [])


  return (
    <Root>
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
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        onClick={toggleDrawer(!open)}
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
                <img src={url} alt="월별 사진들" />
              </div>
            )
          })}
        </GalleryBox>
      </SwipeableDrawer>
    </Root>
  );
}