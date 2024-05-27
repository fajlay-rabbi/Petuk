import React from 'react'
import styles from './CheckoutItem.module.css';

const CheckoutItem = (props) => {

    return (
        <>
            <div className={styles.items}>
                <p>{props.item.quantity} x</p>
                <p>{props.item.name}</p>
                <p>{props.item.price} tk</p>
            </div>
        </>
    )
}

export default CheckoutItem