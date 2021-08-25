import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import './Checkbox.css';

type AppProps = {
    id?: string,
    label?: string,
    callback: () => void,
    checked: boolean,
    
}

const Checkbox = ({ id, label, callback, checked }: AppProps) => {
    return (
        <IconContext.Provider value={{ color: "green", size: "1.2em"}}>
            {label && <label htmlFor="id">{label}</label>}
            <div id={id} role="checkbox" aria-checked={checked} tabIndex={0} onClick={callback} className="IconButton"> 
            { checked ? <FaRegCheckCircle /> : <FaRegCircle /> }
            </div>
        </IconContext.Provider>
    )
}

export default Checkbox;
