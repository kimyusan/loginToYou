import styled from "styled-components";
import { Card } from "../common/card";

const Wrapper = styled.div`
  .footer {
    text-align: center;
    color: ${(props) => props.theme.color.sub1};
  }
`;

const MainSec = styled.div`
  display: grid;
  grid-template:
    "b a" 1fr
    "b c" 1fr / 1fr 1fr;
  gap: 2dvw;
  padding-left: 5dvw;
  padding-right: 5dvw;
  .camera {
    grid-area: b;
    position: relative;
    background-color: ${(props) => {
      return props.theme.color.sub1;
    }};
    margin: 0;
    padding: 0;
    overflow: hidden;
    z-index: 4;
    box-shadow: 0 0 0 0;
    .arrow {
      position: absolute;
      right: 5%;
      top: 45%;
    }
    .cameraIcon {
      position: absolute;
      bottom: 0;
      left: -2rem;
      transition: 0.2s all ease;
    }

    .camera_title {
      position: absolute;
      right: 0;
      text-align: end;
      font-size: 1.5rem;
      padding-top: 13%;
      padding-right: 10%;
      p {
        margin: 0;
      }
    }
    .camera_box {
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: end;
      justify-content: center;
    }
    .camera_button {
      background-color: ${(props) => props.theme.color.sub3};
      border: none;
      position: absolute;
      height: 100%;
      width: 15%;
    }
    .open {
      left: 0;
    }
    .close {
      left: 0;
    }
    .camera_solo,
    .camera_couple {
      height: 40%;
      width: 65%;
      box-shadow: none;
      position: relative;
      /* border-radius: 0; */
      margin: 5%;
    }
    .camera_solo {
      margin-bottom: 2%;
      background-color: ${(props) => props.theme.color.sub5};
    }
    .camera_couple {
      margin-top: 2%;
      background-color: ${(props) => props.theme.color.sub4};
    }
    .iconLabel {
      font-size: 1.3rem;
    }
    .camera_icon {
      position: absolute;
      bottom: 0%;
      right: 5%;
      z-index: 1;
      opacity: 0.4;
    }
    .camera_des {
      position: absolute;
      z-index: 2;
      width: 90%;
      bottom: 0;
      font-size: 1rem;
      p {
        margin: 0;
      }
    }
  }
  .clicked {
    box-shadow: 0 0 0 0;
  }
  .choice {
    z-index: 3;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  .show {
    width: 120%;
    transform: translateX(70%);
  }
  .unvisible {
    display: none;
  }

  .diary {
    grid-area: a;
    aspect-ratio: 1;
    position: relative;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    margin: 0;
    overflow: hidden;
    .diary_image {
      position: absolute;
      top: 0;
      right: 0;
      height: 70%;
      width: 70%;
      aspect-ratio: 1;
      opacity: 0.6;
      color: ${(props) => props.theme.color.sub1};
    }
    p {
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 5dvw;
      font-size: 1.5rem;
      color: white;
    }

    .iconLabel {
      position: absolute;
      font-size: 1.5rem;
      left: 10px;
      top: 10px;
      color: white;
    }

    .icon {
      position: absolute;
      right: -15px;
      bottom: -15px;
    }
  }
  .chat {
    grid-area: c;
    aspect-ratio: 1;
    position: relative;
    background-color: ${(props) => {
      return props.theme.color.sub3;
    }};
    margin: 0;
    overflow: hidden;

    .iconLabel {
      position: absolute;
      font-size: 1.5rem;
      left: 10px;
      top: 10px;
      color: white;
    }

    .icon {
      position: absolute;
      right: 0;
      bottom: -20px;
    }

    .chat_name {
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 5dvw;
      font-size: 1.5rem;
      color: white;
    }
    .chat_num {
      z-index: 1;
      margin: 0;
      position: absolute;
      right: 5dvw;
      bottom: 1dvh;
      font-family: "Phudu", sans-serif;
      font-weight: 600;
      font-size: 8rem;
      color: ${(props) => {
        return props.theme.color.sub1;
      }};
    }
  }
`;

const CalendarSec = styled(Card)`
  height: 25dvh;

  display: flex;
  position: relative;
  overflow: hidden;
  .left_side {
    font-family: "Phudu", sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 60%;
    padding: 1dvw;
    height: auto;
    overflow: hidden;
    .year_month {
      margin: 1dvw;
      font-size: 1.3rem;
    }
    .date {
      /* position: absolute; */
      left: 2dvw;
      bottom: 0;
      font-weight: 600;
      line-height: 1;
      color: ${(props) => {
        return props.theme.color.sub1;
      }};
      font-size: 7rem;
    }
  }
  .right_side {
    position: relative;
    width: 40%;
    display: flex;
    .next_schedule {
      position: absolute;
      margin-left: 20%;
      margin-top: 20%;
      top: 0;
      padding: 0;
      font-size: 0.9rem;
      p {
        margin-top: 2%;
        margin-bottom: 7%;
        color: ${(props) => props.theme.color.grey};
      }
      li::marker {
        color: ${(props) => props.theme.color.main};
      }
    }
  }
  .no_events {
    margin: 0;
    width: 100%;
    position: absolute;
    top: 0;
    margin-top: 20%;
    margin-left: 10%;
    p {
      margin: 0;
    }
  }
  .goToCal {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.9rem;
    margin-right: 3%;
    color: ${(props) => props.theme.color.grey};
  }
`;

