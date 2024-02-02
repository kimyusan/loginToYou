import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

export default function OpenViduVideoComponent({ streamManager, zi }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const onResults = async (results) => {
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.restore();
  }

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

    if (
      typeof videoRef.current !== "undefined" &&
      videoRef.current !== null
    ) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await selfieSegmentation.send({ image: videoRef.current});
        },
        width: 1920,
        height: 1080
      });

      camera.start();
    }

    if (streamManager && canvasRef.current) {
      streamManager.addVideoElement(canvasRef.current);
    }

    return () => {
      if (streamManager && canvasRef.current) {
        streamManager.removeVideoElement(canvasRef.current);
      }
    };
  }, [streamManager]);

  return (
    <div style={{ width: "360px", height: "292px", position: "fixed", top: "10%", zIndex: "1" }}>
      <video
        ref={videoRef}
        playsInline
        style={{
          display: "none",
          width: "360px",
          height: "100%",
          transform: "scaleX(-1)"
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: "360px",
          height: "282px",
          transform: "scaleX(-1)",
        }}
      ></canvas>
    </div>
  )
}
