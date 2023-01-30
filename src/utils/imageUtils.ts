export const pixelateImage = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D | null,
  originalImage: HTMLImageElement | null,
  pixelationFactor: number
) => {
  if (context === null || originalImage === null) {
    return;
  }

  const { height: originalHeight, width: originalWidth } = originalImage;
  canvas.width = originalWidth;
  canvas.height = originalHeight;
  const originalImagePixelArray = getImagePixelList(context, originalImage, {
    originalWidth,
    originalHeight,
  });

  if (pixelationFactor !== 0) {
    for (let y = 0; y < originalHeight; y += pixelationFactor) {
      for (let x = 0; x < originalWidth; x += pixelationFactor) {
        // get a sample pixel, each pixel is represented by 4 consecutive array elements
        const pixelIndexPosition = (x + y * originalWidth) * 4;
        const rectangleColor = `rgba(
          ${originalImagePixelArray[pixelIndexPosition]},
          ${originalImagePixelArray[pixelIndexPosition + 1]},
          ${originalImagePixelArray[pixelIndexPosition + 2]},
          ${originalImagePixelArray[pixelIndexPosition + 3]}
        )`;

        // fill a rectangle of pixelation factor size with the color of the sample pixel
        context.fillStyle = rectangleColor;
        const rectangleWidth = pixelationFactor;
        const rectangleHeight = pixelationFactor;
        context.fillRect(x, y, rectangleWidth, rectangleHeight);
      }
    }
  }
};

const getImagePixelList = (
  context: CanvasRenderingContext2D,
  originalImage: HTMLImageElement,
  dimensions: { originalWidth: number; originalHeight: number }
) => {
  const { originalWidth, originalHeight } = dimensions;
  context.drawImage(originalImage, 0, 0, originalWidth, originalHeight);
  const originalImageData = context.getImageData(
    0,
    0,
    originalWidth,
    originalHeight
  ).data;
  return originalImageData;
};

export const resizeImage = (imageElement: HTMLImageElement) => {
  const newWidth = imageElement.width * 0.9;
  const newHeight = imageElement.height * 0.9;
  imageElement.width = newWidth;
  imageElement.height = newHeight;
};
