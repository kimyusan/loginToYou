import axios from "axios";
import { axiosAuth } from "./token";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

export const goDeviceToken = (token: string) => {
  const PATH = useAuthStore.getState().PATH;
  const userId = useUserStore.getState().userId;
  axios({
    url: `${PATH}/fcm/issue/fcmtoken`,
    method: "POST",
    params: {
      userId: userId,
      fcmToken: token,
    },
  })
    .then((res) => console.log(res.data))
    .catch((err) => console.log("토큰보내기 실패!!!!"));
};
