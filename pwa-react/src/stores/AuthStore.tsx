import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  PATH: String;
  isLogIn: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
  setToken: (token: string) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      // PATH: "http://192.168.100.82:8080",
      // PATH: "http://i10c105.p.ssafy.io:8080",
      PATH: "http://localhost:8080",
      token: null,
      isLogIn: false,
      login: () => {
        set({ isLogIn: true });
      },
      logout: () => {
        set({ isLogIn: false });
      },
      setToken: (token) => {
        set({token: token})
      }
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
