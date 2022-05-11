import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { getSender,getSenderFull } from './config/chatLogics';
import ProfileModal from './misc/ProfileModal';
import UpdateGroupChatModal from './misc/UpdateGroupChatModal';
import ScrollabelChats from './ScrollabelChats';
import "./styles.css"
import io from 'socket.io-client'
import Lottie from 'react-lottie';
import animationData from "../animation/typing.json";
const ENDPOINT="https://mern-chat-shala.herokuapp.com/";
var socket,selectedChatCompare;
const SingleChat = ({fetchAgian, setFetchAgain}) => {
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState();
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const {user, selectedChat,setSelectedChat,notification, setNotification}=ChatState();
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast= useToast();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchMessages= async ()=>{
      if(!selectedChat)return;
      try {
        const config={
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        }
        setLoading(true);
        const {data}= await axios.get(`/api/message/${selectedChat._id}`,config);
        setMessages(data);
        // console.log(messages);
        setLoading(false);

        socket.emit("join chat",selectedChat._id);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };
  
  
  const sendMessage=async(event)=>{
      if(event.key==="Enter" && newMessage){
        socket.emit("stop typing", selectedChat._id);
          try {
            const config={
              headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };

            setNewMessage("");
            const {data}=await axios.post('/api/message',{
              content: newMessage,
              chatId: selectedChat._id,
            },config);
            console.log(data);
            socket.emit('new message',data);
            setMessages([...messages,data])
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to send the Message",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
      }
  }
  useEffect(() => {
    socket=io(ENDPOINT);
    socket.emit("setup",user);
    socket.on("connected",()=>{
      setSocketConnected(true);
    })
    socket.on('typing',()=>setIsTyping(true));
    socket.on('stop typing',()=>setIsTyping(false));
  }, [])
  useEffect(() => {
    fetchMessages();
    selectedChatCompare=selectedChat;
  }, [selectedChat]);
  console.log(notification,'------------');
  console.log(selectedChat);
  useEffect(() => {
    socket.on("message recieved",(newMessageRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare._id!==newMessageRecieved.chat._id){
        //give notification 
        if(!notification.includes(newMessageRecieved)){
          setNotification([newMessageRecieved,...notification]);
          setFetchAgain(!fetchAgian);
        }
      }else{
        setMessages([...messages,newMessageRecieved]);
      }
    })
    
  });
  

  const typingHandler=(e)=>{
      setNewMessage(e.target.value);
      //typing logic
      if(!socketConnected) return;

      if(!typing){
        setTyping(true);
        socket.emit('typing',selectedChat._id);
      }
      //debouncing
      let lastTypingTime=new Date().getTime()
      var timerLength=3000;
      setTimeout(()=>{
        var timeNow= new Date().getTime();
        var timeDiff= timeNow-lastTypingTime;
        if(timeDiff>=timerLength && typing){
          socket.emit("stop typing",selectedChat._id);
          setTyping(false);
        }
      },timerLength)
  }
  return (
    <>{
        selectedChat ? (
        <>
            <Text 
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Permanent Marker"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />  
            {!selectedChat.isGroupChat ? (
                <>
                {getSender(user,selectedChat.users)}
                <ProfileModal user ={getSenderFull(user,selectedChat.users)}/>
                </>
            ):(
                <>{selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                    fetechAgain={fetchAgian} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}
                />
                </>
            )}
            </Text>
            <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
           {/* messages here*/}
           {loading ?(
             <Spinner
              size="xl"
              w={20}
              h={20}
              alignSelf="center"
              margin="auto"
             />
           ):(
// faHelicopterSymbol
            <div className='messages'>
              {/* messages */}
              <ScrollabelChats messages={messages}/>
            
            </div>
           )}
           <FormControl onKeyDown={sendMessage} isRequired mt={3}>
             {isTyping?<div>
              <Lottie
              options={defaultOptions}
                width={70}
                style={{marginBottom: 15, marginLeft:0}}
             />
             </div>:<></>}
            <Input
              variant="filled"
              bg="#E0E0E0"
              placeholder='Enter a message..'
              onChange={typingHandler}
              value={newMessage}
            />
           </FormControl>
            </Box>
        </>
        ):(
            <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Permanent Marker">
            Click on a user to start chatting
          </Text>
        </Box>
        )
    }</>
  )
}

export default SingleChat