import React, { useState } from "react";
import { SaveButton, UserInfoBox } from "../../styles/UserInfo/UserInfo";
import SettingsHeader from "./SettingsHeader";
import { CancelButton } from "../../styles/Settings/UI";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormBox } from "../../styles/UserInfo/UserInfo";
import { useTheme } from "styled-components";
import { axiosAuth } from "../../util/token";
import useUserStore from "../../stores/UserStore";
import TokenCheker from "../../util/TokenCheker";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/AuthStore";
import { useShallow } from "zustand/react/shallow";
import { UserInterface } from "../../interface/UserInterface";

function DeleteAccount() {
  const noUser: UserInterface = {
    userId: null,
    email: null,
    name: null,
    mobile: null,
    birthday: null,
    gender: null,
    coupleId: null,
    nickname: null,
    password: null,
    role: null,
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const { email, userId, setUser } = useUserStore(
    useShallow((state) => ({
      email: state.email,
      userId: state.userId,
      setUser: state.setUser,
    }))
  );

  const logout = useAuthStore.getState().logout;
  const navigate = useNavigate();

  const handleSumbmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 비밀번호 확인
    const res = await axiosAuth.get("/user/verify/password", {
      params: { email: email, password: password },
    });
    if (res.status === 200) {
      // 성공 시 탈퇴
      const resp = await axiosAuth.delete("/user/withdrawal", {
        params: {
          userId: userId,
        },
      });
      console.log(resp);
      // 로컬 초기화
      localStorage.removeItem("userLoginStatus");
      localStorage.removeItem("QuestionStatus");
      localStorage.removeItem("coupleStatus");
      localStorage.removeItem("calendarStatus");
      localStorage.removeItem("userStatus");
      logout();
      // navigate("/login");
    } else {
      alert("비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <TokenCheker />
      <SettingsHeader />
      <UserInfoBox>
        <h3>회원 탈퇴</h3>
        <FormBox onSubmit={handleSumbmit}>
          <FormControl
            sx={{ m: 1, width: "100%", textAlign: "center" }}
            variant="standard"
          >
            <div style={{ margin: "0 0 30px 0", color: theme.color.grey }}>
              확인을 위해 비밀번호를 입력해주세요.
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => {
                setPassword((prev) => e.target.value);
              }}
              value={password}
            />
          </FormControl>
          <SaveButton type="submit">확인</SaveButton>
          <CancelButton
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </CancelButton>
        </FormBox>
      </UserInfoBox>
    </>
  );
}

export default DeleteAccount;
