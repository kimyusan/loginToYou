import styled, { createGlobalStyle } from "styled-components";

export const BgWhite = createGlobalStyle`
  body, html {
    background-color: white;
  }
`;

export const Wrapper = styled.div`
  width: 100dvw;
  overflow-x: hidden;
  position: relative;
`;

export const Header = styled.div`
  width: 100%;
  height: 15dvh;
  background-color: white;
  margin-bottom: 1dvh;

  .date {
    height: 10dvh;
    font-size: 1.5rem;
    font-family: "Phudu", sans-serif;
    margin-left: 3dvw;
    display: flex;
    align-items: center;
  }

  .tabbox {
    display: flex;

    .tab {
      height: 5dvh;
      width: 50dvw;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid ${(props) => props.theme.color.grey};

      &.selected {
        border: 1px solid ${(props) => props.theme.color.grey};
        border-bottom: 1px solid white;
      }
    }
  }
`;

export const Slide = styled.div<{ $length: number; $height: number }>`
  display: flex;
  width: ${(props) => props.$length * 100}%;
  height: ${(props) => props.$height}px;
  transition: transform 0.5s linear;
`;

export const Dotbox = styled.div<{ $height: number }>`
  width: 30dvw;
  position: absolute;
  top: ${(props) => `calc(${props.$height}px - 5dvh)`};
  left: 35dvw;
  right: 35dvw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 2;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid white;

    &.selected {
      background-color: white;
    }
  }
`;

export const Image = styled.div<{ $url: string; $height: number }>`
  width: 100%;
  height: ${(props) => props.$height}px;
  background-image: ${(props) => `url(${props.$url})`};
  background-size: cover;
`;

export const ContentBox = styled.div`
  width: 100%;
  padding: 2dvh 2dvw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  .content {
    font-size: 1.2rem;
  }

  .iconBox {
    display: flex;
    justify-content: end;
    margin-right: 2dvw;

    & > * {
      margin: 1dvw 2dvw;
    }
  }
`;

export const DiaryViewStyle = styled.div`
  width: 100%;
  height: 40dvh;
  padding: 2dvh 2dvw 0 2dvw;

  .container {
    display: flex;

    .profImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .contentBox {
      width: calc(100% - 50px - 4dvw);
      padding: 0 3dvw;
      box-sizing: border-box;
      height: 36dvh;

      .name {
        color: ${(props) => props.theme.color.main};
      }

      .diaryBox {
        width: 100%;
        height: 90%;
        margin: 1dvh 0;
        border: 1px solid ${(props) => props.theme.color.grey};
        padding: 10px 20px;
        box-sizing: border-box;
        border-radius: 25px;
        overflow-y: auto;

        .noContent {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: ${(props) => props.theme.color.grey};

          .pushButton {
            background-color: ${(props) => props.theme.color.sub1};
            border: none;
            margin: 5px;
            padding: 5px 10px;
            border-radius: 25px;
            color: white;
          }
        }
      }
    }
  }
`;
