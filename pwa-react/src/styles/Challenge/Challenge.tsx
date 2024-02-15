import styled from "styled-components";

const ChallengeSelect = styled.div`
  width: 70%;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .item {
    width: 100%;
    height: 250px;
    border-radius: 5px;
    border: 1px solid
    ${(props) => {
      return props.theme.color.lightgrey;
    }};
    padding: 10px;
    box-shadow: 3.5px 3.5px 1px 1px ${(props) => props.theme.color.lightgrey};
    margin-bottom: 50px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  
  .img1 {
    background-image: url("https://kr1-api-object-storage.nhncloudservice.com/v1/AUTH_676ca94cf5c14452b9c4bd00ebe84947/real-pub/godoService/godomall_new2/upimage/plusShop/201604/041417060606.png");
  }

  .img2 {
    background-image: url("https://t1.daumcdn.net/cfile/tistory/2179EB50586C965037");
    color: white;
  }

  .img3 {
    background-image: url("https://thumb.photo-ac.com/a9/a9adb1a1cc05c3b4dcfa4c77d238e9cd_t.jpeg");
  }

  .img4 {
    background-image: url("https://images.unsplash.com/photo-1578625155481-7bc40a6481b6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  }

  .img5 {
    background-image: url("https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?q=80&w=1971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  }

  .main_content {
    font-size: 40px;
    margin-bottom: 5px;
    font-weight: 600;
  }

  .sub_content {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 5px;
  }

  .scroll {
    overflow: scroll;
  }
`

const ChallengeBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .item {
    width: 95%;
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
      font-size: 20px;
      font-weight: 600;
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

    .progress > span {
      background-color: ${(props) => {
        return props.theme.color.point;
      }};
    }
  }
`;

export {ChallengeSelect , ChallengeBox}