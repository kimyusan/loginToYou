import { create } from "zustand";

interface Calendar {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const CalendarStore = create<Calendar>((set) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true });
  },
  closeModal: () => {
    set({ isOpen: false });
  },
}));
