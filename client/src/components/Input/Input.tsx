import React from 'react';
import styles from './CircleButton.module.css';

type AppProps = {
    config: {
        elType?: InputType,
        label?: string;
        placeholder?: string;
    }
    callback?: () => void
}

type InputType = 'input' | 'textarea'; 

const Input = ({ config, callback}: AppProps) => {
    let inputElement = <input {...config} onChange={callback} />
    if (config.elType === 'textarea') {
        <textarea {...config} onChange={callback}></textarea>
    }
    return (
        <label>{config.label}</label>
    )
}

export default Input;
