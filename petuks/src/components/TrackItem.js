import { Text } from "@chakra-ui/react"
import { Card, CardBody, CardFooter, Image, Heading, Stack, Button, Tag, TagLabel } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const TrackItem = (props) => {

    const [item, setItem] = useState([]);


    useEffect(() => {
        try {
            const JSONUserData = {
                "user": [
                    {
                        restId: props.data.item_id,
                    },
                ]
            }
            axios.post('http://localhost:4000/findrest',
                { JSONUserData },
                { withCredentials: true }).then((res) => {
                    // console.log("item:" + JSON.stringify(res.data[0].name));
                    let data = res.data
                    // console.log(data[0].name);
                    setItem(data[0]);

                })
        } catch (error) {
            console.log(error);
        }
    }, [props.data.item_id]);



    const orderCancleHandler = () => {
        const JSONUserData = {
            "user": [
                {
                    orderId: props.data.id,
                },
            ]
        }

        axios.post('http://localhost:4000/dltOrder',
            { JSONUserData },
            { withCredentials: true }).then((res) => {
                // console.log("item:" + JSON.stringify(res.data[0].name));
                
                window.location = "/"

            })
        // console.log("canceling");
    };


    return (
        <div>
            <div>
                <Card
                    boxShadow='1px 3px 10px 1px rgba(0, 0, 0, 0.3)'
                    w='60%'
                    h='250px'
                    m='auto'
                    mt='50px'
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'>

                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src='./img/myfood.png'
                        alt=''
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>{item.name}</Heading>
                            <Text py='2'>
                                {item.price} -/per
                            </Text>
                            <Text py='2'>
                                To:  {props.data.address}
                            </Text>
                            <Text fontWeight='600' color='green'>{props.data.qty}x - {props.data.tot_amount} tk</Text>
                            <Tag size='lg' mt='25px' colorScheme='red' borderRadius='lg'>
                                <TagLabel>{props.data.status}</TagLabel>
                            </Tag>
                        </CardBody>
                        <CardFooter>
                            <Button variant='solid' mt='-55px' ml='450px' colorScheme='red'>
                                <p onClick={orderCancleHandler}>Cancel order</p>
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            </div>
        </div>
    )
}

export default TrackItem