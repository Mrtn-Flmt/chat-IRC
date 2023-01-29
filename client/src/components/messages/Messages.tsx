import React, { useState, useEffect } from 'react';
import Message from './Message';
import { Flex, Text } from '@mantine/core'

export default function Messages() {
  const [messages, setMessages] = useState([""]);
  var i = 0;
  const roomSelected = localStorage.getItem('roomSelected');
  if (roomSelected) {
    return (
      <>
        <Flex direction={"column"} style={{
          height:"100vh"
        }}>
          < Message self="me" />
          < Message self="you" />
          < Message self="me" />
          < Message self="you" />
          < Message self="you" />
          < Message self="me" />
          < Message self="me" />
          < Message self="me" />
          < Message self="me" />
          < Message self="me" />
          < Message self="you" />
          < Message self="me" />
          < Message self="you" />
          < Message self="you" />
          < Message self="me" />
          < Message self="me" />
          < Message self="me" />
          < Message self="me" />
        </Flex>
        {/* {messages.map(message => ( */}
  
        {/* ))} */}
      </>
    )
  } else {
    return (
      <Flex style={{
        width:"100%",
        height:"80vh",
        justifyContent:"center",
        alignItems:"center"
      }}>
        <Flex style={{
          width:"70%",
          backgroundColor:"grey",
          padding:"20px",
          margin:"20px",
          borderRadius:"15px"
        }}>
          <Text align='center' size={50} color={"white"}>Veuillez Sélectionner ou créer une room.</Text>
        </Flex>
      </Flex>
    )
  }
}