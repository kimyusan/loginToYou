import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserVideoComponent from "../components/Camera/UserVideoComponents";
import UserVideoComponent1 from "../components/Camera/UserVideoComponents1";
import WebCam from "react-webcam";
import html2canvas from "html2canvas";
import { useShallow } from "zustand/react/shallow";
import { Header } from "../styles/Settings/UI";
import { IconContext } from "react-icons";
import { GoArrowLeft } from "react-icons/go";
import { PiFinnTheHumanFill } from "react-icons/pi";

import {
  ReadyRoomText,
  ReadyBtn,
  JoinForm,
  PoseBox,
  BottomBox,
} from "../styles/Camera/CameraCouple";
import { CameraButton } from "../styles/Camera/CameraSolo";

import clip from "../styles/common/clip.png";
import handHeart from "../styles/common/handheart.png";
import oneGood from "../styles/common/onegood.png";
import twoGood from "../styles/common/twogood.png";
import V from "../styles/common/v.png";

import CameraAltIcon from "@mui/icons-material/CameraAlt";

import useUserStore from "../stores/UserStore";
import useAuthStore from "../stores/AuthStore";
import useFCMStore from "../stores/FCMStore";
import SettingsHeader from "../components/Settings/SettingsHeader";
import { useTheme } from "styled-components";

const APPLICATION_SERVER_URL = "https://logintoyou.kro.kr:8080/openvidu/";

export default function App() {
  const divRef = useRef(null);
  const navigate = useNavigate();
  const { coupleId, userId, name, nickname } = useUserStore();
  const [mySessionId, setMySessionId] = useState(`logintoyou${coupleId}`);
  const [myUserName, setMyUserName] = useState(`${nickname}${userId}`);
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [isPoseOpen, setIsPoseOpen] = useState(false);
  const theme = useTheme();

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
            resolution: `${window.innerWidth}x${window.innerWidth * (4/3)}`,
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
    setMySessionId(`logintoyou${coupleId}`);
    setMyUserName(`${nickname}${userId}`);
    setPublisher(undefined);
  }, [session]);

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
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  const [imageContent, setImageContent] = useState("");
  const [webCamVisible, setWebCamVisible] = useState(true);

  const changeContent = (event) => {
    setImageContent(event.target.value);
  };

  const takePhoto = async () => {
    if (!divRef.current) return;

    const div = divRef.current;
    const canvas = await html2canvas(div, { scale: 2 });
    canvas.toBlob((blob) => {
      if (blob !== null) {
        const formData = new FormData();

        formData.append("imgInfo", blob);

        const data = {
          coupleId: coupleId,
          subject: imageContent,
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
            leaveSession();
            setWebCamVisible(false);
            navigate("/diary");
          })
          .catch((error) => console.log("사진 저장 실패", error));
      } else {
        console.error("Unable to get the blob from the canvas");
      }
    }, "image/png");
  };

  // 연결시 푸시알림 보내기
  const { yourFCMtoken, coupleCamPush } = useFCMStore();
  const letsPush = () => {
    console.log(yourFCMtoken);
    axios({
      url: "https://fcm.googleapis.com/fcm/send",
      method: "POST",
      data: {
        to: yourFCMtoken,
        notification: {
          title: "❤너에게 로그인",
          body: `${nickname ? nickname : name}님이 사진 찍기를 원해요!`,
          tag: coupleCamPush,
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

  return (
    <div>
      {session === undefined ? (
        <div>
          <SettingsHeader name={"같이찍기 대기실"} />
          {webCamVisible && (
            <WebCam
              style={{
                width: window.innerWidth,
                height: window.innerWidth * (4/3),
                transform: "scaleX(-1)",
                position: "fixed",
                top: "8dvh",
                objectFit: "cover",
              }}
            />
          )}
          <JoinForm onSubmit={joinSession} $height={window.innerWidth * (4/3)}>
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
            <ReadyBtn name="commit" type="submit" value="Ready" onClick={letsPush}/>
          </JoinForm>
        </div>
      ) : null}

      {session !== undefined ? (
        <div>
          <Header>
            <IconContext.Provider value={{ size: "20px" }}>
              <GoArrowLeft
                onClick={() => {
                  leaveSession();
                }}
              />
            </IconContext.Provider>
          </Header>

          <div ref={divRef}>
            <div>
              {publisher !== undefined ? (
                <div>
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}

              {subscribers.length > 0 ? (
                <div>
                  <UserVideoComponent1 streamManager={subscribers[0]} />
                </div>
              ) : null}
            </div>
          </div>

          <BottomBox $height={window.innerWidth * (4/3)}>
            <PoseBox>
              <IconContext.Provider
                value={{
                  size: "3rem",
                  color: isPoseOpen ? theme.color.grey : "black",
                }}
              >
                <PiFinnTheHumanFill
                  className="poseIcon"
                  onClick={() => setIsPoseOpen((prev) => !prev)}
                />
              </IconContext.Provider>
              {isPoseOpen ? (
                <div className="recPose">
                  <div className="text">포즈 추천</div>
                  <div className="pose">
                    <img src={oneGood} alt="따봉 한개" className="item" />
                    <img src={twoGood} alt="따봉 두개" className="item" />
                    <img src={clip} alt="박수" className="item" />
                    <img src={handHeart} alt="손하트" className="item" />
                    <img src={V} alt="브이" className="item" />
                  </div>
                </div>
              ) : null}
            </PoseBox>
            <CameraButton>
              <CameraAltIcon
                onClick={takePhoto}
                className="camera"
              ></CameraAltIcon>
            </CameraButton>
          </BottomBox>
        </div>
      ) : null}
    </div>
  );
}
