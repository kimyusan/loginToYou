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
  border-bottom: 1px solid #8a8a8a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
`;

export const Wrapper = styled.div`
  & *.msgBox {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    padding-bottom: 60px;
  }

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
  display: flex;
  /* height: max-content; */
  padding: 5px 0px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f9f9f9;

  & > textarea {
    width: 80%;
    padding: 10px 20px;
    margin: 0 3px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 25px;
    /* border: 1px solid #8a8a8a; */
    overflow: hidden;
    outline: none;
    font-size: 1rem;
  }

  & > button {
    width: 15%;
    height: 100%;
    padding: 10px;
    margin-left: 10px;
    box-sizing: border-box;
    background-color: #fba1b7;
    border-radius: 25px;
    border: 1px solid #fba1b7;
  }
`;
