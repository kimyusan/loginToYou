import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoupleInterface } from "../interface/UserInterface";
import { axiosAuth } from "../util/token";

interface CoupleStoreInterface extends CoupleInterface {
  yourId: number | null;
  yourName: string | null;
  yourNickName: string | null;
  yourProfileImage: string;

  setCouple: (coupleInfo: CoupleInterface) => void;
  setYourName: (
    id: number | null,
    name: string | null,
    nickName: string | null
  ) => void;
  setYourProfileImage: (img: string) => void;
}

const useCoupleStore = create(
  persist<CoupleStoreInterface>(
    (set, get) => ({
      coupleId: null,
      name: null,
      startDate: null,
      fuserId: null,
      suserId: null,

      yourId: null,
      yourName: null,
      yourNickName: null,
      yourProfileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",

      setCouple: (CoupleInfo) => {
        set({
          coupleId: CoupleInfo.coupleId,
          name: CoupleInfo.name,
          startDate: CoupleInfo.startDate,
          fuserId: CoupleInfo.fuserId,
          suserId: CoupleInfo.suserId,
        });
      },

      setYourName: (id, name, nickName) => {
        set({
          yourId: id,
          yourName: name,
          yourNickName: nickName,
        });
      },

      setYourProfileImage: (img) => {
        set({ yourProfileImage: img });
      },
    }),
    {
      name: "coupleStatus",
    }
  )
);

export default useCoupleStore;
