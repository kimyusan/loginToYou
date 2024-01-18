import styled from "styled-components"

const SelectBox = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;

  & a {
    width: 90%;
    height: auto;

    & div {
      height: 40vh;
    }

    &:not(:first-child) {
      margin-top: 30px;
    }
  }
`

export {SelectBox}