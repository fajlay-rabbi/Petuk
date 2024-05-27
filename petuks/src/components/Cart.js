import React from 'react'
import styles from './Cart.module.css';
import CartUI from '../UI/Cart';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

const Cart = (props) => {
    const cartItem = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const crossCart = () => {
        props.crossHandler();
    }


    const checkoutHandler = () => {
        window.redirect("/checkout")
    };


    return (
        <CartUI className={styles.CartContainer}>
            <div>
                <div className={styles.titlediv}>
                    <div><p>Your order</p></div>
                    <div onClick={crossCart}><img src="./img/cross.png" alt="" /></div>
                </div>
                <div className={styles.divi}>
                    <img src="./img/divi.png" alt='' />
                </div>
            </div>


            <div className={styles.cartItemWrapper}>

                {cartItem.map((item) => (
                    <CartItem key={item.id} item={{
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        category: item.category,
                        img: item.img,
                        quantity: item.quantity
                    }} />
                ))}
            </div>


            <hr />
            <div className={styles.totalWrapper}>
                <div><p>Total: <span>{totalPrice}</span> tk</p></div>
                {cartItem.length > 0 ?
                    <div className={styles.checkOut} onClick={checkoutHandler}>
                        <Link to='/checkout'><p>Checkout</p> </Link>
                    </div> : "Please add food items to your cart"}
            </div>
        </CartUI>
    )
}

export default Cart