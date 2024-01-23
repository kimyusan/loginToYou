import styled from "styled-components";

const Cover = styled.div``;

const Header = styled.div`
  width: 100%;
  height: 11vh;
  padding-top: 6%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const UserName = styled.div`
  z-index: 99;
  color: black;
  left: 10%;
  font-size: 1.3rem;
  padding-left: 10%;
`;
const Dday = styled.div`
  z-index: 99;
  color: #ff83a8;
  font-size: 2.3rem;
  padding-right: 10%;
`;

export { Cover, Header, UserName, Dday };
