import styled from "styled-components";
import Modal from "react-modal";
import { TextField } from "@mui/material";

const Wrapper = styled.div`
  padding-top: 5dvh;
  .fiSDCT {
    padding-bottom: 7% !important;
  }
`;

const MyCalendar = styled.div`
  z-index: 1 !important;
  padding: 3dvh 3dvw 0;

  * {
    border-color: transparent !important;
  }

  .fc-day-today {
    background-color: ${(props) => props.theme.color.sub4} !important;
  }

  .fc-toolbar-title {
    font-size: 1.3rem !important;
    margin-left: 10px;
  }
  .fc-today-button {
    background-color: white !important;
    color: black !important;
    border: 1px solid
      ${(props) => {
        return props.theme.color.sub2;
      }} !important;
    padding: 3px 5px !important ;
  }
  .fc-prev-button,
  .fc-next-button {
    border: none !important;
    padding: 5px 3px !important;
    margin: 1px !important;
    background: ${(props) => props.theme.color.sub2} !important;
    display: flex !important;

    span {
      font-size: 1.2rem !important;
    }
  }
  .fc-myCustomButton-button {
    border: 0 !important;
    padding: 3px 5px !important ;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    color: white;
  }
  .fc-daygrid-day-number {
    font-size: 0.9em;
  }
`;

const CalendarModal = styled(Modal)`
  z-index: 1;
  background: ${(props) => props.theme.color.bgColor};
  border: 1px solid ${(props) => props.theme.color.grey};
  border-radius: 25px;
  padding: 6dvh 5dvw;
  position: fixed;
  width: 65%;
  height: 45%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -110%);
  transition: transform 0.3s ease-in-out;

  &.ReactModal__Content--after-open {
    transform: translate(-50%, -90%);
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
    /* border: 0;
    border-radius: 7%;
    position: absolute;
    left: 50%;
    background-color: ${(props) => {
      return props.theme.color.sub4;
    }};
    bottom: 7%;
    padding: 3% 10%;
    font-size: 1rem; */
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
  background-color: ${(props) => props.theme.color.bgColor};
  margin: 0 5dvw;

  > .list_header {
    font-size: 1.2rem;
    padding: 3dvw 1dvh;
    border-bottom: 1px solid ${(props) => props.theme.color.main};
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
