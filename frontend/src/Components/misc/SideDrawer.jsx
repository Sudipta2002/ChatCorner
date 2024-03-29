import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import React,{useState } from 'react'
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import UserListItem from '../UserAvatar/UserListItem'
import { getSender } from '../config/chatLogics'
import NotificationBadge from 'react-notification-badge'
import { Effect } from 'react-notification-badge'
var socket,selectedChatCompare;

const SideDrawer = () => {
  const navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user,selectedChat,setSelectedChat,chats,setChats,notification, setNotification}=ChatState();
    const toast= useToast();
    const logoutHandler=()=>{
      localStorage.removeItem("userInfo");
      navigate("/");
    };
    const handleSearch=async ()=>{
        if(!search){
          toast({
            title: 'Please Enter namae or email',
            status: 'warning',
            duration: 1000,
            isClosable: true,
            position:"top-left",
          }); 
          return; 
        }
        try {
          setLoading(true);
          const config={
            headers:{
              Authorization:`Bearer ${user.token}`,
            },
          };
          const {data}= await axios.get(`/api/user?search=${search}`,config);
          setLoading(false);
          setSearchResult(data);
        } catch (error) {
          toast({
            title: 'Error occured',
            status: 'error',
            duration: 1000,
            isClosable: true,
            position:"bottom-left",
          }); 
          return; 
        }
    }
    const accessChat= async (userId)=>{
      
        try {
          setLoadingChat(true);
          const config={
            headers:{
              "Content-type": "application/json",
              Authorization:`Bearer ${user.token}`,
            }
          };
          const {data}= await axios.post("/api/chat",{userId},config);

          if(!chats.find((c)=> c._id===data._id)){
            
            setChats([data,...chats])
          };

          setSelectedChat(data);
          setLoadingChat(false);
          onClose();
        } catch (error) {
          toast({
            title: 'Error occured while fetching the chat',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position:"bottom-left",
          }); 
           
        }
    }
    
  return (
    <>
        <Box
        d="flex"
        justifyContent={'space-between'}
        alignItems="center"
        bg="gray.800"
        w="100%"
        // h="91.5vh"
        padding='5px 10px 5px 10px'
        borderWidth={"5px"}
        >
            <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                <Button variant="ghost"bg="whitesmoke" onClick={onOpen}>
                <i className="fa-solid fa-magnifying-glass" color="white"></i>
                <Text d={{base:"none",md:"flex"}} fontSize="2xl" px="4"fontFamily="Permanent Marker" color={"gray.800"}> Search User</Text>
                </Button>
            </Tooltip>
            <Text fontSize={{base:"20px",md:"25px"}}color="white"fontFamily="Permanent Marker">CHAT-SHALA</Text>
            <div>
              <Menu>
                
                <MenuList pl={2}>
                  {!notification.length && "No New Messages"}
                  {notification.map(notif=>(
                    // {selectedChatCompare:notif.id},
                    <MenuItem key={notif._id} onClick={()=>{
                      setSelectedChat(notif.chat);
                      setNotification(notification.filter((n)=> n!==notif));
                    }} >
                        {notif.chat.isGroupChat?`New Message in ${notif.chat.chatName}`:`New Message from ${getSender(user,notif.chat.users)}`}
                    </MenuItem>
                  ))}
                </MenuList>
                
                  {/* {notification.filter((n)=> n[0][0]!==selectedChat._id)} */}
                <MenuButton p={1}>
                 
                 
                  <NotificationBadge 
                    count={notification.length}effect={Effect.SCALE}/> 
                    {/* )} */}
                  
                  <BellIcon color={"white"} fontSize={"2xl"}m={1}/>
                </MenuButton>
              </Menu>
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                    <Avatar size="sm" cursor={"pointer"} name={user.name} src={user.pic}/>
                </MenuButton>
                <MenuList>
                <ProfileModal user={user}>
                  <MenuItem bg="gray.100"fontFamily="Permanent Marker">My Profile</MenuItem>
                </ProfileModal>
                  <MenuDivider/>
                  <MenuItem bg="gray.100"fontFamily="Permanent Marker" onClick={logoutHandler}>LogOut</MenuItem>
                </MenuList>
              </Menu>
            </div>
        </Box>
        <Drawer placement='left'bg="gray.100" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerCloseButton /> */}
              <DrawerHeader bg="gray.700" color={"white"} fontFamily="Permanent Marker"fontSize={"2xl"} borderBottomWidth={"1px"}>Search Users</DrawerHeader>

              <DrawerBody>
                <Box d="flex" pb={2}>
                  <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e)=>setSearch(e.target.value)}/>
                  <Button onClick={handleSearch}  fontFamily="Permanent Marker">Go</Button>
                </Box>
                {loading ? <ChatLoading/>:
                (
                  searchResult?.map((user)=>(
                    
                    <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>
                  ))
                )}
                {loadingChat && <Spinner ml="auto" d="flex"/>}
              </DrawerBody>
            </DrawerContent>              
        </Drawer>
    </>
  );
}

export default SideDrawer