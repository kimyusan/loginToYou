import styled from "styled-components";

const Pictures = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 65vh;
  background-color: ${(props) => {
    return props.theme.color.bgColor;
  }};
`;

const PicItem = styled.div`
  width: 82%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  height: 100%;

  & .slide {
    flex: 0 0 33.3333%;
    height: 230px;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 1;
    margin-top: 10%;
    border: 1px solid #cecece;

    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    filter: blur(1px);
    -webkit-filter: blur(1px);
    background-color: white;
  }

  & .middle {
    z-index: 1;
    height: 250px;
    filter: blur(0px);
    -webkit-filter: blur(0px);
  }
`;

const GoCreateDiary = styled.div`
  width: 100%;
  background-color: ${(props) => {
    return props.theme.color.bgColor;
  }};

  div {
    width: 65%;
    height: auto;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    border: 0;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    font-size: 1.3rem;
    color: white;
    font-weight: bold;
    margin: 0 auto;
  }

  p {
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: #777777;
  }
`;

const PicBox = styled.div`
  width: 90%;
  height: 85%;
  border: 1px solid #cecece;
  margin-top: 8%;
  background-color: lightgray;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PicContent = styled.div`
  text-align: center;
  font-size: 10px;
  padding: 10px;
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  text-align: center;

  .item {
    width: 100%;
    height: 10vh;
    margin-top: 10px;
    border: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    flex-direction: row;
    padding: 10px;
    border-radius: 10px;

    .subItem {
      height: auto;
      font-size: 17px;
    }

    svg {
      width: 25px;
      height: 25px;
    }

    .complete {
      color: #${(props) => {
          return props.theme.color.sub1;
        }};
    }
  }
`;

const CreateDiary = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

  textarea {
    width: 100%;
    height: 200px;
    border: 1px solid lightgray;
    border-radius: 5px;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre;
  }

  button {
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 5px;
    font-size: 17px;
    margin-top: 15px;
  }
`;
export {
  Pictures,
  PicItem,
  PicBox,
  PicContent,
  SelectBox,
  CreateDiary,
  GoCreateDiary,
};
