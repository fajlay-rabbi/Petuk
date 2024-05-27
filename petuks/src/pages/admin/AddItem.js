import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import AdminFood from '../../components/AdminFood';


import {
    Box,
    Button,
    Stack,
    Text,
    Card,
    Image,
    CardBody,
    Heading,
    CardFooter,
    Input
} from '@chakra-ui/react'

const AddItem = () => {
    const [click, setClick] = useState(false);
    const showFormHandler = () => { setClick(!click); }

    const [item, setItem] = useState([]);


    const location = useLocation()
    const { data } = location.state

    const Id = data;


    const [name, setName] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [img, setImg] = useState("");



    const nameHandler = (e) => { setName(e.target.value) }
    const priceHandler = (e) => { setprice(e.target.value) }
    const descriptionHandler = (e) => { setdescription(e.target.value) }
    const categoryHandler = (e) => { setcategory(e.target.value) }
    const imgHandler = (e) => { setImg(e.target.files[0]) }


    const addItemHandler = async () => {
        if (name !== '' && price !== '' && description !== '' && category !== '' && img !== '') {
            var formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("category", category)
            formData.append("photo", img);
            formData.append("rest_id", data);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const res = await axios.post("http://localhost:4000/addItem", formData, config);
            if (res.status === 201 && res.data === "Success") {
                alert("✅ Item added Successfully!!")
                window.location = "/addItem";
            } else {
                alert("❌ Failed to add Restaurent");
            }
        } else {
            alert("Please fill the all input fields ⚠");
        }
    };


    useEffect(() => {
        axios.get('http://localhost:4000/item',
            { withCredentials: true }).then((res) => {
                setItem(res.data[0]);
            });
    }, []);



    return (
        <>
        <Box>
            <Button mt='30px' ml='60px' variant='solid' onClick={showFormHandler} colorScheme='red'>
                +Add item
            </Button>
            {click &&
                <Box w='600px' m='auto'>
                    <Input type='text' border='1px' onChange={nameHandler} value={name} borderColor='blue' m='5px' h='55px' placeholder='Item name' />
                    <Input type='number' border='1px' onChange={priceHandler} value={price} borderColor='blue' m='5px' h='55px' placeholder='Item price' />
                    <Input type='text' border='1px' m='5px' onChange={descriptionHandler} value={description} h='55px' borderColor='blue' placeholder='Item description' />
                    <Text ml='15px' mt='20px' color='red' fontWeight='600'> Dishes* Fast Food* Dessert* Chinese* Thai*</Text>
                    <Input type='text' border='1px' m='5px' onChange={categoryHandler} borderColor='blue' value={category} h='55px' placeholder='Item category' />
                    <Input type='file' onChange={imgHandler} m='5px' h='55px' placeholder='Item Image' />
                    <Button variant='solid' onClick={addItemHandler} mt='40px' colorScheme='green'>
                        Add to restaurant
                    </Button>
                </Box>
            }
        </Box>

        <Box display='flex' justifyContent='center'>
                {item.filter((d) => {
                    return (d.rest_id === Id);
                }).map((d) => {
                    return (
                        <AdminFood data={d} key={d.id} />
                    )
                })}
        </Box>

        </>

        )
    }

export default AddItem;