import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  PATH: String;
  isLogIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      PATH: "http://192.168.100.82:8080",
      isLogIn: false,
      login: () => {
        set({ isLogIn: true });
      },
      logout: () => {
        set({ isLogIn: false });
      },
    }),
    {
      name: "userLoginStatus",
    }
  )
);

export default useAuthStore;
