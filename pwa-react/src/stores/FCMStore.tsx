import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FCMStoreInterface {
  FCMtoken: string;
  yourFCMtoken: string;
  isPush: boolean;
  videoChatPush: boolean;
  coupleCamPush: boolean;
  diaryPush: boolean;

  setFCMToken: (token: string) => void;
  setYourFCMtoken: (token: string) => void;
  setPush: (now: boolean) => void;
  setVideoChatPush: (now: boolean) => void;
  setCoupleCamPush: (now: boolean) => void;
  setDiaryPush: (now: boolean) => void;
}

const useFCMStore = create(
  persist<FCMStoreInterface>(
    (set) => ({
      FCMtoken: "",
      yourFCMtoken: "",
      isPush: true,
      videoChatPush: true,
      coupleCamPush: true,
      diaryPush: true,

      setFCMToken: (token) => {
        set({ FCMtoken: token });
      },
      setYourFCMtoken: (token) => {
        set({ yourFCMtoken: token });
      },
      setPush: (now) => {
        set({ isPush: now });
      },
      setVideoChatPush: (now) => {
        set({ videoChatPush: now });
      },
      setCoupleCamPush: (now) => {
        set({ coupleCamPush: now });
      },
      setDiaryPush: (now) => {
        set({ diaryPush: now });
      },
    }),
    {
      name: "FCMStatus",
    }
  )
);

export default useFCMStore;
