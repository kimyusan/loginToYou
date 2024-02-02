import { DefaultTheme } from "styled-components";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pink, green, blue } from "../styles/common/global";

interface AuthStore {
  PATH: String;
  isLogIn: boolean;
  token: string | null;
  colortheme: DefaultTheme;
  login: () => void;
  logout: () => void;
  setToken: (token: string) => void;
  setColorTheme: (theme: DefaultTheme) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      // PATH: "http://192.168.100.82:8080",
      // PATH: "http://i10c105.p.ssafy.io:8080",
      PATH: "https://logintoyou.kro.kr:8080",
      token: null,
      isLogIn: false,
      colortheme: pink,

      login: () => {
        set({ isLogIn: true });
      },
      logout: () => {
        set({ isLogIn: false });
      },
      setToken: (token) => {
        set({ token: token });
      },
      setColorTheme: (theme) => {
        set({ colortheme: theme });
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
