import React, { FC } from 'react'
import { Flex, Textarea, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
import e from 'express';
import { showNotification } from '@mantine/notifications';

type Props = {
  sendMessage:(txt:string, uid:string, nickname: string) => {}
}

const ResMessage: FC<Props> = ({sendMessage}) =>  { 
  const [message, setMessage] = useState("");
  const uid = localStorage.getItem('uid') || "uid";
  const roomSelected = localStorage.getItem('roomSelected');
  const nickname = localStorage.getItem('nickname');

	const socket = io("http://localhost:3001");
  
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     alert(data.message);
  //     localStorage.setItem('newMessage', message);
  //   })
  // },[socket])
  
  function sendButtonClicked() {
    
    // CMD
    
    if (message.includes('/nickname')) {
      console.log("nickname set " + message);
      const newNickname = message.substr(message.indexOf(" ") + 1);
      localStorage.setItem('nickname', newNickname)
      setMessage("");
      showNotification({
        title: 'Nickname changed',
        message: 'Votre nickname a bien été modifié ! 🤥',
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.green[6],
            borderColor: theme.colors.green[6],
            '&::before': { backgroundColor: theme.white },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.green[7] },
          },
        })
      })
      return
    }

    // SEND MESSAGE

    if (message.length > 0 && roomSelected) {
      console.log(uid)
      if (message.length !== 0) {
        sendMessage(message, uid, nickname!);
        axios.post('http://localhost:3001/sendMessage', {
          uid: uid,
          message: message,
          roomSelected: roomSelected,
          nickname: nickname,
        }).then((response) => {
            console.log(response.data);
          })
          socket.emit('message', message, () => {
            
          })
          setMessage("");
      }

    } else {

      // NOTIF 

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
      } else if (message.length === 0) {
        showNotification({
          title: 'Votre message est vide',
          message: 'Si vous manquez d inspiration, vous pouvez toujours contacter chatGPT ! 🤥',
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

export default ResMessage