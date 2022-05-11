import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    Image,
    Text,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
// import { ChatState } from '../../Context/ChatProvider';
const ProfileModal = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const {user}=ChatState();
  return (
    <>
      
         {children?(<span onClick={onOpen}>{children}</span>):(
              <IconButton d={{base:"flex"}}icon={<ViewIcon/>} onClick={onOpen}/>
          )}
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

        <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.700"}>
            <ModalHeader fontSize={"40px"} color={"#ffc107"}fontFamily="Permanent Marker"d="flex"justifyContent={"center"}>{user.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody d="flex" flexDir={"column"} alignItems="center" justifyContent={"space-between"}>
                <Image borderRadius={"full"} boxSize="150px" src={user.pic}alt={user.name}/>
                <Text fontSize={{base:"28px",md:"30px"}} color="#ffc107" fontFamily="Work sans">Email: {user.email}</Text>
            </ModalBody>

            <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
                Close
            </Button>
            
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
  )
}

export default ProfileModal