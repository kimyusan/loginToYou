import styled from "styled-components";

const GoBack = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 10px 0;
  font-size: 30px;

  & a {
    text-decoration: none;
    margin-left: 10px;
  }

  & button {
    padding-top: 10px;
  }
`;

const JoinForm = styled.form`
  width: 80%;
  margin: 50px auto;
`;
const ReadyBtn = styled.button`
  border: 0;
  border-radius: 15px;
  padding: 15px;
  width: 100%;
  cursor: pointer;
  background-color: ${(props) => {
      return props.theme.color.sub2;
    }};
  font-weight: bold;
`;
export { GoBack, ReadyBtn, JoinForm };
