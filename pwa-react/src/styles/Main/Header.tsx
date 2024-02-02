import styled from "styled-components";
import Modal from "react-modal";
import { TextField, Button } from "@mui/material";

interface CompWithClass {
  className?: string | null;
}

const Cover = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 11dvh;
  padding-top: 6%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div.nameSection {
    padding-left: 10%;
    width: max-content;

    div.cpName {
      font-weight: bold;
      color: ${(props) => {
        return props.theme.color.main;
      }};
    }
  }
`;

const UserName = styled.div`
  color: black;
  left: 10%;
  font-size: 1.3rem;
  width: max-content;
`;

const Dday = styled.div<CompWithClass>`
  z-index: 99;
  color: ${(props) => {
    return props.theme.color.main;
  }};
  font-size: 2.3rem;
  padding-right: 10%;

  &.noDate {
    color: ${(props) => {
      return props.theme.color.grey;
    }};
    font-size: 1rem;
  }
`;

const DdayModal = styled(Modal)`
  margin: 30% 10%;
  position: relative;

  &.ReactModal__Content--after-open {
    z-index: 100000;
    transition: transform 0.3s ease-in-out;
    transform: translateY(20%);
    border-radius: 10px;
    color: ${(props) => {
      return props.theme.color.sub4;
    }};
    padding: 7%;
    height: 20%;
  }
  div {
    border-radius: 10px !important;
  }
`;

const DdayInput = styled(TextField)`
  width: 100% !important;
  color: ${(props) => {
    return props.theme.color.sub4;
  }};
  border: none !important;
  border-radius: 30%;
  label {
    width: 50%;
    height: 2rem;
    z-index: 3 !important;
  }
  input {
    z-index: 1 !important;
  }
  .MuiInputLabel-root .Mui-focused {
    color: ${(props) => {
      return props.theme.color.main;
    }};
  }
`;

const DdayForm = styled.form`
  display: flex;
  flex-direction: column;
  p {
    font-size: 1.2rem;
    margin: 0;
    margin-bottom: 10%;
  }
`;

const SaveDday = styled(Button)`
  position: absolute !important;
  right: 7%;
  bottom: 7%;
  background-color: white !important;
  font-size: 1rem !important;
  color: ${(props) => props.theme.color.grey} !important;
  margin-top: 10% !important;
`;

export {
  Cover,
  Header,
  UserName,
  Dday,
  DdayModal,
  DdayInput,
  DdayForm,
  SaveDday,
};
