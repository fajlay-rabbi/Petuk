import React, { useState,useEffect } from 'react'
import styles from './Dashboard.module.css'
import Top from './Top'
import DashboardCard from '../../components/DashboardCard'
import axios from 'axios'


import {
    Box,
    Button,
    Stack,
    HStack,
    Text,
    Card,
    Image
} from '@chakra-ui/react'



const Dashboard = () => {
    const [res, setRes] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:4000/dashboardRest',
            { withCredentials: true }).then((res) => {
                setRes(res.data[0]);
            });
    },[]);


        // console.log(res);


    return (
        <div>
            <Top />
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Box m='20px' w='100%' display='flex' flexWrap='wrap' justifyContent='space-evenly' >
                    {res.map((d) => <DashboardCard data={d} key={d.id}/>)}
                </Box>
            </Box>
        </div>
    )
}

export default Dashboard