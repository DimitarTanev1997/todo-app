import React, { FormEvent, SyntheticEvent } from 'react';
import { IconContext } from 'react-icons';
import {
  FaRegWindowClose,
  FaTrash,
  FaPen,
  FaEllipsisV,
  FaTimes,
  FaPlusCircle,
  FaThumbtack,
} from 'react-icons/fa';
import './Button.css';
import { Link } from 'react-router-dom';

type ButtonOptionsType = 'button' | 'link';
type IconStyles =
  | 'FaRegWindowClose'
  | 'FaTrash'
  | 'FaEllipsisV'
  | 'FaPen'
  | 'FaTimes'
  | 'FaPlusCircle'
  | 'FaThumbtack';

enum ButtonOptions {
  Button = 'button',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Link = 'link',
}

type ButtonProps = {
  typeOption: ButtonOptionsType;
  styleOption: ButtonOptionsType | 'icon';
  text?: string;
  callback?: (formEvent: FormEvent) => void;
  to?: string;
  spinner?: boolean;
  buttonType?: 'submit' | 'reset' | 'button';
  iconType?: IconStyles;
  iconColor?: string;
  iconSize?: string;
  disabled?: boolean;
  className?: string;
};

const Button = ({
  typeOption,
  styleOption,
  text,
  callback,
  to = '/',
  buttonType,
  spinner,
  iconType,
  iconColor,
  iconSize,
  disabled,
  className,
}: ButtonProps): JSX.Element => {
  const handleClick = (event: SyntheticEvent): void => {
    event.preventDefault();

    if (callback) {
      callback(event);
    }
  };

  const mainClasses = `${typeOption} ${typeOption}--${styleOption} ${className}`;

  const icon = (
    <IconContext.Provider value={{ color: iconColor, size: iconSize || '2em' }}>
      {iconType === 'FaRegWindowClose' && <FaRegWindowClose />}
      {iconType === 'FaEllipsisV' && <FaEllipsisV />}
      {iconType === 'FaPen' && <FaPen />}
      {iconType === 'FaTimes' && <FaTimes />}
      {iconType === 'FaPlusCircle' && <FaPlusCircle />}
      {iconType === 'FaTrash' && <FaTrash />}
      {iconType === 'FaThumbtack' && <FaThumbtack />}
    </IconContext.Provider>
  );

  let button = (
    <button
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
      className={`${mainClasses} ${spinner ? 'button--spin' : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {styleOption === 'icon' ? (
        icon
      ) : (
        <span className="button__text">{text}</span>
      )}
    </button>
  );

  if (typeOption === ButtonOptions.Link) {
    button = (
      <Link className={`${mainClasses}`} to={to}>
        {styleOption === 'icon' ? icon : `${text}`}
      </Link>
    );
  }

  return <>{button}</>;
};

export default Button;
