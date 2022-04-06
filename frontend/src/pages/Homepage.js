import React, { useEffect, useState } from 'react'
import {Container,Box,Text} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
 
    const navigate = useNavigate();

    useEffect(() => {
     const user=JSON.parse(localStorage.getItem("userInfo"));
     
     if(user){
        navigate('/chats');
     }
    }, [navigate])
  return (
    <Container maxW='xl' centerContent>
      <Box 
        d="flex" 
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0" 
        borderRadius="lg" 
        borderWidth="1px"
       >
        <Text fontSize={'5xl'} fontFamily="Work sans" color="black">CHAT-SHALA</Text>
      </Box>
      <Box
        bg={"white"}
        w="100%" 
        borderRadius="lg" 
        borderWidth="1px"
        p={4}
        color="black"
      >
        <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">SignUP</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default Homepage