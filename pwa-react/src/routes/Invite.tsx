import React, { useEffect, useState } from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { QRCodeCanvas } from "qrcode.react";
import InvitePage from "../components/Invite/InvitePage";
import ShareButton from "../components/Invite/ShareButton";

const testUser: UserInterface = {
  userId: 1,
  email: "ssafy@ssafy.com",
  name: "김싸피",
  mobile: null,
  birthday: null,
  gender: null,
  coupleId: null,
  nickname: null,
  profileImage:
    "https://dimg.donga.com/wps/NEWS/IMAGE/2023/12/15/122638071.2.jpg",
};

const Invite = () => {
  return (
    <Wrapper>
      <InvitePage
        userId={testUser.userId}
        name={testUser.name}
        email={testUser.email}
      />
      <QRCodeCanvas
        value={`http://localhost:3000/invite/${testUser.userId}`}
        className="mb-30"
      />
      <ShareButton />
    </Wrapper>
  );
};

export default Invite;
