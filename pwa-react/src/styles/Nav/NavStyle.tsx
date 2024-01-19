import styled from "styled-components";

const NavigationContainer = styled.div<{ $isOpen: boolean }>`
  width: 80%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  top: 0;
  padding-top: 20%;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-80%")};
  background-color: #ffffff;
  border-left: 1px solid #8a8a8a;
  transition: right 0.3s ease-in-out;

  button {
    font-size: 20px;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    margin: 5px;
    padding: 0px 3px;
    background-color: #ececec;
  }
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 10%;
  margin: 0;
  color: black;
  li {
    font-size: 1.2rem;
    margin-bottom: 10%;
  }
`;
export { NavigationContainer, NavigationList };
