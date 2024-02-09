import React, { useRef, useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

export default function OpenViduVideoComponent({ streamManager, zi }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const onResults = async (results) => {
    const videoWidth = windowWidth;
    const videoHeight = windowWidth * (4/3);

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
        width: windowWidth,
        height: windowWidth * (4/3),
      });

      camera.start();
      
      return () => {
        camera.stop()
      }
    }

    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager,windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: windowWidth,
        height: windowWidth * (4/3),
        position: "fixed",
        zIndex: "0",
      }}
    >
      <video
        ref={videoRef}
        playsInline
        style={{
          display: "none",
          width: windowWidth,
          height: windowWidth * (4/3),
          transform: "scaleX(-1)",
        }}
        width={windowWidth}
        height={windowWidth * (4/3)}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: windowWidth,
          height: windowWidth * (4/3),
          transform: "scaleX(-1)",
          aspectRatio: (4/3),
          objectFit: "contain",
        }}
      ></canvas>
    </div>
  );
}
