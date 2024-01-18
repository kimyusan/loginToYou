import React, { useRef, useState, useEffect } from 'react';

const CameraSolo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(0);
  const [selectTime, setSelectTime] = useState("");

  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if(videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error opening video camera.', error);
    }
  };
  
  const takePhoto = (timer: number) => {
    setTime(timer)
    setTimeout(() => {
      if(videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if(context) {
          context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
          const data = canvasRef.current.toDataURL('image/png');
          console.log(data);  // 이 부분에서 data를 서버로 전송하거나 앱 내에 저장할 수 있습니다.
        }
      }
    }, timer*1000)
  };

  useEffect(() => {
    time > 0 && setTimeout(() => setTime(time - 1), 1000);
  }, [time]);

  const TimeChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setSelectTime(event.target.value)
  }

  return (
    <div>
      <h1>{time}</h1>
      <select onChange={TimeChange}>
        <option>0</option>
        <option>3</option>
        <option>5</option>
        <option>10</option>
      </select>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={() => {takePhoto(Number(selectTime))}}>Take Photo</button>
      <video ref={videoRef} autoPlay={true} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CameraSolo;
