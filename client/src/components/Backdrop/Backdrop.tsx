import React from 'react';
import styles from './Backdrop.module.scss';

type AppProps = {
    children: JSX.Element[]
}

const Backdrop = ({children}: AppProps) => {
    return (
        <div className={styles.Backdrop}>
            {children}
        </div>
    )
}

export default Backdrop
