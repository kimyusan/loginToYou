import React from "react";
import { Header } from "../../styles/common/header";
import bgimg from "../../styles/Main/header.webp";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

type Props = {};

const HeaderSection = (props: Props) => {
  return (
    <Header $bgimg={bgimg}>
      <div>캐릭캐릭체인지</div>
      <span>
        <Badge badgeContent={12} color="primary">
          <MailIcon color="action" />
        </Badge>
      </span>
    </Header>
  );
};

export default HeaderSection;
