import React, { useState } from 'react'
import {Button,FormControl,FormLabel,Input,InputGroup,InputRightElement,VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [show1,setShow1]=useState(false);
  const [show2,setShow2]=useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [confirmpassword,setConfirmpassword]=useState();
  const [pic,setPic]=useState();
  const[loading,setLoading]=useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick1=()=>{
      setShow1(!show1);
  }
  const handleClick2=()=>{
      setShow2(!show2);
  }
  const postDetails=(pics)=>{
    //https://api.cloudinary.com/v1_1/leetcode/    base api
    setLoading(true);
    if(pics===undefined){
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });  
      return;  
    }
    if(pics.type==="image/jpeg" || pics.type==="image/png"){
      const data= new FormData();
      data.append("file",pics);
      data.append("upload_preset","chat-shala");

      data.append("cloud_name","leetcode");
      fetch("https://api.cloudinary.com/v1_1/leetcode/image/upload",{
        method:'post',
        body: data,
      }).then((res)=>res.json())
      .then((data)=>{
        // console.log(data);
        setPic(data.url.toString());
        setLoading(false);
      }).catch((err)=>{
        console.log(err);setLoading(false);
      });
    }else{
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });  
      setLoading(false);
      return;
    }
  }
  const submitHandler=async()=>{
    setLoading(true);
    if(!name || !email || !password || !confirmpassword){
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });  
      setLoading(false);
      return;
    }
    if(password!==confirmpassword){
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });  
      setLoading(false);
      return;
    }

    try {
      const config={
        headers:{
          "Content-type":"application/json",
        },
      };
      const {data}= await axios.post("/api/user",{name,email,password},
      config);
      toast({
        title: 'Registration Successfull',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });  
      localStorage.setItem('userInfo',JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error occured',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });  
      setLoading(false);
    }
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
    <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler}isLoading={loading}>
              Sign Up
    </Button>
  </VStack>
  )
}

export default Signup