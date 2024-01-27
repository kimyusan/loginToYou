import styled from "styled-components"

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
`
export {GalleryBox}