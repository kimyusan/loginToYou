import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";

import { Wrapper, MyCalendar } from "../styles/Calendar/Calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarStore } from "../stores/CalendarStore";
import { CalendarModal } from "../styles/Calendar/Calendar";
import FullCalendar from "@fullcalendar/react";
import "../styles/Calendar/Calendar.css";
import CalendarList from "../components/Calendar/CalendarList";

type Props = {};

const Calendar = (props: Props) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNav = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  const { isOpen, openModal, closeModal, addEvent, events } = CalendarStore();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [content, setContent] = useState("");
  const [currentMonth, setCurrentMonth] = useState(0);

  const handleSaveEvent = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startDate = start;
    const endDate = end;
    const title = content;
    const newEvent = { title, start: startDate, end: endDate };
    console.log(newEvent);
    addEvent(newEvent);
    setStart("");
    setEnd("");
    setContent("");
    closeModal();
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

  useEffect(() => {}, []);
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
                click: openModal,
              },
            }}
            datesSet={handleDatesSet}
          />
        </MyCalendar>

        <CalendarModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
        >
          <h4>일정 추가하기</h4>
          <hr />
          <form onSubmit={handleSaveEvent}>
            <div>
              <p>
                시작날짜
                <input
                  type="date"
                  onChange={(e) => setStart(e.target.value)}
                  value={start}
                />
              </p>
              <p>
                종료날짜
                <input
                  type="date"
                  onChange={(e) => setEnd(e.target.value)}
                  value={end}
                />
              </p>
              <input
                className="title_box"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
            </div>
            <button type="submit">저장하기</button>
          </form>
        </CalendarModal>
      </Wrapper>
      <CalendarList currentMonth={currentMonth} />
    </>
  );
};

export default Calendar;
