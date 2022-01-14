import styled from "styled-components";
import { useEffect, useRef } from "react";

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

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

  const render = () => {
    const { videoWidth, videoHeight } = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    ctx.translate(videoWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
    animationRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", () => {
      animationRef.current = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    });
  }, []);

  return (
    <StyledContainer>
      <video ref={videoRef} autoPlay style={{ display: "none" }}></video>
      <canvas ref={canvasRef}></canvas>

      <StyledTitle>카운트</StyledTitle>
      <StyledBox>
        <div>COUNTER</div>
        <StyledContent>넘버 올라가는 공간</StyledContent>
        <button>START</button>
      </StyledBox>
    </StyledContainer>
  );
}

export default App;

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: beige;
`;

const StyledTitle = styled.h1``;

const StyledBox = styled.div`
  width: 500px;
  color: cadetblue;
`;

const StyledContent = styled.div``;
