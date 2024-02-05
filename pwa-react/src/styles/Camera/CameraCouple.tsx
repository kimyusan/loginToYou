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

const ReadyRoomText = styled.div`
  text-align: center;
  font-size: 30px;
  padding: 20px 0;
  width: 100%;
`;

const JoinForm = styled.form`
  width: 80%;
  margin: 50px auto;
`;
const ReadyBtn = styled.input`
  border: 0;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => {
    return props.theme.color.sub4;
  }};
  font-weight: bold;
`;

const PoseBox = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  bottom: 5%;

  .pose {
    width: 100%;
    height: auto;
    padding: 5px;
    display: flex;
    flex-direction: row;
    overflow: auto;
    white-space: nowrap;
    margin-bottom: 20px;

    ::-webkit-scrollbar{
      display: none; 
    }

    .item {
      width: 80px;
      height: 80px;
      border: 1px solid #cecece;
      border-radius: 5px;
      padding: 5px;
      margin-right: 5px;
      text-align: center;
    }
  }

  .text {
    font-size: 17px;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
`
export { GoBack, ReadyRoomText, ReadyBtn, JoinForm, PoseBox };
