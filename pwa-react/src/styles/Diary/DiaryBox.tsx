import styled from "styled-components";

const Diary = styled.div`
  border: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & .item {
    padding: 20px;
  }

  & .item:first-child {
    margin-bottom: 50px;
  }
`

const Gallery = styled.div`
  width: 100%;
  height: 350px;
  overflow: scroll;
  scroll-behavior: smooth;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  & .item {
    width: 32%;
    height: 15vh;
    border: 1px solid #cecece;
    background-image: url("https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.webp");
    background-size: cover;
    background-repeat: no-repeat;
  }
`

export { Diary,Gallery }