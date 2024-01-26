import styled from "styled-components"

const Pictures = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 50px;
  position: relative;
  overflow: hidden;
`

const PicItem = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  transition: transform 1s;
  overflow: hidden;
  margin: 0 30px;

  & .slide {
    flex: 0 0 33%;
    height: 50vh;
    position: relative;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export {Pictures, PicItem}