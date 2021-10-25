import {
  FaRegWindowClose,
  FaTrash,
  FaPen,
  FaEllipsisV,
  FaTimes,
  FaPlusCircle,
  FaThumbtack,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
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
      onClick={callback}
    ></button>
  );
};

export default IconButton;
