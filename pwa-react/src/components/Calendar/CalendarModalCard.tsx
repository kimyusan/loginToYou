import React, { useState, useRef, useEffect } from "react";
import { CalendarStore } from "../../stores/CalendarStore";
import {
  CalendarModal,
  DateInput,
  ModalChanger,
  TitleInput,
} from "../../styles/Calendar/Calendar";
import useUserStore from "../../stores/UserStore";
import { Alert } from "@mui/material";
import { SaveButton } from "../../styles/UserInfo/UserInfo";

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

  const { coupleId, userId } = useUserStore();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState<string | null>("");
  const [content, setContent] = useState<string | null>("");
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  // 2024-01-24 형식의 문자열로 들어오는 날짜를 Date객체 형식으로 변환하는 함수
  const toDate = (date: string) => {
    const dateString = date?.split("-");
    return new Date(
      parseInt(dateString[0], 10),
      parseInt(dateString[1], 10) - 1,
      parseInt(dateString[2], 10),
      24,
      0,
      0
    );
  };

  // FullCalendar 종료날짜 이슈로, 데이터베이스에 저장할 때 종료날짜에 +1일 하여 저장할것임
  // 종료날짜에 +1일하는 함수
  const addOneDay = (date: string) => {
    if (date?.length < 1) {
      return date;
    } else {
      let currentEnd = new Date(date);
      currentEnd.setDate(currentEnd.getDate() + 1);
      let nextEnd = currentEnd.toISOString().split("T")[0];
      return nextEnd;
    }
  };

  const handleSaveEvent = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 시작날짜 미입력시 에러 alert , return
    if (start?.length === 0) {
      setErrorAlert("dateError");
      return;
    }

    // 시작날짜가 종료날짜보다 큰 경우 에러 alert , return
    if (end) {
      if (toDate(start) > toDate(addOneDay(end as string))) {
        setErrorAlert("dateError");
        return;
      }
    }
    if (content?.length === 0) {
      setErrorAlert("contentError");
      return;
    }

    // 일정 수정 내용
    const editEvent = {
      calendarId: targetEvent.calendarId,
      coupleId: targetEvent.coupleId,
      userId: targetEvent.userId,
      startDate: start,
      endDate: end,
      eventType: targetEvent.eventType,
      contents: content,
    };

    // 일정 추가 내용
    const newEvent = {
      calendarId: nextId,
      coupleId: coupleId as number,
      userId: userId as number,
      startDate: start,
      endDate: end,
      eventType: targetEvent.eventType,
      contents: content,
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
    if (end) {
      if (toDate(start) > toDate(end as string)) {
        setErrorAlert("dateError");
      } else {
        setErrorAlert(null);
      }
    }
  }, [start, end, content]);

  useEffect(() => {
    if (isEdit) {
      // 수정하는 경우 폼에 기본값 넣어줌
      setStart(targetEvent.startDate);
      setEnd(targetEvent.endDate);
      setContent(targetEvent.contents);
    } else {
      // 생성하는 경우 빈 폼
      setStart("");
      setEnd("");
      setContent("");
    }
  }, [targetEvent, isOpen]);

  return (
    <>
      <ModalChanger />
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
            transform: errorAlert ? "translateY(0)" : "translateY(-100%)",
            visibility: errorAlert ? "visible" : "hidden",
            position: "absolute",
            zIndex: "1000",
            width: "70%",
          }}
        >
          {errorAlert === "dateError" ? (
            <span>날짜를 확인하세요</span>
          ) : errorAlert === "contentError" ? (
            <span>내용을 확인하세요</span>
          ) : (
            ""
          )}
        </Alert>
        {isEdit ? <h4>일정 수정하기</h4> : <h4>일정 추가하기</h4>}
        <hr />
        <form onSubmit={handleSaveEvent}>
          <div>
            <p>시작날짜</p>
            <DateInput
              type="date"
              onChange={(e) => setStart(e.target.value)}
              value={start}
            />
            <p>종료날짜</p>
            <DateInput
              type="date"
              onChange={(e) => setEnd(e.target.value)}
              value={end}
            />
            <TitleInput
              className="title_box"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>
          <SaveButton type="submit">저장하기</SaveButton>
        </form>
      </CalendarModal>
    </>
  );
};

export default CalendarModalCard;
