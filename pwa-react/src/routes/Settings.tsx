import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SettingsHeader from "../components/Settings/SettingsHeader";
import { Menu, MenuTitle } from "../styles/Settings/UI";
import TokenCheker from "../util/TokenCheker";

type Props = {};

function Settings({}: Props) {
  const navigate = useNavigate();

  return (
    <>
      <TokenCheker />
      <SettingsHeader />
      <MenuTitle>앱 설정</MenuTitle>
      <Menu>알림 설정</Menu>
      <Menu
        onClick={() => {
          navigate("theme");
        }}
      >
        테마 설정
      </Menu>
      <MenuTitle>개인정보 수정</MenuTitle>
      <Menu
        onClick={() => {
          navigate("password");
        }}
      >
        비밀번호 수정
      </Menu>
      <Menu
        onClick={() => {
          navigate("quit");
        }}
      >
        회원 탈퇴
      </Menu>
    </>
  );
}

export default Settings;
