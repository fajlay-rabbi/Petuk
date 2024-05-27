import React from 'react'
import styles from './FoodItem.module.css';
import Hcard from '../UI/Hcard';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';

const FoodItem = (props) => {

    const { id, name, price, category, img } = props.data;
    

    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id,
            name,
            price,
            category,
            img
        }))
    }


    return (
        <Hcard className={styles.fcard}>
            <div className={styles.fimg}>
                <img src={`http://localhost:4000/upload/${img}`} alt="" />
            </div>
            <div className={styles.fWrapper}>
                <p>{name}</p>
                <p>{category}</p>
                <div className={styles.fde}>
                    <p>from Tk <span>{price}</span></p>
                    <div onClick={addToCartHandler}><p>+</p></div>
                </div>
            </div>
        </Hcard>
    )
}

export default FoodItem