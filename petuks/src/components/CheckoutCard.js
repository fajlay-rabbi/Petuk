import React from 'react'
import styles from './CheckoutCard.module.css';

const CheckoutCard = (props) => {
  return (
    <div className={styles.ItemDetails}>
      <div className={styles.title}>
        <div>{props.data[0].id}</div>
        <p>{props.data[0].name}</p>
      </div>
      {props.children}
    </div>
  )
}

export default CheckoutCard