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
      event.end
        ? `-${event.end.split("-")[1]}/${(parseInt(event.end.split("-")[2]) - 1)
            .toString()
            .padStart(2, "0")}`
        : ""
    }`;
  return info;
};

const CalendarItem = ({ event }: Props) => {
  const {
    isOpen,
    editMode,
    deleteMode,
    openModal,
    closeModal,
    events,
    getEvent,
    deleteEventFromServer,
  } = CalendarStore();

  const goEdit = () => {
    openModal();
    editMode();
    getEvent(event);
  };

  const goDelete = () => {
    deleteMode();
    deleteEventFromServer(parseInt(event.id));
  };

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
