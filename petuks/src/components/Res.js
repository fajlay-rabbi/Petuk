import React from 'react'
import styles from './Res.module.css';
import Hcard from '../UI/Hcard';
import { Link } from "react-router-dom";

const Res = (props) => {

    console.log(props.data[0].img);


    return (
        <Hcard className={styles.fcard}>
            <div className={styles.fimg}>
                <img src={`http://localhost:4000/upload/${props.data[0].img}`} alt="" />
            </div>
            <div className={styles.fWrapper}>
                <Link to='/rest' state = {{ data:  props.data }}><p className={styles.resName}>{props.data[0].name}</p></Link>
                <p>{props.data[0].address}</p>
                <div className={styles.fde}>
                    <img src="./img/star.png" alt="" />
                    <p><span>0/5</span> (0000)</p>
                </div>
            </div>
        </Hcard>
    )
}

export default Res