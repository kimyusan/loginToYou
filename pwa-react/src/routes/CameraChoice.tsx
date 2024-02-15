import React from "react";
import { useNavigate } from "react-router";

import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { CameraSelectBox } from "../styles/Camera/CameraSelect";
import CoupleMode from "../static/images/camera_couple.png";
import SoloMode from "../static/images/camera_solo.png";

type Props = {};

function CameraChoice({}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <TokenCheker />
      <MenuSection />

      <CameraSelectBox>
        <Card onClick={() => navigate("/camera/solo")} className="solo_card">
          <CardMedia className="card_image" image={SoloMode} />
          <CardContent className="card_content">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="card_title"
            >
              같이 찍기
            </Typography>
            <Typography variant="body1" color="text.secondary">
              우리가 함께 있을 때
            </Typography>
          </CardContent>
            <button>GO</button>
        </Card>

        <Card
          onClick={() => navigate("/camera/couple")}
          className="couple_card"
        >
          <CardMedia className="card_image" image={CoupleMode} />
          <CardContent className="card_content">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className="card_title"
            >
              따로 찍기
            </Typography>
            <Typography variant="body1" color="text.secondary">
              떨어져 있지만,
              <p>함께 있는 것처럼</p>
            </Typography>
          </CardContent>
            <button>GO</button>
        </Card>
      </CameraSelectBox>
    </>
  );
}

export default CameraChoice;
