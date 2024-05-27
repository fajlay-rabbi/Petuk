import React from 'react'
import styles from './Cart.module.css';

const Cart = (props) => {
  return (
      <div className={`${styles.container} ${props.className}`}>{props.children}</div>
  )
}

export default Cart