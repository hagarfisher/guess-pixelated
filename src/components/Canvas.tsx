import React, { useRef, useEffect, useState } from "react";
import image from "../assets/The-Dark-Knight.jpeg";

type CanvasProps = {
  pixelateImage: Function;
  imgSrc: string;
};

const Canvas = ({ pixelateImage, imgSrc }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const originalImageRef = useRef<HTMLImageElement>(null);
  const [pixelationFactor, setPixelationFactor] = useState("0");

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // const currentImg = originalImageRef.current;
      const imageElement = new Image();
      console.log(imgSrc);
      imageElement.src = imgSrc;
      imageElement.crossOrigin = "Anonymous";
      const context = canvas.getContext("2d");

      function pixelate() {
        pixelateImage(
          canvas,
          context,
          imageElement,
          parseInt(pixelationFactor)
        );
      }
      imageElement.onload = pixelate;

      // if (!currentImg) {
      //   return;
      // }
      // currentImg.addEventListener("load", pixelate);
      // return () => {
      //   currentImg.removeEventListener("load", pixelate);
      // };
    }
  }, [imgSrc, pixelationFactor, pixelateImage]);

  return (
    <>
      <div>
        <canvas ref={canvasRef} />
        <input
          value={pixelationFactor}
          onChange={(e) => {
            setPixelationFactor(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default Canvas;
