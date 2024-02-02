import React, { useEffect } from "react";
import { Card } from "../../styles/common/card";
import { CalendarSec } from "../../styles/Main/Main";
import { useNavigate } from "react-router-dom";
import { CalendarStore } from "../../stores/CalendarStore";
import { Event } from "../../interface/CalendarInterface";

const CalendarCard = () => {
  const navigate = useNavigate();
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");

  const { events } = CalendarStore();

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
    (event) => toDate(event.start) >= new Date()
  );

  const sortedEvents = filterdEvents.sort(compare);
  useEffect(() => {}, []);

  useEffect(() => {}, [sortedEvents]);

  return (
    <CalendarSec onClick={() => navigate("/calendar")}>
      <div className="left_side">
        <p className="year_month">
          {todayYear}/{todayMonth}
        </p>
        <p className="date">{todayDate}</p>
      </div>
      <div className="right_side">
        <ul className="next_schedule">
          {sortedEvents.length >= 2 ? (
            sortedEvents
              .splice(0, 2)
              .map((it, idx) => <li key={idx}>{it.title}</li>)
          ) : sortedEvents.length >= 1 ? (
            <li>{sortedEvents[0].title}</li>
          ) : null}
        </ul>
      </div>
    </CalendarSec>
  );
};

export default CalendarCard;
