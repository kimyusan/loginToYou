import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

export default class Calendar extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  dateClick = (info) => {
    alert(info.dateStr);
  };
  render() {
    return (
      <div style={{ margin: 25,}}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today",
            center: "title",
            end: "prev,next",
          }}
          height={"50vh"}
          dateClick={this.dateClick}
          events={[{ title: "내생일", date: "2024-01-11" }]}
        />
      </div>
    );
  }
}
