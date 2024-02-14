import styled from "styled-components";

const Title = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => {
    return props.theme.color.point;
  }};
  text-shadow: 2px 2px 1px ${(props) => {
    return props.theme.color.sub2;
  }};
  margin-bottom: 15px;
  ::after {
    -webkit-text-stroke: 2px blue;
    position: absolute;
  }
`

const TodayQ = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
  margin: 20px 0;
  font-style: italic;
`

// const DayBox = styled.div`
//   width: 90%;
//   text-align: end;
//   color: ${(props) => {
//     return props.theme.color.grey;
//   }};
//   font-size: 17px;
//   margin: 5px auto;
//   font-style: italic;
// `

const SelectBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .item {
    flex: 0 0 40%;
    margin: 5px 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => {
      return props.theme.color.lightgrey;
    }};
    padding: 10px;
    box-shadow: 3px 3px 1px 1px ${(props) => props.theme.color.lightgrey};
    height: 160px;

    .lock {
      display: flex;
      justify-content: center;
    }

    .content {
      text-align: center;
      font-size: 15px;
      color: ${(props) => {
        return props.theme.color.grey;
      }};
      margin-top: 10%;
    }
  }

  .choice {
    height: 100%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }

  .grey {
    color: ${(props) => {
      return props.theme.color.grey;
    }};
  }
`

const OurTitle = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .content {
    flex: 0 0 40%;
    margin: 5px 5%;
    text-align: center;
    font-size: 20px;
    color: ${(props) => {
      return props.theme.color.grey;
    }};
  }
`

const OtherTitle = styled.div`
  width: 90%;
  text-align: start;
  margin: 10% auto;
  color: ${(props) => {
    return props.theme.color.grey;
  }};
  font-size: 20px;
  margin-top: 5%;
`

const Chart = styled.figure`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  transition: 0.3s; //생략 가능
  display: flex;
  margin: 0 auto;
  span.center { //작은 원
    background: ${(props) => {
      return props.theme.color.bgColor;
    }};
    display: block; //생략 가능
    position: absolute; //두개의 원이 겹치도록
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    line-height: 80px;
    transform: translate(-50%, -50%); //가운데 위치
  }
`

const QuestionBox = styled.div`
  width: 90%;
  margin: 15% auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  :nth-last-child(1) {
    justify-self: end;
    align-self: end;
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 50px;
    margin: 0 5px;
  }

  .answer1 {
    width: 80%;
    height: auto;
    padding: 10px;
    font-size: 17px;
    border: 1px solid ${(props) => {
      return props.theme.color.sub1;
    }};
    border-radius: 15px;
    border-bottom-left-radius: 0;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    box-shadow: -3px 3px 1px 1px ${(props) => props.theme.color.sub3};
  }

  .vs {
    width: 100%;
    text-align: center;
    margin: 10px 0;
    font-size: 30px;
    font-weight: 800;
  }

  .answer2 {
    width: 80%;
    height: auto;
    border: 1px solid ${(props) => {
      return props.theme.color.point;
    }};
    border-radius: 15px;
    border-bottom-right-radius: 0;
    padding: 10px;
    font-size: 17px;
    overflow-wrap: break-word;
    word-break: break-all;
    white-space: pre-wrap;
    box-shadow: 3px 3px 1px 1px ${(props) => props.theme.color.sub3};
  }
  
`

const ReRender = styled.div`
  width: 90%;
  height: auto;
  margin: 5px auto;
  text-align: end;

  .MdOutlineRefresh {
    transition: transform 0.3s ease;
  }

  .MdOutlineRefresh.rotate {
    transform: rotate(1turn);
  }
`

const ChartContent = styled.div`
  width: 100%;
  height: auto;
  margin: 10% 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;

  .ct {
    width: 40%;
    height: auto;
    padding: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export { Title, SelectBox, OurTitle, OtherTitle, Chart, TodayQ, QuestionBox, ReRender, ChartContent }