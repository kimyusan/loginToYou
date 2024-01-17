import React, {useState} from 'react'
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import { Session } from 'inspector';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io/';

const Camera = () => {
  const [OV, setOV] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const joinSession= () => {
    const OV = new OpenVidu();

  }

  return (
    <div>Camera</div>
  )
}

export default Camera