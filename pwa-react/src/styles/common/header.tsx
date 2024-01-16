import styled from "styled-components";

const Cover = styled.div``;

const Header = styled.div<{ bgimg: string }>`
  width: 100%;
  height: 25vh;
  position: relative;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  > div {
    padding: 5%;
    font-size: 30px;
    position: relative;
  }
  > span {
    position: absolute;
    margin: 5%;
    right: 0px;
    bottom: 0px;
  }
  &::before {
    content: "";
    background-color: white;
    opacity: 0.6;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
`;

export { Cover, Header };
