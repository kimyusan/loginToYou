import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarStore } from "../../stores/CalendarStore";
import { CalendarModal } from "../../styles/Calendar/Calendar";

const Calendar = () => {
  const { isOpen, openModal, closeModal } = CalendarStore();
  return (
    <div style={{ margin: 25 }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        headerToolbar={{
          size: "10px",
          start: "title",
          center: "myCustomButton",
          end: "today prev,next",
        }}
        height={"50vh"}
        events={[{ title: "내생일", date: "2024-01-11" }]}
        editable={true}
        droppable={true}
        locale={"ko"}
        customButtons={{
          myCustomButton: {
            text: "일정 추가",
            click: openModal,
          },
        }}
      />
      <CalendarModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        일정 추가하기
        <hr />
        <form action="">
          <p>시작날짜 <input type="datetime-local" /></p>
          <p>종료날짜 <input type="datetime-local" /></p>
          <input />
          <button type="submit">저장하기</button>
        </form>
      </CalendarModal>
    </div>
  );
};

export default Calendar;
