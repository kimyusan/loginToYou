import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoupleInterface } from "../interface/UserInterface";

interface CoupleStoreInterface extends CoupleInterface {
  yourId: number | null;
  yourName: string | null;
  yourNickName: string | null;

  setCouple: (coupleInfo: CoupleInterface) => void;
  setYourName: (id: number | null, name: string | null, nickName: string | null) => void;
  // setName: (name: string | null) => void;
  // setStartDate: (startDate: string | null) => void;
}

const useCoupleStore = create(
  persist<CoupleStoreInterface>(
    (set) => ({
    coupleId: null,
    name: null,
    startDate: null,
    fuserId: null,
    suserId: null,

    yourId: null,
    yourName: null,
    yourNickName: null,

    setCouple: (CoupleInfo) => {
      set({
        coupleId: CoupleInfo.coupleId,
        name: CoupleInfo.name,
        startDate: CoupleInfo.startDate,
        fuserId: CoupleInfo.fuserId,
        suserId: CoupleInfo.suserId,
      })
    },

    setYourName: (id,name,nickName) => {
      set({
        yourId: id,
        yourName: name,
        yourNickName: nickName
      })
    }
  }), {
    name: 'coupleStatus'
  })
)

export default useCoupleStore;