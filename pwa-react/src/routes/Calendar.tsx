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
import { useTheme } from "styled-components";
import TokenCheker from "../util/TokenCheker";

type Props = {};

const Calendar = (props: Props) => {
  const theme = useTheme();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

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

  console.log(useUserStore.getState());
  const coupleId = useUserStore.getState().coupleId;

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

  useEffect(() => {
    closeModal();
  }, []);

  return (
    <>
      <TokenCheker />
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
            height={"50dvh"}
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
            eventBackgroundColor={theme.color.sub2}
            eventBorderColor={theme.color.sub2}
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
