import styled from "styled-components";
import { Card } from "../common/card";

const Wrapper = styled.div``;

const BurgerButton = styled.button`
  z-index: 10000;
  position: absolute;
  top: 1%;
  right: 2%;
  background-color: transparent;
  border: none;
  font-size: 1.7rem;
`;

const FirstSection = styled.div`
  display: grid;
  grid-template:
    "b b a" auto
    "b b c" 2ch
    "b b c" 1em / 20% 20px 1fr;
  gap: 5%;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
`;

const SecondSection = styled.div`
  ${Card} {
    /* background-color: gold; */
    padding: 3%;
    margin: 5%;
    height: 20vh;
  }
`;

export { Wrapper, BurgerButton, FirstSection, SecondSection };
