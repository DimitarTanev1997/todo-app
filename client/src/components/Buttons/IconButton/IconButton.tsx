import React from 'react';
import './IconButton.css';

type AppProps = {
  type: ButtonIcon;
  callback?: () => void;
  className?: string;
  color?: string;
  size?: string;
};

type ButtonIcon =
  | 'FaRegWindowClose'
  | 'FaTrash'
  | 'FaEllipsisV'
  | 'FaPen'
  | 'FaTimes'
  | 'FaPlusCircle'
  | 'FaThumbtack';

const IconButton = ({ callback, type, className, color, size }: AppProps) => {
  return (
    <button
      className={`IconButton ${className || ''}`}
      type="button"
      onClick={callback}
    />
  );
};

export default IconButton;
