import styled from "styled-components";

export const MessageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const MessageLine = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  & > div.content {
    width: fit-content;
    max-width: 60%;
    padding: 10px 20px;
    border-radius: 25px;
  }

  & > div.time {
    color: #8a8a8a;
    font-size: 10pt;
    align-self: flex-end;
    margin: 0 5px;
  }

  & > div.isRead {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fba1b7;
    align-self: center;
    margin: 10px;

    &.false {
      display: none;
    }
  }
`;

export const MyMessage = styled(MessageLine)`
  justify-content: end;

  & > div.content {
    background-color: white;
    align-self: flex-end;
    border: 1px solid #fba1b7;
    border-bottom-right-radius: 0;
    justify-self: flex-start;
  }
`;

export const OppMessage = styled(MessageLine)`
  justify-content: start;

  & > div.content {
    background-color: #ffd1da;
    align-self: flex-start;
    border: 1px solid #ffd1da;
    border-bottom-left-radius: 0;
  }
`;
