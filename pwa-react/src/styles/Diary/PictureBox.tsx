import styled from "styled-components";

const Pictures = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 65dvh;
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
  height: 80%;
  border: 1px solid #cecece;
  margin-top: 8%;
  background-color: lightgray;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  justify-content: space-between;
  width: 100%;
  height: 70dvh;

  .item {
    width: 100%;
    height: 47%;
    display: flex;
    flex-direction: column;

    .content {
      width: 100%;
      height: 80%;
      margin-top: 7%;
      border-top: 1px solid ${(props) => {
          return props.theme.color.grey;
        }};
      border-bottom: 1px solid ${(props) => {
          return props.theme.color.grey;
        }};
      border-radius: 15px;
      padding: 10px;

      .yes {
        width: 100%;
        height: auto;
        overflow-wrap: break-word;
        word-break: break-all;
        white-space: pre-wrap;
      }

      .no {
        text-align: center;
        font-size: 15px;
        color: ${(props) => {
          return props.theme.color.grey;
        }}; 
      }
    }
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
    

    span {
      margin-left: 3%;
      font-size: 14px;
      font-weight: 0;
      font-style: italic;
      color: ${(props) => {
        return props.theme.color.sub2;
      }};
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      margin-right: 5%;
    }
  }
`;

const CreateDiary = styled.form`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  textarea {
    font-size: 20px;
    width: 100%;
    height: auto;
    border: 0;
    border-bottom: 3px solid lightgray;
  }

  textarea:focus {
    border: none;
    outline: none;
    border-bottom: 3px solid lightgray;
  }

  button {
    width: 100%;
    border: 0;
    border-radius: 5px;
    padding: 10px;
    font-size: 20px;
    margin-top: 5%;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
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
