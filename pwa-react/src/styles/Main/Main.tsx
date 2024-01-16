import styled from "styled-components";
import { Card } from "../common/card";

const Wrapper = styled.div``;

const FirstSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5%;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
  ${Card} {
    /* background-color: tomato; */
    aspect-ratio: 1;
    margin: 0;
    display: flex;

    align-items: center;
    justify-content: center;
    div {
      font-size: 1.1em;
    }
  }
`;
const SecondSection = styled.div`
  ${Card} {
    /* background-color: gold; */
    padding: 3%;
    margin: 5%;
    height: 20vh;
  }
`;

export { Wrapper, FirstSection, SecondSection };
