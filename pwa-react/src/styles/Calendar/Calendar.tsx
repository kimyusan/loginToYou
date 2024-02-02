import styled from "styled-components";
import Modal from "react-modal";
import { TextField } from "@mui/material";

const Wrapper = styled.div`
  .fiSDCT {
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
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    color: white;
  }
`;

const CalendarModal = styled(Modal)`
  z-index: 1;
  background: #ececec;
  border-radius: 7%;
  padding: 7%;
  position: fixed;
  width: 65%;
  height: 45%;
  top: 60%;
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
    background-color: ${(props) => {
      return props.theme.color.sub4;
    }};
    bottom: 7%;
    padding: 3% 10%;
    font-size: 1rem;
  }
  p {
    margin: 0;
    margin-bottom: 3%;
  }
`;

const DateInput = styled(TextField)`
  display: block !important;
  margin-bottom: 3% !important;
  div {
    width: 100% !important;
  }
  input {
    padding: 3% !important;
  }
`;

const TitleInput = styled(TextField)`
  margin-top: 12% !important;
  display: block !important;
  div {
    width: 100% !important;
  }
  input {
    padding: 3% !important;
  }
`;

const ListWrapper = styled.div`
  background-color: #ececec;
  margin: 0 5%;
  margin-bottom: 5%;
  border-radius: 5px;
  > .list_header {
    font-size: 1.2rem;
    padding: 3%;
    border-bottom: 1px solid #a0a0a0;
  }
  > ul {
    padding: 0;
  }
  > .no_event {
    color: ${(props) => {
      return props.theme.color.sub2;
    }};
    padding: 5%;
  }
`;

export {
  Wrapper,
  MyCalendar,
  CalendarModal,
  DateInput,
  TitleInput,
  ListWrapper,
};
