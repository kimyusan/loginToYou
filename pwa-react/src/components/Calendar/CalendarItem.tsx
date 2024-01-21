import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

import { Event } from "../../interface/CalendarInterface";
import { CalendarStore } from "../../stores/CalendarStore";

type Props = {
  event: Event;
};
const dateInfo = (event: Event) => {
  const info = `${event.start.split("-")[1]}/${event.start.split("-")[2]}
    ${
      event.end ? `-${event.end.split("-")[1]}/${event.end.split("-")[2]}` : ""
    }`;
  return info;
};

const CalendarItem = ({ event }: Props) => {
  const { isOpen, editMode, openModal, closeModal, addEvent, events, getEvent, deleteEvent } =
    CalendarStore();
  const goEdit = () => {
    openModal();
    editMode();
    getEvent(event);
  };
  const goDelete = () =>{
    deleteEvent(event.id)
  }


  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={event.title} secondary={dateInfo(event)} />
          <button onClick={goEdit}>수정</button>
          <button onClick={goDelete}>삭제</button>
        </ListItem>
      </List>
    </>
  );
};

export default CalendarItem;
