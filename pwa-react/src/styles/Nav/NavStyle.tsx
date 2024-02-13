import styled from "styled-components";

const NavBarbg = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 79999;
  background-color: transparent;
`;

const NavigationContainer = styled.div<{ $isOpen: boolean }>`
  div,
  span {
    font-family: "Noto Sans KR" !important;
  }
  width: 80%;
  height: 100%;
  position: fixed;
  z-index: 80000;
  top: 0;
  padding-top: 20%;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-80%")};
  background-color: #ffffff;
  border-left: 1px solid
    ${(props) => {
      return props.theme.color.grey;
    }};
  transition: right 0.3s ease-in-out;

  .list-subheader {
    background-color: ${(props) => props.theme.color.lightgrey};
    font-size: 0.9rem;
    height: 4dvh;
    display: flex;
    align-items: center;
  }
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 10%;
  margin: 0;
  color: black;
  /* position: fixed; */
  z-index: 9900;
  li {
    font-size: 1.2rem;
    margin-bottom: 4dvh;
  }
`;
export { NavigationContainer, NavigationList, NavBarbg };
