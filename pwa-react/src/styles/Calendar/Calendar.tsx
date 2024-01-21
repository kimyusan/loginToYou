import styled from "styled-components";
import Modal from "react-modal";

const CalendarModal = styled(Modal)`
  background: #ececec;
  border-radius: 7%;
  padding: 7%;
  position: absolute;
  width: 65%;
  height: 40%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -110%);
  transition: transform 0.3s ease-in-out;
  &.ReactModal__Content--after-open {
    transform: translate(-50%, -100%);
  }
  h4 {
    font-size: 1.2rem;
    margin: 0;
  }
  input {
    width: 100%;
    height: 1.7rem;
  }
  button {
    border: 0;
    border-radius: 7%;
    position: absolute;
    left: 50%;
    background-color: #ffd1da;
    bottom: 7%;
    padding: 3% 10%;
    font-size: 1rem;
  }
`;

export { CalendarModal };
