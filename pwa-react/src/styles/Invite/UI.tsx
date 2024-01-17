import styled from "styled-components";
import { Button } from "../common/button";

interface Inputable {
  value?: string | null;
}

const WhiteBox = styled.div<Inputable>`
  width: 80%;
  padding: 10px 0;
  border: 0;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  font-size: 15pt;
  background-color: white;
  margin: 10px;
  color: #8a8a8a;
`;

const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LongButton = styled(Button)`
  width: 80%;
  margin: 10px;
`;

export { WhiteBox, InputForm, LongButton };
