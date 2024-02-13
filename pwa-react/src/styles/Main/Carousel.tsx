import styled from "styled-components";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import StopIcon from "@mui/icons-material/Stop";

// Carousel
const Wrapper = styled.div`
  margin-bottom: 3%;
`;

const Container = styled.div`
  width: 100dvw;
  /* border-left: 5dvw solid black;
  border-right: 5dvw solid black; */

  /* overflow: hidden; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  border-radius: 7px;
`;

const Slides = styled.div`
  z-index: 1;
  display: flex;
  transition: transform 0.5s ease;
  height: 15dvh;
  border-radius: 7px;
`;

const Slide = styled.div`
  background-color: transparent;

  border-radius: 7px;
`;

const PrevButton = styled(ArrowLeftIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 5;
  left: 0;
`;
const NextButton = styled(ArrowRightIcon)`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 5;
  right: 0;
`;

const IndexBox = styled.div`
  display: flex;
  justify-content: center;
  .focused_card {
    color: ${(props) => props.theme.color.sub1};
  }
`;

const CardIndex = styled(StopIcon)`
  font-size: 1.1rem !important;
  color: ${(props) => props.theme.color.lightgrey};
`;

// CarouselItem
const CarouselCard = styled.div`
  width: 90dvw;
  height: 100%;
  margin: 0 5dvw;
  background-color: #ececec;
  border-radius: 7px;
  position: relative;
  overflow: hidden;
  // 오늘의 질문
  .q_image {
    position: absolute;
    height: 110%;
    z-index: 1;
    opacity: 0.5;
  }
  .left {
    top: 20%;
    right: 70%;
  }
  .right {
    bottom: 20%;
    left: 75%;
  }
  p {
    position: absolute;
    z-index: 2;
    margin: 0;
  }
  .q_title {
    font-family: "Phudu", sans-serif;
    margin-top: 5%;
    margin-left: 5%;
    font-size: 1.6rem;
  }
  .q_content {
    top: 50%;
    left: 17%;
    width: 70%;
    font-size: 0.8rem;
  }

  // 밸런스게임
  .balance_image {
    position: absolute;
    height: 120%;
    z-index: 1;
  }
  .pink {
    left: 0;
    top: 0;
    opacity: 0.7;
  }
  .white {
    height: 50%;
    left: 87%;
    top: 0;
  }
  .big {
    height: 120%;
    top: 25%;
    left: 70%;
  }
  .arrow {
    height: 35%;
    right: 85%;
    top: 50%;
  }
  p {
    margin: 0;
  }
  .balance_title {
    top: 30%;
    left: 40%;
  }
  .balance_content {
    font-size: 1.3rem;
    top: 50%;
    left: 40%;
  }
  // 챌린지
  .challenge_image {
    position: absolute;
    height: 120%;
    z-index: 1;
  }
  .check {
    left: 68%;
    top: 15%;
  }
  .challenge_box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50%;
    margin-top: 7%;
    margin-left: 10%;
  }
  .challenge_title {
    position: relative;
    font-size: 1.3rem;
    font-weight: 700;
    /* margin-top: 8%;
    margin-left: 10%; */
  }
  .challenge_content {
    position: relative;
    font-size: 1.1rem;
    /* top: 55%;
    left: 10%; */
  }
  .box {
    position: absolute;
    background-color: #ffe659;
    height: 70%;
    width: 50%;
    bottom: 50%;
    right: 80%;
    transform: rotate(-45deg);
    box-shadow: 2px 2px 10px #d0d0d0;
  }
`;

export {
  Wrapper,
  Container,
  Slides,
  Slide,
  PrevButton,
  NextButton,
  IndexBox,
  CardIndex,
  CarouselCard,
};
