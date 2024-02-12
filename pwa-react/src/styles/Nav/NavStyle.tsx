import styled from "styled-components";

const NavigationContainer = styled.div<{ $isOpen: boolean }>`
  width: 80dvw;
  height: 100%;
  position: fixed;
  z-index: 80000;
  top: 0;
  right: ${({ $isOpen }) => ($isOpen ? "0" : "-80%")};
  background-color: #ffffff;
  border-left: 1px solid
    ${(props) => {
      return props.theme.color.grey;
    }};
  transition: right 0.3s ease-in-out;

  div.headline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5dvh 10dvw;
  }
`;

const NavigationList = styled.ul`
  list-style: none;
  padding: 0 10dvw;
  margin: 0;
  color: black;
  position: fixed;
  z-index: 9900;

  div.title {
    border-bottom: 1px solid black;
    width: 60dvw;
    font-weight: bold;
    margin: 2dvh 0;
  }

  li {
    font-size: 0.9rem;
    margin: 1dvh 0;
  }

  div.middle {
    font-size: 0.9rem;
    margin: 1dvh 0;

    li {
      color: ${(props) => props.theme.color.grey};
      margin-left: 3dvw;
    }
  }
`;
export { NavigationContainer, NavigationList };
