import React, { useState, useEffect, FC } from 'react';
import Message from './Message';
import { Flex, Text } from '@mantine/core'

type Props = {
  messages: {
    uid: string,
    txt: string
  }[]
}

const Messages: FC<Props> = ({messages}) =>  { 
  // const [allMessages, setMessages] = useState(messages);
  const allMessages = messages
  console.log(JSON.stringify(allMessages))
  console.log(allMessages);
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
        </Flex>
        {/* {allMessages.map((message) => {
            < Message self="me" txt={message.txt} />
          }
        )} */}
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
          padding:"30px",
          margin:"20px",
          borderRadius:"15px"
        }}>
          <Text align='center' size={50} color={"white"}>Veuillez Sélectionner ou créer une room.</Text>
        </Flex>
      </Flex>
    )
  }
}

export default Messages