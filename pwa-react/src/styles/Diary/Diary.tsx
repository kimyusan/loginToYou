import styled from "styled-components";

const DaySelect = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  margin-top: 15%;
  background-color: #F9F9F9;
  
  & .subBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & .dayBox {
    font-size: 20px;
    margin: 0 20px;
    font-weight: bold;
    border-bottom: 5px solid #ffd1da;
  }
`

export {DaySelect}