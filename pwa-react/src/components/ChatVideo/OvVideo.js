import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager, type }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div>
      {type === 1 ? (
        <div
          style={{
            // height: "20dvh",
            // position: "absolute",
            // top: 0,
            // left: 0,
            zIndex: type,
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            // height: "60dvh",
            // position: "absolute",
            // top: 0,
            // left: 0,
            zIndex: type,
          }}
        >
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      )}
    </div>
  );
}
