import styled from "styled-components";

const CameraSelectBox = styled.div`
  margin: 10% 10%;
  height: 80dvh;
  display: flex;
  flex-direction: column;
  .solo_card,
  .couple_card {
    position: relative;
    margin-bottom: 5%;
    height: 70%;
    display: flex;
    flex-direction: column;
    padding: 5%;
    background-color: ${(props) => props.theme.color.sub4};
  }
  .card_image {
    height: 70%;
    background-color: #ececec;
  }
  .card_content {
    padding-bottom: 0;
    p {
      margin: 0;
    }
  }
  .card_title {
    font-weight: 700;
  }

  button {
    font-weight: 600;
    font-size: 1.2rem;
    border: none;
    border-radius: 50%;
    height: 6dvh;
    aspect-ratio: 1;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 5%;
    color: white;
    background-color: ${(props) => props.theme.color.sub2};
  }
`;

export { CameraSelectBox };
