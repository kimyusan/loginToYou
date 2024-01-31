import styled from "styled-components";

import { Paper, Card, Button } from "@mui/material";

const MonthHeader = styled.div`
  margin: 0;
  position: sticky;
  padding-top: 7%;
  padding-bottom: 5%;
  top: 0;
  background-color: #f9f9f9;
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
    border-bottom: 5px solid #ffd1da;
  }
`;

const QBox = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20svh;
  margin: 5% 3%;
  background-color: #ffe2e7 !important;
  padding: 5%;
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
`;

const SaveButton = styled(Button)`
  width: 100%;
  background-color: #ffb6c2 !important;
  position: static !important;
  font-size: 1rem !important;
  padding: 1% 0 !important;
`;

export { MonthHeader, DaySelect, QBox, SaveButton };
