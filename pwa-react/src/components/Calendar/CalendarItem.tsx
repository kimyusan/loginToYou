import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

import { Event } from "../../interface/CalendarInterface";

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
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360}}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={event.title}
            secondary={dateInfo(event)}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default CalendarItem;
