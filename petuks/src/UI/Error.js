import React from 'react'
import styles from './Error.module.css';

const Error = (props) => {
    return (
        <div className={styles.tooltip}>
            <div className={styles.left}>
                <p>{props.err}</p>
                <i></i>
            </div>
        </div>
    )
}

export default Error