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

interface height {
  $height: number;
}

const JoinForm = styled.form<height>`
  position: fixed;
  top: ${(props) => `calc(${props.$height}px + 14dvh)`};
  left: 10dvw;
  width: 80dvw;
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

const BottomBox = styled.div<height>`
  width: 100%;
  top: ${(props) => `calc(8dvh + ${props.$height}px)`};
  height: ${(props) => `calc(92dvh - ${props.$height}px)`};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const PoseBox = styled.div`
  .recPose {
    background-color: white;
    position: absolute;
    top: -15dvh;
    width: calc(100% - 10px);
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid ${(props) => props.theme.color.grey};
    margin: 5px;
    border-radius: 25px;

    &:before {
      content: "";
      position: absolute;
      background-color: white;
      border: 1px solid ${(props) => props.theme.color.grey};
      border-top: none;
      border-right: none;
      width: 30px;
      height: 30px;
      bottom: -16px;
      left: 40px;
      transform: rotate(-45deg);
    }
  }

  .poseIcon {
    position: absolute;
    left: 11vw;
    top: calc(50% - 1.5rem);
  }

  .pose {
    width: 100%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    white-space: nowrap;
    margin-bottom: 20px;

    &::-webkit-scrollbar {
      display: none;
    }

    .item {
      width: 55px;
      aspect-ratio: 1;
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
`;
export { GoBack, ReadyRoomText, ReadyBtn, JoinForm, PoseBox, BottomBox };
