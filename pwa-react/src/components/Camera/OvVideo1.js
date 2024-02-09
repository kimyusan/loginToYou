import React, { useRef, useEffect, useState } from "react";

export default function OpenViduVideoComponent1({ streamManager, zi }) {
  const videoRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        width: windowWidth,
        height: windowWidth * (4/3),
        transform: "scaleX(1)",
        position: "fixed",
        zIndex: "-1",
        objectFit: "cover",
      }}
    />
  );
}
