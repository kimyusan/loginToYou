import styled from "styled-components";

import { Paper, Card } from "@mui/material";

const AnswerContainer = styled(Paper)`
  min-height: 100vh;
  margin: 5% 3%;
  background-color: #ffe2e7 !important;
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
  .css-gulbw7-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #000000 !important;
  }
  .css-8je8zh-MuiTouchRipple-root {
    position: none;
    z-index: -1 !important;
  }
`;

export { AnswerContainer, AnsCard };
