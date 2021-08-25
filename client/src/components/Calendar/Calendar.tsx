import React, { useState } from 'react';
import styles from './Calendar.module.css';

const Calendar = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [date, setDate] = useState<Date>(new Date());

    return (
        <div className={`${styles.Calendar} uppercase`}>
            <span className={styles.Calendar__date}>{date.getDate()}</span>
            <div className={`${styles.Calendar__monthAndYear} flex column`}>
                <span className={styles.Calendar__monthAndYear__month}>{months[date.getMonth()]}</span>
                <span>{date.getFullYear()}</span>
            </div>
            <span className={styles.Calendar__day}>{days[date.getDay()]}</span>
        </div>
    )
}

export default Calendar;
