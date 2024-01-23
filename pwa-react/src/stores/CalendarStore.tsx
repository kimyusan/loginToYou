import React, { useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "../interface/CalendarInterface";
import axios from "axios";
import useUserStore from "./UserStore";

interface Calendar {
  isOpen: boolean;
  isEdit: boolean;
  goDelete: boolean;
  events: Event[];
  event: { id: string; title: string; start: string; end: string };
  targetEvent: { id: string; title: string; start: string; end: string };

  nextId: number;

  openModal: () => void;
  closeModal: () => void;
  addMode: () => void;
  editMode: () => void;
  getEvent: (event: Event) => void;

  postEventToServer: (newEvent: Event) => void; // post API
  getEventsFromServer: (couple_id: number) => void; // get API
  updateEventToServer: (newEvent: Event) => void; // update API
  deleteEventFromServer: (calendar_id: number) => void; //delete API
}

export const CalendarStore = create(
  persist<Calendar>(
    (set) => ({
      isOpen: false,
      isEdit: false,
      goDelete: false,
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

      getEventsFromServer: (couple_id) => {
        axios
          .get("http://localhost:8080/calendar/read", {
            params: { couple_id: couple_id },
          })
          .then((response) => {
            console.log(response);
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
            set({ goDelete: false });
          })
          .catch((error) => {
            set({ events: [] });
            console.log(error.response);
          });
      }, // get API

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

      updateEventToServer: (editEvent) => {
        axios
          .post("http://localhost:8080/calendar/update", {
            calendar_id: editEvent.id,
            couple_id: 0,
            user_id: 1,
            start_date: editEvent.start,
            end_date: editEvent.end,
            event_type: null,
            contents: editEvent.title,
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.data);
          });
      }, // update API

      deleteEventFromServer: (calendar_id) => {
        axios
          .delete("http://localhost:8080/calendar/delete", {
            params: { calender_id: calendar_id },
          })
          .then((response) => {
            set({ goDelete: true });
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    { name: "calendarStatus" }
  )
);
