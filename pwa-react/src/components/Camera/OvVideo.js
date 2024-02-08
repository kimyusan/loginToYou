import React, { useRef, useEffect } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

export default function OpenViduVideoComponent({ streamManager, zi }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const onResults = async (results) => {
    const videoWidth = window.innerWidth;
    const videoHeight = window.innerWidth * 1.5;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.segmentationMask,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    canvasCtx.restore();
  };

  useEffect(() => {
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
      },
    });

    selfieSegmentation.setOptions({
      modelSelection: 1,
    });

    selfieSegmentation.onResults(onResults);

    if (typeof videoRef.current !== "undefined" && videoRef.current !== null) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await selfieSegmentation.send({ image: videoRef.current });
        },
        width: window.innerWidth,
        height: window.innerWidth * 1.5,
      });

      camera.start();
    }

    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div
      style={{
        width: window.innerWidth,
        height: window.innerWidth * 1.5,
        position: "fixed",
        zIndex: "0",
      }}
    >
      <video
        ref={videoRef}
        playsInline
        style={{
          display: "none",
          // width: window.innerWidth,
          // height: window.innerWidth * 1.5,
          transform: "scaleX(-1)",
        }}
        width={window.innerWidth}
        height={window.innerWidth * 1.5}
      />
      <canvas
        ref={canvasRef}
        style={{
          height: window.innerWidth * 1.5,
          transform: "scaleX(-1)",
          aspectRatio: 1.5,
        }}
      ></canvas>
    </div>
  );
}
