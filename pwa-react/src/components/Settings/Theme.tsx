import React, { useState } from "react";
import SettingsHeader from "./SettingsHeader";
import useAuthStore from "../../stores/AuthStore";
import { CancelButton } from "../../styles/Settings/UI";
import { Wrapper, ColorSelectBox, Sample } from "../../styles/Settings/Page";
import { UserInfoBox, SaveButton } from "../../styles/UserInfo/UserInfo";
import { pink, green, blue } from "../../styles/common/global";
import { DefaultTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

type Props = {};

function Theme({}: Props) {
  const [currentTheme, setCurrentTheme] = useState(
    useAuthStore.getState().colortheme
  );
  const ChangeColor = (theme: DefaultTheme) => {
    useAuthStore.getState().setColorTheme(theme);
  };
  const navigate = useNavigate();

  const restoreTheme = () => {
    useAuthStore.getState().setColorTheme(currentTheme);
    navigate("/main");
  };

  return (
    <Wrapper>
      <SettingsHeader />
      <UserInfoBox>
        <h3>테마 설정</h3>
        <ColorSelectBox>
          <Sample
            sampletheme={pink}
            onClick={() => {
              ChangeColor(pink);
            }}
          ></Sample>
          <Sample
            sampletheme={green}
            onClick={() => {
              ChangeColor(green);
            }}
          ></Sample>
          <Sample
            sampletheme={blue}
            onClick={() => {
              ChangeColor(blue);
            }}
          ></Sample>
        </ColorSelectBox>
        <SaveButton
          onClick={() => {
            navigate("/main");
          }}
        >
          확인
        </SaveButton>
        <CancelButton onClick={restoreTheme}>취소</CancelButton>
      </UserInfoBox>
    </Wrapper>
  );
}

export default Theme;
