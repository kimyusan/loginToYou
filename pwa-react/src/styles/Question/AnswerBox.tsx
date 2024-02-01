import styled from "styled-components";

import { Paper, Card } from "@mui/material";

const AnswerContainer = styled(Paper)`
  min-height: 100vh;
  margin: 5% 3%;
  background-color: ${(props) => {
    return props.theme.color.sub4;
  }} !important;
  padding: 3%;
`;

const AnsCard = styled(Card)`
  aspect-ratio: 1;
  margin-bottom: 7%;
  padding: 4%;
  p {
    padding: 0;
    margin: 0;
  }
  .Mui-selected {
    color: #000000 !important;
  }
  .css-1gsv261 {
    position: static !important;
  }
  .css-19kzrtu {
    height: 100% !important;
  }
  .answer {
    min-height: 14svh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .edit_btn {
    display: flex;
    justify-content: end;
  }
`;

export { AnswerContainer, AnsCard };
