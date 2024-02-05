import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserVideoComponent from "../components/ChatVideo/UserVideoComponent";
import WebCam from "react-webcam";

import { ReadyBtn, JoinForm } from "../styles/ChatVideo/Chat";

import { BurgerButton } from "../styles/common/hamburger";
import Navbar from "../components/Navbar";
import useUserStore from "../stores/UserStore";

// 연결 신청 버튼(+연결할 상대방 프로필이미지)
import { Avatar } from "@mui/material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import useCoupleStore from "../stores/CoupleStore";
import { CallBtn } from "../styles/ChatVideo/Chat";

// 연결 중 띄워지는 버튼(연결종료, 카메라전환)
import { BtnBox } from "../styles/ChatVideo/Chat";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";

const APPLICATION_SERVER_URL = "https://logintoyou.kro.kr:8080/openvidu/";

export default function App() {
  const { coupleId } = useUserStore();
  const [mySessionId, setMySessionId] = useState(`ssafy${coupleId}`);
  const [myUserName, setMyUserName] = useState(`채팅하자`);
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef(new OpenVidu());

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setMyUserName(e.target.value);
  }, []);

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: true,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId(`ssafy${coupleId}`);
    setMyUserName("채팅하자");
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:MY_SECRET"),
        },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("OPENVIDUAPP:MY_SECRET"),
        },
      }
    );
    return response.data; // The token
  };

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  // 상대방 프로필 이미지 가져옴 -> 연결신청 버튼에 넣을 것
  const { yourProfileImage } = useCoupleStore();

  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const avatarRef = useRef(null);

  const handleMouseDown = (e) => {
    const avatar = avatarRef.current;

    if (avatar) {
      setIsDragging(true);
      setOffsetX(e.clientX - avatar.getBoundingClientRect().left);
      setOffsetY(e.clientY - avatar.getBoundingClientRect().top);
    }
  };

  const handleMouseMove = (e) => {
    const avatar = avatarRef.current;

    if (isDragging && avatar) {
      const newLeft = e.clientX - offsetX;
      const newTop = e.clientY - offsetY;

      avatar.style.left = `${newLeft}px`;
      avatar.style.top = `${newTop}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      {session === undefined ? (
        <div>
          <BurgerButton onClick={toggleNavigation}>
            {isNavigationOpen ? "×" : "☰"}
          </BurgerButton>

          <Navbar isOpen={isNavigationOpen} />

          <WebCam
            style={{
              width: "100%",
              height: "300px",
              transform: "scaleX(-1)",
              paddingTop: "20dvh",
            }}
          />
          <JoinForm onSubmit={joinSession}>
            <input
              type="text"
              value={myUserName}
              onChange={handleChangeUserName}
              required
              style={{ display: "none" }}
            />
            <input
              type="text"
              value={mySessionId}
              onChange={handleChangeSessionId}
              required
              style={{ display: "none" }}
            />
            <CallBtn>
              <span
                className="avatar"
                ref={avatarRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
              >
                <Avatar alt="your_profile_image" src={yourProfileImage} />
              </span>
              <ReadyBtn className="ready_btn blink" name="commit" type="submit">
                화상채팅 연결하기
              </ReadyBtn>
              <span className="call_btn">
                <PhoneEnabledIcon />
              </span>
            </CallBtn>
          </JoinForm>
        </div>
      ) : null}

      {session !== undefined ? (
        <div>
          <div
            style={{
              position: "relative",
              marginTop: "10dvh",
            }}
          >
            {publisher !== undefined ? (
              <div>
                <UserVideoComponent streamManager={publisher} type={1} />
              </div>
            ) : null}
            {subscribers.length > 0 ? (
              <div>
                <UserVideoComponent streamManager={subscribers[0]} type={0} />
              </div>
            ) : null}
          </div>
          <BtnBox>
            <span
              className="stopBtn"
              type="button"
              onClick={leaveSession}
              value="Leave session"
            >
              <PhoneDisabledIcon className="disabledBtn" />
            </span>
            <span className="blink">연결중</span>
            <span
              className="switchBtn"
              type="button"
              onClick={switchCamera}
              value="Switch Camera"
            >
              <CameraswitchIcon />
            </span>
          </BtnBox>
        </div>
      ) : null}
    </div>
  );
}
