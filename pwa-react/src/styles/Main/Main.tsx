import styled from "styled-components";
import { Card } from "../common/card";

const Wrapper = styled.div``;

const FirstSection = styled.div`
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
    overflow: hidden;

    .cameraIcon {
      position: absolute;
      bottom: 0;
      left: -3rem;
    }

    div {
      position: absolute;
      right: 0;
      text-align: end;
      font-size: 1.5rem;
      padding-top: 5dvh;
      padding-right: 5dvw;
      p {
        margin: 0;
      }
    }
  }
  .diary {
    grid-area: a;
    aspect-ratio: 1;
    position: relative;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    margin: 0;
    p {
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 5dvw;
      font-size: 1.5rem;
      color: white;
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
  /* padding: 3dvw; */
  /* margin: 5%; */
  /* height: max-content; */
  display: flex;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  font-family: "Phudu", sans-serif;
  .left_side {
    position: relative;
    width: 50dvw;
    padding: 1dvw;
    height: auto;
    .year_month {
      position: absolute;
      margin: 1dvw;
      font-size: 1.3rem;
    }
    .date {
      position: absolute;
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
    width: 50dvw;
    .next_schedule {
      position: absolute;
      bottom: 0;

      li::marker {
        color: ${(props) => props.theme.color.main};
      }
    }
  }
`;

const SecondSection = styled.div`
  ${Card} {
    height: 20dvh;
  }
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
        width: 50%;
      }
      .questionDetail {
        font-size: 1.1rem;
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

const ThirdSection = styled.div`
  margin-bottom: 3dvh;
  display: flex;
  ${Card} {
    margin-top: 0;
    width: 50dvw;
    aspect-ratio: 1.5;
  }
  .balance_game {
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    margin-right: 2dvw;
    position: relative;
    div:nth-child(1) {
      z-index: 2;
      position: absolute;
      left: 10px;
      bottom: 10px;
      font-size: 1.3rem;
      color: white;
    }
    div:nth-child(2) {
      z-index: 1;
      line-height: 1;
      position: absolute;
      font-size: 6rem;
      font-weight: 700;
      color: ${(props) => {
        return props.theme.color.sub4;
      }};
      font-family: "Phudu", sans-serif;
      right: 2dvw;
      top: 1dvh;
      margin: 0;
    }
  }
  .challenge {
    margin-left: 0;
    position: relative;
    div {
      display: flex;
      flex-direction: column;
      align-items: end;
      bottom: 1dvw;
      right: 2dvw;
      div {
        margin: 0;
        font-size: 1.3rem;
      }
    }
  }
`;

export { Wrapper, FirstSection, SecondSection, ThirdSection, CalendarSec };
