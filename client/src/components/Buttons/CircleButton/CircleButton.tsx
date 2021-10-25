import React from 'react';
import './CircleButton.css';

type AppProps = {
  text: string;
  callback?: () => void;
};

const CircleButton = ({ text, callback }: AppProps): JSX.Element => {
  return (
    <button onClick={callback} type="button" className="CircleButton">
      {text}
    </button>
  );
};

export default CircleButton;
