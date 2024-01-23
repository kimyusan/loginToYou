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
`

const ReadyRoomText = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 20px 0;
  width: 100%;
`

const JoinForm = styled.form`
  width: 80%;
  margin: 50px auto;
`
const ReadyBtn = styled.input`
  border: 0;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
  background-color: #ffd1da;
  font-weight: bold;
`
export {GoBack,ReadyRoomText,ReadyBtn,JoinForm}