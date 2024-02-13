import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useShallow } from "zustand/react/shallow";

import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

import {
  TimerText,
  CameraBox,
  CameraButton,
  OptionsContainer,
  SaveBox,
  SaveBoxItem,
  SubjectBox,
} from "../styles/Camera/CameraSolo";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TimerIcon from "@mui/icons-material/Timer";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

import Webcam from "react-webcam";
import html2canvas from "html2canvas";
import SettingsHeader from "../components/Settings/SettingsHeader";

type WebcamRefType = React.MutableRefObject<Webcam | null>;

let webcamRef: WebcamRefType = { current: null };

export const setWebcamRef = (ref: WebcamRefType) => {
  webcamRef = ref;
};

export const stopWebCam = () => {
  if (webcamRef?.current?.video) {
    const stream = webcamRef.current.video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());

    webcamRef.current.video.srcObject = null;
  }
};

const CameraSolo: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const divRef = useRef(null);
  const canvasRef = useRef(null);

  const [time, setTime] = useState(0);
  const [selectTime, setSelectTime] = useState("");
  const [photo, setPhoto] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [ImageContent, setImageContent] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const navigate = useNavigate();

  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );
  const { coupleId } = useUserStore();

  // 카메라 전환 버튼 상태 추가
  const [useFrontCamera, setUseFrontCamera] = useState(true);

  // 카메라 전환 함수 추가
  const switchCamera = () => {
    setUseFrontCamera(!useFrontCamera);
  };

  const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageContent(event.target.value);
  };

  useEffect(() => {
    setWebcamRef(webcamRef);
  }, []);

  const takePhoto = (timer: number) => {
    setTime(timer);
    setTimeout(() => {
      const imageSrc = webcamRef.current?.getScreenshot({
        width: window.innerWidth,
        height: window.innerWidth * 1.5,
      });
      setImgSrc(imageSrc ? imageSrc : "");
      setPhoto(false);
      stopWebCam();
    }, timer * 1000);
  };

  const SavePhoto = async () => {
    if (!divRef.current) return;

    const div = divRef.current;
    const canvas = await html2canvas(div, { scale: 2 });
    canvas.toBlob((blob) => {
      if (blob !== null) {
        const formData = new FormData();

        formData.append("imgInfo", blob);

        const data = {
          coupleId: coupleId,
          subject: ImageContent,
        };

        formData.append("diary", JSON.stringify(data));

        axios
          .post(`${PATH}/diary/upload`, formData, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            console.log("사진 저장 성공");
            navigate("/diary");
          })
          .catch((error) => console.log("사진 저장 실패", error));
      } else {
        console.error("Unable to get the blob from the canvas");
      }
    }, "image/png");
  };

  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

  const TimeChange = (event: string) => {
    setSelectTime(event);
    setShowOptions(!showOptions);
  };

  const handleTimerClick = () => {
    setShowOptions(!showOptions); // showOptions 상태 토글
  };

  const PicAgain = () => {
    setPhoto(!photo);
    setImgSrc("");
    setImageContent("");
    setWebcamRef(webcamRef);
    setTime(0);
  };

  return (
    <div>
      <SettingsHeader name={"혼자찍기"} />

      <CameraBox ref={divRef}>
        {time > 0 ? <TimerText $height={window.innerWidth * 1.5}><div>{time}</div> </TimerText> : null}
        {imgSrc === "" ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotQuality={1}
              screenshotFormat="image/png"
              forceScreenshotSourceSize={true}
              videoConstraints={{
                aspectRatio: 1.5,
                facingMode: useFrontCamera ? "user" : "enviroment",
              }}
              style={{
                width: window.innerWidth,
                height: window.innerWidth * 1.5,
                transform: useFrontCamera ? "scaleX(-1)" : "scaleX(1)",
                objectFit: "cover",
              }}
            />
          </>
        ) : (
          <img
            src={imgSrc}
            alt="사진입니다"
            style={{ transform: useFrontCamera ? "scaleX(-1)" : "scaleX(1)", marginBottom: "30px", objectFit: "cover" }}
          ></img>
        )}
      </CameraBox>

      {photo ? null : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SubjectBox
            placeholder="사진에 메모를 남겨주세요!"
            type="text"
            value={ImageContent}
            onChange={changeContent}
            maxLength={20}
          ></SubjectBox>
        </div>
      )}
      {photo ? null : (
        <SaveBox>
          <SaveBoxItem onClick={SavePhoto}>저장하기</SaveBoxItem>
          <SaveBoxItem onClick={PicAgain}>다시 찍기</SaveBoxItem>
        </SaveBox>
      )}

      <div>
        {showOptions && (
          <OptionsContainer $height={window.innerWidth * 1.5}>
            <div onClick={() => TimeChange("0")}>
              <TimerIcon></TimerIcon>
            </div>
            <div onClick={() => TimeChange("3")}>3초</div>
            <div onClick={() => TimeChange("5")}>5초</div>
            <div onClick={() => TimeChange("10")}>10초</div>
          </OptionsContainer>
        )}
      </div>

      {photo ? (
        <CameraButton $height={window.innerWidth * 1.5}>
          {!showOptions && (
            <TimerIcon className="timer" onClick={handleTimerClick}></TimerIcon>
          )}
          {!showOptions && (
            <CameraAltIcon
              onClick={() => {
                takePhoto(Number(selectTime));
              }}
              className="camera"
            ></CameraAltIcon>
          )}
          {!showOptions && (
            <CameraswitchIcon
              className="timer"
              onClick={switchCamera}
            ></CameraswitchIcon>
          )}
        </CameraButton>
      ) : null}
    </div>
  );
};

export default CameraSolo;
