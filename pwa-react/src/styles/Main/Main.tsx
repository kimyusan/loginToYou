import styled from "styled-components";
import { Card } from "../common/card";

const Wrapper = styled.div``;


const FirstSection = styled.div`
  display: grid;
  grid-template:
    "b a" 1fr
    "b c" 1fr / 1fr 1fr;
  gap: 1em;
  padding-left: 5%;
  padding-right: 10%;
  .camera {
    grid-area: b;
    aspect-ratio: 0.5;
    position: relative;
    background-color: #ff9aab;
    margin: 0;
    div {
      position: absolute;
      right: 0;
      text-align: end;
      font-size: 1.4rem;
      padding-top: 13%;
      padding-right: 10%;
      p {
        margin: 0;
      }
    }
  }
  .diary {
    grid-area: a;
    aspect-ratio: 1;
    position: relative;
    background-color: pink;
    margin: 0;
    p {
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 10%;
      font-size: 1.3rem;
      color: white;
    }
  }
  .chat {
    grid-area: c;
    aspect-ratio: 1;
    position: relative;
    background-color: #ffcdd9;
    margin: 0;
    .chat_name {
      z-index: 2;
      position: absolute;
      left: 0;
      bottom: 0;
      margin: 10%;
      font-size: 1.3rem;
      color: white;
    }
    .chat_num {
      z-index: 1;
      margin: 0;
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: 10%;
      font-size: 7rem;
      color: hotpink;
    }
  }
`;

const CalendarSec = styled(Card)`
  padding: 3%;
  margin: 5%;
  height: 20vh;
  display: flex;
  justify-content: space-between;
  position: relative;
  .left_side {
    position: relative;
    width: 50%;
    .year_month {
      position: absolute;
      left: 5%;
      top: 0;
      font-size: 1.4rem;
      margin: 0;
    }
    .date {
      position: absolute;
      margin: 0;
      left: 5%;
      top: 5%;
      line-height: 1.5;
      color: #ff9aab;
      font-size: 6rem;
    }
  }
  .right_side {
    position: relative;
    width: 50%;
    .next_schedule {
      position: absolute;
      bottom: 5%;
    }
  }
`;

const SecondSection = styled.div`
  ${Card} {
    padding: 3%;
    margin: 5%;
    margin-bottom: 3%;
    height: 17vh;
  }
  .question_card {
    position: relative;
    .question {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #9b9b9b;
      padding-bottom: 3%;
      :nth-child(1) {
        font-size: 1.2rem;
      }
      p {
        margin: 0;
        z-index: 5;
      }
    }
    .answer {
      z-index: 3;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5%;
      margin-top: 5%;
      div {
        border-radius: 5%;
        z-index: 3;
        aspect-ratio: 2;
        background-color: #ececec73;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 1rem;
        }
      }
    }
    .q {
      z-index: 1;
      position: absolute;
      font-size: 8rem;
      font-weight: 700;
      color: #ffdde2;
      top: 0;
      line-height: 0.9;
      left: 7%;
    }
  }
`;

const ThirdSection = styled.div`
  margin-bottom: 10%;
  display: flex;
  ${Card} {
    width: 50%;
    aspect-ratio: 1.5;
  }
  .balance_game {
    background-color: #ff9aab;
    position: relative;
    p:nth-child(1) {
      z-index: 2;
      position: absolute;
      margin: 0;
      bottom: 0;
      font-size: 1.3rem;
      color: white;
      padding: 7% 3%;
    }
    p:nth-child(2) {
      z-index: 1;
      line-height: 1;
      position: absolute;
      font-size: 5rem;
      font-weight: 700;
      color: #ffc0ce;
      right: 0;
      top: 0;
      margin: 0;
      padding: 0 5%;
    }
  }
  .challenge {
    margin-left: 0;
    position: relative;
    div {
      display: flex;
      flex-direction: column;
      align-items: end;
      position: absolute;
      bottom: 5%;
      right: 5%;
      p {
        margin: 0;
        font-size: 1.3rem;
      }
    }
  }
`;

export { Wrapper, FirstSection, SecondSection, ThirdSection, CalendarSec };
