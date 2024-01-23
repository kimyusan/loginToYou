import React, { useEffect } from "react";
import { CalendarStore } from "../../stores/CalendarStore";
import { Event } from "../../interface/CalendarInterface";

import { ListWrapper } from "../../styles/Calendar/Calendar";
import CalendarItem from "./CalendarItem";

type Props = {
  currentMonth: number;
};

const CalendarList = ({ currentMonth }: Props) => {
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
    (event) => toDate(event.start).getMonth() + 1 === currentMonth
  );

  const sortedEvents = filterdEvents.sort(compare);

  return (
    <>
      <ListWrapper>
        <p className="list_header">{currentMonth}월의 일정</p>
        {events.length >= 1 ? (
          sortedEvents.map((event, idx) => (
            <CalendarItem key={idx} event={event} />
          ))
        ) : (
          <p className="no_event">예정된 일정이 없어요</p>
        )}
      </ListWrapper>
    </>
  );
};

export default CalendarList;
