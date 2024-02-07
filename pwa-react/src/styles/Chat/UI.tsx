import styled from "styled-components";

export const Header = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 5%;
  min-height: 60px;
  z-index: 1;
  padding: 0px 25px;
  border-bottom: 1px solid
    ${(props) => {
      return props.theme.color.grey;
    }};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
`;

export const InputForm = styled.form`
  position: fixed;
  display: flex;
  /* height: max-content; */
  padding: 2dvh 5dvw;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => {
    return props.theme.color.bgColor;
  }};

  & > textarea {
    width: 80%;
    padding: 10px 20px;
    margin: 0 1dvw;
    box-sizing: border-box;
    background-color: white;
    border-radius: 25px;
    border: 1px solid
      ${(props) => {
        return props.theme.color.grey;
      }};
    overflow: hidden;
    outline: none;
    font-size: 1rem;
  }

  & > button {
    width: 15%;
    height: 100%;
    padding: 10px;
    margin-left: 10px;
    color: black;
    box-sizing: border-box;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    border-radius: 25px;
    border: 1px solid
      ${(props) => {
        return props.theme.color.sub2;
      }};
    align-self: flex-end;
  }
`;
