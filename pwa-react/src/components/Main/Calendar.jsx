import "./Calendar.css";
import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

class Calendar extends Component {
  render() {
    return (
      <div style={{ margin: 25 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          headerToolbar={{
            size: "10px",
            start: "title",
            center: "today",
            end: "prev,next",
          }}
          height={"50vh"}
          events={[{ title: "내생일", date: "2024-01-11" }]}
        />
      </div>
    );
  }
}
export default Calendar;
