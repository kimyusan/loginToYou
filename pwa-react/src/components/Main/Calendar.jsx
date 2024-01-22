import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CalendarStore } from "../../stores/CalendarStore";
import { CalendarModal } from "../../styles/Calendar/Calendar";
import { useState } from "react";

const Calendar = () => {
  const { isOpen, openModal, closeModal, addEvent, events } = CalendarStore();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [content, setContent] = useState("");

  const handleSaveEvent = (event) => {
    event.preventDefault();
    const startDate = start;
    const endDate = end;
    const title = content;
    const newEvent = { title, start: startDate, end: endDate };
    console.log(newEvent);
    addEvent(newEvent);
    setStart('')
    setEnd('')
    setContent('')
    closeModal();
  };

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
      />

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
    </div>
  );
};

export default Calendar;