import { useEffect, useState } from "react";
import "../App.css";

type Props = {
  delay: number;
  message: string;
  setNewRound: Function;
};

const EndRoundMessage = ({ delay, message, setNewRound }: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setNewRound(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, setNewRound]);

  return (
    <div className="container">
      <div className="message-container">
        <h4 className="message">{message}</h4>
      </div>
    </div>
  );
};

export default EndRoundMessage;
