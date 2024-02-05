import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserVideoComponent from '../components/Camera/UserVideoComponents';
import UserVideoComponent1 from '../components/Camera/UserVideoComponents1';
import WebCam from "react-webcam"
import html2canvas from "html2canvas";
import { useShallow } from "zustand/react/shallow";

import { ReadyRoomText, ReadyBtn, JoinForm, PoseBox } from "../styles/Camera/CameraCouple"
import { CameraButton } from '../styles/Camera/CameraSolo';

import clip from "../styles/common/clip.png"
import handHeart from "../styles/common/handheart.png"
import oneGood from "../styles/common/onegood.png"
import twoGood from "../styles/common/twogood.png"
import V from "../styles/common/v.png"

import CameraAltIcon from '@mui/icons-material/CameraAlt';

import useUserStore from '../stores/UserStore';
import useAuthStore from "../stores/AuthStore";

const APPLICATION_SERVER_URL = 'https://logintoyou.kro.kr:8080/openvidu/';

export default function App() {
  const divRef = useRef(null);
  const navigate = useNavigate();
  const { coupleId, userId, nickname } = useUserStore();
  const [mySessionId, setMySessionId] = useState(`logintoyou${coupleId}`)
  const [myUserName, setMyUserName] = useState(`${nickname}${userId}`)
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

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
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
            resolution: `${window.innerWidth}x480`,
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(device => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log('There was an error connecting to the session:', error.code, error.message);
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
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then(sessionId =>
      createToken(sessionId),
    );
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // The token
  };

  const { PATH, token } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
    }))
  );

  const [imageContent, setImageContent] = useState("")
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
        }

        formData.append("diary", JSON.stringify(data))

        axios.post(`${PATH}/diary/upload`, formData, {
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            console.log("사진 저장 성공")
            leaveSession()
            setWebCamVisible(false);
            navigate("/diary")
          })
          .catch((error) => console.log("사진 저장 실패", error))
      }
      else {
        console.error('Unable to get the blob from the canvas');
      }
    }, 'image/png')
  };

  return (
    <div>
      {session === undefined ? (
        <div>
          <ReadyRoomText>대기방</ReadyRoomText>
          {webCamVisible && <WebCam
            style={{ width: window.innerWidth, height: "480px", transform: "scaleX(-1)" }}
          />}
          <JoinForm onSubmit={joinSession} >
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
            <ReadyBtn name="commit" type="submit" value="Ready" />
          </JoinForm>
        </div>
      ) : null}

      {session !== undefined ? (
        <div>
          <div>
            <input
              type="button"
              onClick={leaveSession}
              value="방 나가기"
            />
          </div>

          <div ref={divRef}>
            <div>
              {publisher !== undefined ? (
                <div>
                  <UserVideoComponent
                    streamManager={publisher} />
                </div>
              ) : null}

              {subscribers.length > 0 ? <div>
                <UserVideoComponent1 streamManager={subscribers[0]} />
              </div> : null}
            </div>
          </div>

          <PoseBox>
            <div className='text'>포즈 추천</div>
            <div className='pose'>
              <img src={oneGood} alt="따봉 한개" className='item'/>
              <img src={twoGood} alt="따봉 두개" className='item'/>
              <img src={clip} alt="박수" className='item'/>
              <img src={handHeart} alt="손하트" className='item' />
              <img src={V} alt="브이" className='item'/>
            </div>

            <CameraButton>
              <CameraAltIcon onClick={takePhoto} className='camera'></CameraAltIcon>
            </CameraButton>
          </PoseBox>
        </div>
      ) : null}
    </div>
  );
}