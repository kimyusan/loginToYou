import React, { useRef, useEffect } from 'react';

export default function OpenViduVideoComponent1({ streamManager, zi }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div style={{ width: "360px", height: "292px", position: "fixed", top: "10%", zIndex: "-1" }}>
      <video
        ref={videoRef}
        playsInline
        style={{
          width: "360px",
          height: "100%",
          transform: "scaleX(-1)"
        }}
      />
    </div>
  )
}
