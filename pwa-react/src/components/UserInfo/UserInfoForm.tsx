import React, { useState, useEffect, useRef } from "react";
import { Avatar, Radio, FormControlLabel, Alert } from "@mui/material";
import axios from "axios";

import {
  UserInfoField,
  SaveButton,
  FormBox,
  GenderRadio,
} from "../../styles/UserInfo/UserInfo";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";
import { height } from "@mui/system";
import { SlEarphones } from "react-icons/sl";
import { useShallow } from "zustand/react/shallow";

type Props = {};

const UserInfoForm = (props: Props) => {
  const user = useUserStore();
  const defaultProfile =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [profileImage, setprofileImage] = useState(user.profileImage as string);
  const [profileFile, setProfileFile] = useState<any>(user.profileImage);
  const [nickname, setNickname] = useState(user.nickname);
  const [phoneNumber, setPhoneNumber] = useState(user.mobile as string);
  const [birth, setBirth] = useState(user.birthday);
  const [gender, setGender] = useState(user.gender);

  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  const fileInput = useRef<HTMLInputElement>(null);

  const uploadImg = (event: any) => {
    const { files } = event.target;
    const uploadFile = files[0];
    setProfileFile(files[0]);
    const reader = new FileReader();
    if (uploadFile) {
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        const result = reader.result as string;
        setprofileImage(result);
        user.setProfileImage(result);
      };
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phoneNumber?.length !== 13) {
      return;
    }
    axios
      .put(
        `${PATH}/user/update`,
        {
          userId: user.userId,
          email: user.email,
          name: user.name,
          mobile: phoneNumber,
          birthday: birth,
          gender: gender,
          coupleId: user.coupleId,
          nickname: nickname,
          password: user.password,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        setSuccessAlert(true);
        user.setUser(response.data);
      })
      .catch((response) => {
        console.log(response.data);
      });

    if (profileImage !== defaultProfile) {
      const formData = new FormData();
      formData.append("imgInfo", profileFile);
      const data = {
        userId: user.userId,
      };
      formData.append("profileImg", JSON.stringify(data));

      axios({
        url: `${PATH}/profile/upload`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error.data);
        });
    } else {
      console.error("프로필사진 없음");
    }
  };

  useEffect(() => {
    if (phoneNumber?.length === 11) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    } else if (phoneNumber?.length === 13) {
      phoneNumber
        .replace(/-/g, "")
        .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      setErrorAlert(false);
    } else if (phoneNumber?.length > 13) {
      setErrorAlert(true);
    }
    setSuccessAlert(false);
  }, [phoneNumber, nickname, birth]);

  return (
    <>
      <Alert
        severity="error"
        style={{
          transition: "transform 0.5s",
          transform: errorAlert ? "translateY(0)" : "translateY(-100%)",
          visibility: errorAlert ? "visible" : "hidden",
          position: "absolute",
          zIndex: "1000",
          width: "70%",
        }}
      >
        전화번호를 확인하세요 !
      </Alert>
      <Alert
        severity="success"
        style={{
          transition: "transform 0.5s",
          transform: successAlert ? "translateY(0)" : "translateY(-100%)",
          visibility: successAlert ? "visible" : "hidden",
          position: "absolute",
          zIndex: "1000",
          width: "70%",
          verticalAlign: "center",
        }}
      >
        저장되었습니다 !
      </Alert>
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

        <SaveButton variant="outlined" type="submit">
          수정하기
        </SaveButton>
      </FormBox>
    </>
  );
};

export default UserInfoForm;
