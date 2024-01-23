import React, { useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "../interface/CalendarInterface";
import axios from "axios";
import useUserStore from "./UserStore";

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
  postEventToServer: (newEvent: Event) => void; // post API
  getEventsFromServer: (couple_id: number) => void; // get API
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

      // "couple_id": 2,
      // "user_id": 16,
      // "start_date": "20240122",
      // "end_date": "20240122",
      // "event_type": "birthday",
      // "contents": "생일축하2"

      postEventToServer: (newEvent) => {
        axios
          .post("http://localhost:8080/calendar/create", {
            couple_id: 0,
            user_id: 1,
            start_date: newEvent.start,
            end_date: newEvent.end,
            event_type: null,
            contents: newEvent.title,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }, // post API

      getEventsFromServer: (couple_id) => {
        axios
          .get("http://localhost:8080/calendar/read", {
            params: { couple_id: couple_id },
          })
          .then((response) => {
            const fullEvents: Event[] = response.data.map(
              (item: {
                calendar_id: number;
                couple_id: number;
                user_id: number;
                start_date: string;
                end_date: string;
                event_type: string | null;
                contents: string | null;
              }) => ({
                id: item.calendar_id,
                title: item.contents,
                start: item.start_date,
                end: item.end_date,
              })
            );
            set({ events: fullEvents });
          })
          .catch((error) => {
            console.log(error.response);
          });
      }, // get API
    }),
    { name: "calendarStatus" }
  )
);
