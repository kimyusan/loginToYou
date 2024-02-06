import styled from "styled-components";

const Card = styled.div`
  border: 0;
  border-radius: 5px;
  box-shadow: 5px 5px 15px 1px ${(props) => props.theme.color.lightgrey}85; // 추후 수정
  background-color: white;
  padding: 10px;
  margin: 10px 20px;
`;

export { Card };
