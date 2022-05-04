import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import SideDrawer from '../Components/misc/SideDrawer';
import {ChatState} from '../Context/ChatProvider'
import ChatBox from '../Components/misc/ChatBox';
import MyChats from '../Components/misc/MyChats';


const Chatpage = () => {
    
  const {user}=ChatState();
  const [fetchAgain, setFetchAgain]= useState(false);
  return (
    <div style={{width:"100%"}}>
      {user&&<SideDrawer/>}
      <Box
      d="flex"
      justifyContent={'space-between'}
      w="100%"
      h="91.5vh"
      padding='10px'
      >
        {user&&<MyChats fetchAgain={fetchAgain} />} 
        {user&&<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>  
  )
}

export default Chatpage