import React, { useState } from 'react'
import {Button,FormControl,FormLabel,Input,InputGroup,InputRightElement,VStack } from '@chakra-ui/react'
const Signup = () => {
  const [show1,setShow1]=useState(false);
  const [show2,setShow2]=useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [confirmpassword,setConfirmpassword]=useState();
  const [pic,setPic]=useState();

  const handleClick1=()=>{
      setShow1(!show1);
  }
  const handleClick2=()=>{
      setShow2(!show2);
  }
  const postDetails=(pics)=>{

  }
  const submitHandler=()=>{

  }
  return (
  <VStack spacing='5px' color="black">
    <FormControl id='first-name' isRequired>
      <FormLabel>Name</FormLabel>
        <Input borderColor="black" color="black" placeholder='Enter your Name' onChange={(e)=>{setName(e.target.value)}}/>
    </FormControl>

    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
        <Input borderColor="black" color="black" placeholder='Enter your Email' onChange={(e)=>{setEmail(e.target.value)}}/>
    </FormControl>
    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input type={show1?"text":"password"} borderColor="black" color="black" placeholder='Enter your Password' onChange={(e)=>{setPassword(e.target.value)}}/>
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick1}>
              {show1?"Hide":"Show"}
            </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>

    <FormControl id='second-password' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input type={show2?"text":"password"} borderColor="black" color="black" placeholder='Re-enter your Password' onChange={(e)=>{setConfirmpassword(e.target.value)}}/>
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick2}>
              {show2?"Hide":"Show"}
            </Button>
        </InputRightElement>
      </InputGroup>
        {/* <Input borderColor="black" color="black" placeholder='Enter your Password' onChange={(e)=>{setConfirmpassword(e.target.value)}}/> */}
    </FormControl>
    <FormControl id='pic'>
      <FormLabel>Upload Your Pic</FormLabel>
        <Input type="file"p={1.5} accept="image/*" color="black" placeholder='Enter your Pic' onChange={(e)=>{postDetails(e.target.files[0])}}/>
    </FormControl>
    <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler}>
              Sign Up
    </Button>
  </VStack>
  )
}

export default Signup