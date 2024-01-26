import styled from "styled-components"

const Pictures = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
  margin-top: 50px;
`

const PicItem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow:hidden;

  & .slide {
    flex: 0 0 33.3333%;
    height: 300px;
    position: relative;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    opacity: 1;

    background-image: url("https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.webp");
    background-size: cover;
    background-repeat: no-repeat;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
  }

  & .middle {
    /* background-color: tomato; */
  }
`;

export {Pictures, PicItem}