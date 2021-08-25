import React, { useState } from 'react';
import IconButton from '../IconButton/IconButton';
import './Modal.css';

type AppProps = {
    onClose: () => void,
    children: JSX.Element[]
}

const Modal = ({onClose, children}: AppProps) => {

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = (): void => {
        setIsOpen(!isOpen);

        onClose();
    }

    return (
        <div className={`Backdrop Open-${isOpen}`} onClick={handleClose}>
            <IconButton className="ModalDeleteButton" type="FaRegWindowClose" callback={handleClose} />
            <div className="Modal" onClick={(event) => {event.stopPropagation()}}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