const MyCalendar = styled.div`
  width: 100%;
  z-index: 1 !important;
  height: 100%;
  * {
    border-color: transparent !important;
  }
  .fc-day-today {
    background-color: ${(props) => props.theme.color.sub4} !important;
    border-radius: 50% !important;
  }
  .fc-daygrid-day-events {
    display: none !important;
  }
  .fc-toolbar {
    margin: 0 !important;
    width: 100% !important;
  }
  .fc-toolbar-title {
    font-size: 1.1rem !important;
    color: ${(props) => {
      return props.theme.color.main;
    }};
  }
  .fc-prev-button,
  .fc-next-button,
  .fc-today-button {
    display: none;
  }
  .fc-daygrid-body {
    width: 100% !important;
    text-align: center !important;
  }
  .fc-col-header {
    width: 100% !important;
    background-color: #ececec;
    font-size: 0.8rem;
    font-weight: 300;
  }
  .fc-scrollgrid-sync-table {
    width: 100% !important;
  }
  .fc-daygrid-day-number {
    font-size: 0.9em;
    width: 10dvw !important;
  }
  .fc-scrollgrid-section {
    overflow: hidden !important;
  }
`;

const QuestionSec = styled.div`
  .question_card {
    position: relative;
    height: 13dvh;
    overflow: hidden;
    .question {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 1;
      p {
        font-size: 1.2rem;
        margin: 0;
        z-index: 5;
        display: flex;
      }
      svg {
        margin: 0 !important;
      }
      .todays {
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        width: 50%;
      }
      .questionDetail {
        align-self: flex-end;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        :nth-child(1) {
          font-size: 0.9rem;
        }
      }
      .goToAns {
        width: 100%;
        display: flex;
        justify-content: end;
        font-size: 1rem;
        margin-top: 5px;
        color: ${(props) => props.theme.color.grey};
      }
    }
    .answer {
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5%;
      margin-top: 5%;
      .my_answer,
      .your_answer {
        border-radius: 5%;
        z-index: 3;
        background-color: ${(props) => {
          return props.theme.color.grey;
        }}15;
        display: flex;
        flex-direction: column;
        position: relative;
        p {
          margin: 0;
        }
        :nth-child(2) {
          padding: 6%;
        }
        .css-1j047yb-MuiChip-root {
          max-width: auto !important;
          min-width: 100%;
          display: flex;
          justify-content: start;
        }
      }
    }
    .q {
      z-index: 0;
      position: absolute;
      font-size: 9rem;
      font-weight: 700;
      color: ${(props) => {
        return props.theme.color.sub4;
      }};
      top: 5dvh;
      line-height: 0;
      left: 2dvw;
      z-index: 0;
    }
  }
`;

const BalanceSec = styled.div`
  margin-bottom: 3dvh;
  .balance_game {
    height: 15dvh;
    margin: 5dvw;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: ${(props) => {
      return props.theme.color.sub5;
    }};
    .versus {
      margin-top: 7%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .q {
        width: 100%;
        padding: 5% 0;
        position: relative;
        display: flex;
        justify-content: space-between;
        background-color: white;
      }
      .versus_logo {
        position: absolute;
        font-size: 5.5rem;
        font-weight: 700;
        color: ${(props) => {
          return props.theme.color.sub2;
        }};
        font-family: "Phudu", sans-serif;
        text-shadow: -1px 0px white, 0px 1px white, 1px 0px white,
          0px -1px white;
      }
    }
    .text {
      position: absolute;
      bottom: 3%;
      right: 0;
      z-index: 5;
      font-size: 0.9rem;
      p {
        margin: 0;
        display: flex;
        justify-content: center;
      }
      color: grey;
    }
  }
`;

const ChallengeSec = styled.div`
  @font-face {
    font-family: "Giants-Inline";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Giants-Inline.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  .challenge {
    margin-bottom: 10dvh;
    position: relative;
    height: 15dvh;
    overflow: hidden;
    p {
      margin: 0;
    }
    .challenge_title {
      font-family: "Giants-Inline";
      font-size: 1.5rem;
      color: ${(props) => {
        return props.theme.color.point;
      }};
    }
    .box {
      background-color: ${(props) => {
        return props.theme.color.sub4;
      }};
      position: absolute;
      height: 20dvh;
      aspect-ratio: 1;
      border: 5px solid;
      border-color: ${(props) => props.theme.color.sub2};
    }
    .right_top {
      rotate: 45deg;
      bottom: 50%;
      left: 80%;
    }
    .right_bottom {
      rotate: -45deg;
      top: 50%;
      left: 80%;
    }
    .go_challenge {
      display: flex;
      color: grey;
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 0.9rem;
      margin: 3%;
    }
  }
`;

export {
  Wrapper,
  MainSec,
  QuestionSec,
  BalanceSec,
  CalendarSec,
  MyCalendar,
  ChallengeSec,
};
