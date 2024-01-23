import React, { useState, useRef, useEffect } from "react";
import { CalendarStore } from "../../stores/CalendarStore";
import { CalendarModal } from "../../styles/Calendar/Calendar";

type Props = {};

const CalendarModalCard = () => {
  const {
    isOpen,
    closeModal,
    addEvent,
    updateEvent,
    nextId,
    isEdit,
    targetEvent,
    postEventToServer,
    getEventsFromServer,
  } = CalendarStore();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [content, setContent] = useState("");

  const handleSaveEvent = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startDate = start;
    const endDate = end;
    const title = content;

    const editEvent = {
      id: targetEvent.id,
      title: title,
      start: startDate,
      end: endDate,
    };
    const newEvent = {
      id: nextId.toString(),
      title: title,
      start: startDate,
      end: endDate,
    };
    if (isEdit && targetEvent) {
      updateEvent(targetEvent.id, editEvent);
    } else {
      postEventToServer(newEvent);
    }
    setStart("");
    setEnd("");
    setContent("");
    closeModal();
  };

  useEffect(() => {
    if (isEdit) {
      setStart(targetEvent.start);
      setEnd(targetEvent.end);
      setContent(targetEvent.title);
    } else {
      setStart("");
      setEnd("");
      setContent("");
    }
  }, [isEdit, targetEvent]);

  return (
    <CalendarModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      {isEdit ? <h4>일정 수정하기</h4> : <h4>일정 추가하기</h4>}
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
  );
};

export default CalendarModalCard;
