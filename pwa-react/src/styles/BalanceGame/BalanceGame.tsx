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
  text-shadow: 0px 0px 15px ${(props) => {
    return props.theme.color.sub2;
  }};
  margin-bottom: 15px;
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
`

const Chart = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 0 auto;

  .middleMsg {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    .middle {
      font-size: 80px;
      font-weight: bold;
    }
  }

  .stroke {
    fill: transparent;
    stroke: ${(props) => {
      return props.theme.color.point;
    }};
    stroke-width: 20;
    stroke-dasharray: 560;
    transform: rotate(-90deg) rotateX(-180deg);
    transform-origin: center;
    animation: show_circle 2s ease infinite;
  }

  @keyframes show_circle {
    from {
      stroke-dashoffset: 246;
    }
    to {
      stroke-dashoffset: 0;
    }
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
export { Title, SelectBox, OurTitle, OtherTitle, Chart, TodayQ, QuestionBox }