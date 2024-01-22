import { create } from "zustand";
<<<<<<< HEAD
import { persist } from "zustand/middleware";
=======
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
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
