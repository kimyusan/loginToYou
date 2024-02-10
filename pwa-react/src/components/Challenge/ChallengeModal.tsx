import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: cyan;
  width: 90%;
  height: 50%;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .exit {
    height: 20px;
    width: 100%;
    display: flex;
    justify-content: end;

    color: white;
  }
`;

interface ChallengeItemProps {
  handleModal: (event: React.MouseEvent) => void;
}

const ChallengeDetailModal = ({ handleModal }: ChallengeItemProps) => {
  return (
    <Wrapper>
      <div className="exit">
        <div onClick={handleModal}>X</div>
      </div>
    </Wrapper>
  );
};

export default ChallengeDetailModal;
