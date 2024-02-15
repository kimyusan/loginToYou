import styled from "styled-components";

const GoBack = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 10px 0;
  font-size: 30px;

  & a {
    text-decoration: none;
    margin-left: 10px;
  }

  & button {
    padding-top: 10px;
  }
`;

const JoinForm = styled.form`
  width: 80%;
  margin: 50px auto;
`;

const CallBtn = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.color.sub2};
  border-radius: 30px;
  overflow: hidden;
  z-index: 0;
  .avatar {
    position: absolute;
    padding: 3%;
    border-radius: 50%;
    cursor: grab;
    z-index: 5;
    :active {
      cursor: grabbing;
    }
  }
  .call_btn {
    padding: 3%;
    border-radius: 50%;
  }
  .invisible_btn {
    visibility: hidden;
  }
  @keyframes blink-effect {
    50% {
      opacity: 30%;
    }
  }
  .blink {
    animation: blink-effect 1.5s step-end infinite;
  }
`;

const ReadyBtn = styled.button`
  z-index: -1;
  border: 0;
  border-radius: 15px;
  margin: 15px;
  background-color: transparent;
  color: white;
  cursor: pointer;
  font-size: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 7dvw;
  background-color: ${(props) => {
    return props.theme.color.lightgrey;
  }};
  border-radius: 30px;

  .stopBtn,
  .switchBtn {
    background-color: ${(props) => {
      return props.theme.color.sub3;
    }};
    width: 100%;
    padding: 3% 10%;
    border-radius: 30px;
  }
  @keyframes blink-effect {
    50% {
      opacity: 30%;
    }
  }
  .blink {
    animation: blink-effect 2s step-end infinite;
  }
  span {
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

const CameraBox = styled.div`
  position: "relative";
  margin-top: "10dvh";
  .myCam {
    position: absolute;
    width: 20dvh;
    z-index: 3 !important;
  }
  .none {
    background-color: #ececec;
    height: 50dvh;
    display: flex;
    justify-content: center;
  }
  .none_icon{
    width: 50%;
    height: 100%;
    color: lightgrey;
  }
`;
export { GoBack, CallBtn, ReadyBtn, JoinForm, BtnBox, CameraBox };
