import { DefaultTheme } from "styled-components";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pink, green, blue, beige } from "../styles/common/global";

interface AuthStore {
  PATH: String;
  isLogIn: boolean;
  token: string | null;
  refToken: string | null;
  colortheme: DefaultTheme;
  tokenExpireTime: number | null;
  login: () => void;
  logout: () => void;
  setToken: (token: string, refToken: string) => void;
  setColorTheme: (theme: DefaultTheme) => void;
  setTokenExpireTime: (time: number) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      // PATH: "http://192.168.100.82:8080",
      // PATH: "http://i10c105.p.ssafy.io:8080",
      PATH: "https://logintoyou.kro.kr:8080",
      token: null,
      refToken: null,
      isLogIn: false,
      colortheme: pink,
      tokenExpireTime: null,

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
      setTokenExpireTime: (time) => {
        set({ tokenExpireTime: time + 1000 * 60 * 60 });
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
