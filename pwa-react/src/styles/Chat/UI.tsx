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

interface height {
  $height: number;
  $isIphone: boolean;
}

export const InputForm = styled.form<height>`
  position: fixed;
  display: flex;
  justify-content: center;
  padding: 2dvh 5dvw;
  width: 100dvw;
  box-sizing: border-box;
  bottom: 0;
  background-color: ${(props) => {
    return props.theme.color.bgColor;
  }};
  &.keyup {
    height: ${(props) =>
      `calc(${props.$isIphone ? "50dvh" : "49dvh"} + ${props.$height}px)`};
  }

  & > textarea {
    width: 70%;
    height: 5dvh;
    min-height: 5dvh;
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
    height: 5dvh;
    padding: 10px;
    margin-left: 5px;
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
    align-self: flex-start;
  }
`;
