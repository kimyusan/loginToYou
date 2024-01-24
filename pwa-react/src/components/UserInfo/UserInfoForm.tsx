import React, { useState, useEffect, useRef } from "react";
import { Avatar, Radio, FormControlLabel } from "@mui/material";

import {
  UserInfoField,
  SaveButton,
  FormBox,
  GenderRadio,
} from "../../styles/UserInfo/UserInfo";

type Props = {};

const UserInfoForm = (props: Props) => {
  const defaultProfile =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [profileImage, setprofileImage] = useState(defaultProfile);
  const [nickname, setNickname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
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

      <SaveButton variant="outlined">수정하기</SaveButton>
    </FormBox>
  );
};

export default UserInfoForm;
