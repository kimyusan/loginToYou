import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent1({ streamManager, zi }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{
        width: window.innerWidth,
        height: window.innerWidth * 1.5,
        transform: "scaleX(1)",
        position: "fixed",
        zIndex: "-1",
        objectFit: "cover",
      }}
    />
  );
}
