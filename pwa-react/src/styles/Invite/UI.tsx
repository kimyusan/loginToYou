import { Button } from "../common/button";
import styled from "styled-components";

export const LongButton = styled(Button)`
  width: 100%;
  margin: 5px 0;

  &.white {
    background-color: white;
    border: 1px solid
      ${(props) => {
        return props.theme.color.sub2;
      }};

    &:active {
      background-color: ${(props) => {
        return props.theme.color.bgColor;
      }};
    }
  }
`;
