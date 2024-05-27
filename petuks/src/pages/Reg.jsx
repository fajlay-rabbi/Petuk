import React, { useState } from 'react'
import styles from './Reg.module.css';
import Card from '../UI/BigCard';
import Nav from '../components/Nav';
import Error from '../UI/Error';
import { convertBase64 } from '../util/ConverBase64';
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import axios from 'axios';

const initialValues = {
    fname: "",
    lname: "",
    email: "",
    password: ""
};




function Reg() {


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: signUpSchema,
            onSubmit: (values, action) => {
                // console.log(values);
                action.resetForm();
                regHandler(values);
            },
        });



    // const [fname, setFname] = useState('');
    // const [lname, setLname] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');



    const [image, setImg] = useState('');
    const [erro, setErr] = useState(false);

    const imgHandler = async (e) => {
        const Userimg = e.target.files[0];
        const base64Img = await convertBase64(Userimg);
        setImg(base64Img);

        console.log("base64: " + base64Img);
    };



    const regHandler = async (val) => {

        const JSONUserData = {
            "users": [
                {
                    "Fname": val.fname,
                    "Lname": val.lname,
                    "Email": val.email,
                    "Password": val.password,
                    "Img": image
                },
            ]
        }



        try {
            axios.post('http://localhost:4000/sign-up',
                { JSONUserData },
                { withCredentials: true }).then((res) => {
                    if (res.status === 200 && res.data === 'created') {
                        window.location.assign("/");
                    }
                    if (res.data === 'exists') {
                        alert("Email already exists ⚠");
                    }
                })
        } catch (error) {
            setErr(true)
        }


    }



    // const fnameHandler = (e) => {
    //     setFname(e.target.value)
    // };
    // const lnameHandler = (e) => {
    //     setLname(e.target.value)
    // };
    // const emailHandler = (e) => {
    //     setEmail(e.target.value)
    // };
    // const passwordHandler = (e) => {
    //     setPassword(e.target.value)
    // };


    return (
        <>
            <div className={styles.wrapper}>
                <Nav />
                <Card>
                    <p className={styles.title}>Create your account</p>
                    <div className={styles.subContainer}>
                        <div className={styles.ch1}>
                            <div className={styles.subCh1}>
                                <form onSubmit={handleSubmit}>
                                    <label className={styles.inputLabel} htmlFor="fname">First name</label><br />


                                    {errors.fname && touched.fname ? (
                                        <Error err={errors.fname} />
                                    ) : null}

                                    <input type="text" className={styles.inputEmail} name="fname"
                                        value={values.fname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="fname" />


                                    <br />

                                    <label className={styles.inputLabel} htmlFor="lname">Last name</label><br />

                                    {errors.lname && touched.lname ? (
                                        <Error err={errors.lname} />
                                    ) : null}

                                    <input type="text" className={styles.inputEmail} name="lname"
                                        value={values.lname}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="lname" />
                                    <br />

                                    <label className={styles.inputLabel} htmlFor="email">Email</label><br />

                                    {errors.email && touched.email ? (
                                        <Error err={errors.email} />
                                    ) : null}

                                    <input type="email" className={styles.inputEmail} placeholder='example@gmail.com...' name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="email" />

                                    <br />


                                    <label className={styles.inputLabel} htmlFor="password">Password</label><br />

                                    {errors.password && touched.password ? (
                                        <Error err={errors.password} />
                                    ) : null}

                                    <input type="password" className={styles.inputEmail} placeholder='*************' name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        id="password" />
                                    <br />

                                    <label className={styles.inputLabel} htmlFor="img">Upload Your image</label><br />
                                    <input type="file" name='img'
                                        onChange={imgHandler}
                                        accept="image/png, image/jpeg" />
                                    <br />

                                    <button type="submit" className={styles.submitbtn}>Sign up</button>
                                </form>
                            </div>
                        </div>


                        <div className={styles.ch2}>
                            <div >
                                <img src="./img/sup.png" alt="" />
                                <p className={styles.ch3Txt1}>Restaurants in your pocket</p>
                                <p className={styles.ch3Txt2}>Order from your favorite restaurants & <br /> track on the go</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default Reg