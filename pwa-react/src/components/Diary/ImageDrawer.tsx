import React from "react";
import { useNavigate } from "react-router-dom";

import { GalleryBox } from "../../styles/Diary/ShowGallery";
import { IconContext } from "react-icons";
import { IoAdd } from "react-icons/io5";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import useAuthStore from "../../stores/AuthStore";

type Props = {
  toggleDrawer: (newOpen: boolean) => () => void;
  window?: () => Window;
  open: boolean;
  dayPictures: never[];
  setImgUrl: (url: string) => void;
  setOpen4: (open: boolean) => void;
  setThumbNailId: (thumbId: string) => void;
};

function ImageDrawer({
  toggleDrawer,
  window,
  open,
  dayPictures,
  setImgUrl,
  setOpen4,
  setThumbNailId,
}: Props) {
  const PATH = useAuthStore.getState().PATH;
  const navigate = useNavigate();
  const drawerBleeding = 56;
  const container =
    window !== undefined ? () => window().document.body : undefined;

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

  return (
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
          <div className="item add" onClick={() => navigate("/main")}>
            <IconContext.Provider value={{ size: "3rem" }}>
              <IoAdd />
            </IconContext.Provider>
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
      </SwipeableDrawer>
    </Root>
  );
}

export default ImageDrawer;
