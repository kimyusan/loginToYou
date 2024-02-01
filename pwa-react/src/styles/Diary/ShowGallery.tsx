import styled from "styled-components";

const GalleryBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: scroll;

  & .item {
    width: 33.3333%;
    height: auto;

    & img {
      width: 100%;
      height: 110px;
    }
  }

  & .noPic {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #818181;
    margin-top: 25px;
  }
`;

const PictureDetailBox = styled.div`
  width: 100%;
  height: 300px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PictureBtnBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 0;

  .updateBtn {
    border: 0;
    border-radius: 5px;
    width: 100%;
    text-align: center;
    padding: 10px;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    font-size: 1.3rem;
    color: white;
  }

  .subBtns {
    width: 100%;
    height: auto;
    margin-top: 7%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 0;
  }

  .subBtn {
    border: 0;
    border-radius: 5px;
    width: 45%;
    text-align: center;
    padding: 10px;
    font-size: 0.9rem;
  }
`;
export { GalleryBox, PictureDetailBox, PictureBtnBox };
