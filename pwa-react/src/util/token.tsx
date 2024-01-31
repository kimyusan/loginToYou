import axios from "axios";
import useAuthStore from "../stores/AuthStore";

export const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const token = useAuthStore.getState().token;
const PATH = useAuthStore.getState().PATH;

export const axiosAuth = axios.create({
  baseURL: `${PATH}`,
  headers: {
    Authorization: token,
  },
});

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status == 403) {
      console.log("토큰없음");

      error.config.headers = {
        Authorization: token,
      };

      const response = await axiosAuth.request(error.config);
      return response;
    } else {
      return error;
    }
  }
);
