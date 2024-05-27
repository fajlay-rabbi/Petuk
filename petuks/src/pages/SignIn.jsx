import React, { useState } from 'react';
import styles from './SignIn.module.css';
import Nav from '../components/Nav'
import { Link, redirect } from "react-router-dom";
import axios from 'axios';



function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setotp] = useState('');

  const [err, setErr] = useState(false);
  const [Emailerr, setEmailerr] = useState(false);

  const [showSendOtp, setshowSendOtp] = useState(false);
  const [showWrongOtp, setshowWrongOtp] = useState(false);
  const [showOtpFrom, setshowOtpFrom] = useState(false);
  const [showInput, setshowInput] = useState(true);

  const [showChangeInput, setshowChangeInput] = useState(false);


  const loginHandler = async (e) => {
    e.preventDefault();

    const JSONUserData = {
      "users": [
        {
          "Email": email,
          "Password": password
        },
      ]
    }

    axios.post('http://localhost:4000/sign-in',
      { JSONUserData },
      { withCredentials: true }).then((res) => {
        if (res.status === 200 && res.data === "success") {
          window.location = "/";
        }
        console.log(res.data);
      }).catch((err) => {
        if (err.response.status === 403 && err.response.data === "invalidPassword") {
          setErr(true)
        } else if (err.response.status === 404 && err.response.data === "invalidEmail") {
          setEmailerr(true);
        }
      })
  }



  const emailHandler = (e) => {
    setEmail(e.target.value);
    setEmailerr(false);
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    setErr(false)
  }

  const otpSetter = (e) => {
    setotp(e.target.value);
    setshowWrongOtp(false)
  }



  const otpHandler = (e) => {
    e.preventDefault();
    const JSONUserData = {
      "users": [
        {
          "Email": email,
        },
      ]
    }

    axios.post('http://localhost:4000/forgetemail',
      { JSONUserData },
      { withCredentials: true }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        if (err.response.status === 403 && err.response.data === "invalidPassword") {
          setErr(true)
        } else if (err.response.status === 404 && err.response.data === "invalidEmail") {
          setEmailerr(true);
        }
      })


    setshowSendOtp(false)
    setshowInput(false)
    setshowOtpFrom(true)
    setshowChangeInput(false)

  }

  const forgetPassHandler = () => {
    setshowInput(false);
    setshowOtpFrom(false);
    setshowSendOtp(true);
    setshowChangeInput(false)
  }


  const showChngInput = () => {

  };


  const otpFromHandler = (e) => {
    e.preventDefault();
    const JSONUserData = {
      "users": [
        {
          "email": email,
          "otp": otp,
        },
      ]
    }

    axios.post('http://localhost:4000/checkotp',
      { JSONUserData },
      { withCredentials: true }).then((res) => {
        if (res.status === 200 && res.data === "validOtp") {
          setshowChangeInput(true)
          setshowInput(false);
          setshowOtpFrom(false);
          setshowSendOtp(false);
        }

      }).catch((err) => {
        if (err.response.status === 404 && err.response.data === "invalidOtp") {
          setshowWrongOtp(true)
        }
      })
  }


  const passwordChangeHandler = (e) => {
    e.preventDefault();
    const JSONUserData = {
      "users": [
        {
          email,
          password,
        },
      ]
    }

    axios.post('http://localhost:4000/chngpass',
      { JSONUserData },
      { withCredentials: true }).then((res) => {
        if (res.status === 200 && res.data === "success") {
          alert("✅ Passwords Change Successfull!!")
          window.location = "/";
        }

      }).catch((err) => {
        alert("❌ Passwords Change Unsuccessfull!!")
        console.log(err);
      })
  }




  return (
    <div className={styles.wrapper}>
      <Nav />
      <div className={styles.loginContainer}>
        <div className={styles.subContainer}>

          {showSendOtp &&
            <div>
              <div className={styles.ch1otp}>
                <p className={styles.title}>Enter your email address</p>
                <div className={styles.subCh1}>

                  <form onSubmit={otpHandler}>
                    <br />
                    <input type="email" name="email" className={styles.inputEmail} required onChange={emailHandler} />
                    <br />

                    <button type="submit" className={styles.submitbtn} onClick={otpHandler}>Send OTP</button>


                    {/* <p className={styles.fpassotp} onClick={forgetPassHandler}>Send OTP to my phone number</p> */}
                  </form>
                </div>
              </div>
            </div>}


          {showInput &&
            <div>
              <div className={styles.ch1}>
                <p className={styles.title}>Sign In</p>
                <div className={styles.subCh1}>

                  <form onSubmit={loginHandler}>

                    <label htmlFor="email" className={styles.inputLabel}>Username</label><br />
                    <input type="email" placeholder='example@gmail.com...' name="email" className={styles.inputEmail} required onChange={emailHandler} />
                    <br />

                    {Emailerr && <p className={styles.err}>Account with this email dosen't exist</p>}

                    <label htmlFor="password" className={styles.inputLabel}>Password</label><br />
                    <input type="password" placeholder='*************' name="password" className={styles.inputPass} required onChange={passwordHandler} />

                    {err && <p className={styles.err}>Wrong Password!</p>}

                    <p className={styles.fpass} onClick={forgetPassHandler}>Forget Password?</p>
                    <button type="submit" className={styles.submitbtn}>Sign In</button>
                  </form>
                </div>
                <p className={styles.acc}>Don't have an account? <span><Link to='/reg' className={styles.accSignUP}>Sign up now</Link></span></p>
              </div>
            </div>}



          {showOtpFrom &&
            <div>
              <div className={styles.ch1otp}>
                <p className={styles.title}>Check your email address</p>
                <div className={styles.subCh1}>
                  <form onSubmit={otpFromHandler}>
                    <br />
                    <input type="number" name="otp" placeholder='OTP' className={styles.inputEmail} required onChange={otpSetter} />
                    {showWrongOtp && <p className={styles.err}>Wrong OTP!</p>}
                    <br />
                    <button type="submit" className={styles.submitbtn}>Check OTP</button>

                  </form>
                </div>
              </div>
            </div>
          }


          {showChangeInput &&
            <div>
              <div className={styles.ch1otp}>
                <p className={styles.title}>Set your new password</p>
                <div className={styles.subCh1}>
                  <form onSubmit={passwordChangeHandler}>
                    <br />
                    <input type="text" name="otp" placeholder='******' className={styles.inputEmail} required onChange={passwordHandler} />
                    <br />
                    <button type="submit" className={styles.submitbtn}>Change password</button>
                  </form>
                </div>
              </div>
            </div>}








          <div className={styles.ch2}>
            <img src="./img/div.png" alt="" />
          </div>


          <div className={styles.ch3}>
            <div >
              <img src="./img/pizza.png" alt="" />
              <p className={styles.ch3Txt1}>Craving Something?</p>
              <p className={styles.ch3Txt2}>Sign In & Start Ordering</p>
            </div>
            <p className={styles.acc}>Or, become our rider <span>Login /</span> <span>Sign up</span></p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default SignIn