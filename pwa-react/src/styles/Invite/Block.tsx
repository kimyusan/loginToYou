import exp from "constants";
import styled from "styled-components";

const FlexBox = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

interface SearchClass {
  className: string | boolean;
}

const InviteSearchBox = styled.div<SearchClass>`
  width: 100%;
  height: 90%;
  background-color: white;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 0%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  transition: all 0.3s linear;
  box-shadow: 0px -10px 30px 0px rgb(0, 0, 0, 0.1);

  &.opened {
    max-height: 90%;
  }

  ${FlexBox} {
    display: none;
    height: 100%;
    transition-delay: 1s;
  }

  &.opened > ${FlexBox} {
    display: flex;
  }
`;

export { FlexBox, InviteSearchBox };
