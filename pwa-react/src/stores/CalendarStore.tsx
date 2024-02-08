import React, { useRef } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event, EventItem } from "../interface/CalendarInterface";
import { axiosAuth } from "../util/token";

interface Calendar {
  isOpen: boolean;
  isEdit: boolean;
  isDelete: boolean;
  events: Event[];
  eventlist: EventItem[];
  event: { id: string; title: string; start: string; end: string };
  targetEvent: EventItem;

  nextId: number;

  openModal: () => void;
  closeModal: () => void;
  addMode: () => void;
  editMode: () => void;
  deleteMode: () => void;
  getEvent: (event: EventItem) => void;

  postEventToServer: (newEvent: EventItem, coupleId: number) => void; // post API
  getEventsFromServer: (coupleId: number | null) => void; // get API
  updateEventToServer: (newEvent: EventItem, coupleId: number) => void; // update API
  deleteEventFromServer: (calendar_id: number) => void; //delete API
}

export const CalendarStore = create(
  persist<Calendar>(
    (set, get) => ({
      isOpen: false,
      isEdit: false,
      isDelete: false,
      events: [],
      eventlist: [],
      event: { id: "", title: "", start: "", end: "" },
      nextId: 0,
      targetEvent: { calendarId: 0, coupleId: 0, userId: 0, startDate: "", endDate: "", eventType: null, contents: null },

      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
      addMode: () => set({ isEdit: false }),
      editMode: () => set({ isEdit: true }),
      deleteMode: () => set({ isDelete: true }),
      getEvent: (event) =>
        set({
          targetEvent: {
            calendarId: event.calendarId,
            coupleId: event.coupleId,
            userId: event.userId,
            startDate: event.startDate,
            endDate: event.endDate,
            eventType: event.eventType,
            contents: event.contents
          },
        }),

      getEventsFromServer: (coupleId) => {
        axiosAuth
          .get("/calendar/read", {
            params: { coupleId: coupleId },
          })
          .then((response) => {
            const fullEvents: Event[] = response.data.map(
              (item: {
                calendarId: number;
                coupleId: number;
                userId: number;
                startDate: string;
                endDate: string | null;
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
            set({ eventlist: response.data });
          })
          .catch((error) => {
            set({ events: [] });
            console.log(error.response);
          });
      }, // get API

      postEventToServer: (newEvent, coupleId) => {
        axiosAuth
          .post("/calendar/create", {
            coupleId: coupleId,
            userId: newEvent.userId,
            startDate: newEvent.startDate,
            endDate: newEvent.endDate,
            eventType: null,
            contents: newEvent.contents,
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
        axiosAuth
          .put("/calendar/update", {
            calendarId: editEvent.calendarId,
            coupleId: coupleId,
            userId: editEvent.userId,
            startDate: editEvent.startDate,
            endDate: editEvent.endDate,
            eventType: null,
            contents: editEvent.contents,
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
        axiosAuth
          .delete("/calendar/delete", {
            params: { calenderId: calendar_id },
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
