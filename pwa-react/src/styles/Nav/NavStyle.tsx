import styled from "styled-components";

const NavigationContainer = styled.div<{ $isOpen: boolean }>`
  width: 80%;
  height: 100%;
  position: fixed;
  z-index: 80000;
  top: 0;
  padding-top: 20%;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-80%")};
  background-color: #ffffff;
  border-left: 1px solid #8a8a8a;
  transition: right 0.3s ease-in-out;

`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 10%;
  margin: 0;
  color: black;
  z-index: 9900;
  li {
    font-size: 1.2rem;
    margin-bottom: 10%;
  }
`;
export { NavigationContainer, NavigationList };
