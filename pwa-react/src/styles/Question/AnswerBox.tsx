import styled from "styled-components";

import { Paper, Card } from "@mui/material";

const AnswerContainer = styled(Paper)`
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
  .card_date {
    padding-bottom: 3%;
    color: ${(props) => {
      return props.theme.color.grey;
    }};
  }
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
    /* min-height: 14dvh; */
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
