import styled from "styled-components";

interface height {
  $height: number;
}

const TimerText = styled.div<height>`
  width: 100%;
  height: ${(props) => props.$height}px;
  top: 8dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 2;

  & div {
    width: auto;
    height: auto;
    font-size: 8rem;
    color: white;
  }
`;

const CameraBox = styled.div``;

const CameraButton = styled.div<height>`
  width: 100%;
  position: fixed;
  background-color: white;
  top: ${(props) => `calc(8dvh + ${props.$height}px)`};
  height: ${(props) => `calc(92dvh - ${props.$height}px)`};
  text-align: center;
  display: flex;
  align-items: center;
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

const OptionsContainer = styled.div<height>`
  position: fixed;
  top: ${(props) => `calc(13dvh + ${props.$height}px)`};
  left: 5dvw;
  display: flex;
  flex-direction: row;
  border: 1px solid #cecece;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 10px;
  width: 90dvw;
  margin: 0 auto;
  z-index: 1;

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
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
