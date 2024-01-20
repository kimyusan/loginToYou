import React, { useEffect } from "react";
import { CalendarStore } from "../../stores/CalendarStore";
import { Event } from "../../interface/CalendarInterface";

import { ListWrapper } from "../../styles/Calendar/Calendar";
import CalendarItem from "./CalendarItem";

type Props = {
  currentMonth: number;
};

const CalendarList = ({currentMonth}: Props) => {
  const { events, event } = CalendarStore();

  const toDate = (date: string) => {
    const dateString = date.split("-");
    return new Date(
      parseInt(dateString[0], 10),
      parseInt(dateString[1], 10) - 1,
      parseInt(dateString[2], 10)
    );
  };

  const compare: (a: Event, b: Event) => number = (a, b) => {
    const startDateA = new Date(a.start).getTime();
    const startDateB = new Date(b.start).getTime();
    return startDateA - startDateB;
  };

  const filterdEvents = events.filter(
    (event) => toDate(event.start).getMonth()+1 === currentMonth
  );

  const sortedEvents = filterdEvents.sort(compare);
  useEffect(() => {}, []);

  return (
    <>
      <ListWrapper>
        <p>{currentMonth}월의 일정</p>
        {sortedEvents.map((event, idx) => (
          <p key={idx}>
            <CalendarItem event={event} />
          </p>
        ))}
      </ListWrapper>
    </>
  );
};

export default CalendarList;
