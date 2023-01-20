import React, { useRef, useEffect, useState } from "react";
import image from "../assets/The-Dark-Knight.jpeg";

import { pixelateImage, resizeImage } from "../utils/imageUtils";

type CanvasProps = {
  pixelationFactor: number;
  imgSrc: string;
};

const Canvas = ({ pixelationFactor, imgSrc }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const imageElement = new Image();
      imageElement.src = imgSrc;
      imageElement.crossOrigin = "Anonymous";
      const context = canvas.getContext("2d");

      function pixelate() {
        resizeImage(imageElement);
        pixelateImage(canvas, context, imageElement, pixelationFactor);
      }
      imageElement.onload = pixelate;
    }
  }, [imgSrc, pixelationFactor]);

  return (
    <>
      <div>
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};

export default Canvas;
