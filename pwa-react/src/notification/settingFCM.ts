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
// import { goDeviceToken } from "../api/FCMTokenApi";
import axios from 'axios'
import useAuthStore from "../stores/AuthStore";


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey: validKey,
  });
  if (token) {
    console.log("token: ", token);
    // 서버로 토큰 보내주는 코드
    // 서버 키
    // AAAAY7JdDVE:APA91bHykGL1DwaYmitHIGYeQL7fXih8EZ_211ISQALWQpnPPqBfP4nFX389-zhiZTsD96dtxLsSccSFarc3hifMkujFa210jRwnZoRDzoqqSm9c2z-zbtF3gW3HZ4RL2EZkZ3JUssdZ
  } else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
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