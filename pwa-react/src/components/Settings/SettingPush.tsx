import React, { useState } from "react";
import { useNavigate } from "react-router";
import TokenCheker from "../../util/TokenCheker";
import SettingsHeader from "./SettingsHeader";
import { UserInfoBox, SaveButton } from "../../styles/UserInfo/UserInfo";
import Switch from "@mui/material/Switch";
import useFCMStore from "../../stores/FCMStore";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

type Props = {};

const SettingPush = (props: Props) => {
  const {
    isPush,
    videoChatPush,
    coupleCamPush,
    diaryPush,
    setPush,
    setVideoChatPush,
    setCoupleCamPush,
    setDiaryPush,
  } = useFCMStore();

  const handlePush = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPush(event.target.checked);
  };
  return (
    <>
      <TokenCheker />
      <SettingsHeader />
      <UserInfoBox>
        <h3>푸쉬알림 설정</h3>
        <p className="settingOption">
          <p className="settingTitle" style={{ fontSize: "1.2rem" }}>
            <NotificationsActiveIcon
              style={{ color: "gold", marginRight: "2%" }}
            />
            푸시알림 ON/OFF
          </p>
          <Switch
            checked={isPush}
            onChange={handlePush}
            inputProps={{ "aria-label": "controlled" }}
          />
        </p>
        <hr />
        <p className="settingOption">
          <p className="settingTitle">
            <NotificationsActiveIcon
              style={{ color: "gold", marginRight: "2%" }}
            />
            화상채팅
          </p>
          <Switch
            // checked={checked}
            // onChange={}
            inputProps={{ "aria-label": "controlled" }}
          />
        </p>
        <p className="settingOption">
          <p className="settingTitle">
            <NotificationsActiveIcon
              style={{ color: "gold", marginRight: "2%" }}
            />
            같이찍기
          </p>
          <Switch
            // checked={checked}
            // onChange={}
            inputProps={{ "aria-label": "controlled" }}
          />
        </p>
        <p className="settingOption">
          <p className="settingTitle">
            <NotificationsActiveIcon
              style={{ color: "gold", marginRight: "2%" }}
            />
            다이어리
          </p>
          <Switch
            // checked={checked}
            // onChange={}
            inputProps={{ "aria-label": "controlled" }}
          />
        </p>

      </UserInfoBox>
    </>
  );
};

export default SettingPush;
