import React, { useEffect } from "react";
import { Card } from "../../styles/common/card";
import { CalendarSec } from "../../styles/Main/Main";
import { useNavigate } from "react-router-dom";
import { CalendarStore } from "../../stores/CalendarStore";
import { Event } from "../../interface/CalendarInterface";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TodayIcon from '@mui/icons-material/Today';

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
    (event) =>
      toDate(event.start) >= new Date() ||
      (toDate(event.start) <= new Date() && toDate(event.end) >= new Date())
  );

  const sortedEvents = filterdEvents.sort(compare);
  useEffect(() => {}, []);

  useEffect(() => {}, [sortedEvents]);

  return (
    <CalendarSec onClick={() => navigate("/calendar")}>
      <div className="left_side">
        <div className="year_month">
          {todayYear}/{todayMonth}
        </div>
        <div className="date">{todayDate}</div>
      </div>
      <div className="right_side">
        {sortedEvents.length < 1 ? (
          <div className="no_events">
            <p><TodayIcon className="cal_icon"/>예정된 일정이 없어요</p>
            <span className="goToCal">
              일정 등록하기
              <KeyboardArrowRightIcon />
            </span>
          </div>
        ) : sortedEvents.length >= 2 ? (
          <ul className="next_schedule">
            {sortedEvents.splice(0, 2).map((it, idx) => (
              <li key={idx}>{it.title}</li>
            ))}
          </ul>
        ) : sortedEvents.length >= 1 ? (
          <ul className="next_schedule">
            <li>{sortedEvents[0].title}</li>
          </ul>
        ) : null}
      </div>
    </CalendarSec>
  );
};

export default CalendarCard;
