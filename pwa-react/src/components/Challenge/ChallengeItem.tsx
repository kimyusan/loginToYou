import styled from "styled-components";
import { challengeInfo } from "../../routes/Challenge";
import { useState } from "react";
import ChallengeModal from "./ChallengeModal";

const ChallengeBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .item {
    flex: 0 0 80%;
    margin: 5px 5px;
    border-radius: 5px;
    border: 1px solid
      ${(props) => {
        return props.theme.color.lightgrey;
      }};
    padding: 10px;
    box-shadow: 3px 3px 1px 1px ${(props) => props.theme.color.lightgrey};
    height: auto;

    .subject {
      margin-top: 0px;
      margin-bottom: 0px;
    }

    .content {
      text-align: left;
      font-size: 16px;
      color: ${(props) => {
        return props.theme.color.grey;
      }};
      margin-top: 2%;
      margin-bottom: 2%;
    }

    .detail {
      text-align: right;
      display: block;
      margin-top: 0%;
      margin-bottom: 0%;
      font-size: 15px;
    }
  }
`;

interface challengeProps {
  key: number;
  challenge: challengeInfo;
}

const ChallengeItem = ({ challenge }: challengeProps) => {
  // 모달 띄우기
  const [modal, setModal] = useState(false);

  // 모달 제어
  const handleModal = (e: React.MouseEvent) => {
    setModal(!modal);
  };

  return (
    <>
      {modal ? <ChallengeModal handleModal={handleModal} /> : null}

      <ChallengeBox onClick={handleModal}>
        <div className="item">
          <h3 className="subject">{challenge.subject}</h3>
          <p className="content">{challenge.content}</p>
          <p className="detail">자세히 보기 &gt;</p>
        </div>
      </ChallengeBox>
    </>
  );
};

export default ChallengeItem;
