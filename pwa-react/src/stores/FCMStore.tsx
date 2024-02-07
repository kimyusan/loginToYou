import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FCMStoreInterface {
  FCMtoken: string;
  setFCMToken: (token: string) => void;
}

const useFCMStore = create(
  persist<FCMStoreInterface>(
    (set) => ({
      FCMtoken: "",
      setFCMToken: (token) => {
        set({ FCMtoken: token });
      },
    }),
    {
      name: "FCMStatus",
    }
  )
);

export default useFCMStore;
