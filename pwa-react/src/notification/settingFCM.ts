// settingFCM
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from "firebase/messaging";
import { firebaseConfig } from "./config";

import { validKey } from "./config";
import { goDeviceToken, setPushOk } from "../util/notification";
import useFCMStore from "../stores/FCMStore";
import { trustedTypes } from "trusted-types";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const setFCMToken = useFCMStore.getState().setFCMToken;
const setPush = useFCMStore.getState().setPush;
const isPush = useFCMStore.getState().isPush;

export async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    setPush(false);
    return;
  }

  console.log("알림 권한이 허용됨");

  const MyFCMtoken = await getToken(messaging, {
    vapidKey: validKey,
  });
  if (MyFCMtoken) {
    setPushOk();
    if (!isPush) {
      setPush(false);
    }
    console.log("token: ", MyFCMtoken);
    setFCMToken(MyFCMtoken);
    // 서버로 토큰 보내주는 코드
    // 서버 키
    // AAAAY7JdDVE:APA91bHykGL1DwaYmitHIGYeQL7fXih8EZ_211ISQALWQpnPPqBfP4nFX389-zhiZTsD96dtxLsSccSFarc3hifMkujFa210jRwnZoRDzoqqSm9c2z-zbtF3gW3HZ4RL2EZkZ3JUssdZ
    goDeviceToken(MyFCMtoken);
  } else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);

    // const { title, body } = payload.notification;

    // // 사용자에게 알림을 표시
    // if (Notification.permission === "granted") {
    //   // 알림 생성
    //   const notification = new Notification(title, {
    //     body: body,
    //     icon: "icon.png",
    //   });

    //   // 알림이 클릭되었을 때의 동작 설정
    //   notification.onclick = function (event) {
    //     event.preventDefault();
    //     window.focus();
    //   };
    // } else {
    //   console.log(
    //     "Notification permission has not been granted to the app yet."
    //   );
    // }
  });
  // 사용자가 구독을 취소할 때마다 토큰 삭제
  // window.addEventListener('beforeunload', async () => {
  //   console.log("페이지를 떠날 때 토큰을 삭제합니다.");
  //   try {
  //     await deleteToken(messaging, token);
  //     console.log("토큰 삭제 완료");
  //   } catch (error) {
  //     console.error("토큰 삭제 중 오류 발생:", error);
  //   }
  // });
}

requestPermission();
