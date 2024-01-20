import styled from "styled-components";
import Modal from "react-modal";

const Wrapper = styled.div`
  .jrpeep {
    padding-bottom: 7% !important;
  }
`;

const MyCalendar = styled.div`
  z-index: 1 !important;
  padding: 20% 5%;
  .fc-toolbar-title {
    font-size: 1.3rem !important;
  }
  .fc-today-button {
    background-color: #b7b7b7 !important;
    color: white !important;
    border: 0 !important;
    padding: 0.2rem 0.4rem !important ;
  }
  .fc-prev-button,
  .fc-next-button {
    border: none !important;
    padding: 0.4rem !important;
    background: #bfbfbf !important;
    display: flex !important;
    span {
      font-size: 1.2rem !important;
    }
  }
  .fc-myCustomButton-button {
    border: 0 !important;
    padding: 0.2rem 0.4rem !important ;
    background-color: #67b3d1 !important;
  }
`;

const CalendarModal = styled(Modal)`
  z-index: 1;
  background: #ececec;
  border-radius: 7%;
  padding: 7%;
  position: fixed;
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

const ListWrapper = styled.div`
  padding: 0 5%;
`;

export { Wrapper, MyCalendar, CalendarModal, ListWrapper };
