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

import { useDrag } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// 연결 중 띄워지는 버튼(연결종료, 카메라전환)
import { BtnBox, CameraBox } from "../styles/ChatVideo/Chat";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import VoiceOverOffIcon from "@mui/icons-material/VoiceOverOff";

// 푸시알림 FCM토큰
import useFCMStore from "../stores/FCMStore";

const APPLICATION_SERVER_URL = "https://logintoyou.kro.kr:8080/openvidu/";

const AvatarComponent = ({ yourProfileImage, onDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "avatar",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <span
      className="avatar"
      ref={(node) => drag(node)}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
        position: "absolute",
        left: 0,
        top: 0,
      }}
      onTouchStart={onDrag}
    >
      <Avatar alt="your_profile_image" src={yourProfileImage} />
    </span>
  );
};

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

  // 연결시 푸시알림 보내기
  const { yourFCMtoken, videoChatPush } = useFCMStore();
  const { nickname, name } = useUserStore();
  const letsPush = () => {
    console.log(yourFCMtoken);
    axios({
      url: "https://fcm.googleapis.com/fcm/send",
      method: "POST",
      data: {
        to: yourFCMtoken,
        notification: {
          title: "❤너에게 로그인",
          body: `${nickname ? nickname : name}님이 영상 통화를 신청했어요`,
          tag: videoChatPush,
        },
      },
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer AAAAY7JdDVE:APA91bHykGL1DwaYmitHIGYeQL7fXih8EZ_211ISQALWQpnPPqBfP4nFX389-zhiZTsD96dtxLsSccSFarc3hifMkujFa210jRwnZoRDzoqqSm9c2z-zbtF3gW3HZ4RL2EZkZ3JUssdZ",
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDragStart = (e) => {
    // 터치 이벤트의 초기 위치
    const initialTouchX = e.touches[0].clientX;
    const avatar = e.currentTarget;
    if (!avatar) {
      return;
    }
    // 드래그 중에 실행되는 함수
    const handleDragging = (moveEvent) => {
      // 현재 터치 위치와 초기 위치의 차이를 계산한 이동 거리
      const moveX = moveEvent.touches[0].clientX - initialTouchX;

      avatar.style.transform = `translateX(${moveX}px)`;
    };

    // 드래그가 끝나면 실행되는 함수
    const handleDragEnd = () => {
      // Check if the avatar is over the call_btn
      const callBtn = document.querySelector(".call_btn");
      const avatarBounds = avatar.getBoundingClientRect();
      const callBtnBounds = callBtn.getBoundingClientRect();

      if (
        avatarBounds.left < callBtnBounds.right &&
        avatarBounds.right > callBtnBounds.left &&
        avatarBounds.top < callBtnBounds.bottom &&
        avatarBounds.bottom > callBtnBounds.top
      ) {
        letsPush();
        joinSession();
      }

      // 이벤트 리스너를 제거합니다.
      window.removeEventListener("touchmove", handleDragging);
      window.removeEventListener("touchend", handleDragEnd);

      // Avatar의 이동을 초기화
      avatar.style.transform = "translateX(0)";
    };

    // 터치 이벤트에 이벤트 리스너를 추가
    window.addEventListener("touchmove", handleDragging);
    window.addEventListener("touchend", handleDragEnd);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {session === undefined ? (
          <div>
            <BurgerButton onClick={toggleNavigation}>
              {isNavigationOpen ? "×" : "☰"}
            </BurgerButton>

            <Navbar isOpen={isNavigationOpen} />

            <WebCam
              style={{
                width: window.innerWidth,
                height: "70dvh",
                transform: "scaleX(-1)",
                paddingTop: "10dvh",
              }}
            />
            <JoinForm onSubmit={joinSession} className="joinform">
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
                <AvatarComponent
                  yourProfileImage={yourProfileImage}
                  onDrag={handleDragStart}
                />
                <span className="invisible_btn">
                  <PhoneEnabledIcon />
                </span>
                <ReadyBtn
                  className="ready_btn blink"
                  name="commit"
                  type="submit"
                >
                  밀어서 연결하기
                </ReadyBtn>
                <span className="call_btn">
                  <PhoneEnabledIcon onClick={letsPush} />
                </span>
              </CallBtn>
            </JoinForm>
          </div>
        ) : null}

        {session !== undefined ? (
          <div>
            <BtnBox>
              <span className="blink">연결중</span>
            </BtnBox>
            <CameraBox>
              {publisher !== undefined ? (
                <div className="myCam">
                  <UserVideoComponent streamManager={publisher} type={1} />
                </div>
              ) : null}
              {subscribers.length > 0 ? (
                <div>
                  <UserVideoComponent streamManager={subscribers[0]} type={0} />
                </div>
              ) : (
                <div className="none">
                  <VoiceOverOffIcon className="none_icon"/>
                </div>
              )}
            </CameraBox>
            <BtnBox>
              <span
                className="stopBtn"
                type="button"
                onClick={leaveSession}
                value="Leave session"
              >
                연결 종료
                <PhoneDisabledIcon
                  className="disabledBtn"
                  style={{ marginLeft: "3%", color: "red" }}
                />
              </span>
            </BtnBox>
          </div>
        ) : null}
      </div>
    </DndProvider>
  );
}
