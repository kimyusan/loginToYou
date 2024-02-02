import styled from "styled-components";

const TimerText = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  top: 30%;

  & div {
    width: auto;
    height: auto;
    font-size: 100px;
    color: #ffffff5c;
  }
`;
const CameraBox = styled.div`
  width: 100%;
  position: absolute;
  z-index: -1;
  top: 20%;
`;

const CameraButton = styled.div`
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 3%;
  display: flex;
  justify-content: space-around;

  & .camera {
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: 1px solid #cecece;
    border-radius: 50px;
    box-shadow: 5px 5px 15px 1px #e3e3e3cd;
    padding: 20px;
  }

  & .timer {
    width: 45px;
    height: 45px;
    cursor: pointer;
    padding: 25px;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #cecece;
  border-radius: 50px;
  padding: 10px;
  width: 90%;
  margin: 0 auto;

  & div {
    font-size: 20px;
    margin: 0 auto;

    & svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const SaveBox = styled.div`
  width: 90%;
  height: auto;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  bottom: 1%;
`;

const SaveBoxItem = styled.div`
  width: 35%;
  text-align: center;
  height: auto;
  padding: 20px;
  border: 0;
  background-color: ${(props) => {
    return props.theme.color.sub4;
  }};
  color: white;
  font-size: 1.3rem;
  border-radius: 10px;
`;

const SubjectBox = styled.input`
  width: 85%;
  border: 3px solid #cecece;
  border-radius: 10px;
  padding: 15px;
  position: fixed;
  bottom: 15%;
`;
export {
  TimerText,
  CameraBox,
  CameraButton,
  OptionsContainer,
  SaveBox,
  SaveBoxItem,
  SubjectBox,
};
