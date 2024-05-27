import React, { useState } from 'react'
import styles from './Login.module.css';
import axios from 'axios'
import {
    Box,
    Input,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    InputGroup,
    InputRightElement, Button, Stack
} from '@chakra-ui/react'



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [showOtp, setShowOtp] = useState(false);
    const [showform, setShowform] = useState(true);
    const [otp, setOtp] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePassChange = (e) => setPassword(e.target.value);
    const otpHandler = (e) => setOtp(e.target.value);



    //handling form
    const formHandler = () => {
        console.log(email + " " + password);
        if (email !== "" && password !== "") {
            const JSONUserData = {
                "users": [
                    {
                        email,
                        password,
                    },
                ]
            }
            axios.post('http://localhost:4000/admin',
                { JSONUserData },
                { withCredentials: true }).then((res) => {
                    if (res.status === 200 && res.data === 'success') {
                        // alert(`✅ Check your email for OTP ${res.data}` )
                        alert(`✅ Check your email for OTP`)
                        setShowform(false);
                        setShowOtp(true);
                    }
                }).catch((err) => {
                    alert("Wrong Password...❌");
                    setShowOtp(false)
                })
        } else {
            alert("Fill all fields ❌");
            setShowOtp(false)
        }
    };



    const otpCheckHandler = () => {
        console.log("OTP is runi" + otp + email);

        if (email !== "" && otp !== "") {
            const JSONUserData = {
                "users": [
                    {
                        email,
                        otp,
                    },
                ]
            }
            axios.post('http://localhost:4000/checkAdmin',
                { JSONUserData },
                { withCredentials: true }).then((res) => {
                    if (res.status === 200 && res.data === 'validOtp') {
                        window.location = '/dashboard'
                    }
                }).catch((err) => {
                    alert("Wrong OTP...❌");
                    setShowform(false);
                })
        } else {
            alert("Fill all fields ❌");
            setShowform(false);
        }
    }









    const isError = email === ''
    const isPrror = password === ''
    return (
        <>
            {showform &&
                <div>
                    <Text fontWeight='500' fontSize='2rem' textAlign='center' mt='10px'>Welcom to Admin Page</Text>
                    <div className={styles.wrapper}>
                        <Box boxShadow='1px 3px 10px 1px rgba(0, 0, 0, 0.3)' w='50%' border='1px' padding='60px' bg='#f03232' borderRadius='lg'>
                            <FormControl isRequired>
                                <Stack direction='column' spacing={4} align='center'>
                                    <div>
                                        <FormLabel color='white'>Email</FormLabel>
                                        <Input bg='white' value={email} w='300px' h='45px' type='email' placeholder='admin@gmail.com' onChange={handleEmailChange} />
                                        {!isError &&
                                            <FormErrorMessage>Email is required.</FormErrorMessage>
                                        }
                                    </div>

                                    <div>
                                        <FormLabel color='white'>Password</FormLabel>
                                        <InputGroup size='lg'>
                                            <Input
                                                bg='white'
                                                pr='4.5rem'
                                                type={show ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                onChange={handlePassChange}
                                                value={password}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                        {!isPrror &&
                                            <FormErrorMessage>Password is required.</FormErrorMessage>
                                        }
                                    </div>

                                    <Button type='submit' w='250px' colorScheme='messenger' onClick={formHandler} variant='solid'>
                                        Sign In
                                    </Button>

                                </Stack>
                            </FormControl>
                        </Box>
                    </div>
                </div>}


            {showOtp &&
                <div className={styles.wrapper}>
                    <Box boxShadow='1px 3px 10px 1px rgba(0, 0, 0, 0.3)' w='50%' h='300px' border='1px' padding='60px' bg='#F4F5FA' borderRadius='lg'>
                        <Text color='#333' align='center' fontSize='1.5rem'>Two steps authentication 🔐</Text>
                        <FormControl mt='40px'>
                            <FormLabel color='#333'>Your verification code</FormLabel>
                            <Input value={otp} onChange={otpHandler} type='number' width='sm' border='1px' borderColor='blue' />
                            <Button variant='outline' mt='-5px' ml='45px' onClick={otpCheckHandler} colorScheme='blue'>Check OTP</Button>
                        </FormControl>
                    </Box>
                </div>}

        </>
    )
}

export default Login