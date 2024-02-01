import React, { useEffect, useState } from "react";
import { SignUpBox } from "../../styles/SignUp/SignUp";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../stores/AuthStore";

import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";

const SignUpForm = () => {
  const location = useLocation();
  const [id, setId] = useState(
    location.state !== null ? location.state.email : ""
  );
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState(
    location.state !== null ? location.state.name : ""
  );
  const [samePw, setSamePw] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const { PATH } = useAuthStore();

  const navigate = useNavigate();

  const changeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const changePw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw(event.target.value);
  };

  const changePw2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw2(event.target.value);
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const goSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pw !== pw2) {
      alert("비밀번호가 같지 않습니다!");
      return;
    }

    if (
      /[a-zA-Z]/.test(pw) &&
      /[0-9]/.test(pw) &&
      /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/.test(pw) &&
      7 < pw.length &&
      pw.length < 16
    ) {
      console.log("비밀번호 확인");
    } else {
      alert("비밀번호 형식이 올바르지 않습니다!");
      return;
    }

    axios
      .post(`${PATH}/signup`, {
        email: id,
        password: pw,
        name: name,
      })
      .then((response) => {
        console.log("회원가입 성공");
        navigate("/login");
      })
      .catch((error) => {
        console.log("회원가입 실패", error.response);
      });
  };

  useEffect(() => {
    if (pw !== "" && pw === pw2) {
      setSamePw(true);
    } else {
      setSamePw(false);
    }
  }, [pw, pw2]);

  return (
    <SignUpBox onSubmit={goSignUp}>
      <TextField
        label="이름"
        variant="standard"
        onChange={changeName}
        value={name}
      />
      <TextField
        label="아이디"
        variant="standard"
        onChange={changeId}
        value={id}
        type="email"
      />
      <FormControl sx={{ m: 1, width: "100%", margin: "0" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">비밀번호</InputLabel>
        <Input
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onChange={changePw}
          value={pw}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "100%", margin: "0" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">
          비밀번호 확인
        </InputLabel>
        <Input
          type={showPassword2 ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onChange={changePw2}
          value={pw2}
        />
      </FormControl>
      <button type="submit" className="goSignUp">
        회원가입
      </button>
      <p>
        이미 회원이신가요? <Link to="/login">로그인 하러가기</Link>
      </p>
    </SignUpBox>
  );
};

export default SignUpForm;
