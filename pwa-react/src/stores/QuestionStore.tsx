import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuestionStore {
  isOpen: boolean;
  isEdit: boolean;

  handleModal: () => void;
  EditMode: () => void;
}

const useQuestionStore = create(
  persist<QuestionStore>(
    (set, get) => ({
      isOpen: false,
      isEdit: false,

      handleModal: () => {
        set({ isOpen: !get().isOpen });
      },
      EditMode: () => {
        set({ isEdit: !get().isEdit });
      },
    }),
    { name: "QuestionStatus" }
  )
);

export default useQuestionStore;
