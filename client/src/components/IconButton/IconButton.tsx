import { FaRegWindowClose, FaTrash, FaPen, FaEllipsisV, FaTimes, FaPlusCircle, FaThumbtack } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import './IconButton.css';

type AppProps = {
    type: ButtonIcon,
    callback?: () => void,
    className?: string,
    color?: string,
    size?: string;
}

type ButtonIcon = 'FaRegWindowClose' | 'FaTrash' | 'FaEllipsisV' | 'FaPen' | 'FaTimes' | 'FaPlusCircle' | 'FaThumbtack';

const IconButton = ({ callback, type, className, color, size }: AppProps) => {
    return (
        <button className={`IconButton ${className || ''}`} onClick={callback} >
            <IconContext.Provider value={{ color: color, size: size || "2em"}}>
                    { type === 'FaRegWindowClose' && <FaRegWindowClose />}
                    { type === 'FaEllipsisV' && <FaEllipsisV />}
                    { type === 'FaPen' && <FaPen />}
                    { type === 'FaTimes' && <FaTimes />}
                    { type === 'FaPlusCircle' && <FaPlusCircle />}
                    { type === 'FaTrash' && <FaTrash />}
                    { type === 'FaThumbtack' && <FaThumbtack />}
            </IconContext.Provider>
        </button>
    )
}

export default IconButton;
