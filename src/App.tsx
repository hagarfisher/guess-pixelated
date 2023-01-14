import "./App.css";
import Canvas from "./components/Canvas";
import { imgSources } from "./assets/imgSorces";
function App() {
  function pixelateImage(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D | null,
    originalImage: HTMLImageElement | null,
    pixelationFactor: number
  ) {
    if (context === null || originalImage === null) {
      return;
    }
    const originalWidth = originalImage.width;
    const originalHeight = originalImage.height;
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
          // extracting the position of the sample pixel
          const pixelIndexPosition = (x + y * originalWidth) * 4;
          // drawing a square replacing the current pixels
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
  }

  return (
    <div>
      <h1>Guess The Movie!</h1>
      <Canvas pixelateImage={pixelateImage} imgSrc={imgSources[0].src} />
      <input type="text" placeholder="Enter a guess" />
    </div>
  );
}

export default App;
