import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation';

export default function OpenViduVideoComponent({ streamManager }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const selfieSegmentation = new SelfieSegmentation({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    selfieSegmentation.setOptions({
      modelSelection: 0,
    });

    selfieSegmentation.onResults((results) => {
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // 결과의 세그먼테이션 마스크를 캔버스에 그립니다.
      canvasCtx.drawImage(
        results.segmentationMask,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // 실루엣을 추출하여 원본 이미지와 병합합니다.
      canvasCtx.globalCompositeOperation = 'source-in';
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasCtx.restore();
    });

    // 웹캠 설정
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await selfieSegmentation.send({ image: videoRef.current });
      },
      width: 500,
      height: 800,
    });
    camera.start();
  }, [])

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <div style={{ width: "100%", height: "292px", overflow: "hidden", display: 'flex' }}>
      {/* <video autoPlay={true} ref={videoRef} /> */}
      <video ref={videoRef} autoPlay={true} playsInline className="input_video" style={{ display: 'none', width: '100%', height: '100%', transform: "scaleX(-1)" }}></video>
      <canvas ref={canvasRef} className="output_canvas" style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}></canvas>
    </div>
  );
}