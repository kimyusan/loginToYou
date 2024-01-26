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
  color: #ff95aa;
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 2px solid #ff95aa;

  &:focus {
    color: #8a8a8a;
  }
`;

export const CalendarInput = styled(TextField)`
  &[type="date"] {
    width: 100%;
  }
`;
