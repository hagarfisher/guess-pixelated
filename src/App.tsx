import "./App.css";
import Canvas from "./components/Canvas";
import { imgSources } from "./assets/imgSources";
import { useEffect, useState } from "react";
import EndRoundMessage from "./components/EndRoundMessage";

const App = () => {
  const initialGuessCount = 3;
  const [score, setScore] = useState(0);
  const pixelationFactors = [5, 7, 9];
  const [guessCount, setGuessCount] = useState(initialGuessCount);
  const [guess, setGuess] = useState("");
  const [currentImg, setCurrentImg] = useState(
    imgSources[Math.floor(Math.random() * imgSources.length)]
  );
  const [newRound, setNewRound] = useState(false);
  const [message, setMessage] = useState("");
  const [pixelationFactor, setPixelationFactor] = useState(
    pixelationFactors[pixelationFactors.length - 1]
  );
  const validateGuess = () => {
    if (currentImg.name.toLowerCase() === guess.toLowerCase()) {
      setMessage("you guessed it!");
      setScore((score) => score + 1);
      setNewRound(true);
      setCurrentImg(imgSources[Math.floor(Math.random() * imgSources.length)]);
      setGuessCount(initialGuessCount);
    } else {
      if (guessCount === 1) {
        setMessage("maybe next time...");
        setNewRound(true);
        setCurrentImg(
          imgSources[Math.floor(Math.random() * imgSources.length)]
        );
        setGuessCount(initialGuessCount);
      } else {
        setGuessCount((count) => count - 1);
      }
    }
    setGuess("");
  };

  useEffect(() => {
    setPixelationFactor(pixelationFactors[guessCount - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guessCount]);

  return (
    <>
      <div className="title-container">
        <h1 className="title">Guess The Movie!</h1>
      </div>
      {newRound ? (
        <EndRoundMessage
          message={message}
          delay={1000}
          setNewRound={setNewRound}
        />
      ) : (
        <div className="container">
          <div className="game-info">
            <h4>{guessCount} guesses left</h4>
            <span>score: {score}</span>
          </div>
          <div className="canvas-container">
            <Canvas
              pixelationFactor={pixelationFactor}
              imgSrc={currentImg.src}
            />
          </div>
          <div className="input-container">
            <input
              onChange={(e) => setGuess(e.target.value)}
              type="text"
              placeholder="Enter a guess"
              value={guess}
            />
            <button
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  validateGuess();
                }
              }}
              onClick={validateGuess}
              className="button"
            >
              Go
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
