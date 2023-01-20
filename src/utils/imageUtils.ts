export const pixelateImage = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D | null,
  originalImage: HTMLImageElement | null,
  pixelationFactor: number
) => {
  if (context === null || originalImage === null) {
    return;
  }
  const originalWidth = originalImage.width;
  const originalHeight = originalImage.height;
  console.log(originalHeight);
  canvas.width = originalWidth;
  canvas.height = originalHeight;
  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
  const originalImageData = context.getImageData(
    0,
    0,
    originalWidth,
    originalHeight
  ).data;
  if (pixelationFactor !== 0) {
    for (let y = 0; y < originalHeight; y += pixelationFactor) {
      for (let x = 0; x < originalWidth; x += pixelationFactor) {
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        context.fillStyle = `rgba(
              ${originalImageData[pixelIndexPosition]},
              ${originalImageData[pixelIndexPosition + 1]},
              ${originalImageData[pixelIndexPosition + 2]},
              ${originalImageData[pixelIndexPosition + 3]}
            )`;
        const rectangleWidth = pixelationFactor;
        const rectangleHeight = pixelationFactor;
        context.fillRect(x, y, rectangleWidth, rectangleHeight);
      }
    }
  }
};

export const resizeImage = (imageElement: HTMLImageElement) => {
  const newWidth = imageElement.width * 0.9;
  const newHeight = imageElement.height * 0.9;
  imageElement.width = newWidth;
  imageElement.height = newHeight;
};
