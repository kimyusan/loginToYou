import { DefaultTheme } from "styled-components";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pink, green, blue } from "../styles/common/global";
import axios from "axios";

interface AuthStore {
  PATH: String;
  isLogIn: boolean;
  token: string | null;
  refToken: string | null;
  colortheme: DefaultTheme;
  login: () => void;
  logout: () => void;
  setToken: (token: string, refToken: string) => void;
  setColorTheme: (theme: DefaultTheme) => void;
  refreshToken: (email: string, time: number) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      // PATH: "http://192.168.100.82:8080",
      // PATH: "http://i10c105.p.ssafy.io:8080",
      PATH: "http://localhost:8080",
      token: null,
      refToken: null,
      isLogIn: false,
      colortheme: pink,

      login: () => {
        set({ isLogIn: true });
      },
      logout: () => {
        set({ isLogIn: false });
      },
      setToken: (token, refToken) => {
        set({ token: token });
        set({ refToken: refToken });
      },
      setColorTheme: (theme) => {
        set({ colortheme: theme });
      },
      refreshToken: (email, time) => {
        const refresh = async () => {
          const res = await axios.get(`${get().PATH}/reissue/token`, {
            params: {
              email: email,
            },
            headers: {
              Authorization: get().token,
              refreshToken: get().refToken,
            },
          });
          console.log(res);
        };
        refresh();
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
