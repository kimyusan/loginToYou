import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";

import { Wrapper, MyCalendar } from "../styles/Calendar/Calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarStore } from "../stores/CalendarStore";
import useUserStore from "../stores/UserStore";
import { CalendarModal } from "../styles/Calendar/Calendar";
import FullCalendar from "@fullcalendar/react";
import "../styles/Calendar/Calendar.css";
import CalendarList from "../components/Calendar/CalendarList";
import CalendarModalCard from "../components/Calendar/CalendarModalCard";

type Props = {};

const Calendar = (props: Props) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const {
    openModal,
    isOpen,
    isEdit,
    isDelete,
    addMode,
    events,
    getEventsFromServer,
  } = CalendarStore();

  const { coupleId } = useUserStore();

  const [currentMonth, setCurrentMonth] = useState(0);

  const goAdd = () => {
    openModal();
    addMode();
  };

  const handleDatesSet = (arg: any) => {
    const startDay = arg.start.getDate();
    if (startDay === 1) {
      setCurrentMonth(arg.start.getMonth() + 1);
    } else {
      if (arg.start.getMonth() === 11) {
        setCurrentMonth(1);
      } else {
        setCurrentMonth(arg.start.getMonth() + 2);
      }
    }
    console.log(currentMonth);
  };

  useEffect(() => {
    getEventsFromServer(coupleId as number);
  }, [isEdit, isDelete]);

  return (
    <>
      <BurgerButton onClick={toggleNav}>☰</BurgerButton>
      <Navbar isOpen={isNavigationOpen} />
      <Wrapper>
        <MyCalendar>
          <FullCalendar
            plugins={[dayGridPlugin]}
            headerToolbar={{
              start: "title",
              center: "",
              end: "myCustomButton today prev,next",
            }}
            height={"50vh"}
            events={events}
            editable={true}
            droppable={true}
            locale={"ko"}
            customButtons={{
              myCustomButton: {
                text: "일정 추가",
                click: goAdd,
              },
            }}
            datesSet={handleDatesSet}
            eventBackgroundColor="pink"
            eventBorderColor="pink"
            defaultAllDay={true}
            
          />
        </MyCalendar>
        <CalendarModalCard />
      </Wrapper>
      <CalendarList currentMonth={currentMonth} />
    </>
  );
};

export default Calendar;
