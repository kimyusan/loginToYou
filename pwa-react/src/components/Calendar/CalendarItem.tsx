import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { Event } from "../../interface/CalendarInterface";
import { CalendarStore } from "../../stores/CalendarStore";
import { IconContext } from "react-icons";
import { useTheme } from "styled-components";

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
  const theme = useTheme();
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
          <IconContext.Provider value={{ color: theme.color.grey }}>
            <FaPen onClick={goEdit} style={{ margin: "0 5px" }} />
            <FaTrashCan onClick={goDelete} style={{ margin: "0 5px" }} />
          </IconContext.Provider>
        </ListItem>
      </List>
    </>
  );
};

export default CalendarItem;
