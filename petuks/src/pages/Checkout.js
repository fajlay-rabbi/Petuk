import React, { useState } from 'react'
import styles from './Checkout.module.css';
import CheckoutCard from '../components/CheckoutCard';
import CheckoutItem from '../components/CheckoutItem';
import axios from 'axios';


import { useSelector } from 'react-redux';


const Checkout = () => {
    const [payment, setPayment] = useState('');
    const [fullAdd, setfullAdd] = useState('');
    const [road, setroad] = useState('');
    const [house, sethouse] = useState('');
    const [phone, setphone] = useState('');



    const [showOtp, setshowOtp] = useState(false);
    const [showBkash, setshowBkash] = useState(false);
    const [showSuccess, setshowSuccess] = useState(false);

    const [otpcode, setotpcode] = useState('');
    const [otpError, setotpError] = useState(false);


    const cartItem = useSelector((state) => state.cart.items);
    const totalPrice = useSelector((state) => state.cart.totalPrice);




    const otpClickHandler = () => {

        axios.post('http://localhost:4000/bkashOTP',
            { withCredentials: true }).then((res) => {
                console.log(res.data);
                window.localStorage.setItem("bkash", res.data.OTP);
            });

        setshowOtp(true)
        setshowBkash(false)
    };



    const successHandler = () => {
        const otp = window.localStorage.getItem("bkash");

        if (otp === otpcode) {
            setshowSuccess(true);
            setshowOtp(false)
        } else {
            setotpError(true);
        }
    };




    const placeOrderHandler = async () => {
        const JSONUserData = {
            "order": [
                {
                    "totalAmount": totalPrice,
                    "status": "Processing",
                    "qty": cartItem[0].quantity,
                    "address": fullAdd + " " + road + " " + house,
                    "phone": phone,
                    "payment": payment,
                    "item_id": cartItem[0].id,
                },
            ]
        }

        try {
            axios.post('http://localhost:4000/placeorder',
                { JSONUserData },
                { withCredentials: true }).then((res) => {
                    window.location = '/';
                })
        } catch (error) {
            console.log(error);
        }

        // console.log(JSON.stringify(JSONUserData.users[0].Fname));
    }




    const paymentHandlerBkash = (e) => {
        setPayment("bkash")
        setshowBkash(true)
        setshowOtp(false)
        setshowSuccess(false)
    }

    const paymentHandlerCash = (e) => {
        setPayment("cash on delivery")
        setshowOtp(false)
        setshowBkash(false)
        setshowSuccess(false)
    }


    return (
        <div className={styles.mainBody}>
            <CheckoutCard data={[{ id: 1, name: "Order Details" }]}>
                <div className={styles.ItemWrapper}>



                    {cartItem.map((item) => (
                        <CheckoutItem key={item.id} item={{
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            category: item.category,
                            img: item.img,
                            quantity: item.quantity,
                            rest_id: item.rest_id,
                        }}
                        />
                    ))}


                </div>
                <hr />
                <div className={styles.price}>
                    <p>Total (Incl. VAT)</p>
                    <p>TK {totalPrice}</p>
                </div>
            </CheckoutCard>

            <CheckoutCard data={[{ id: 2, name: "Personal Details" }]}>
                <div className={styles.address}>
                    <div className={styles.in}>
                        <label htmlFor="address">Full Address<span>*</span></label> <br />
                        <input type="text" onChange={(e) => { setfullAdd(e.target.value) }} required name='address' /> <br />
                        <div className={styles.subInput}>
                            <div className={styles.roadn}>
                                <label htmlFor="road">Road No</label> <br />
                                <input type="text" onChange={(e) => { setroad(e.target.value) }} name="road" id="" /><br />
                            </div>
                            <div>
                                <label htmlFor="house">House No</label> <br />
                                <input type="text" onChange={(e) => { sethouse(e.target.value) }} name='house' />
                            </div>
                        </div>
                        <label htmlFor="phone">Phone Number<span>*</span></label><br />
                        <input type="number" name="phone" onChange={(e) => { setphone(e.target.value) }} required id="" />
                    </div>
                </div>
            </CheckoutCard>

            <CheckoutCard data={[{ id: 3, name: "Payment" }]}>
                <div className={styles.pay}>
                    <div className={styles.cashOn} onClick={paymentHandlerCash}>
                        <input type="radio" name='cash' id='cashon' value="cashon" />
                        <img src='./img/gn.jpg' alt='' />
                        <label htmlFor="cashon"> Cash on delivery</label> <br />
                    </div>
                    <div className={styles.bkashOn} onClick={paymentHandlerBkash}>
                        <input type="radio" name="cash" id="bkash" value="bkash" />
                        <img src='./img/bkash.png' alt='' />
                        <label htmlFor="bkash"> Bkash</label> <br />
                    </div>

                    <div >

                        {showBkash &&
                            <div className={styles.bkashInfo}>
                                <label htmlFor="phone">Bkash phone number<span>*</span></label> <br />
                                <input type="number" required name='phone' /> <br />
                                <label htmlFor="password">Password<span>*</span></label> <br />
                                <input type="password" required name='password' /> <br />

                                <div onClick={otpClickHandler}>Send verification code</div>
                            </div>}


                        {showOtp &&
                            <div className={styles.bkashInfo}>
                                <label htmlFor="otp">Check Your Phone</label> <br />
                                <input type="number" onChange={(e) => { setotpcode(e.target.value) }} placeholder='OTP' required name='otp' /> <br />
                                {otpError && <p>Wrong OTP!</p>}
                                <div onClick={successHandler}>Verify payment</div>
                            </div>
                        }

                        {showSuccess &&
                            <div className={styles.success}>
                                <img src="./img/check.jpg" alt="" />
                                <p>Your payment is successfully verified</p>
                            </div>}


                    </div>
                </div>
            </CheckoutCard>

            <div className={styles.placebtn}>
                <div className={styles.checkoutBtn} onClick={placeOrderHandler}>Place order!</div>
            </div>

            <div className={styles.term}>
                <p>I agree that placing the order places me under an obligation to make a payment in accordance with the General Terms and Conditions.</p>
            </div>


        </div>
    )
}
export default Checkout;