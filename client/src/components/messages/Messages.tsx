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
      <>
      <Text color={"blue"}></Text></>
    )
  }
}