import React, { useState, useEffect } from 'react'
import styles from './Trackorder.module.css';
import axios from 'axios';
import TrackItem from '../components/TrackItem';
// import { Heading } from '@chakra-ui/react'
import { Box,Text } from "@chakra-ui/react"

const Trackorder = () => {
    const [user, setUser] = useState('');
    const [orderItem, setOrder] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:4000/user',
                { withCredentials: true }).then((res) => {
                    setUser(res.data);
                });
        } catch (error) {
            alert("Please login first ❌");
        }

        try {
            const JSONUserData = {
                "user": [
                    {
                        id: user.id,
                    },
                ]
            }
            axios.post('http://localhost:4000/orders',
                { JSONUserData },
                { withCredentials: true }).then((res) => {
                    setOrder(res.data);
                })
        } catch (error) {
            console.log(error);
        }

    }, [user.id]);

    // const getRest = async () => {
    //     try {
    //         const JSONUserData = {
    //             "user": [
    //                 {
    //                     id: user.id,
    //                 },
    //             ]
    //         }
    //         axios.post('http://localhost:4000/orders',
    //             { JSONUserData },
    //             { withCredentials: true }).then((res) => {
    //                 setOrder(res.data);
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };




    return (
        <Box mb='40px'>
            {orderItem.length > 0 ?  orderItem.map(d => <TrackItem data={d} key={d.id} /> ) 
            : <Text fontWeight='600' fontSize='3xl' color='tomato'>You Have No Order! 😢 </Text>}
        </Box>
    )
}

export default Trackorder;