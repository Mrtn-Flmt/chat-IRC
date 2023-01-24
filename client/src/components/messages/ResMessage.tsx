import React from 'react'
import { Flex, Textarea, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { io } from "socket.io-client";

export default function ResMessage() {
  const [message, setMessage] = useState("");

	const socket = io("/");
	
	socket.on("disconnect", () => {
		console.log(socket.id); // undefined
	});

  function sendButtonClicked() {
    if (message.length !== 0)
      axios.post('http://localhost:3001/sendMessage', {
        uid: "01020304",
        message: message,
      }).then((response) => {
        console.log(response.data[0].message);
      })

		socket.on("connect", () => {
			console.log(socket.id);
		});
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
