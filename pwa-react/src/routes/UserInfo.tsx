import React, { useState } from "react";
import UserInfoForm from "../components/UserInfo/UserInfoForm";
import TokenCheker from "../util/TokenCheker";
import MenuSection from "../components/MenuSection";

import { UserInfoBox } from "../styles/UserInfo/UserInfo";

type Props = {};

const UserInfo = (props: Props) => {
  return (
    <>
      <TokenCheker />
      <MenuSection />
      <UserInfoBox>
        <h3>회원 정보 수정</h3>
        <UserInfoForm />
      </UserInfoBox>
    </>
  );
};

export default UserInfo;
