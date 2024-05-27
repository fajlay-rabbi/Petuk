import React from 'react'
import styles from './Hcard.module.css';

const Hcard = (props) => {
  return (
    <div className={`${styles.container} ${props.className}`}>{props.children}</div>
  )
}

export default Hcard