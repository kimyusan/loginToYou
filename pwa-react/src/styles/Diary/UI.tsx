import styled from "styled-components";

export const DayBox = styled.div`
  width: 100%;
  height: 15dvh;
  background-color: white;
  border-bottom: 1px solid ${(props) => props.theme.color.grey};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  z-index: 1;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 15px;
    width: 50px;

    .year {
      margin: 0;
      font-size: 1.2rem;
    }

    .month {
      margin: 0;
      font-family: "Phudu", sans-serif;
      font-weight: 700;
      font-size: 3rem;
      color: ${(props) => props.theme.color.main};
      line-height: 0.9;
    }
  }
`;

export const DiaryWrapper = styled.div`
  width: 100dvw;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-top: 17dvh;
`;

export const PhotoCard = styled.div`
  width: 48dvw;
  margin: 1dvw;

  .date {
    color: ${(props) => props.theme.color.grey};
    align-self: flex-start;
    margin: 1dvw 3dvw;
  }

  .cardWrapper {
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    border: 1px solid ${(props) => props.theme.color.lightgrey};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 35dvh;
  }

  .image {
    width: 90%;
    aspect-ratio: 1;
    filter: grayscale(50%);
  }

  .content {
    width: 100%;
    height: 5dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
