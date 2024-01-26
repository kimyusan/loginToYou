import styled from "styled-components";

const Pictures = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
  margin-top: 50px;
`;

const PicItem = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  overflow: hidden;

  & .slide {
    flex: 0 0 33.3333%;
    height: 230px;
    position: relative;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    opacity: 1;
    margin-top: 10%;

    background-image: url("https://img.khan.co.kr/news/2023/01/02/news-p.v1.20230102.1f95577a65fc42a79ae7f990b39e7c21_P1.webp");
    background-size: cover;
    background-repeat: no-repeat;
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }

  & .middle {
    /* background-color: tomato; */
    /* height: 400px !important; */
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/170924_%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EC%9D%B4%EB%B2%A4%ED%8A%B8.jpg/250px-170924_%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EC%9D%B4%EB%B2%A4%ED%8A%B8.jpg");
    z-index: 10000000;
    height: 250px;
    filter: blur(0px);
    -webkit-filter: blur(0px);
  }
`;

export { Pictures, PicItem };
