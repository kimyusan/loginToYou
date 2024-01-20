import { create } from "zustand";

interface Calendar {
  isOpen: boolean;
  events: { title: string; start: string; end: string }[];
  event: { title: string; start: string; end: string };

  openModal: () => void;
  closeModal: () => void;

  addEvent: (newEvent: { title: string; start: string; end: string }) => void;
}

export const CalendarStore = create<Calendar>((set) => ({
  isOpen: false,
  events: [],
  event: { title: "", start: "", end: "" },


  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  addEvent: (newEvent) =>
    set((state) => ({ events: [...state.events, newEvent] })),
}));
