import React, { useState, useRef, useEffect } from "react";
import { CalendarStore } from "../../stores/CalendarStore";
import { CalendarModal } from "../../styles/Calendar/Calendar";
import useUserStore from "../../stores/UserStore";
import { Alert } from "@mui/material";

type Props = {};

const CalendarModalCard = () => {
  const {
    isOpen,
    closeModal,
    nextId,
    isEdit,
    targetEvent,
    postEventToServer,
    updateEventToServer,
    getEventsFromServer,
  } = CalendarStore();

  const { coupleId } = useUserStore();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [content, setContent] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);

  // 2024-01-24 형식의 문자열로 들어오는 날짜를 Date객체 형식으로 변환하는 함수
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

  const handleSaveEvent = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const startDate = start;
    const endDate = end;
    const title = content;
    if (toDate(startDate) > toDate(endDate)) {
      setErrorAlert(true);
      return;
    }

    // 일정 수정 내용
    const editEvent = {
      id: targetEvent.id,
      title: title,
      start: startDate,
      end: endDate,
    };

    // 일정 추가 내용
    const newEvent = {
      id: nextId.toString(),
      title: title,
      start: startDate,
      end: endDate,
    };

    if (isEdit && targetEvent) {
      // 수정 폼
      updateEventToServer(editEvent, coupleId as number);
    } else {
      // 생성 폼
      postEventToServer(newEvent, coupleId as number);
    }
    setStart("");
    setEnd("");
    setContent("");
    closeModal();
  };

  useEffect(() => {
    if (toDate(start) > toDate(end)) {
      setErrorAlert(true);
    } else {
      setErrorAlert(false);
    }
  }, [start, end]);

  useEffect(() => {
    if (isEdit) {
      // 수정하는 경우 폼에 기본값 넣어줌
      setStart(targetEvent.start);
      setEnd(targetEvent.end);
      setContent(targetEvent.title);
    } else {
      // 생성하는 경우 빈 폼
      setStart("");
      setEnd("");
      setContent("");
    }
  }, [targetEvent, isOpen]);

  return (
    <>
      <CalendarModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
      >
        <Alert
          severity="error"
          style={{
            transition: "transform 0.5s",
            transform: errorAlert ? "translateY(-100%)" : "translateY(-100%)",
            visibility: errorAlert ? "visible" : "hidden",
            position: "absolute",
            zIndex: "1000",
            width: "70%",
          }}
        >
          날짜를 확인하세요!
        </Alert>
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
    </>
  );
};

export default CalendarModalCard;
