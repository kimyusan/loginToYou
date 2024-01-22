import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInterface } from "../interface/UserInterface";

interface UserStore extends UserInterface {
  setUser: (userInfo: UserInterface) => void;
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
      profileImage: null,

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
          profileImage: userInfo.profileImage,
        });
      },
    }),
    {
      name: "userStatus",
    }
  )
);

export default useUserStore;
