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
  padding-right: 5%;
  .camera {
    grid-area: b;
    aspect-ratio: 0.5;
    position: relative;
    background-color: #ff9aab;
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
    p {
      position: absolute;
      margin-left: 10%;
      bottom: 0;
      font-size: 1.2rem;
      color: white;
    }
  }
  .chat {
    grid-area: c;
    aspect-ratio: 1;
    position: relative;
    background-color: #ffcdd9;
    .chat_name {
      position: absolute;
      bottom: 0;
      margin-left: 10%;
      font-size: 1.2rem;
      color: white;
    }
    .chat_num {
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

const SecondSection = styled.div`
  ${Card} {
    padding: 3%;
    margin: 5%;
    height: 20vh;
  }
`;

const ThirdSection = styled.div`
  
`

export { Wrapper, FirstSection, SecondSection, ThirdSection };
