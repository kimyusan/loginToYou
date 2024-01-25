import styled from "styled-components";
import Modal from "react-modal";
import { TextField, Button } from "@mui/material";

interface CompWithClass {
  className?: string | null;
}

const Cover = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 11vh;
  padding-top: 6%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::before {
    content: "";
    background-color: white;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;

const UserName = styled.div`
  z-index: 99;
  color: black;
  left: 10%;
  font-size: 1.3rem;
  padding-left: 10%;
`;

const Dday = styled.div<CompWithClass>`
  z-index: 99;
  color: #ff83a8;
  font-size: 2.3rem;
  padding-right: 10%;

  &.noDate {
    color: #8a8a8a;
    font-size: 1rem;
  }
`;

const DdayModal = styled(Modal)`
  margin: 30% 10%;
  display: flex;
  flex-direction: column;
  &.ReactModal__Content--after-open {
    z-index: 100000;
    transition: transform 0.3s ease-in-out;
    transform: translateY(20%);
    border-radius: 10px;
    background-color: pink;
    padding: 7%;
    height: 20%;
  }
`;

const DdayInput = styled(TextField)`
  width: 100% !important;
  label {
    background-color: pink;
    width: 50%;
    height: 2rem;
    z-index: 3 !important;
  }
  input {
    z-index: 1 !important;
  }
  .MuiInputLabel-root .Mui-focused {
    color: #ff95aa !important;
  }
`;

const DdayForm = styled.form``;
const SaveDday = styled(Button)`
  margin: 10% !important;
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
