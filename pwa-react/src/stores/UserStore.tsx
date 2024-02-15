import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInterface } from "../interface/UserInterface";

interface UserStore extends UserInterface {
  setUser: (userInfo: UserInterface) => void;
  setCoupleId: (newId: number | null) => void;

  startDate: string | null;
  setStartDate: (date: string | null) => void;

  profileImage: string;
  setProfileImage: (image: string) => void;
}

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      userId: null,
      email: null,
      name: null,
      mobile: null,
      birthday: null,
      gender: null,
      coupleId: null,
      nickname: null,
      password: null,
      roll: null,

      profileImage:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",

      startDate: null,

      setCoupleId: (newId) => {
        set({
          coupleId: newId,
        });
      },
      setUser: (userInfo) => {
        set({
          userId: userInfo.userId,
          email: userInfo.email,
          name: userInfo.name,
          mobile: userInfo.mobile,
          birthday: userInfo.birthday,
          gender: userInfo.gender,
          coupleId: userInfo.coupleId,
          nickname: userInfo.nickname,
          password: userInfo.password,
          role: userInfo.role,
        });
      },

      setProfileImage: (image) => {
        set({ profileImage: image });
      },

      setStartDate: (date) => {
        set({ startDate: date });
      },
    }),
    {
      name: "userStatus",
    }
  )
);

export default useUserStore;
