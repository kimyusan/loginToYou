import styled from "styled-components";

const Cover = styled.div``;

const Header = styled.div<{ $bgimg: string }>`
  width: 100%;
  height: 25vh;
  position: relative;
  background-image: url(${(props) => props.$bgimg});
  background-size: cover;
  > div {
    padding: 7%;
    font-size: 1.5rem;
    position: relative;
  }
  > span {
    position: absolute;
    margin-bottom: 5%;
    margin-right: 7%;
    right: 0px;
    bottom: 0px;
    .MuiSvgIcon-root {
      font-size: 2.5rem;
    }
    .MuiBadge-badge {
      height: 25px;
      font-size: 1rem;
    }
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
