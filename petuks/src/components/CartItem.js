import React from 'react'
import styles from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, name, price, category, img, quantity } = props.item;
  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id,
      name,
      price,
      category,
      img
    }));
  }

  const removedItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id))
  }


  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item}>
        <img src={`http://localhost:4000/upload/${img}`} alt="" />
        <div className={styles.itemTitle}>
          <p>{name}</p>
          <p>{category}</p>
        </div>
        <div className={styles.itemBtn}>
          <div onClick={addToCartHandler}>+</div>
          <p>{quantity}</p>
          <div onClick={removedItemHandler}>-</div>
        </div>
        <div className={styles.itemPrice}>
          <p>{price} tk</p>
        </div>

      </div>
    </div>
  )
}

export default CartItem