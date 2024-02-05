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
const ReadyBtn = styled.button`
  border: 0;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => {
    return props.theme.color.sub2;
  }};
  font-weight: bold;
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
export { GoBack, ReadyBtn, JoinForm, BtnBox };
