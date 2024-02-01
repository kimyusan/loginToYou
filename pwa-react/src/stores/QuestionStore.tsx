import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuestionStore {
  isOpen: boolean;
  isEdit: boolean;
  editAnswer: null | string;
  modalQuestion: null | string;
  dateString: null | string;

  handleModal: () => void;
  EditMode: () => void;
  setEditAnswer: (ans: null | string) => void;
  setModalQuestion: (q: null | string) => void;
  setDateString: (date: null | string) => void;
}

const useQuestionStore = create(
  persist<QuestionStore>(
    (set, get) => ({
      isOpen: false,
      isEdit: false,
      editAnswer: null,
      modalQuestion: null,
      dateString: null,

      handleModal: () => {
        set({ isOpen: !get().isOpen });
      },
      EditMode: () => {
        set({ isEdit: !get().isEdit });
      },
      setEditAnswer: (ans) => {
        set({ editAnswer: ans });
      },
      setModalQuestion: (q) => {
        set({ modalQuestion: q });
      },
      setDateString: (date) => {
        set({ dateString: date });
      },
    }),
    { name: "QuestionStatus" }
  )
);

export default useQuestionStore;
