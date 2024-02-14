import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/UserStore";
import { axiosAuth } from "../../util/token";
import { DiaryContent } from "../../interface/DiaryInterface";
import useCoupleStore from "../../stores/CoupleStore";
import { useShallow } from "zustand/react/shallow";
import { DiaryViewStyle } from "../../styles/Diary/DiaryDetail";
import useFCMStore from "../../stores/FCMStore";
import axios from "axios";

type Props = {
  date: string;
};

function DiaryView({ date }: Props) {
  const [myDiary, setMyDiary] = useState("");
  const [yourDiary, setYourDiary] = useState("");
  const [haveDiary, setHaveDiary] = useState(false);
  const [myDiaryId, setMyDiaryId] = useState<number | null>(null);
  const [regDate, setRegDate] = useState("");

  const { coupleId, myId, myName, myNickname, myProfImg } = useUserStore(
    useShallow((state) => ({
      coupleId: state.coupleId,
      myId: state.userId,
      myName: state.name,
      myNickname: state.nickname,
      myProfImg: state.profileImage,
    }))
  );

  const { yourId, yourName, yourNickname, yourProfImg } = useCoupleStore(
    (state) => ({
      yourId: state.yourId,
      yourName: state.yourName,
      yourNickname: state.yourNickName,
      yourProfImg: state.yourProfileImage,
    })
  );

  // 다이어리 호출
  const getDiary = async () => {
    try {
      const res = await axiosAuth.get(`/diary/memo/get`, {
        params: {
          coupleId,
          registerDate: date,
        },
      });

      if (res.data[0].userId) {
        if (res.data[0].userId == myId) {
          setMyDiary((prev) => res.data[0].content);
          if (res.data[0].content) {
            setHaveDiary(true);
            setMyDiaryId(res.data[0].diaryMemoId);
            setRegDate(res.data[0].registerDate);
          }
        } else {
          setYourDiary((prev) => res.data[0].content);
        }
      }
      if (res.data[1].userId) {
        if (res.data[1].userId == myId) {
          setMyDiary((prev) => res.data[1].content);
          if (res.data[1].content) {
            setHaveDiary(true);
            setMyDiaryId(res.data[1].diaryMemoId);
            setRegDate(res.data[1].registerDate);
          }
        } else {
          setYourDiary((prev) => res.data[1].content);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMyDiary((prev) => e.target.value);
  };

  // 개인 별 다이어리 작성
  const createDiary = async () => {
    if (myDiary == "") return;
    try {
      const res = await axiosAuth.post("/diary/memo/regist", {
        diaryMemoId: null,
        coupleId,
        userId: myId,
        registerDate: null,
        content: myDiary,
      });

      console.log("다이어리 작성 성공", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 개인 별 다이어리 업데이트
  const updateDiary = async () => {
    try {
      const res = await axiosAuth.put(`/diary/memo/update`, {
        diaryMemoId: myDiaryId,
        coupleId,
        userId: myId,
        registerDate: regDate,
        content: myDiary,
      });

      console.log("다이어리 업데이트 성공", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 조르기 푸시알림 보내기
  const { yourFCMtoken, diaryPush } = useFCMStore();

  const letsPush = () => {
    console.log(yourFCMtoken);
    axios({
      url: "https://fcm.googleapis.com/fcm/send",
      method: "POST",
      data: {
        to: yourFCMtoken,
        notification: {
          title: "❤너에게 로그인",
          body: `${
            yourNickname ? yourNickname : yourName
          }님, 일기를 작성해주세요!`,
          tag: diaryPush,
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer AAAAY7JdDVE:APA91bHykGL1DwaYmitHIGYeQL7fXih8EZ_211ISQALWQpnPPqBfP4nFX389-zhiZTsD96dtxLsSccSFarc3hifMkujFa210jRwnZoRDzoqqSm9c2z-zbtF3gW3HZ4RL2EZkZ3JUssdZ",
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDiary();
  }, []);

  return (
    <>
      <DiaryViewStyle>
        <div className="container">
          <img src={myProfImg} className="profImg" alt={`${myName}`} />
          <div className="contentBox">
            <div className="name">
              {myNickname ? myNickname : myName} 님의 일기
            </div>
            <textarea
              className="diaryBox"
              style={{ borderTopLeftRadius: 0 }}
              onInput={handleInput}
              onBlur={() => {
                haveDiary ? updateDiary() : createDiary();
              }}
              value={myDiary}
            >
              {myDiary}
            </textarea>
          </div>
        </div>
      </DiaryViewStyle>
      <DiaryViewStyle>
        <div className="container">
          <div className="contentBox">
            <div className="name" style={{ textAlign: "end" }}>
              {yourNickname ? yourNickname : yourName} 님의 일기
            </div>
            <div className="diaryBox" style={{ borderTopRightRadius: 0 }}>
              {yourDiary == "" ? (
                <div className="noContent">
                  <div>작성된 일기가 없습니다.</div>
                  <button
                    onClick={() => {
                      letsPush();
                    }}
                    className="pushButton"
                  >
                    써달라고 하기
                  </button>
                </div>
              ) : (
                yourDiary
              )}
            </div>
          </div>
          <img src={yourProfImg} className="profImg" alt={`${yourName}`} />
        </div>
      </DiaryViewStyle>
    </>
  );
}

export default DiaryView;
