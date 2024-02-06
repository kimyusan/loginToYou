import React, { useState } from "react";
import { SaveButton, UserInfoBox } from "../../styles/UserInfo/UserInfo";

import { SignUpBox } from "../../styles/SignUp/SignUp";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormBox } from "../../styles/UserInfo/UserInfo";

import { CancelButton } from "../../styles/Settings/UI";
import SettingsHeader from "./SettingsHeader";
import useUserStore from "../../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import { axiosAuth } from "../../util/token";
import { useNavigate } from "react-router-dom";
import TokenCheker from "../../util/TokenCheker";

function ChangePw() {
  const [origPw, setOrigPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [showOrigPassword, setShowOrigPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const { userId, email } = useUserStore(
    useShallow((state) => ({
      userId: state.userId,
      email: state.email,
    }))
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPw !== newPwConfirm) {
      alert("비밀번호가 같지 않습니다!");
      return;
    }

    if (
      /[a-zA-Z]/.test(newPw) &&
      /[0-9]/.test(newPw) &&
      /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(newPw) &&
      7 < newPw.length &&
      newPw.length < 16
    ) {
      console.log("비밀번호 확인");
    } else {
      alert("비밀번호 형식이 올바르지 않습니다!");
      return;
    }

    try {
      const res = await axiosAuth.get("/user/verify/password", {
        params: {
          email: email,
          password: origPw,
        },
      });

      if (res.status === 200) {
        const res2 = await axiosAuth.put(
          "/user/update/password",
          {},
          {
            params: {
              userId: userId,
              password: newPw,
            },
          }
        );
        navigate(-1);
      } else {
        alert("기존 비밀번호를 확인해주세요!");
      }
    } catch (err) {
      alert("기존 비밀번호를 확인해주세요!");
    }
  };

  return (
    <>
      <TokenCheker />
      <SettingsHeader />
      <UserInfoBox>
        <h3 style={{ marginBottom: "5dvh" }}>비밀번호 변경</h3>
        <FormBox onSubmit={handleSubmit}>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              기존 비밀번호
            </InputLabel>
            <Input
              type={showOrigPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowOrigPassword((prev) => !prev)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {showOrigPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => {
                setOrigPw((prev) => e.target.value);
              }}
              value={origPw}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              신규 비밀번호
            </InputLabel>
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
                setNewPw((prev) => e.target.value);
              }}
              value={newPw}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              신규 비밀번호 확인
            </InputLabel>
            <Input
              type={showPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword2((prev) => !prev);
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => {
                setNewPwConfirm(e.target.value);
              }}
              value={newPwConfirm}
            />
          </FormControl>
          <SaveButton type="submit">저장</SaveButton>
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

export default ChangePw;
