import styled from "styled-components";

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

    /* .lock {
      display: flex;
      justify-content: center;
    } */

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

  /* .choice {
    height: 100%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .grey {
    color: ${(props) => {
    return props.theme.color.grey;
  }};
  } */
`;

const ChallengeItem = () => {
  return (
    <div>
      <ChallengeBox>
        <div className="item">
          <h3 className="subject">100일 커플 일기 챌린지</h3>
          <p className="content">100일 연속 일기 어쩌구</p>
          <p className="detail">자세히 보기 &gt;</p>
        </div>
      </ChallengeBox>
    </div>
  );
};

export default ChallengeItem;
