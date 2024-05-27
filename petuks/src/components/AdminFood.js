import React from 'react'
import styles from './AdminFood.module.css';
import Hcard from '../UI/Hcard';

import {
    Box,
    Button,
 
} from '@chakra-ui/react'

const AdminFood = (props) => {
    const { id, name, price, category, img } = props.data;
    return (
        <div>
            <Hcard className={styles.fcard}>
                <div className={styles.fimg}>
                    <img src={`http://localhost:4000/upload/${img}`} alt="" />
                </div>
                <div className={styles.fWrapper}>
                    <p>{name}</p>
                    <p>{category}</p>
                    <div className={styles.fde}>
                        <p>from Tk <span>{price}</span></p>
                        <Button bg='tomato' mt='-10px' _hover color='white'>Delete Item</Button>
                    </div>
                </div>
            </Hcard>

        </div>
    )
}

export default AdminFood