import React, { useEffect, useState } from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { QRCodeCanvas } from "qrcode.react";
import { axiosAuth } from "../util/token";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import InvitePage from "../components/Invite/InvitePage";
import useUserStore from "../stores/UserStore";
import ShareButton from "../components/Invite/ShareButton";
import TokenCheker from "../util/TokenCheker";

const Invite = () => {
  const { name, email, userId, setUser, coupleId } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      email: state.email,
      userId: state.userId,
      setUser: state.setUser,
      coupleId: state.coupleId,
    }))
  );
  const navigate = useNavigate();
  const inviteUrl = `https://logintoyou.kro.kr:8443/invited/${email}/`;

  const getUserInfo = async () => {
    const res = await axiosAuth.get("user/info", {
      params: {
        email: email,
      },
    });
    setUser(res.data);
    if (coupleId != null) navigate("/");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Wrapper>
      <TokenCheker />
      <InvitePage userId={userId} name={name} email={email} />
      <QRCodeCanvas
        onClick={() => {
          window.open(inviteUrl);
        }}
        value={inviteUrl}
        className="mb-30"
      />
      <ShareButton inviteUrl={inviteUrl} />
    </Wrapper>
  );
};

export default Invite;
