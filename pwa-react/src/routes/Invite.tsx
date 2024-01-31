import React, { useEffect, useState } from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { QRCodeCanvas } from "qrcode.react";
import InvitePage from "../components/Invite/InvitePage";
import ShareButton from "../components/Invite/ShareButton";
import useUserStore from "../stores/UserStore";
import { axiosAuth } from "../util/token";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

const Invite = () => {
  const { name, email, userId, setCoupleId } = useUserStore(
    useShallow((state) => ({
      name: state.name,
      email: state.email,
      userId: state.userId,
      setCoupleId: state.setCoupleId,
    }))
  );
  const navigate = useNavigate();

  const getUserInfo = async () => {
    const res = await axiosAuth.get("user/info", {
      params: {
        email: email,
      },
    });
    if (res.data.coupleId != null) {
      setCoupleId(res.data.coupleId);
    }
    navigate("/");
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Wrapper>
      <InvitePage userId={userId} name={name} email={email} />
      <QRCodeCanvas
        onClick={() => {
          window.open(`http://localhost:3000/invited/${email}/`);
        }}
        value={`http://localhost:3000/invited/${email}/`}
        className="mb-30"
      />
      <ShareButton />
    </Wrapper>
  );
};

export default Invite;
