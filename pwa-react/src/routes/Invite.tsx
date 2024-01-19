import React, { useEffect, useState } from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { QRCodeCanvas } from "qrcode.react";
import InvitePage from "../components/Invite/InvitePage";
import ShareButton from "../components/Invite/ShareButton";

const testUser: UserInterface = {
  user_id: 1,
  email: "ssafy@ssafy.com",
  name: "김싸피",
  mobile: null,
  birthday: null,
  gender: null,
  couple_id: null,
  nickname: null,
  profile_image:
    "https://dimg.donga.com/wps/NEWS/IMAGE/2023/12/15/122638071.2.jpg",
};

const Invite = () => {
  return (
    <Wrapper>
      <InvitePage
        user_id={testUser.user_id}
        name={testUser.name}
        email={testUser.email}
      />
      <QRCodeCanvas
        value={`http://localhost:3000/invite/${testUser.user_id}`}
        className="mb-30"
      />
      <ShareButton />
    </Wrapper>
  );
};

export default Invite;
