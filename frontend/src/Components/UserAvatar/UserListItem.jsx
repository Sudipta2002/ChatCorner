import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({user,handleFunction}) => {
  
  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg="gray.800"
    _hover={{
      background: "#38B2AC",
      color: "white",
    }}
    w="100%"
    d="flex"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg"
  >
    <Avatar
      mr={2}
      size="sm"
      cursor="pointer"
      name={user.name}
      src={user.pic}
    />
    <Box>
      <Text color={"white"} fontFamily={"Permanent Marker"}>{user.name}</Text>
      <Text color={"white"} fontFamily={"Permanent Marker"} fontSize="xs">
        <b>Email : </b>
        {user.email}
      </Text>
    </Box>
  </Box>
  )
}

export default UserListItem