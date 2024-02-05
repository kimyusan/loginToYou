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
  justify-content: space-between;
  margin: 7dvw;
  background-color: #e1e1e1;
  border-radius: 30px;

  .stopBtn,
  .switchBtn {
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    padding: 3%;
    border-radius: 50%;
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
    align-items: center;
    display: flex;
  }
`;
export { GoBack, CallBtn, ReadyBtn, JoinForm, BtnBox };
