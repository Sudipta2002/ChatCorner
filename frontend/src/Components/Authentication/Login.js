import React, { useState } from 'react'
import { Button,FormControl,FormLabel,Input,InputGroup,InputRightElement,VStack } from '@chakra-ui/react'

const Login = () => {
  const [show1,setShow1]=useState(false);
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  
  const handleClick1=()=>{
      setShow1(!show1);
  }
  const submitHandler=()=>{

  }
  return (
    <VStack spacing='5px' color="black">
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
    <Button colorScheme={"blue"} width="100%" style={{marginTop:15}} onClick={submitHandler}>
              Login     </Button>
    <Button colorScheme={"red"} width="100%" style={{marginTop:15}} onClick={()=>{ setEmail("guest@example.com"); setPassword("123456789")}}>
              Login as a Guest User
    </Button>
  </VStack>
  )
}
export default Login