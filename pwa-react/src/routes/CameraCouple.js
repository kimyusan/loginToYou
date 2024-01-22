import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserVideoComponent from '../components/Camera/UserVideoComponents';
import { Camera } from '@mediapipe/camera_utils';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

export default function App() {
  const [mySessionId, setMySessionId] = useState('')
  const [myUserName, setMyUserName] = useState(``)
  const [session, setSession] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
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
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });

          const selfieSegmentation = new SelfieSegmentation({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
          });

          selfieSegmentation.setOptions({
            modelSelection: 0,
          });

          selfieSegmentation.onResults((results) => {
            const canvasCtx = canvasRef.current.getContext('2d');
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            // 결과의 세그먼테이션 마스크를 캔버스에 그립니다.
            canvasCtx.drawImage(
              results.segmentationMask,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );

            // 실루엣을 추출하여 원본 이미지와 병합합니다.
            canvasCtx.globalCompositeOperation = 'source-in';
            canvasCtx.drawImage(
              results.image,
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );

            canvasCtx.restore();
          });

          // 웹캠 설정
          const camera = new Camera(videoRef.current, {
            onFrame: async () => {
              await selfieSegmentation.send({ image: videoRef.current });
            },
            width: 500,
            height: 800,
          });
          camera.start();

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
    setMySessionId('');
    setMyUserName(``);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId);

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
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
      headers: { 'Content-Type': 'application/json', },
    });
    return response.data; // The token
  };

  return (
    <div>
      {session === undefined ? (
        <div>
          <form onSubmit={joinSession}>
            <input
              type="text"
              value={myUserName}
              onChange={handleChangeUserName}
              required
            />
            <input
              type="text"
              value={mySessionId}
              onChange={handleChangeSessionId}
              required
            />
            <input name="commit" type="submit" value="JOIN" />
          </form>
        </div>
      ) : null}

      {session !== undefined ? (
        <div>
          <div>
            <input
              type="button"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              type="button"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          <div>
            {publisher !== undefined ? (
              <div style={{display: "none"}}>
                <UserVideoComponent
                  streamManager={publisher} />
              </div>
            ) : null}


            <div style={{ width: "100%", height: "292px", overflow: "hidden", display: 'flex' }}>
              <video ref={videoRef} playsInline className="input_video" style={{ display: 'none', width: '100%', height: '100%', transform: "scaleX(-1)" }}></video>
              <canvas ref={canvasRef} className="output_canvas" style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}></canvas>
            </div>


            {subscribers.map((sub, i) => (
              <div key={sub.id}>
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}