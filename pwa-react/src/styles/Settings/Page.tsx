import styled, { DefaultTheme } from "styled-components";

interface SampleInterface {
  $sampletheme: DefaultTheme;
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

export const ColorSelectBox = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  box-sizing: border-box;
  padding: 0 20%;
  justify-content: space-between;
  align-items: center;
`;

export const Sample = styled.div<SampleInterface>`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.$sampletheme.color.main};

  &.active:before {
    content: "✓";
    position: absolute;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffffff75;
  }
`;
