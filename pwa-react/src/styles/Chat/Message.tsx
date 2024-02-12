import styled from "styled-components";

export const MessageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10dvh;

  &.keyup {
    height: 45dvh;
  }
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
    word-wrap: break-word;
  }

  & > div.time {
    color: ${(props) => {
      return props.theme.color.grey;
    }};
    font-size: 10pt;
    align-self: flex-end;
    margin: 0 5px;
  }

  & > div.isRead {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
    align-self: flex-end;
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
    border: 1px solid
      ${(props) => {
        return props.theme.color.sub2;
      }};
    border-bottom-right-radius: 0;
    justify-self: flex-start;
  }
`;

export const OppMessage = styled(MessageLine)`
  justify-content: start;

  & > div.content {
    background-color: ${(props) => {
      return props.theme.color.sub4;
    }};
    align-self: flex-start;
    border: 1px solid
      ${(props) => {
        return props.theme.color.sub4;
      }};
    border-bottom-left-radius: 0;
  }
`;
