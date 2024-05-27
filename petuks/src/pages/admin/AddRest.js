import React, { useState } from 'react'
import axios from 'axios';

import {
    Box,
    Button,
    Input,
    Stack,
    Text
} from '@chakra-ui/react'

const AddRest = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [img, setImg] = useState("");

    const nameHandler = (e) => { setName(e.target.value) }
    const addressHandler = (e) => { setAddress(e.target.value) }
    const emailHandler = (e) => { setEmail(e.target.value) }
    const phoneHandler = (e) => { setPhone(e.target.value) }
    const imgHandler = (e) => { setImg(e.target.files[0]) }






    const formHandler = async () => {
        if (name !== '' && address !== '' && email !== '' && phone !== '' && img !== '') {

            var formData = new FormData();
            formData.append("name", name);
            formData.append("address", address)
            formData.append("email", email)
            formData.append("phone", phone)
            formData.append("photo", img);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            // console.log(name, address, email, phone, img);

            const res = await axios.post("http://localhost:4000/addRest", formData, config);

            if (res.status === 201 && res.data === "Success") {
                alert("✅ Restaurent added Successfully!!")
                window.location = '/dashboard'
            } else {
                alert("❌ Failed to add Restaurent");
            }





        } else {
            alert("Please fill all fields ❌");
        }
    }



    return (
        <div>
            <Text w='100%' bg='#f03232' p='10px' fontSize='1.3rem' fontWeight='600' color='#fff' h='50px'>ADD Restaurants</Text>
            <Box w='500px' m='auto' mt='50px'>
                <Stack spacing='5'>
                    <Input type='text' placeholder='Name' onChange={nameHandler} value={name} border='1px' borderColor='blue' />
                    <Input type='text' placeholder='Address' onChange={addressHandler} value={address} border='1px' borderColor='blue' />
                    <Input type='email' placeholder='Email' onChange={emailHandler} value={email} border='1px' borderColor='blue' />
                    <Input type='Number' placeholder='Phone' onChange={phoneHandler} value={phone} border='1px' borderColor='blue' />
                    <Input type='file' name='img' placeholder='Image' onChange={imgHandler} border='1px' />
                    <Button type='submit' color='#333' border='1px' borderColor='green' onClick={formHandler}>ADD Restaurants</Button>
                </Stack>
            </Box>
        </div>
    )
}

export default AddRest;