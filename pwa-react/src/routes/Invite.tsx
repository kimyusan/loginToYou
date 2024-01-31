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
