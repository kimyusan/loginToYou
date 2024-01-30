import React from "react";
import { Wrapper, NameInput } from "../../styles/CoupleInfo/UI";

type Props = {
  cpName: string;
  setCpName: (name: string) => void;
};

function CoupleInfoName({ cpName, setCpName }: Props) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCpName(event.target.value);
  };

  return (
    <Wrapper>
      <label>우리 커플 이름은</label>
      <NameInput type="text" value={cpName} onChange={onChange} />
    </Wrapper>
  );
}

export default CoupleInfoName;
