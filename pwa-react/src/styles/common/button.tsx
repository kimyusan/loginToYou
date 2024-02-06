import styled from "styled-components";

const Button = styled.button`
  width: 45%;
  padding: 10px 0;
  border: 0;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  font-size: 15pt;
  background-color: ${(props) => {
    return props.theme.color.sub4;
  }};
  color: black;
  &:active {
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
  }
`;

export { Button };
