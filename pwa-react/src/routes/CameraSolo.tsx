import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "../styles/Camera/CameraSolo";
import { GoBack } from "../styles/Camera/CameraCouple";
import { BurgerButton } from "../styles/common/hamburger";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TimerIcon from "@mui/icons-material/Timer";
import CollectionsIcon from "@mui/icons-material/Collections";

import Navbar from "../components/Navbar";

const CameraSolo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(0);
  const [selectTime, setSelectTime] = useState("");
  const [photo, setPhoto] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [ImageContent, setImageContent] = useState("");

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
    startCamera(!useFrontCamera);
  };

  const changeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageContent(event.target.value);
  };

  // startCamera 함수 수정
  const startCamera = async (isFrontCamera = true) => {
    try {
      const constraints = {
        video: {
          width: window.innerWidth,
          height: window.innerHeight,
          facingMode: isFrontCamera ? "user" : "environment",
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  const takePhoto = (timer: number) => {
    setTime(timer);
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        canvasRef.current.width = 1920; // 높은 해상도의 너비
        canvasRef.current.height = 1080; // 높은 해상도의 높이
        if (context) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
        }
      }
      setPhoto(false);
    }, timer * 1000);
  };

  const SavePhoto = () => {
    canvasRef.current?.toBlob((blob: Blob | null) => {
      if (blob) {
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
          .then((res) => console.log("사진 저장 성공"))
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
  };

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <div>
      <GoBack>
        <Link to="/camera">←</Link>
        <div style={{ position: "absolute", top: "5%", right: "5%" }}>
          <button onClick={switchCamera}>
            {useFrontCamera ? "후면 카메라" : "전면 카메라"}
          </button>
        </div>
        <BurgerButton onClick={toggleNavigation}>
          {isNavigationOpen ? "×" : "☰"}
        </BurgerButton>
      </GoBack>

      <Navbar isOpen={isNavigationOpen} />

      <TimerText>{time > 0 ? <div>{time}</div> : null}</TimerText>

      <CameraBox>
        <video
          ref={videoRef}
          playsInline
          autoPlay={true}
          style={{
            display: photo ? "" : "none",
            transform: useFrontCamera ? "scaleX(-1)" : "scaleX(1)",
            position: "fixed",
            top: "15%",
            left: 0,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            display: photo ? "none" : "",
            transform: "scaleX(-1)",
            position: "fixed",
          }}
        />
        <div>
          <input
            placeholder="한줄평"
            type="text"
            value={ImageContent}
            onChange={changeContent}
          ></input>
        </div>
      </CameraBox>

      {photo ? null : (
        <SaveBox>
          <SaveBoxItem onClick={SavePhoto}>저장하기</SaveBoxItem>
          <SaveBoxItem onClick={PicAgain}>다시 찍기</SaveBoxItem>
        </SaveBox>
      )}

      <div style={{ position: "fixed", bottom: "5%", width: "100%" }}>
        {showOptions && (
          <OptionsContainer>
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
        <CameraButton>
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
            <CollectionsIcon className="timer"></CollectionsIcon>
          )}
        </CameraButton>
      ) : null}
    </div>
  );
};

export default CameraSolo;
