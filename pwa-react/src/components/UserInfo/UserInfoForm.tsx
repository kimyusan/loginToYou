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

interface Profile {
  profileImgId: null | number;
  userId: null | number;
  saveFolder: null | string;
  originalName: null | string;
  saveName: null | string;
}

const UserInfoForm = (props: Props) => {
  const user = useUserStore();
  const defaultProfile =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [avatar, setAvatar] = useState(defaultProfile);
  const [oldProfile, setOldProfile] = useState<Profile>();
  const [profileFile, setProfileFile] = useState<null | string>(null);
  const [nickname, setNickname] = useState(user.nickname ? user.nickname : "");
  const [phoneNumber, setPhoneNumber] = useState(
    user.mobile ? (user.mobile as string) : ""
  );
  const [birth, setBirth] = useState(user.birthday ? user.birthday : "");
  const [gender, setGender] = useState(user.gender ? user.gender : "");

  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  // 프로필이미지 input 참조 // Avatar을 클릭하면 연결된 이 input이 열리도록
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadImg = (event: any) => {
    const { files } = event.target;
    const uploadFile = files[0];

    // back으로 axios요청 시 함께 보낼 이미지 파일
    setProfileFile(files[0]);

    const reader = new FileReader();
    if (uploadFile) {
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        const result = reader.result as string;
        // Avatar에 띄워줄 사진 파일
        // user.setProfileImage(result);
        setAvatar(result);
      };
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 전화번호 길이가 13자리('-'포함)가 아닐 경우 return
    if (phoneNumber !== "" && phoneNumber?.length !== 13) {
      return;
    }
    
    // user정보 업데이트 요청 // mobile, birthday, gender, nickname만 수정
    axios
      .put(
        `${PATH}/user/update`,
        {
          userId: user.userId,
          mobile: phoneNumber,
          birthday: birth,
          gender: gender,
          nickname: nickname,
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

    // 프로필 이미지 변경 안함
    if (!profileFile) return;
    // 프로필이미지를 처음 생성한 경우
    else if (user.profileImage === defaultProfile) {
      // formData형식으로 imgInfo에 파일경로 입력
      const formData = new FormData();
      formData.append("imgInfo", profileFile as string);
      // userId를 함께 보내야 함
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
      });
    }
    // 프로필사진 수정
    else if (avatar !== user.profileImage) {
      const formData = new FormData();
      // 새로 들어온 프로필 사진 파일
      formData.append("imgInfo", profileFile as string);
      // 이전 프로필 사진 정보를 같이 보내야 함
      // -> back에서 이를 삭제하고 새로 추가함
      const data = {
        profileImgId: oldProfile?.profileImgId,
        userId: oldProfile?.userId,
        saveFolder: oldProfile?.saveFolder,
        originalName: oldProfile?.originalName,
        saveName: oldProfile?.saveName,
      };
      formData.append("profileImg", JSON.stringify(data));
      axios({
        url: `${PATH}/profile/update`,
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    }

    axios
      .get(`${PATH}/profile/read`, {
        params: { userId: user.userId },
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (!response) return;
        const image = response.data;
        if (image) {
          user.setProfileImage(
            `${PATH}/profile/getImg/${image.saveFolder}/${image.originalName}/${image.saveName}`
          );
        }
      })
      .catch((error) => console.log(error));
    user.setProfileImage(avatar);
    setProfileFile(null);
  };

  // 전화번호 형식 정규화 '000-0000-0000' 검사
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
    console.log(profileFile);
  }, [phoneNumber, nickname, birth]);

  // 랜더링될 때 설정된 프로필이미지 띄우기
  useEffect(() => {
    axios
      .get(`${PATH}/profile/read`, {
        params: { userId: user.userId },
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        if (!response) return;
        const image = response.data;
        if (image) {
          setAvatar(
            `${PATH}/profile/getImg/${image.saveFolder}/${image.originalName}/${image.saveName}`
          );
          setOldProfile({
            profileImgId: image.profileImgId,
            userId: image.userId,
            saveFolder: image.saveFolder,
            originalName: image.originalName,
            saveName: image.saveName,
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

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
          src={avatar}
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
