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
  text-shadow: 2px 2px gray;

  & .logo {
      margin-bottom: 50px;
      font-size: 30px;
  }
`
const SignUpBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;

  & .comment {
    width: 100%;
    margin-bottom: 30px;
    margin-top: 3px;
    font-size: 10px;
    text-shadow: none;
    text-align: start;
    margin-left: 5px;
  }

  & .correct {
    color: green;
  }

  & .different {
    color: red;
  }

  & .goSignUp {
    margin-top: 10px;
    width: auto;
    padding: 10px;
    border: 0;
    border-radius: 5px;
    text-align: center;
    background-color: #ffd1da;
  }

  & p {
    width: 75%;
    margin: 15px auto;
    text-align: center;
    font-size: 12px;
    text-shadow: none;
  }
`

const IdBox = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 36px;
  
  & input {
    width: 50%;
  }

  & button {
    border: 0;
    border-radius: 5px;
    padding: 10px;
    text-align: center;
    margin-left: 10px;
  }
`

const InputBox = styled.input`
  width: auto;
  border: 0;
  border-radius: 5px;
  padding: 10px;

  &:focus {
    outline: 2px solid #ffd1da;
  }

  &[type='date'] {
    font-family: 'Noto Sans KR';
    color: #8A8A8A;
  }
`

export { Logo, SignUpBox, InputBox, IdBox }