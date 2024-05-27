import React from 'react'
import styles from './BigCard.module.css';

const BigCard = (props) => {
  return (
    <div className={styles.container}>{props.children}</div>
  )
}

export default BigCard