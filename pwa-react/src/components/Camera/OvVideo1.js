import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

export default function OpenViduVideoComponent1({ streamManager, zi }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div style={{ width: videoRef.current?.videoWidth, height: "292px" }}>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          transform: "scaleX(-1)"
        }}
      />
    </div>
  )
}
