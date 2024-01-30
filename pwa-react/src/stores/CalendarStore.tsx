import React, { useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "../interface/CalendarInterface";
import axios from "axios";
import useUserStore from "./UserStore";
import FullCalendar from "@fullcalendar/react";
import useAuthStore from "./AuthStore";

interface Calendar {
  PATH: string;
  isOpen: boolean;
  isEdit: boolean;
  isDelete: boolean;
  events: Event[];
  event: { id: string; title: string; start: string; end: string };
  targetEvent: { id: string; title: string; start: string; end: string };

  nextId: number;

  openModal: () => void;
  closeModal: () => void;
  addMode: () => void;
  editMode: () => void;
  deleteMode: () => void;
  getEvent: (event: Event) => void;

  postEventToServer: (newEvent: Event, coupleId: number) => void; // post API
  getEventsFromServer: (coupleId: number | null) => void; // get API
  updateEventToServer: (newEvent: Event, coupleId: number) => void; // update API
  deleteEventFromServer: (calendar_id: number) => void; //delete API
}

export const CalendarStore = create(
  persist<Calendar>(
    (set, get) => ({
      PATH: "http://localhost:8080",
      isOpen: false,
      isEdit: false,
      isDelete: false,
      events: [],
      event: { id: "", title: "", start: "", end: "" },
      nextId: 0,
      targetEvent: { id: "", title: "", start: "", end: "" },

      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
      addMode: () => set({ isEdit: false }),
      editMode: () => set({ isEdit: true }),
      deleteMode: () => set({ isDelete: true }),
      getEvent: (event) =>
        set({
          targetEvent: {
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
          },
        }),

      getEventsFromServer: (coupleId) => {
        axios
          .get(`${get().PATH}/calendar/read`, {
            params: { coupleId: coupleId },
            headers: {
              Authorization: useAuthStore.getState().token,
            },
          })
          .then((response) => {
            const fullEvents: Event[] = response.data.map(
              (item: {
                calendarId: number;
                coupleId: number;
                userId: number;
                startDate: string;
                endDate: string;
                eventType: string | null;
                contents: string | null;
              }) => ({
                id: item.calendarId,
                title: item.contents,
                start: item.startDate,
                end: item.endDate,
              })
            );
            set({ events: fullEvents });
          })
          .catch((error) => {
            set({ events: [] });
            console.log(error.response);
          });
      }, // get API

      postEventToServer: (newEvent, coupleId) => {
        axios
          .post(`${get().PATH}/calendar/create`, {
            coupleId: coupleId,
            userId: 1,
            startDate: newEvent.start,
            endDate: newEvent.end,
            eventType: null,
            contents: newEvent.title,
          }, {
            headers: {
              Authorization: useAuthStore.getState().token
            }
          })
          .then((response) => {
            console.log(response.data);
            get().getEventsFromServer(coupleId);
          })
          .catch((error) => {
            console.log(error.response);
          });
      }, // post API

      updateEventToServer: (editEvent, coupleId) => {
        axios
          .put(`${get().PATH}/calendar/update`, {
            calendarId: editEvent.id,
            coupleId: coupleId,
            userId: 1,
            startDate: editEvent.start,
            endDate: editEvent.end,
            eventType: null,
            contents: editEvent.title,
          }, {
            headers: {
              Authorization: useAuthStore.getState().token
            }
          })
          .then((response) => {
            console.log(response);
            set({ isEdit: false });
          })
          .catch((error) => {
            console.log(error.data);
          });
      }, // update API

      deleteEventFromServer: (calendar_id) => {
        axios
          .delete(`${get().PATH}/calendar/delete`, {
            params: { calenderId: calendar_id },
            headers: {
              Authorization: useAuthStore.getState().token
            }
          })
          .then((response) => {
            console.log(response);
            set({ isDelete: false });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    { name: "calendarStatus" }
  )
);
