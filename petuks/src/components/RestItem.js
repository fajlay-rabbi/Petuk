import React from 'react'
import styles from './RestItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';



const RestItem = (props) => {

    const { id, name, price, category, img } = props.data;
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(cartActions.addItemToCart({
            id,
            name,
            price,
            category,
            img
        }));
    }



    return (
        <div>
            <div className={styles.restItem}>
                <div className={styles.itemImg}>
                
                    <img src="./img/food.png" alt="" /> 
                </div>
                <div className={styles.itemName}>
                    <p>{props.data.name}</p>
                    <p>{props.data.description}</p>
                    <p>from TK <span>{props.data.price}</span></p>
                </div>
                <div className={styles.itemBtn}>
                    <div onClick={addToCartHandler}>+</div>
                </div>
            </div>
        </div>
    )
}

export default RestItem