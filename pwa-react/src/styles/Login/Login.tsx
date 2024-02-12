import styled from "styled-components";

const Logo = styled.div`
  width: 100%;
  height: 70dvh;
  font-size: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px gray;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  & input {
    width: 70%;
    margin: 0 auto;
    height: 20px;
    padding: 10px;
    border: 0;
    border-radius: 5px;

    &:focus {
      outline: 2px solid
        ${(props) => {
          return props.theme.color.sub4;
        }};
    }
  }

  & button {
    width: 75%;
    margin: 0 auto;
    height: auto;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    background-color: ${(props) => {
      return props.theme.color.sub4;
    }};
    margin-bottom: 10px;
  }

  & p {
    width: 75%;
    margin: 15px auto;
    text-align: center;
    font-size: 12px;
    text-shadow: none;
  }
`;

const MiddleMsg = styled.div`
  width: 100%;
  height: 30px;
  margin: 0 auto;
  margin-bottom: 30px;
  text-align: center;
  color: ${(props) => {
    return props.theme.color.grey;
  }};
  font-size: 17px;
  position: relative;
  display: flex;
  justify-content: center;

  & div {
    position: absolute;

    animation: motion 0.5s linear 0s infinite alternate;
    @keyframes motion {
      0% {
        margin-top: 0px;
      }
      100% {
        margin-top: 15px;
      }
    }
  }
`;

const SnsLogin = styled.div`
  display: flex;
  flex-direction: row;
  width: 100dvw;
  height: 10dvh;
  padding: 0 18.5dvw;
`;

interface SnsLoginBtn {
  $img: string;
}

const LoginBtn = styled.div<SnsLoginBtn>`
  width: 15dvw;
  margin: 0 3dvw;
  height: auto;
  background-image: ${(props) => `url(${props.$img})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
export { Logo, LoginBox, MiddleMsg, SnsLogin, LoginBtn };
