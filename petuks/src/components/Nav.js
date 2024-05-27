import React, { useState, useEffect } from 'react'
import styles from './Nav.module.css';
import axios from 'axios';


import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../store/UserSlice';


import { Link } from "react-router-dom";

const Nav = (props) => {
    const dispatch = useDispatch();

    const [click, setClick] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [userValid, setuserValid] = useState(false);






    useEffect(() => {
        try {
            axios.get('http://localhost:4000/user',
                { withCredentials: true }).then((res) => {
                    setUserInfo(res.data);
                    setuserValid(true);
                });
        } catch (error) {
            setuserValid(false);
            alert("can't set user info");
        }

    }, []);


    const logoutHandler = () => {
        axios.get('http://localhost:4000/logout',
            { withCredentials: true }).then((res) => {
                console.log("I am running: ");

                setUserInfo([]);
                setuserValid(false);
            });
        window.location.reload();
    }




    // const saveUserInfo = async () => {
    //     dispatch(userActions.addUser({
    //         "id": userInfo.id,
    //         "firstName": userInfo.firstName,
    //         "lastName": userInfo.lastName,
    //         "email": userInfo.email,
    //         "img:": userInfo.img
    //     }));
    // }
    // saveUserInfo();

    // const userIn = useSelector((state) => state.user.user);

    // console.log(userIn);











    const userName = userInfo.firstName + ' ' + userInfo.lastName;
    const Image = userInfo.img;
    const Id = userInfo.id;

    

    const avatarClickHandler = () => {
        setClick(!click);
    }
    const cartClickHandler = () => {
        props.crossHandler();
    }
    const cartQuantity = useSelector((state) => state.cart.totalQuantity);



    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <img src="./img/logof.png" alt="petuk" />
            </div>
            <div className={styles.menu}>
                <ul>
                    <li className={styles.active}>
                        <Link to='/'><p>Find Food</p></Link>
                    </li>
                    <li>
                        <Link to='/trackorder' state={{ data: Id }}><p>Track Order</p></Link>
                    </li>
                    <li>
                        <Link to='/about'><p>About us</p></Link>
                    </li>
                </ul>
            </div>

            {userValid ?
                <div onClick={avatarClickHandler} className={styles.avatar}>
                    {/* <img src={myimg > 0 ? myimg : ""} alt="" /> */}
                    <img src={Image} alt="" />
                    {/* <img src='./img/avatar.png' alt="" /> */}
                    {click && <div className={styles.tooltip}>
                        <div className={styles.bottom}>
                            <h3>{userName}</h3>
                            <div className={styles.logoutBtn} onClick={logoutHandler}>
                                <p>Logout</p>
                            </div>
                            <i></i>
                        </div>
                    </div>}
                </div>
                :
                <div className={styles.sign}>
                    <Link to='/signIn'>Sign In</Link>
                </div>}


            <div className={styles.cart} onClick={cartClickHandler}>
                <img src="./img/cart.png" alt="" />
                <span>{cartQuantity}</span>
            </div>

        </nav>
    )
}

export default Nav