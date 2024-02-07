import React, { useEffect, useState } from "react";
import { CalendarStore } from "../../stores/CalendarStore";
import { EventItem } from "../../interface/CalendarInterface";

import { ListWrapper } from "../../styles/Calendar/Calendar";
import CalendarItem from "./CalendarItem";

type Props = {
  currentMonth: number;
};

const CalendarList = ({ currentMonth }: Props) => {
  const { eventlist } = CalendarStore();



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

  const compare: (a: EventItem, b: EventItem) => number = (a, b) => {
    const startDateA = new Date(a.startDate).getTime();
    const startDateB = new Date(b.startDate).getTime();
    return startDateA - startDateB;
  };

  const filterdEvents = eventlist.filter(
    (eventlist) => toDate(eventlist.startDate).getMonth() + 1 === currentMonth
  );

  const sortedEvents = filterdEvents.sort(compare);

  return (
    <>
      <ListWrapper>
        <p className="list_header">{currentMonth}월의 일정</p>
        {eventlist.length >= 1 ? (
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
