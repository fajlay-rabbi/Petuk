import React, { useState } from 'react'
import styles from "./Rest.module.css"
import RestItem from '../components/RestItem';
import Nav from '../components/Nav';
import Cart from '../components/Cart';

import { useLocation } from 'react-router-dom'






const Rest = (props) => {

    const location = useLocation()
    const { data } = location.state

    const [cartClick, setCartClick] = useState(false);
    const cartClickHandler = () => {
        setCartClick(!cartClick);
    }

    return (
        <>
            <div className={styles.nav}>
                <Nav crossHandler={cartClickHandler} />

            </div>

            <div className={styles.restwrapper}>

                {cartClick &&
                    <div>
                        <div className={styles.backdrop} onClick={cartClickHandler}></div>
                        <div className={styles.modal}>
                            <Cart crossHandler={cartClickHandler} />
                        </div>
                    </div>}

                <div className={styles.cover}>
                    <img src="./img/restcover.png" alt="" />
                </div>

                <div className={styles.title}>
                    <p>{data[0].name}</p>
                </div>
                <div className={styles.address}>
                    <p>{data[0].address}</p>
                    <div className={styles.copon}>
                        <p>Coupon   <span> KACCHI100</span></p>
                    </div>
                </div>

                <div className={styles.pop}>
                    <p>Popular Items</p>
                </div>

                <div className={styles.showItem}>

                    {data[1].filter((d) => {
                        return (
                            d.rest_id === data[0].id
                    )}).map((d) => {
                        return (
                            <RestItem data={d} key={d.id}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Rest