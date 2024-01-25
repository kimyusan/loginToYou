import React, { useRef, useEffect } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import { SelfieSegmentation } from '@mediapipe/selfie_segmentation'

export default function OpenViduVideoComponent({ streamManager,zi }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // const selfieSegmentation = new SelfieSegmentation({
    //   locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    // });

    // selfieSegmentation.setOptions({
    //   modelSelection: 0,
    // });

    // selfieSegmentation.onResults((results) => {
    //   const canvasCtx = canvasRef.current.getContext('2d');
    //   canvasCtx.save();
    //   canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    //   // 결과의 세그먼테이션 마스크를 캔버스에 그립니다.
    //   canvasCtx.drawImage(
    //     results.segmentationMask,
    //     0,
    //     0,
    //     canvasRef.current.width,
    //     canvasRef.current.height
    //   );

    //   // 실루엣을 추출하여 원본 이미지와 병합합니다.
    //   canvasCtx.globalCompositeOperation = 'source-in';
    //   canvasCtx.drawImage(
    //     results.image,
    //     0,
    //     0,
    //     canvasRef.current.width,
    //     canvasRef.current.height
    //   );

    //   canvasCtx.restore();
    // });

    // const camera = new Camera(videoRef.current, {
    //   onFrame: async () => {
    //     await selfieSegmentation.send({ image: videoRef.current });
    //   },
    //   width: 1280,
    //   height: 720,
    // });
    // camera.start();

    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }

    // return () => {
    //   camera.stop();
    // };
  }, [streamManager]);

  return (
    <div style={{width: "100%" , height: "292px"}}>
      <video autoPlay={true} ref={videoRef} playsInline style={{ width: '100%', height: '100%', transform: "scaleX(-1)" }}/>
      {/* <canvas ref={canvasRef} className="output_canvas" style={{ width: "100%", height: "100%", transform: "scaleX(-1)"} }></canvas> */}
    </div>
  )
}