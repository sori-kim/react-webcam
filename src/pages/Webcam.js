import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import "../app.css";

function Webcam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };

    getUserMedia();
  }, []);

  const render = useCallback(() => {
    const { videoWidth, videoHeight } = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    ctx.translate(videoWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
    animationRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", () => {
      animationRef.current = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    });
  }, [render]);

  const handleClickButton = prev => {
    setIsPaused(!prev);
    (() => counterWorker.postMessage(count))();
  };

  const counterWorker = new Worker("workers/counter.js");
  counterWorker.onmessage = function (event) {
    const message = event.data;
    setCount(message);
  };

  console.log("in app", count);

  return (
    <StyledContainer>
      <video ref={videoRef} autoPlay style={{ display: "none" }} />
      <canvas ref={canvasRef} />
      <div style={{ display: "flex" }}>
        <button onClick={() => handleClickButton(isPaused)}>{isPaused ? "START" : "PAUSE"}</button>
        <button>RESET</button>
        <div className="icon_check"></div>
      </div>
    </StyledContainer>
  );
}

export default Webcam;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: beige;
`;
