import React, { useState } from 'react'
import styles from './Top.module.css';
import { Link } from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    Box,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure, Button, Text
} from '@chakra-ui/react'





const Top = () => {
    const [click, setClick] = useState(false);
    const avatarClickHandler = () => {
        setClick(!click);
    }

    const logoutHandler = () => {

    }



    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()








    return (
        <div className={styles.top} >
            <div className={styles.lefttop}>
                <img src="./img/logo.png" alt="" />
                <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    Dashboard
                </Button>
            </div>

            <div>
                <div onClick={avatarClickHandler} className={styles.avatar}>
                    <img src='./img/fb.jpg' alt="" />
                    {click && <div className={styles.tooltip}>
                        <div className={styles.bottom}>
                            <h2 className={styles.name}>Fajlay Rabbi</h2>
                            <div className={styles.logoutBtn} onClick={logoutHandler}>
                                <p>Logout</p>
                            </div>
                            <i></i>
                        </div>
                    </div>}
                </div>
            </div>





            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Welcome to admin panel</DrawerHeader>

                    <DrawerBody>
                        <Box bg='#f03232' mb='25px' cursor='pointer' fontWeight='600' borderRadius='5px' color='#fff' padding='10px' ><Link to='/addRest'><Text color='white'>ADD Restaurants</Text></Link></Box>
                        <Box bg='#f03232' mb='25px' cursor='pointer' fontWeight='600' borderRadius='5px' color='#fff' padding='10px' >REMOVE User</Box>
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>





        </div>
    )
}

export default Top