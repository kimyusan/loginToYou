import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FCMStoreInterface {
  FCMtoken: string;
  yourFCMtoken: string;
  setFCMToken: (token: string) => void;
  setYourFCMtoken: (token: string) => void;
}

const useFCMStore = create(
  persist<FCMStoreInterface>(
    (set) => ({
      FCMtoken: "",
      yourFCMtoken: "",

      setFCMToken: (token) => {
        set({ FCMtoken: token });
      },
      setYourFCMtoken: (token) => {
        set({ yourFCMtoken: token });
      },
    }),
    {
      name: "FCMStatus",
    }
  )
);

export default useFCMStore;
