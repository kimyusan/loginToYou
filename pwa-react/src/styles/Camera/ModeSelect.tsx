import styled from "styled-components";

const SelectBox = styled.div`
  display: flex;
  height: 92dvh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModeButton = styled.div`
  width: 100dvw;
  height: 46dvh;
  background-size: cover;
  background-position: center;
  position: relative;

  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgb(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .msg {
    color: white;
    font-size: 2rem;
    font-weight: 100;
  }
`;

export { SelectBox, ModeButton };
