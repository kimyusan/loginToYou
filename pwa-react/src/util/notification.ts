import axios from "axios";
import { axiosAuth } from "./token";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

export const goDeviceToken = (FCMtoken: string) => {
  const PATH = useAuthStore.getState().PATH;
  const userId = useUserStore.getState().userId;
  axios({
    url: `${PATH}/fcm/issue/fcmtoken`,
    method: "POST",
    params: {
      userId: userId,
      fcmToken: FCMtoken,
    },
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

export const setPushOk = () => {
  const PATH = useAuthStore.getState().PATH;
  const userId = useUserStore.getState().userId;
  axios({
    url: `${PATH}/fcm/setting`,
    method: "POST",
    params: {
      userId: userId,
      isPushOk: true,
    },
  }).then((res)=>console.log(res.data))
  .catch((error)=>console.log(error))
};
