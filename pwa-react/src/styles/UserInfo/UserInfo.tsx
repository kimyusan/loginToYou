import styled from "styled-components";
import { TextField, RadioGroup, Button } from "@mui/material";

const UserInfoBox = styled.div`
  padding: 20% 10%;
  h3 {
    text-align: center;
    font-size: 1.5rem;
  }
  .settingOption {
    display: flex;
    align-items: center;
  }
  .settingTitle {
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    width: 80%;
  }
`;

const UserInfoField = styled(TextField)`
  padding: 2% 0 !important;
  width: 100%;
  .Mui-focused {
    color: ${(props) => {
      return props.theme.color.sub1;
    }} !important;
  }
  .css-1eed5fa-MuiInputBase-root-MuiInput-root::after {
    border-bottom: ${(props) => {
      return props.theme.color.sub1;
    }} !important;
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & .birth_input {
    label {
      background-color: ${(props) => {
        return props.theme.color.bgColor;
      }};
      width: 90%;
      height: 2rem;
      z-index: 3 !important;
    }
    input {
      z-index: 1 !important;
    }
  }
  .MuiInputLabel-root .Mui-focused {
    color: ${(props) => {
      return props.theme.color.sub1;
    }} !important;
  }
`;

const SaveButton = styled(Button)`
  margin-top: 20% !important;
  width: 100%;
  align-items: center;
  color: white !important;
  font-size: 1rem !important;
  background-color: ${(props) => {
    return props.theme.color.sub1;
  }} !important;
  border: 1px solid
    ${(props) => {
      return props.theme.color.sub1;
    }} !important;
`;

const GenderRadio = styled(RadioGroup)`
  flex-direction: row !important;
`;

export { UserInfoBox, UserInfoField, FormBox, GenderRadio, SaveButton };
