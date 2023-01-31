import React, { useState, useEffect, FC } from 'react';
import Message from './Message';
import { Flex, Text } from '@mantine/core'

type Props = {
  messages: {
    message: string,
    uid: string,
    nickname: string
  }[],
}

const Messages: FC<Props> = ({messages}) =>  { 
  const roomSelected = localStorage.getItem('roomSelected');
  const allMessages = messages
  const myUid = localStorage.getItem('uid');
  if (roomSelected) {
    return (
      <>
        <Flex direction={"column"} style={{
          height:"75vh"
        }}>
          {allMessages.map((messages: {message:string; uid:string, nickname: string}) => {
            var who = ""
            console.log(messages.uid);
            console.log(myUid);
            if (messages.uid.toString().includes(myUid!.toString()))
              who = "me";
            else
              who = "you";
            console.log(who);
            console.log('\n')
            return (
              <Message self={who} uid={messages.uid} txt={messages.message} nickname={messages.nickname} />
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