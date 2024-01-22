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
<<<<<<< HEAD
      PATH: "http://192.168.100.82:8080",
=======
      // PATH: "http://192.168.100.82:8080",
      PATH: "http://localhost:8080",
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
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
