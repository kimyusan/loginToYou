import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100dvh;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & *.ft-bd {
    font-weight: bold;
  }

  & *.flex {
    display: flex;
    justify-content: center;
    align-items: center;

    &.f-col {
      flex-direction: column;
    }
  }

  & *.fc-grey {
    color: ${(props) => {
      return props.theme.color.grey;
    }};
  }

  & *.mb-30 {
    margin-bottom: 30px;
  }

  & *.prof-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

export const ButtonBox = styled.div`
  height: 10%;
  width: 100%;

  & > img {
    width: 50px;
    height: 50px;
  }
`;
