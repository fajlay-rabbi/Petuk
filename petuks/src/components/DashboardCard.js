import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Box,
    Button,
    Stack,
    Text,
    Card,
    Image,
    CardBody,
    Heading,
    CardFooter
} from '@chakra-ui/react'


const DashboardCard = (props) => {

    const {id, name, address, img} = props.data

    const deleteRestHandler = () => {

        const JSONUserData = {
            "users": [
                {
                    "id" : id
                },
            ]
        }

        axios.delete('http://localhost:4000/deleteRest',
            { JSONUserData },
            { withCredentials: true }).then((res) => {
                if (res.status === 200 && res.data === "success") {
                    alert("DELETE Done ❌");
                }
                console.log(res.data);
            }).catch((err) => {
                
            })
    }





  return (
      <Box mb='30px' border='1px' borderColor='#999' borderRadius='5px' boxShadow='1px 3px 10px 1px rgba(0, 0, 0, 0.3)'>
          <Card
               w='550px'
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'>
              <Image
                  objectFit='cover'
                  maxW={{ base: '100%', sm: '200px' }}
                  src={`http://localhost:4000/upload/${img}`}
                  alt=''
              />

              <Stack>
                  <CardBody>
                      <Heading size='md'>{name}</Heading>

                      <Text py='2'>
                          {address}
                      </Text>
                  </CardBody>

                  <CardFooter>
                      <Button variant='solid'  colorScheme='green' >
                          <Link to='/addItem' state={{ data: id }}><Text color='white'>ADD Item</Text></Link>
                      </Button>
                      <Button variant='solid' ml='20px' onClick={deleteRestHandler} colorScheme='red'>
                          DELETE Restaurant
                      </Button>
                  </CardFooter>
              </Stack>
          </Card>
    </Box>
  )
}

export default DashboardCard;