import styled from "styled-components";

import { Paper, Card, Button } from "@mui/material";

const MonthHeader = styled.div`
  margin: 0;
  position: sticky;
  padding-top: 7%;
  padding-bottom: 5%;
  top: 0;
  background-color: ${(props) => {
    return props.theme.color.bgColor;
  }};
`;

const DaySelect = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;

  & .subBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & .dayBox {
    font-size: 20px;
    margin: 0 20px;
    font-weight: bold;
    border-bottom: 5px solid
      ${(props) => {
        return props.theme.color.sub4;
      }};
  }
`;

const QBox = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20dvh;
  margin: 5% 3%;
  background-color: ${(props) => {
    return props.theme.color.sub4;
  }} !important;
  padding: 5%;
  padding-bottom: 10%;
  box-shadow: 0px 0px 0px 0px !important;
  .date {
    margin: 0;
    font-weight: 600;
    font-size: 1.1rem;
  }
  .btn_container {
    padding: 0;
    display: flex;
    justify-content: center;
  }
    position: relative;
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background: linear-gradient(-45deg, #f9f9f9 10px, transparent 0),
        linear-gradient(45deg, #f9f9f9 10px, transparent 0);
      background-position: left-bottom;
      background-repeat: repeat-x;
      background-size: 20px 20px;

  }
`;

const SaveButton = styled(Button)`
  width: 100%;
  background-color: ${(props) => {
    return props.theme.color.sub2;
  }} !important;
  position: static !important;
  font-size: 1rem !important;
  padding: 1% 0 !important;
`;

export { MonthHeader, DaySelect, QBox, SaveButton };
