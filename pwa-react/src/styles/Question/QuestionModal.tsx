import styled from "styled-components";
import Modal from "react-modal";
import { TextField } from "@mui/material";

const QModal = styled(Modal)`
  z-index: 1;
  background: #ececec;
  border-radius: 7%;
  padding: 7%;
  position: fixed;
  width: 65%;
  min-height: 40%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -110%);
  transition: transform 0.3s ease-in-out;
  &.ReactModal__Content--after-open {
    transform: translate(-50%, -100%);
  }
  .today {
    margin: 0;
  }
  .question {
    font-size: 1rem;
  }
  .answer {
    background-color: white !important;
  }
`;

const AnswerInput = styled(TextField)`
  display: block !important;
  div {
    width: 100% !important;
  }
`;

export { QModal, AnswerInput };
