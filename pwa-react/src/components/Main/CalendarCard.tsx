import React, { useEffect } from "react";
import { Card } from "../../styles/common/card";
import { CalendarSec } from "../../styles/Main/Main";
import { useNavigate } from "react-router-dom";
import { CalendarStore } from "../../stores/CalendarStore";
import { Event } from "../../interface/CalendarInterface";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TodayIcon from "@mui/icons-material/Today";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { useTheme } from "styled-components";
import { MyCalendar } from "../../styles/Main/Main";

const CalendarCard = () => {
  const navigate = useNavigate();
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");
  const theme = useTheme();
  const {
    openModal,
    closeModal,
    isOpen,
    isEdit,
    isDelete,
    addMode,
    events,
    getEventsFromServer,
  } = CalendarStore();

  const toDate = (date: string) => {
    const dateString = date.split("-");
    return new Date(
      parseInt(dateString[0], 10),
      parseInt(dateString[1], 10) - 1,
      parseInt(dateString[2], 10),
      24,
      0,
      0
    );
  };

  const compare: (a: Event, b: Event) => number = (a, b) => {
    const startDateA = new Date(a.start).getTime();
    const startDateB = new Date(b.start).getTime();
    return startDateA - startDateB;
  };

  const filterdEvents = events.filter(
    (event) =>
      toDate(event.start) >= new Date() ||
        (event.end && (toDate(event.start) <= new Date() && toDate(event.end) >= new Date()))
  );

  const sortedEvents = filterdEvents.sort(compare);
  useEffect(() => {}, []);

  useEffect(() => {}, [sortedEvents]);

  return (
    <CalendarSec onClick={() => navigate("/calendar")}>
      <div className="left_side">
        <MyCalendar>
          <FullCalendar
            plugins={[dayGridPlugin]}
            headerToolbar={{
              start: "title",
            }}
            height={"auto"}
            events={events}
            locale={"en"}
            eventBackgroundColor={theme.color.sub2}
            eventBorderColor={theme.color.sub2}
            defaultAllDay={true}
          />
        </MyCalendar>
      </div>
      <div className="right_side">
        {sortedEvents.length < 1 ? (
          <div className="no_events">
            {/* 예정된 일정이
            <p>없어요</p> */}
          </div>
        ) : sortedEvents.length >= 2 ? (
          <ul className="next_schedule">
            {sortedEvents.splice(0, 2).map((it, idx) => (
              <li key={idx}>
                {`${it.start?.substring(5, 7)}/${it.start?.substring(8, 10)}`}
                {it.end
                  ? ` ~ ${it.end?.substring(5, 7)}/${it.end?.substring(8, 10)}`
                  : null}
                <p>{it.title}</p>
              </li>
            ))}
          </ul>
        ) : sortedEvents.length >= 1 ? (
          <ul className="next_schedule">
            <li>
              {`${sortedEvents[0].start?.substring(
                5,
                7
              )}/${sortedEvents[0].start?.substring(8, 10)}`}
              {sortedEvents[0].end
                ? ` ~ ${sortedEvents[0].end?.substring(
                    5,
                    7
                  )}/${sortedEvents[0].end?.substring(8, 10)}`
                : null}
              <p>{sortedEvents[0].title}</p>
            </li>
          </ul>
        ) : null}
      </div>
      <p className="goToCal">
        일정 등록하기
        <KeyboardArrowRightIcon />
      </p>
    </CalendarSec>
  );
};

export default CalendarCard;
