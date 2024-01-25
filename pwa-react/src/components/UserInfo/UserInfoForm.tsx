import React, { useState, useEffect, useRef } from "react";
import { Avatar, Radio, FormControlLabel } from "@mui/material";
import axios from "axios";

import {
  UserInfoField,
  SaveButton,
  FormBox,
  GenderRadio,
} from "../../styles/UserInfo/UserInfo";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";

type Props = {};

const UserInfoForm = (props: Props) => {
  const user = useUserStore();
  const defaultProfile =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [profileImage, setprofileImage] = useState(defaultProfile);
  const [nickname, setNickname] = useState(user.nickname);
  const [phoneNumber, setPhoneNumber] = useState(user.mobile as string);
  const [birth, setBirth] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);
  const phoneNumberRef = useRef()

  const { PATH } = useAuthStore();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneNumber.length !== 13) {
      alert("전화번호를 확인하삼욬");
      return;
    }
    axios
      .put(`${PATH}/user/update`, {
        userId: user.userId,
        email: user.email,
        name: user.name,
        mobile: phoneNumber,
        birthday: birth,
        gender: gender,
        coupleId: user.coupleId,
        nickname: nickname,
        password: user.password,
      })
      .then((response) => {
        console.log(response.data);
        alert("등록완");
        user.setUser(response.data);
      })
      .catch((response) => {
        console.log(response.data);
      });
  };

  const fileInput = useRef<HTMLInputElement>(null);
  const uploadImg = (event: any) => {
    const { files } = event.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadFile);
    reader.onloadend = () => {
      const result = reader.result as string;
      setprofileImage(result);
    };
  };

  useEffect(() => {
    if (phoneNumber.length === 11) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    } else if (phoneNumber.length === 13) {
      phoneNumber
        .replace(/-/g, "")
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  }, [phoneNumber, nickname, birth]);

  return (
    <FormBox onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/jpg,image/jpeg, image/png"
        name="profile_img"
        onChange={uploadImg}
        ref={fileInput}
        style={{ display: "none" }}
      />
      <Avatar
        alt="user_profile"
        src={profileImage}
        sx={{ width: "100px", height: "100px" }}
        onClick={() => {
          if (fileInput.current) {
            fileInput.current.click();
          }
        }}
      />
      <UserInfoField
        label="닉네임"
        type="input"
        variant="standard"
        value={nickname}
        onChange={(event) => {
          setNickname(event.target.value);
        }}
      />
      <UserInfoField
        label="전화번호"
        type="input"
        variant="standard"
        value={phoneNumber}
        onChange={(event) => {
          setPhoneNumber(event.target.value);
        }}
        // ref={phoneNumberRef}
      />
      <UserInfoField
        className="birth_input"
        label="생년월일"
        type="date"
        variant="standard"
        value={birth}
        placeholder=""
        onChange={(event) => {
          setBirth(event.target.value);
        }}
      />
      <GenderRadio
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={gender}
        onChange={(event) => {
          setGender(event.target.value);
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="여성" />
        <FormControlLabel value="male" control={<Radio />} label="남성" />
      </GenderRadio>

      <SaveButton variant="outlined" type="submit">
        수정하기
      </SaveButton>
    </FormBox>
  );
};

export default UserInfoForm;
