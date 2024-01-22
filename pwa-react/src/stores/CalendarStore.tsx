<<<<<<< HEAD
import { create } from "zustand";

interface Calendar {
  isOpen: boolean;
  events: { title: string; start: string; end: string }[];

  openModal: () => void;
  closeModal: () => void;
  
  addEvent: (newEvent: { title: string; start: string; end: string }) => void;
}

export const CalendarStore = create<Calendar>((set) => ({
  isOpen: false,
  events: [],

  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  addEvent: (newEvent) => set((state) => ({ events: [...state.events, newEvent] })),
}));
=======
import React, { useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "../interface/CalendarInterface";

interface Calendar {
  isOpen: boolean;
  isEdit: boolean;
  events: Event[];
  event: { id: string; title: string; start: string; end: string };
  targetEvent: { id: string; title: string; start: string; end: string };

  nextId: number;

  openModal: () => void;
  closeModal: () => void;
  addMode: () => void;
  editMode: () => void;
  getEvent: (event: Event) => void;

  addEvent: (newEvent: Event) => void;
  updateEvent: (id: string, updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
}

export const CalendarStore = create(
  persist<Calendar>(
    (set) => ({
      isOpen: false,
      isEdit: false,
      events: [],
      event: { id: "", title: "", start: "", end: "" },
      nextId: 0,
      targetEvent: { id: "", title: "", start: "", end: "" },

      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
      addMode: () => set({ isEdit: false }),
      editMode: () => set({ isEdit: true }),
      getEvent: (event) =>
        set({
          targetEvent: {
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
          },
        }),

      addEvent: (newEvent) =>
        set((state) => ({
          events: [...state.events, newEvent],
          nextId: (state.nextId += 1),
          isOpen: false,
        })),

      updateEvent: (id, updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id ? { ...event, ...updatedEvent } : event
          ),
          isOpen: false,
          targetId: "-1",
        })),

      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),
    }),
    { name: "calendarStatus" }
  )
);
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
