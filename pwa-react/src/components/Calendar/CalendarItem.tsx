import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

import { EventItem } from "../../interface/CalendarInterface";
import { CalendarStore } from "../../stores/CalendarStore";
import { IconContext } from "react-icons";
import { useTheme } from "styled-components";
import useUserStore from "../../stores/UserStore";
import useCoupleStore from "../../stores/CoupleStore";

type Props = {
  event: EventItem;
};
const dateInfo = (event: EventItem) => {
  const info = `${event.startDate.split("-")[1]}/${
    event.startDate.split("-")[2]
  }
    ${
      event.endDate
        ? `-${event.endDate.split("-")[1]}/${(
            parseInt(event.endDate.split("-")[2]) - 1
          )
            .toString()
            .padStart(2, "0")}`
        : ""
    }`;
  return info;
};

const CalendarItem = ({ event }: Props) => {
  const { userId, profileImage } = useUserStore();
  const { yourId, yourProfileImage } = useCoupleStore();
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
    deleteEventFromServer(event.calendarId);
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={userId === event.userId? profileImage : yourProfileImage} />
          </ListItemAvatar>
          <ListItemText primary={event.contents} secondary={dateInfo(event)} />
          <IconContext.Provider value={{ color: theme.color.grey }}>
            <FaPen onClick={goEdit} style={{ margin: "0" }} />
            <FaTrashCan onClick={goDelete} style={{ marginLeft: "7%" }} />
          </IconContext.Provider>
        </ListItem>
      </List>
    </>
  );
};

export default CalendarItem;
