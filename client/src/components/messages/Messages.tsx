import React, { useState, useEffect, FC } from 'react';
import Message from './Message';
import { Flex, Text } from '@mantine/core'

type Props = {
  messages: {
    message: string,
    uid: string
  }[],
}

const Messages: FC<Props> = ({messages}) =>  { 
  const roomSelected = localStorage.getItem('roomSelected');
  // const [allMessages, setMessages] = useState(messages);
  const allMessages = messages
  const myUid = localStorage.getItem('uid');
  // console.log(allMessages);
  // messages.forEach(element => {
  //   console.log(element);
  // });
  if (roomSelected) {
    return (
      <>
        <Flex direction={"column"} style={{
          height:"75vh"
        }}>
          {allMessages.map((messages: {message:string; uid:string}) => {
            var who = ""
            if (messages.uid === myUid)
              who = "me";
            else
              who = "you";
            return (
              < Message self={who} uid={messages.uid} txt={messages.message} />
            )
          })}
        </Flex>
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