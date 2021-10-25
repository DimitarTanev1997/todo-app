import React from 'react';
import './CircleButton.css';

type AppProps = {
  text: string;
  callback?: () => void;
};

const CircleButton = ({ text, callback }: AppProps) => {
  return (
    <button onClick={callback} className="CircleButton">
      {text}
    </button>
  );
};

export default CircleButton;
