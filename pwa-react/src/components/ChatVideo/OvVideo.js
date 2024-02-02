import React, { useRef, useEffect } from "react";

export default function OpenViduVideoComponent({ streamManager, zi, type }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      {type === -1 ? (
        <div style={{ height: "20dvh" }}>
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
        <div style={{ height: "60dvh" }}>
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
      {/* <div style={{height: "50dvh" }}>
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "100%",
            transform: "scaleX(-1)",
          }}
        />
      </div> */}
    </>
  );
}
