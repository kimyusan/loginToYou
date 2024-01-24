import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  & *.myMsg {
    background-color: white;
    width: fit-content;
    padding: 10px 20px;
    align-self: flex-end;
    margin: 5px 0;
    margin-left: 20%;
    margin-right: 3%;
    border: 1px solid #fba1b7;
    border-radius: 25px;
    border-bottom-right-radius: 0;
  }

  & *.oppMsg {
    background-color: #ffd1da;
    width: fit-content;
    padding: 10px 20px;
    align-self: flex-start;
    margin: 5px 0;
    margin-left: 3%;
    margin-right: 20%;
    border: 1px solid #ffd1da;
    border-radius: 25px;
    border-bottom-left-radius: 0;
  }
`;

export const InputForm = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5%;
  border-top: 1px solid black;

  & > input {
    width: 80%;
    height: 100%;
    padding-left: 10px;
    margin: 0;
    box-sizing: border-box;
    background-color: white;
    border: none;
    outline: none;
  }

  & > button {
    width: 20%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: #fba1b7;
    border: none;
    margin: 0;
  }
`;
