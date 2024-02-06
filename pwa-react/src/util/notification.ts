import axios from "axios";
import { axiosAuth } from "./token";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

export const goDeviceToken = (token: any) => {
  const PATH = useAuthStore.getState().PATH;
  const userId = useUserStore.getState().userId;
  axios
    .post(
      `${PATH}/fcm/issue/fcmtoken`,
      {},
      {
        params: {
          userId: userId,
          fcmToken: token,
        },
      }
      // {
      //   headers: {
      //     Authorization:
      //       "AAAAY7JdDVE:APA91bHykGL1DwaYmitHIGYeQL7fXih8EZ_211ISQALWQpnPPqBfP4nFX389-zhiZTsD96dtxLsSccSFarc3hifMkujFa210jRwnZoRDzoqqSm9c2z-zbtF3gW3HZ4RL2EZkZ3JUssdZ",
      //   },
      // }
    )
    .then((res) => console.log(res.data))
    .catch((err) => console.log("토큰보내기 실패!!!!"));
};
