import React, { useState, useEffect } from 'react';
import Message from './Message';
import { Flex, Text } from '@mantine/core'

export default function Messages() {
  const [messages, setMessages] = useState([""]);
  var i = 0;

  useEffect(() => {

  });
  return (
    <>
      <Flex direction={"column"} style={{
        bottom: "0px"
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
      </Flex>
      {/* {messages.map(message => ( */}

      {/* ))} */}
    </>
  )
}
