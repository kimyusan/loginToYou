import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLogIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogIn: false,
      login: () => {
        set({ isLogIn: true });
      }, 
      logout: () => {
        set({ isLogIn: false });
      },
    }),
    {
      name: 'userLoginStatus',
    }
  )
);

export default useAuthStore;