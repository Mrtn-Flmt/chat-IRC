import React from 'react'
import { Flex, Textarea, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
import e from 'express';
import { showNotification } from '@mantine/notifications';

export default function ResMessage() {
  const [message, setMessage] = useState("");
  const uid = localStorage.getItem('uid');
  const roomSelected = localStorage.getItem('roomSelected');

	const socket = io("http://localhost:3001");

  var isSend = ""
  
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     alert(data.message);
  //     localStorage.setItem('newMessage', message);
  //   })
  // },[socket])
  
  function sendButtonClicked() {
    if (message.length > 0 && roomSelected) {
      socket.connect()
      if (message.length !== 0)
      axios.post('http://localhost:3001/sendMessage', {
        uid: uid,
        message: message,
        roomSelected: roomSelected,
      }).then((response) => {
          socket.emit("send_message", message);
          console.log(response.data);
          setMessage("");
        })
    } else {
      if (!roomSelected) {
        showNotification({
          title: 'Room inconnue',
          message: 'Veuillez selectionner une room ! 🤥',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.red[6],
              borderColor: theme.colors.red[6],
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.red[7] },
            },
          })
        })
      }
    }
  }

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };

  return (
    <Flex style={{
      backgroundColor: "black",
      width: "100%",
      height: "100px",
      justifyContent: "space-between",
      alignContent: "center",
      bottom: "0px",
    }}>
      <Flex style={{
        width: "100%",
        height: "10%",
      }}>
        <Textarea
          value={message}
          onChange={handleChange}
          placeholder="Votre message"
          radius="md"
          size="sm"
          style={{
            width: "100%",
            height: "100%",
            margin: "10px"
          }}
        />
      </Flex>
      <Button onClick={sendButtonClicked} style={{
        margin: "10px",
        alignSelf: "center"
      }}>Envoyer</Button>
    </Flex>
  )
}
