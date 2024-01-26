import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CoupleInterface } from "../interface/UserInterface";

interface CoupleStoreInterface extends CoupleInterface {
  setName: (name: string | null) => void;
  setStartDate: (startDate: string | null) => void;
}

// export const useCoupleStore = create(
//   persist<CoupleStoreInterface>((set) => ({
//     coupleId: number | null;
//     name: string | null;
//     startDate: string | null;
//     fuserId: number;
//     suserId: number;
//   }), {
//     name: 'coupleStatus'
//   })
// )
