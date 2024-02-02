import styled from "styled-components";
import { TextField } from "@mui/material";

export const Wrapper = styled.div`
  height: 30vh;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > label {
    margin-bottom: 20px;
  }
`;

export const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => {
    return props.theme.color.sub1;
  }};
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid
    ${(props) => {
      return props.theme.color.sub1;
    }};

  &:focus {
    color: ${(props) => {
      return props.theme.color.grey;
    }};
  }
`;

export const CalendarInput = styled(TextField)`
  width: 100%;
  border: none;
  border-bottom: 2px solid
    ${(props) => {
      return props.theme.color.sub1;
    }};

  & fieldset {
    border: none;
    border-bottom: 2px solid
      ${(props) => {
        return props.theme.color.sub1;
      }};
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(props) => {
        return props.theme.color.sub1;
      }};
    }
    &:hover fieldset {
      border-color: ${(props) => {
        return props.theme.color.sub1;
      }};
    }
    &.Mui-focused fieldset {
      border-color: ${(props) => {
        return props.theme.color.sub1;
      }};
    }
  }
`;
