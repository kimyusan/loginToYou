import styled from "styled-components";

const Logo = styled.div`
  width: 100%;
  height: 100vh;
  font-size: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .logo {
    margin-bottom: 50px;
    font-size: 30px;
  }
`;

const SignUpBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;

  & div {
    margin-bottom: 15px;

    & input {
      border-bottom: 2px solid
        ${(props) => {
          return props.theme.color.sub4;
        }};
    }
  }

  & .correct {
    color: green;
  }

  & .different {
    color: red;
  }

  & .goSignUp {
    margin: 20px 0;
    width: auto;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    text-align: center;
    background-color: ${(props) => {
      return props.theme.color.sub4;
    }};
  }

  & p {
    width: 75%;
    margin: 15px auto;
    text-align: center;
    font-size: 12px;
    text-shadow: none;
  }
`;

export { Logo, SignUpBox };
