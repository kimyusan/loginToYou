import styled from "styled-components";
import Modal from "react-modal";

const QModal = styled(Modal)`
  z-index: 1;
  background: #ececec;
  border-radius: 7%;
  padding: 7%;
  position: fixed;
  width: 65%;
  height: 40%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -110%);
  transition: transform 0.3s ease-in-out;
  &.ReactModal__Content--after-open {
    transform: translate(-50%, -100%);
  }
`;

export { QModal };
